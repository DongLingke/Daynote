#!/usr/bin/env python3
"""Build 日迹 (Daynote) macOS .app bundle and package it into a DMG.

Uses PyInstaller to produce a truly self-contained bundle: the Python
interpreter, Flask + Werkzeug + pywebview + pyobjc, the app source, the
HTML/CSS/JS assets, and the seed wallpapers all ship inside the .app.
End users only need to drag Daynote.app to /Applications and run it —
no Python, no pip, no terminal.

Usage:
    python3 build_dmg.py             # build DMG
    python3 build_dmg.py --open      # build + open the DMG in Finder
    python3 build_dmg.py --no-dmg    # build .app only (faster iteration)

Prerequisites (one-time, on the build machine):
    python3 -m venv .venv
    .venv/bin/pip install -r requirements.txt pyinstaller
"""

import os
import sys
import shutil
import subprocess
import plistlib
from pathlib import Path

PROJECT_DIR = Path(__file__).resolve().parent
APP_NAME    = "日迹Daynote"
APP_VERSION = "1.0.0"
APP_ID      = "com.daynote"
DMG_NAME    = f"{APP_NAME}.dmg"
BUILD_DIR   = PROJECT_DIR / "build"
DIST_DIR    = PROJECT_DIR / "dist"


def find_python():
    """Prefer the project's .venv python (known-good deps) over sys.executable."""
    venv_py = PROJECT_DIR / ".venv" / "bin" / "python3"
    if venv_py.exists():
        return str(venv_py)
    print("Warning: .venv not found. Run:")
    print("  python3 -m venv .venv && "
          ".venv/bin/pip install -r requirements.txt pyinstaller pywebview")
    return sys.executable


def create_icon():
    """Generate icon.icns next to the project root (idempotent)."""
    icon_path = PROJECT_DIR / "icon.icns"
    if icon_path.exists():
        print(f"  ✓ Using existing icon ({icon_path.stat().st_size // 1024} KB)")
        return icon_path
    sys.path.insert(0, str(PROJECT_DIR))
    from generate_icon import generate_icon
    return Path(generate_icon(str(PROJECT_DIR)))


def build_app(python_bin):
    """Run PyInstaller to produce dist/Daynote.app."""
    print(f"\n🔨 Building {APP_NAME}.app (PyInstaller) ...\n")

    # Clean prior output so old artifacts don't sneak into the bundle
    for p in (BUILD_DIR, DIST_DIR, PROJECT_DIR / f"{APP_NAME}.spec"):
        if p.exists():
            shutil.rmtree(p) if p.is_dir() else p.unlink()

    icon = create_icon()

    # PyInstaller invocation. --windowed = no terminal window when launched
    # from Finder. --add-data ships our static / templates / db schema inside
    # the bundle so Flask finds them.
    cmd = [
        python_bin, "-m", "PyInstaller",
        "--name", APP_NAME,
        "--windowed",
        "--noconfirm",
        "--icon", str(icon),
        "--osx-bundle-identifier", APP_ID,
        # Resources that the running app reads
        "--add-data", f"{PROJECT_DIR / 'static'}:static",
        "--add-data", f"{PROJECT_DIR / 'templates'}:templates",
        "--add-data", f"{PROJECT_DIR / 'app.py'}:.",
        # Make sure pywebview's macOS GUI backend tags along (pyobjc isn't
        # always picked up automatically by PyInstaller's analyzer)
        "--collect-submodules", "webview.platforms.cocoa",
        "--collect-submodules", "pyobjc",
        "--collect-submodules", "WebKit",
        "--collect-submodules", "Foundation",
        "--collect-submodules", "AppKit",
        # Entry point
        str(PROJECT_DIR / "desktop_app.py"),
    ]
    r = subprocess.run(cmd, cwd=PROJECT_DIR)
    if r.returncode != 0:
        raise SystemExit("PyInstaller failed — see output above.")

    app_bundle = DIST_DIR / f"{APP_NAME}.app"
    if not app_bundle.exists():
        raise SystemExit(f"Expected {app_bundle} after build, not found.")

    # ── Massage Info.plist (PyInstaller sets sane defaults; we just refine) ──
    plist_path = app_bundle / "Contents" / "Info.plist"
    with open(plist_path, "rb") as f:
        plist = plistlib.load(f)
    plist.update({
        "CFBundleName":             APP_NAME,
        "CFBundleDisplayName":      APP_NAME,
        "CFBundleIdentifier":       APP_ID,
        "CFBundleShortVersionString": APP_VERSION,
        "CFBundleVersion":          APP_VERSION,
        "NSHighResolutionCapable":  True,
        "LSMinimumSystemVersion":   "11.0",
        "NSHumanReadableCopyright": f"Personal project — {APP_NAME}",
    })
    with open(plist_path, "wb") as f:
        plistlib.dump(plist, f)

    # Ad-hoc re-sign so Gatekeeper accepts the locally-built bundle when the
    # user right-clicks → Open the first time.
    subprocess.run(
        ["codesign", "--deep", "--force", "-s", "-", str(app_bundle)],
        capture_output=True,
    )

    total = sum(os.path.getsize(os.path.join(r, f))
                for r, _, fs in os.walk(app_bundle) for f in fs)
    print(f"\n  ✓ {APP_NAME}.app built ({total // (1024*1024)} MB)")
    return app_bundle


