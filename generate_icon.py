#!/usr/bin/env python3
"""Generate a macOS .icns app icon for Daynote.

Creates a blue rounded-square icon with a white checkmark.
Output: icon.icns (in current directory, or specified path)

Usage:
    python3 generate_icon.py [output_dir]
"""

import struct
import zlib
import io
import sys
import os
import subprocess
import tempfile
import shutil


def make_png(width, height, draw_fn):
    """Create a PNG from a drawing function.

    draw_fn(pixels, w, h) should fill the pixel list (list of [R,G,B,A] rows).
    """
    pixels = []
    for y in range(height):
        row = []
        for x in range(width):
            row.extend(draw_fn(x, y, width, height))
        pixels.append(row)

    buf = io.BytesIO()
    buf.write(b'\x89PNG\r\n\x1a\n')

    def chunk(ctype, data):
        c = ctype + data
        crc = struct.pack('>I', zlib.crc32(c) & 0xffffffff)
        return struct.pack('>I', len(data)) + c + crc

    ihdr = struct.pack('>IIBBBBB', width, height, 8, 6, 0, 0, 0)
    buf.write(chunk(b'IHDR', ihdr))

    raw = b''
    for row in pixels:
        raw += b'\x00' + bytes(row)
    buf.write(chunk(b'IDAT', zlib.compress(raw)))
    buf.write(chunk(b'IEND', b''))
    return buf.getvalue()


def icon_pixel(x, y, w, h):
    """Return (R,G,B,A) for pixel at (x,y) in a w×h icon.

    Design: blue rounded square with gradient + white checkmark.
    """
    cx, cy = x - w / 2 + 0.5, y - h / 2 + 0.5
    # Normalize to [-1, 1]
    nx, ny = cx / (w / 2), cy / (h / 2)

    # Rounded rect SDF
    radius = 0.22
    rx, ry = abs(nx) - (1 - radius), abs(ny) - (1 - radius)
    dist = max(rx, ry, 0) + (min(rx, 0)**2 + min(ry, 0)**2) ** 0.5 - radius

    if dist > 0.005:
        return (0, 0, 0, 0)  # transparent

    # Smooth edge
    alpha = 255
    if dist > -0.01:
        t = (dist + 0.01) / 0.015
        t = max(0, min(1, t))
        alpha = int(255 * (1 - t))

    # Gradient: top-left to bottom-right
    gx = (nx + 1) / 2
    gy = (ny + 1) / 2
    mix = (gx * 0.6 + gy * 0.4)

    # Blue gradient: #007AFF to #5856D6
    def lerp(a, b, t): return int(a + (b - a) * min(1, max(0, t)))
    r = lerp(0x00, 0x58, mix)
    g = lerp(0x7A, 0x56, mix)
    b = lerp(0xFF, 0xD6, mix)

    # Checkmark (centered, white)
    # Normalized checkmark coordinates (3 points of the check)
    cx1, cy1 = -0.25, 0.05    # left point of check
    cx2, cy2 = -0.08, 0.22    # bottom point (tip)
    cx3, cy3 = 0.25, -0.18    # right point (top)

    # Distance to the line segments
    def point_to_segment(px, py, ax, ay, bx, by):
        abx, aby = bx - ax, by - ay
        t = max(0, min(1, ((px - ax) * abx + (py - ay) * aby) / (abx * abx + aby * aby)))
        dx = (ax + t * abx) - px
        dy = (ay + t * aby) - py
        return (dx * dx + dy * dy) ** 0.5

    d1 = point_to_segment(nx, ny, cx1, cy1, cx2, cy2)
    d2 = point_to_segment(nx, ny, cx2, cy2, cx3, cy3)

    check_dist = min(d1, d2)
    stroke_width = 0.055

    if check_dist < stroke_width:
        t = (check_dist - stroke_width + 0.008) / 0.016
        t = max(0, min(1, t))
        wa = 1 - t
        r = int(r * (1 - wa) + 255 * wa)
        g = int(g * (1 - wa) + 255 * wa)
        b = int(b * (1 - wa) + 255 * wa)

    return (r, g, b, alpha)


def generate_icon(output_dir='.'):
    """Generate icon.icns from PNG images at all required sizes."""
    sizes = [16, 32, 64, 128, 256, 512]

    iconset = os.path.join(output_dir, 'AppIcon.iconset')
    if os.path.exists(iconset):
        shutil.rmtree(iconset)
    os.makedirs(iconset)

    for s in sizes:
        # 1x
        png_data = make_png(s, s, icon_pixel)
        with open(os.path.join(iconset, f'icon_{s}x{s}.png'), 'wb') as f:
            f.write(png_data)
        # 2x (retina)
        if s * 2 <= 1024:
            png_data2 = make_png(s * 2, s * 2, icon_pixel)
            with open(os.path.join(iconset, f'icon_{s}x{s}@2x.png'), 'wb') as f:
                f.write(png_data2)

    # Convert to .icns using iconutil
    icns_path = os.path.join(output_dir, 'icon.icns')
    subprocess.run([
        'iconutil', '-c', 'icns', iconset, '-o', icns_path
    ], check=True, capture_output=True)

    # Clean up iconset
    shutil.rmtree(iconset)

    return icns_path


if __name__ == '__main__':
    out = sys.argv[1] if len(sys.argv) > 1 else '.'
    path = generate_icon(out)
    size = os.path.getsize(path) // 1024
    print(f'✅ icon.icns generated ({size} KB) → {path}')
