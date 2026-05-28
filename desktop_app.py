#!/usr/bin/env python3
"""Desktop application entry point for Daynote.

Launches a native macOS window (WebKit) wrapping the Flask web app.
Data is stored in ~/Library/Application Support/Daynote/.
"""

import os
import sys
import socket
import sqlite3
import threading
import time
import urllib.request
from pathlib import Path

BASE = os.path.dirname(os.path.abspath(__file__))
os.chdir(BASE)
sys.path.insert(0, BASE)

# Set data directory to user's Application Support folder (writable)
DATA_DIR = Path.home() / 'Library' / 'Application Support' / 'Daynote'
DATA_DIR.mkdir(parents=True, exist_ok=True)

os.environ['DAYNOTE_DB'] = str(DATA_DIR / 'todolist.db')
os.environ['DAYNOTE_UPLOADS'] = str(DATA_DIR / 'wallpapers')

# Import the Flask app (this also runs init_db with the custom DB path)
from app import app as flask_app


def find_free_port(start=5000, end=9000):
    for port in range(start, end + 1):
        with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
            try:
                s.bind(('127.0.0.1', port))
                return port
            except OSError:
                continue
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
        s.bind(('127.0.0.1', 0))
        return s.getsockname()[1]


def wait_for_server(url, timeout=15):
    for _ in range(timeout * 10):
        try:
            urllib.request.urlopen(f'{url}/api/settings', timeout=1)
            return True
        except Exception:
            time.sleep(0.1)
    return False


def _read_close_action():
    """Read the user's preferred window-close behaviour from the settings DB.

    Returns 'minimize' (default) or 'quit'. Read fresh on every close so the
    choice in 设置 → 其他 takes effect without a restart.
    """
    try:
        conn = sqlite3.connect(os.environ['DAYNOTE_DB'])
        row = conn.execute(
            "SELECT value FROM settings WHERE key='close_action'"
        ).fetchone()
        conn.close()
        if row and row[0] in ('minimize', 'quit'):
            return row[0]
    except Exception:
        pass
    return 'minimize'


def _disable_macos_text_substitutions():
    """Turn off macOS automatic text substitutions on the WKWebView.

    On macOS the WebKit view inherits the system "Capitalize words
    automatically", smart quotes/dashes, and auto-correct settings. With a
    Chinese input method these mangle pinyin input (the first roman letter of
    a line gets force-capitalized, etc). The HTML `autocapitalize="off"`
    attribute only affects mobile virtual keyboards, so we disable the
    behaviours directly on the native WKWebView instead.

    Runs in pywebview's post-start callback thread; AppKit mutations are
    marshalled onto the main thread.
    """
    try:
        from webview.platforms.cocoa import BrowserView
        from PyObjCTools import AppHelper
    except Exception:
        return

    # Each of these may or may not exist depending on the macOS version, so
    # guard every call with respondsToSelector_.
    selectors = [
        ('setAutomaticCapitalizationEnabled:',     'setAutomaticCapitalizationEnabled_'),
        ('setAutomaticTextReplacementEnabled:',    'setAutomaticTextReplacementEnabled_'),
        ('setAutomaticSpellingCorrectionEnabled:', 'setAutomaticSpellingCorrectionEnabled_'),
        ('setAutomaticQuoteSubstitutionEnabled:',  'setAutomaticQuoteSubstitutionEnabled_'),
        ('setAutomaticDashSubstitutionEnabled:',   'setAutomaticDashSubstitutionEnabled_'),
        ('setContinuousSpellCheckingEnabled:',     'setContinuousSpellCheckingEnabled_'),
        ('setGrammarCheckingEnabled:',             'setGrammarCheckingEnabled_'),
    ]

    def apply(wk):
        for sel_objc, sel_py in selectors:
            try:
                if wk.respondsToSelector_(sel_objc):
                    getattr(wk, sel_py)(False)
            except Exception:
                pass

    # The WKWebView is created during webview.start(); poll briefly for it.
    for _ in range(50):
        instances = list(BrowserView.instances.values())
        if instances:
            for inst in instances:
                wk = getattr(inst, 'webview', None)
                if wk is not None:
                    AppHelper.callAfter(apply, wk)
            return
        time.sleep(0.1)


def main():
    port = find_free_port()
    url = f'http://127.0.0.1:{port}'

    # Start Flask in background
    server = threading.Thread(
        target=lambda: flask_app.run(host='127.0.0.1', port=port, debug=False, use_reloader=False),
        daemon=True,
    )
    server.start()

    if not wait_for_server(url):
        print('Failed to start server')
        sys.exit(1)

    # Open native window
    import webview

    window = webview.create_window(
        'My TodoList',
        url=url,
        width=1280,
        height=800,
        min_size=(800, 600),
        resizable=True,
        text_select=True,
        zoomable=True,
    )

    # Clicking the window's red close button minimizes by default (so the app
    # keeps running in the Dock); users can switch to "quit" in 设置 → 其他.
    def on_closing(window):
        if _read_close_action() == 'quit':
            return None      # allow the close → app terminates
        window.minimize()
        return False         # cancel the close → just minimize

    window.events.closing += on_closing

    webview.start(_disable_macos_text_substitutions, gui='cocoa',
                  private_mode=False, debug=False)


if __name__ == '__main__':
    main()