def create_dmg(app_bundle, icon_path):
    """Wrap the .app in a compressed UDZO disk image with a /Applications
    symlink and custom Finder window layout."""
    dmg_path = PROJECT_DIR / DMG_NAME
    temp_dmg = BUILD_DIR / "temp.dmg"
    dmg_root = BUILD_DIR / "DMGRoot"

    for p in (dmg_path, temp_dmg):
        if p.exists():
            p.unlink()
    if dmg_root.exists():
        shutil.rmtree(dmg_root)
    dmg_root.mkdir(parents=True)

    shutil.copytree(app_bundle, dmg_root / f"{APP_NAME}.app", symlinks=True)
    (dmg_root / "Applications").symlink_to("/Applications")

    # Step 1: scratch UDRW image sized generously
    subprocess.run([
        "hdiutil", "create",
        "-srcfolder", str(dmg_root),
        "-volname",   APP_NAME,
        "-fs",        "HFS+", "-format", "UDRW",
        "-size",      "500m", "-ov",
        str(temp_dmg),
    ], check=True, capture_output=True)

    # Step 2: customize DMG appearance (mount, set icon, configure Finder, unmount)
    _customize_dmg(temp_dmg, icon_path)

    # Step 3: convert to compressed read-only (smaller, faster mount)
    subprocess.run([
        "hdiutil", "convert", str(temp_dmg),
        "-format", "UDZO", "-imagekey", "zlib-level=9",
        "-o", str(dmg_path),
    ], check=True, capture_output=True)

    shutil.rmtree(dmg_root)
    temp_dmg.unlink()
    return dmg_path


def _customize_dmg(dmg_path, icon_path):
    """Mount DMG, customize Finder window & set volume icon, then unmount."""
    import time

    # Mount the DMG (writable)
    mount_result = subprocess.run(
        ["hdiutil", "attach", str(dmg_path), "-nobrowse", "-readwrite"],
        capture_output=True, text=True, check=True
    )

    # Find the mount point from hdiutil output (last column of last line)
    mount_point = None
    for line in reversed(mount_result.stdout.split('\n')):
        parts = line.split()
        if parts and os.path.exists(parts[-1]) and f"/{APP_NAME}" in line:
            mount_point = parts[-1]
            break

    if not mount_point:
        mount_point = f"/Volumes/{APP_NAME}"

    if not os.path.exists(mount_point):
        print(f"Warning: Could not find mount point for {dmg_path}")
        return

    try:
        # Configure Finder window (icon setting is optional, skip if read-only)
        try:
            _set_dmg_icon(mount_point, icon_path)
        except OSError as e:
            print(f"Warning: Could not set icon: {e}")

        _configure_finder_window(APP_NAME)

        time.sleep(1)  # Give Finder a moment to write changes
    finally:
        # Unmount the DMG
        subprocess.run(
            ["hdiutil", "detach", mount_point],
            capture_output=True, timeout=10
        )


def _set_dmg_icon(mount_point, icon_path):
    """Set the DMG volume icon using the app's icon."""
    if not icon_path.exists():
        return

    # Copy icon to DMG's .VolumeIcon.icns
    vol_icon = Path(mount_point) / ".VolumeIcon.icns"
    shutil.copy(icon_path, vol_icon)

    # Set the volume's custom icon flag
    subprocess.run(
        ["SetFile", "-a", "C", mount_point],
        capture_output=True
    )


def _configure_finder_window(mount_point):
    """Configure Finder window to show app and Applications folder side-by-side."""
    apple_script = f'''
tell application "Finder"
    tell disk "{APP_NAME}"
        open
        delay 0.5
        set current view of container window to icon view
        set toolbar visible of container window to false
        set statusbar visible of container window to false
        set the bounds of container window to {{100, 100, 700, 500}}
        set icon size of icon view options of container window to 128
        set background picture of icon view options of container window to null
        set text size of icon view options of container window to 12

        -- Arrange icons
        set arrangement of icon view options of container window to arranged by name

        -- Position app on left
        set position of item "{APP_NAME}.app" of container window to {{150, 250}}

        -- Position Applications symlink on right
        set position of item "Applications" of container window to {{550, 250}}

        close
        open
        update
    end tell
end tell
'''
    subprocess.run(
        ["osascript", "-e", apple_script],
        capture_output=True,
        text=True,
        encoding='utf-8'
    )


def main():
    if sys.platform != "darwin":
        print("Error: this script only builds on macOS.")
        sys.exit(1)

    python_bin = find_python()
    print(f"Using Python: {python_bin}")

    app_bundle = build_app(python_bin)

    if "--no-dmg" in sys.argv:
        print(f"\n✅ Done! {app_bundle}")
        return

    print(f"\n📦 Creating {DMG_NAME} ...")
    icon_path = PROJECT_DIR / "icon.icns"
    dmg_path = create_dmg(app_bundle, icon_path)
    shutil.rmtree(BUILD_DIR, ignore_errors=True)

    size_mb = dmg_path.stat().st_size / (1024 * 1024)
    print(f"\n✅ Done! {DMG_NAME} ({size_mb:.0f} MB)")
    print(f"   → open {DMG_NAME}")
    print(f"   → drag {APP_NAME}.app → Applications")
    print(f"   → double-click {APP_NAME}.app")

    if "--open" in sys.argv:
        subprocess.run(["open", str(dmg_path)])


if __name__ == "__main__":
    main()
