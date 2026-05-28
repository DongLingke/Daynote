#!/usr/bin/env python3
"""Desktop application entry point for MyTodoList.

Launches a native macOS window (WebKit) wrapping the Flask web app.
Data is stored in ~/Library/Application Support/MyTodoList/.
"""

import os
import sys
import socket
import threading
import time
import urllib.request
from pathlib import Path

BASE = os.path.dirname(os.path.abspath(__file__))
os.chdir(BASE)
sys.path.insert(0, BASE)

# Set data directory to user's Application Support folder (writable)
DATA_DIR = Path.home() / 'Library' / 'Application Support' / 'MyTodoList'
DATA_DIR.mkdir(parents=True, exist_ok=True)

os.environ['MYTODOLIST_DB'] = str(DATA_DIR / 'todolist.db')
os.environ['MYTODOLIST_UPLOADS'] = str(DATA_DIR / 'wallpapers')

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
    webview.start(gui='cocoa', private_mode=False, debug=False)


if __name__ == '__main__':
    main()
