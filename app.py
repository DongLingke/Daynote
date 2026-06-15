import os
import json
import socket
import sqlite3
import threading
import time
import webbrowser
from datetime import datetime, timedelta, date
from flask import Flask, jsonify, request, render_template, send_from_directory, abort
from werkzeug.utils import secure_filename

app = Flask(__name__, static_folder='static', template_folder='templates')
app.config['MAX_CONTENT_LENGTH'] = 50 * 1024 * 1024  # 50MB for wallpaper uploads (Daynote)
app.config['TEMPLATES_AUTO_RELOAD'] = True
app.jinja_env.auto_reload = True

BASE = os.path.dirname(os.path.abspath(__file__))
DB_PATH = os.environ.get('DAYNOTE_DB') or os.path.join(BASE, 'todolist.db')
UPLOAD_FOLDER = os.environ.get('DAYNOTE_UPLOADS') or os.path.join(BASE, 'static', 'wallpapers')
ALLOWED = {'png', 'jpg', 'jpeg', 'gif', 'webp', 'avif'}

os.makedirs(UPLOAD_FOLDER, exist_ok=True)


# In the packaged .app, UPLOAD_FOLDER points to ~/Library/Application Support
# (writable), while the bundled seed images stay in app.static_folder/wallpapers
# (read-only). Flask's default static handler only knows about the latter, so
# uploaded wallpapers would 404. This explicit route checks the user dir first
# and falls back to the bundle, so both seed and uploaded files resolve.
_BUNDLED_WP = os.path.join(BASE, 'static', 'wallpapers')

@app.route('/static/wallpapers/<path:filename>')
def _serve_wallpaper(filename):
    user_path = os.path.join(UPLOAD_FOLDER, filename)
    if os.path.exists(user_path):
        return send_from_directory(UPLOAD_FOLDER, filename)
    bundled = os.path.join(_BUNDLED_WP, filename)
    if os.path.exists(bundled):
        return send_from_directory(_BUNDLED_WP, filename)
    abort(404)


def allowed_file(fn):
    return '.' in fn and fn.rsplit('.', 1)[1].lower() in ALLOWED


def get_db():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn


def init_db():
    conn = get_db()
    c = conn.cursor()
    c.executescript('''
        CREATE TABLE IF NOT EXISTS todos (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            content TEXT NOT NULL,
            priority INTEGER DEFAULT 2,
            completed INTEGER DEFAULT 0,
            completed_at TEXT,
            order_index INTEGER DEFAULT 0,
            emoji TEXT DEFAULT '',
            created_at TEXT DEFAULT (datetime('now','localtime'))
        );
        CREATE TABLE IF NOT EXISTS thoughts (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT DEFAULT '',
            content TEXT NOT NULL,
            type TEXT DEFAULT 'thought',
            emoji TEXT DEFAULT '',
            created_at TEXT DEFAULT (datetime('now','localtime'))
        );
        CREATE TABLE IF NOT EXISTS settings (
            key TEXT PRIMARY KEY,
            value TEXT
        );
        CREATE TABLE IF NOT EXISTS wallpapers (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            filename TEXT NOT NULL,
            category TEXT NOT NULL,
            name TEXT DEFAULT '',
            created_at TEXT DEFAULT (datetime('now','localtime'))
        );
        -- ── Accounting mode (记账模式) ──────────────────────────────
        -- Table A: 消费记录
        CREATE TABLE IF NOT EXISTS expenses (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            info TEXT DEFAULT '',
            cat1 TEXT DEFAULT '',
            cat2 TEXT DEFAULT '',
            amount REAL NOT NULL DEFAULT 0,
            date TEXT NOT NULL,
            created_at TEXT DEFAULT (datetime('now','localtime'))
        );
        -- Table B: 收入记录
        CREATE TABLE IF NOT EXISTS incomes (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            info TEXT DEFAULT '',
            amount REAL NOT NULL DEFAULT 0,
            category TEXT DEFAULT '',
            date TEXT NOT NULL,
            created_at TEXT DEFAULT (datetime('now','localtime'))
        );
        -- Table C: 每天 0 点的个人余额快照
        CREATE TABLE IF NOT EXISTS balance_snapshots (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            date TEXT NOT NULL UNIQUE,
            amount REAL NOT NULL DEFAULT 0,
            created_at TEXT DEFAULT (datetime('now','localtime'))
        );
        -- 特殊款项（贷款 / 账户余额等），勾选后计入个人余额基准
        CREATE TABLE IF NOT EXISTS special_items (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            amount REAL NOT NULL DEFAULT 0,
            kind TEXT DEFAULT 'asset',
            checked INTEGER DEFAULT 1,
            order_index INTEGER DEFAULT 0,
            created_at TEXT DEFAULT (datetime('now','localtime'))
        );
        CREATE INDEX IF NOT EXISTS idx_expenses_date ON expenses(date);
        CREATE INDEX IF NOT EXISTS idx_incomes_date ON incomes(date);
    ''')
    # Defaults captured from the live working state (2026-05-26 snapshot).
    # Fresh installs land exactly in the look the maintainer was using;
    # active wallpaper IDs are still left blank here and filled in by
    # _seed_tutorial after the bundled images are registered.
    defaults = {
        'theme': 'light',
        'font_size': '16',
        'font_weight': '500',
        'font_family': 'system',
        'card_size': '80',
        'card_opacity': '100',
        'card_blur': '100',
        'card_brightness': '100',
        'card_saturation': '100',
        'card_radius': '33',
        'card_aspect': '140',
        'card_aspect_mobile': '45',
        'card_split': '65',
        'card_split_mobile': '48',
        'ui_style': 'flat',
        'color_scheme': 'extract',
        'active_wp_desktop_light': '',
        'active_wp_desktop_dark': '',
        'active_wp_mobile_light': '',
        'active_wp_mobile_dark': '',
        'emoji_thought': '🧠',
        'emoji_feeling': '👀',
        'emoji_daynote': '🪶',
        'emoji_todo_4': '🌕',
        'emoji_todo_3': '🌖',
        'emoji_todo_2': '🌗',
        'emoji_todo_1': '🌘',
        'show_datetime': 'true',
        'datetime_position': 'center',
        'show_date': 'true',
        'show_time': 'false',
        'show_weekday': 'true',
        'show_seconds': 'false',
        'show_lunar': 'false',
        'hour_format': '24',
        'show_priority_emoji': 'false',
        'show_thought_time': 'false',
        'show_thought_content': 'true',
        'hide_todo_emoji': 'false',
        'extracted_accent': '',
        'onboarding_done': 'false',
        'cal_days_per_page': '8',
        'cal_item_click_mode': 'expand',
        'card_item_tint': '5',
        'dim_past_thoughts': 'true',
        'close_action': 'minimize',
        # ── Accounting mode ──
        'app_mode': 'diary',            # 'diary' | 'accounting'
        'currency_symbol': '¥',
        'expense_categories': json.dumps({
            '餐饮': ['早餐', '午餐', '晚餐', '零食', '饮料', '外卖'],
            '交通': ['地铁', '公交', '打车', '加油', '停车'],
            '购物': ['日用', '服饰', '数码', '护肤'],
            '居住': ['房租', '水电', '物业', '网费'],
            '娱乐': ['电影', '游戏', '旅行', '运动'],
            '医疗': ['药品', '门诊', '体检'],
            '人情': ['礼物', '请客', '红包'],
            '其他': ['其他'],
        }, ensure_ascii=False),
        'income_categories': json.dumps(
            ['工资', '奖金', '兼职', '理财', '报销', '红包', '其他'],
            ensure_ascii=False),
        'accounting_chart_days': '15',
    }
    for k, v in defaults.items():
        c.execute('INSERT OR IGNORE INTO settings (key,value) VALUES (?,?)', (k, v))
    conn.commit()
    # Auto-seed tutorial content on a fresh install (both tables empty)
    empty = (
        c.execute('SELECT COUNT(*) FROM todos').fetchone()[0] == 0 and
        c.execute('SELECT COUNT(*) FROM thoughts').fetchone()[0] == 0
    )
    if empty:
        _seed_tutorial(conn)
    conn.close()


# ── Tutorial Seeding ──────────────────────────────────────────────────────────
# Active (uncompleted) todos — one per priority bucket. age_days = how many
# whole days ago the record was created (0 = today). Completed todos are
# defined separately below.
# Onboarding records — captured from the author's working dataset so a
# fresh install reflects the same "looks like a real, lived-in app" feel.
# Edit here to change what new users / "恢复为引导数据" lands on.
TUTORIAL_TODOS = [
    # (content, priority, age_days)
    ('这里显示代办清单，点击可以编辑', 4, 0),
    ('点击右上角加号添加记录',         3, 0),
    ('长按我还可以拖动哦',             2, 0),
]

# Already-completed tutorial todos. completed_age_days controls how long ago
# they were finished — used to demonstrate the date-grouped 「已完成」 section.
TUTORIAL_TODOS_COMPLETED = [
    # (content, priority, created_age_days, completed_age_days)
    ('把书桌收拾干净', 3, 1, 1),   # done yesterday
    ('喝杯上好的咖啡', 2, 5, 3),   # created 5d ago, done 3d ago
]

TUTORIAL_THOUGHTS = [
    # (title, content, type, age_seconds) — smaller age = newer = sorts higher
    ('欢迎使用 🎉',
     '这是一款只属于你自己的待办与想法记录应用 ✨\n'
     '编辑器内置所见所得的 Markdown ，可以在这里写想法/感受\n'
     '数据保存在本地，不会上传到互联网；也可以用浏览器打开并使用\n'
     '有何修改建议可到我的 git 仓库提 issue 哦😄',
     'thought', 0),

    ('小确幸',
     '想法和感受都会被时间冲淡 —— 趁还热乎，记下来。',
     'feeling', 86_400),                              # 1 day ago

    ('周末旅行计划',
     '1. 磨洋工到周五\n'
     '2. 出发去旅行\n'
     '3. 回来',
     'thought', 3 * 86_400),                         # 3 days ago
]

# Pre-bundled wallpapers — these image files ship in static/wallpapers/
# alongside the app. On a fresh install we register them in the DB so new
# users get a non-empty 壁纸 picker out of the box. Order here determines
# the auto-increment ID each row gets (1, 2, 3, …) — keep it stable so the
# TUTORIAL_ACTIVE_WP mapping below stays aligned.
TUTORIAL_WALLPAPERS = [
    # idx 1
    ('-_1779674033.png',     'desktop_dark',  '【哲风壁纸】地球风光-太空景观'),
    # idx 2
    ('-_1779674047.png',     'mobile_dark',   '【哲风壁纸】光线-宇宙黑洞'),
    # idx 3
    ('-_1779674106.png',     'mobile_dark',   '【哲风壁纸】地球-外层空间'),
    # idx 4
    ('IOS26-_1779674311.png','mobile_light',  '【哲风壁纸】IOS26-富士山'),
    # idx 5
    ('--_1779674314.png',    'mobile_light',  '【哲风壁纸】休憩-小黑猫-树荫下'),
    # idx 6 ← active mobile_light
    ('--_1779674320.png',    'mobile_light',  '【哲风壁纸】户外-春日-晴朗'),
    # idx 7 ← active mobile_dark
    ('--_1779674323.png',    'mobile_dark',   '【哲风壁纸】景深-樱花-粉色'),
    # idx 8
    ('-_1779674507.png',     'desktop_light', '【哲风壁纸】云海-冬季'),
    # idx 9
    ('--_1779761206.png',    'desktop_dark',  '【哲风壁纸】太空-宇宙-星空'),
    # idx 10 ← active desktop_light
    ('-_1779763010.png',     'desktop_light', '【哲风壁纸】勃朗峰-晨曦美景'),
    # idx 11
    ('--_1779770937.jpg',    'desktop_dark',  '【哲风壁纸】宇宙-星空-梦幻宇宙'),
    # idx 12
    ('--_1779770942.jpg',    'desktop_dark',  '【哲风壁纸】宇宙-宇宙景观-星空'),
    # idx 13
    ('--_1779770967.jpg',    'desktop_light', '【哲风壁纸】宫墙-庭院-柿子'),
    # idx 14
    ('--_1779770973.jpg',    'desktop_light', '【哲风壁纸】天空-浪花-海岸'),
]
# Auto-assigned IDs on fresh install (1..14). The picks below match the
# wallpapers the maintainer was actually using when this snapshot was taken.
TUTORIAL_ACTIVE_WP = {
    'active_wp_desktop_dark':  '1',   # 地球风光-太空景观
    'active_wp_desktop_light': '10',  # 勃朗峰-晨曦美景
    'active_wp_mobile_dark':   '7',   # 景深-樱花-粉色
    'active_wp_mobile_light':  '6',   # 户外-春日-晴朗
}


def _seed_tutorial(conn):
    """Insert the tutorial onboarding records into empty tables.

    Three things get seeded: todos, thoughts, and (only when the
    wallpapers table is also empty) the bundled wallpaper metadata +
    default active-wallpaper picks. The wallpaper PNGs themselves must
    live in static/wallpapers/ — missing files are silently skipped.
    """
    c = conn.cursor()
    now = datetime.now().replace(microsecond=0)

    # Logging is now disabled; remove seed.log after testing if it exists

    def days_ago(d):
        return (now - timedelta(days=d)).strftime('%Y-%m-%d %H:%M:%S')

    # Active todos: one per priority bucket
    for content, prio, age_d in TUTORIAL_TODOS:
        c.execute(
            'INSERT INTO todos (content, priority, order_index, created_at) '
            'VALUES (?, ?, 0, ?)',
            (content, prio, days_ago(age_d)),
        )
    # Completed todos: demonstrate the 「已完成」 date grouping
    for content, prio, c_age, done_age in TUTORIAL_TODOS_COMPLETED:
        c.execute(
            'INSERT INTO todos (content, priority, completed, completed_at, '
            'order_index, created_at) VALUES (?, ?, 1, ?, 0, ?)',
            (content, prio, days_ago(done_age), days_ago(c_age)),
        )
    # Thoughts: explicit created_at timestamps so the welcome card lands at top
    for title, content, ttype, age in TUTORIAL_THOUGHTS:
        ts = (now - timedelta(seconds=age)).strftime('%Y-%m-%d %H:%M:%S')
        c.execute(
            'INSERT INTO thoughts (title, content, type, created_at) VALUES (?, ?, ?, ?)',
            (title, content, ttype, ts),
        )

    # Wallpapers — idempotent: any bundled wallpaper whose filename isn't
    # already in the DB gets inserted. This way upgrading the app (which
    # ships new bundled wallpapers) backfills them into an existing DB
    # without wiping the user's own uploads.
    wp_dir = os.path.join(app.static_folder, 'wallpapers')

    # Fallback paths in case static_folder is resolved incorrectly in bundle
    wp_fallbacks = [
        wp_dir,  # normal: BASE/static/wallpapers
        os.path.join(BASE, 'static', 'wallpapers'),  # explicit
        os.path.join(os.path.dirname(BASE), 'static', 'wallpapers'),  # one level up
    ]


    def find_wallpaper_file(filename):
        for base_path in wp_fallbacks:
            full = os.path.join(base_path, filename)
            if os.path.exists(full):
                return full
        return None

    existing = {row['filename'] for row in
                c.execute('SELECT filename FROM wallpapers').fetchall()}
    inserted_any = False
    for filename, category, name in TUTORIAL_WALLPAPERS:
        if filename in existing:
            continue
        if not find_wallpaper_file(filename):
            continue
        c.execute(
            'INSERT INTO wallpapers (filename, category, name) VALUES (?, ?, ?)',
            (filename, category, name),
        )
        inserted_any = True

    # Default active picks — set regardless (simpler & always works)
    # Store as integers mapped to actual wallpaper IDs
    if inserted_any:
        fname_to_id = {row['filename']: row['id'] for row in
                       c.execute('SELECT id, filename FROM wallpapers').fetchall()}

        # Map TUTORIAL_ACTIVE_WP indices to actual wallpaper IDs
        for k, idx_str in TUTORIAL_ACTIVE_WP.items():
            try:
                fname = TUTORIAL_WALLPAPERS[int(idx_str) - 1][0]
                wid = fname_to_id.get(fname)
                if wid is not None:
                    # Always update, in case this is an upgrade
                    c.execute(
                        'INSERT OR REPLACE INTO settings (key, value) VALUES (?, ?)',
                        (k, str(wid)),
                    )
            except (ValueError, IndexError):
                pass
    conn.commit()


with app.app_context():
    init_db()


# ── Index ─────────────────────────────────────────────────────────────────────
@app.route('/')
def index():
    return render_template('index.html')


# ── Todos ─────────────────────────────────────────────────────────────────────
@app.route('/api/todos', methods=['GET'])
def get_todos():
    conn = get_db()
    rows = conn.execute(
        'SELECT * FROM todos ORDER BY completed ASC, priority DESC, order_index ASC'
    ).fetchall()
    conn.close()
    return jsonify([dict(r) for r in rows])


@app.route('/api/todos', methods=['POST'])
def create_todo():
    d = request.json
    conn = get_db()
    row = conn.execute(
        'SELECT COALESCE(MAX(order_index)+1,0) as n FROM todos WHERE priority=? AND completed=0',
        (d.get('priority', 2),)
    ).fetchone()
    cur = conn.execute(
        'INSERT INTO todos (content,priority,order_index,emoji) VALUES (?,?,?,?)',
        (d['content'], d.get('priority', 2), row['n'], d.get('emoji', ''))
    )
    conn.commit()
    todo = dict(conn.execute('SELECT * FROM todos WHERE id=?', (cur.lastrowid,)).fetchone())
    conn.close()
    return jsonify(todo), 201


@app.route('/api/todos/<int:tid>', methods=['PUT'])
def update_todo(tid):
    d = request.json
    conn = get_db()
    allowed = {'content', 'priority', 'completed', 'completed_at', 'order_index', 'emoji'}
    fields = [f'{k}=?' for k in d if k in allowed]
    values = [d[k] for k in d if k in allowed] + [tid]
    if fields:
        conn.execute(f'UPDATE todos SET {",".join(fields)} WHERE id=?', values)
        conn.commit()
    todo = dict(conn.execute('SELECT * FROM todos WHERE id=?', (tid,)).fetchone())
    conn.close()
    return jsonify(todo)


@app.route('/api/todos/<int:tid>', methods=['DELETE'])
def delete_todo(tid):
    conn = get_db()
    conn.execute('DELETE FROM todos WHERE id=?', (tid,))
    conn.commit()
    conn.close()
    return jsonify({'ok': True})


@app.route('/api/todos/<int:tid>/complete', methods=['POST'])
def complete_todo(tid):
    conn = get_db()
    now = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    conn.execute('UPDATE todos SET completed=1,completed_at=? WHERE id=?', (now, tid))
    conn.commit()
    todo = dict(conn.execute('SELECT * FROM todos WHERE id=?', (tid,)).fetchone())
    conn.close()
    return jsonify(todo)


@app.route('/api/todos/reorder', methods=['POST'])
def reorder_todos():
    items = request.json
    conn = get_db()
    for item in items:
        conn.execute('UPDATE todos SET order_index=?,priority=? WHERE id=?',
                     (item['order_index'], item['priority'], item['id']))
    conn.commit()
    conn.close()
    return jsonify({'ok': True})


# ── Thoughts ──────────────────────────────────────────────────────────────────
@app.route('/api/thoughts', methods=['GET'])
def get_thoughts():
    conn = get_db()
    rows = conn.execute('SELECT * FROM thoughts ORDER BY created_at DESC').fetchall()
    conn.close()
    return jsonify([dict(r) for r in rows])


@app.route('/api/thoughts', methods=['POST'])
def create_thought():
    d = request.json
    conn = get_db()
    cur = conn.execute(
        'INSERT INTO thoughts (title,content,type,emoji) VALUES (?,?,?,?)',
        (d.get('title', ''), d['content'], d.get('type', 'thought'), d.get('emoji', ''))
    )
    conn.commit()
    thought = dict(conn.execute('SELECT * FROM thoughts WHERE id=?', (cur.lastrowid,)).fetchone())
    conn.close()
    return jsonify(thought), 201


@app.route('/api/thoughts/<int:tid>', methods=['PUT'])
def update_thought(tid):
    d = request.json
    conn = get_db()
    allowed = {'title', 'content', 'type', 'emoji'}
    fields = [f'{k}=?' for k in d if k in allowed]
    values = [d[k] for k in d if k in allowed] + [tid]
    if fields:
        conn.execute(f'UPDATE thoughts SET {",".join(fields)} WHERE id=?', values)
        conn.commit()
    thought = dict(conn.execute('SELECT * FROM thoughts WHERE id=?', (tid,)).fetchone())
    conn.close()
    return jsonify(thought)


@app.route('/api/thoughts/<int:tid>', methods=['DELETE'])
def delete_thought(tid):
    conn = get_db()
    conn.execute('DELETE FROM thoughts WHERE id=?', (tid,))
    conn.commit()
    conn.close()
    return jsonify({'ok': True})


# ── Settings ──────────────────────────────────────────────────────────────────
@app.route('/api/settings', methods=['GET'])
def get_settings():
    conn = get_db()
    rows = conn.execute('SELECT key,value FROM settings').fetchall()
    conn.close()
    return jsonify({r['key']: r['value'] for r in rows})


@app.route('/api/settings', methods=['PUT'])
def update_settings():
    d = request.json
    conn = get_db()
    for k, v in d.items():
        conn.execute('INSERT OR REPLACE INTO settings (key,value) VALUES (?,?)', (k, str(v)))
    conn.commit()
    conn.close()
    return jsonify({'ok': True})


# ── Wallpapers ────────────────────────────────────────────────────────────────
@app.route('/api/wallpapers', methods=['GET'])
def get_wallpapers():
    conn = get_db()
    rows = conn.execute('SELECT * FROM wallpapers ORDER BY category,created_at').fetchall()
    conn.close()
    return jsonify([dict(r) for r in rows])


@app.route('/api/wallpapers', methods=['POST'])
def upload_wallpaper():
    if 'file' not in request.files:
        return jsonify({'error': 'no file'}), 400
    file = request.files['file']
    category = request.form.get('category', 'desktop_light')
    name = request.form.get('name', '')
    if not (file and allowed_file(file.filename)):
        return jsonify({'error': 'invalid type'}), 400
    base, ext = os.path.splitext(secure_filename(file.filename))
    filename = f"{base}_{int(datetime.now().timestamp())}{ext}"
    file.save(os.path.join(UPLOAD_FOLDER, filename))
    conn = get_db()
    cur = conn.execute(
        'INSERT INTO wallpapers (filename,category,name) VALUES (?,?,?)',
        (filename, category, name or base)
    )
    conn.commit()
    wp = dict(conn.execute('SELECT * FROM wallpapers WHERE id=?', (cur.lastrowid,)).fetchone())
    conn.close()
    return jsonify(wp), 201


@app.route('/api/wallpapers/<int:wid>', methods=['DELETE'])
def delete_wallpaper(wid):
    conn = get_db()
    row = conn.execute('SELECT filename FROM wallpapers WHERE id=?', (wid,)).fetchone()
    if row:
        fp = os.path.join(UPLOAD_FOLDER, row['filename'])
        if os.path.exists(fp):
            os.remove(fp)
        conn.execute('DELETE FROM wallpapers WHERE id=?', (wid,))
        conn.commit()
    conn.close()
    return jsonify({'ok': True})


# ── Backup / Restore ──────────────────────────────────────────────────────────
# ── Accounting mode (记账模式) ──────────────────────────────────────────────────
#
# Balance model (个人余额):
#   baseline       = Σ(checked special_items, asset + / debt −)   # 起始资金/账户本金
#   current_balance = baseline + Σ(all income) − Σ(all expense)
#   So the special items anchor the starting net worth, and every expense /
#   income recorded afterwards moves the balance — "根据消费记录变化来计算".
#   Daily snapshots (table C) freeze the balance at each day's 0:00. The chart
#   derives each day's balance by walking the current balance backward through
#   each day's net flow (income − expense):
#       balance(D) = current_balance − Σ net(d) for d in (D, today]
#   so the line always ends at today's current balance and steps by daily flow.

def _baseline(conn):
    """Anchor = sum of checked special items (asset +, debt −)."""
    row = conn.execute(
        "SELECT COALESCE(SUM(CASE WHEN kind='debt' THEN -amount ELSE amount END), 0) AS b "
        "FROM special_items WHERE checked=1"
    ).fetchone()
    return row['b'] or 0.0


def _current_balance(conn):
    """Live personal balance = baseline + total income − total expense."""
    inc = conn.execute("SELECT COALESCE(SUM(amount),0) s FROM incomes").fetchone()['s'] or 0
    exp = conn.execute("SELECT COALESCE(SUM(amount),0) s FROM expenses").fetchone()['s'] or 0
    return round(_baseline(conn) + inc - exp, 2)


def _day_net(conn, day):
    """Net flow on a single day = income − expense (day is 'YYYY-MM-DD')."""
    inc = conn.execute("SELECT COALESCE(SUM(amount),0) s FROM incomes WHERE date=?", (day,)).fetchone()['s'] or 0
    exp = conn.execute("SELECT COALESCE(SUM(amount),0) s FROM expenses WHERE date=?", (day,)).fetchone()['s'] or 0
    return inc - exp


def _balance_series(conn, days=15):
    """Return [{date, amount}] oldest→newest for the last `days` days.

    Derives purely from the current balance walking backward through each
    day's net flow, so the line is always self-consistent and reflects any
    edits to past records immediately. Today is always the live balance."""
    today = date.today()
    cur = _current_balance(conn)
    out = []
    running = cur
    for i in range(days):
        d = (today - timedelta(days=i)).isoformat()
        out.append({'date': d, 'amount': round(running, 2)})
        # Step to the previous day: subtract this day's net flow.
        running = round(running - _day_net(conn, d), 2)
    out.reverse()
    return out


def _ensure_snapshot(conn, day=None):
    """Upsert the balance snapshot for `day` (default today) = current balance."""
    day = day or date.today().isoformat()
    bal = _current_balance(conn)
    conn.execute(
        "INSERT INTO balance_snapshots (date, amount) VALUES (?, ?) "
        "ON CONFLICT(date) DO UPDATE SET amount=excluded.amount",
        (day, bal))
    conn.commit()


def _midnight_scheduler():
    """Background thread: at each local midnight, snapshot the day's balance."""
    while True:
        now = datetime.now()
        nxt = (now + timedelta(days=1)).replace(hour=0, minute=0, second=5, microsecond=0)
        time.sleep(max(60, (nxt - now).total_seconds()))
        try:
            conn = get_db()
            _ensure_snapshot(conn)
            conn.close()
        except Exception as e:
            print('midnight snapshot failed:', e)


# Start the midnight balance-snapshot scheduler (daemon dies with the app).
# Guard against Werkzeug's reloader spawning it twice (only the reloaded
# child sets WERKZEUG_RUN_MAIN; in production debug is off).
if os.environ.get('WERKZEUG_RUN_MAIN') == 'true' or os.environ.get('FLASK_DEBUG', '1') == '0':
    threading.Thread(target=_midnight_scheduler, daemon=True).start()


# ── Expenses (table A) ──
@app.route('/api/expenses', methods=['GET'])
def get_expenses():
    conn = get_db()
    args = request.args
    q = 'SELECT * FROM expenses'
    params, where = [], []
    if args.get('date'):
        where.append('date=?'); params.append(args['date'])
    if args.get('from'):
        where.append('date>=?'); params.append(args['from'])
    if args.get('to'):
        where.append('date<=?'); params.append(args['to'])
    if where:
        q += ' WHERE ' + ' AND '.join(where)
    q += ' ORDER BY date DESC, id DESC'
    if args.get('limit'):
        q += ' LIMIT ?'; params.append(int(args['limit']))
    rows = conn.execute(q, params).fetchall()
    conn.close()
    return jsonify([dict(r) for r in rows])


@app.route('/api/expenses', methods=['POST'])
def create_expense():
    d = request.json
    conn = get_db()
    cur = conn.execute(
        'INSERT INTO expenses (info,cat1,cat2,amount,date) VALUES (?,?,?,?,?)',
        (d.get('info', ''), d.get('cat1', ''), d.get('cat2', ''),
         float(d.get('amount', 0)), d.get('date') or date.today().isoformat()))
    conn.commit()
    _ensure_snapshot(conn)
    row = dict(conn.execute('SELECT * FROM expenses WHERE id=?', (cur.lastrowid,)).fetchone())
    conn.close()
    return jsonify(row), 201


@app.route('/api/expenses/<int:eid>', methods=['PUT'])
def update_expense(eid):
    d = request.json
    conn = get_db()
    allowed = {'info', 'cat1', 'cat2', 'amount', 'date'}
    fields = [f'{k}=?' for k in d if k in allowed]
    values = [d[k] for k in d if k in allowed] + [eid]
    if fields:
        conn.execute(f'UPDATE expenses SET {",".join(fields)} WHERE id=?', values)
        conn.commit()
        _ensure_snapshot(conn)
    row = conn.execute('SELECT * FROM expenses WHERE id=?', (eid,)).fetchone()
    conn.close()
    return jsonify(dict(row)) if row else (jsonify({'error': 'not found'}), 404)


@app.route('/api/expenses/<int:eid>', methods=['DELETE'])
def delete_expense(eid):
    conn = get_db()
    conn.execute('DELETE FROM expenses WHERE id=?', (eid,))
    conn.commit()
    _ensure_snapshot(conn)
    conn.close()
    return jsonify({'ok': True})


# ── Incomes (table B) ──
@app.route('/api/incomes', methods=['GET'])
def get_incomes():
    conn = get_db()
    args = request.args
    q = 'SELECT * FROM incomes'
    params, where = [], []
    if args.get('date'):
        where.append('date=?'); params.append(args['date'])
    if args.get('from'):
        where.append('date>=?'); params.append(args['from'])
    if args.get('to'):
        where.append('date<=?'); params.append(args['to'])
    if where:
        q += ' WHERE ' + ' AND '.join(where)
    q += ' ORDER BY date DESC, id DESC'
    if args.get('limit'):
        q += ' LIMIT ?'; params.append(int(args['limit']))
    rows = conn.execute(q, params).fetchall()
    conn.close()
    return jsonify([dict(r) for r in rows])


@app.route('/api/incomes', methods=['POST'])
def create_income():
    d = request.json
    conn = get_db()
    cur = conn.execute(
        'INSERT INTO incomes (info,amount,category,date) VALUES (?,?,?,?)',
        (d.get('info', ''), float(d.get('amount', 0)), d.get('category', ''),
         d.get('date') or date.today().isoformat()))
    conn.commit()
    _ensure_snapshot(conn)
    row = dict(conn.execute('SELECT * FROM incomes WHERE id=?', (cur.lastrowid,)).fetchone())
    conn.close()
    return jsonify(row), 201


@app.route('/api/incomes/<int:iid>', methods=['PUT'])
def update_income(iid):
    d = request.json
    conn = get_db()
    allowed = {'info', 'amount', 'category', 'date'}
    fields = [f'{k}=?' for k in d if k in allowed]
    values = [d[k] for k in d if k in allowed] + [iid]
    if fields:
        conn.execute(f'UPDATE incomes SET {",".join(fields)} WHERE id=?', values)
        conn.commit()
        _ensure_snapshot(conn)
    row = conn.execute('SELECT * FROM incomes WHERE id=?', (iid,)).fetchone()
    conn.close()
    return jsonify(dict(row)) if row else (jsonify({'error': 'not found'}), 404)


@app.route('/api/incomes/<int:iid>', methods=['DELETE'])
def delete_income(iid):
    conn = get_db()
    conn.execute('DELETE FROM incomes WHERE id=?', (iid,))
    conn.commit()
    _ensure_snapshot(conn)
    conn.close()
    return jsonify({'ok': True})


# ── Special items (特殊款项) ──
@app.route('/api/special-items', methods=['GET'])
def get_special_items():
    conn = get_db()
    rows = conn.execute('SELECT * FROM special_items ORDER BY order_index ASC, id ASC').fetchall()
    conn.close()
    return jsonify([dict(r) for r in rows])


@app.route('/api/special-items', methods=['POST'])
def create_special_item():
    d = request.json
    conn = get_db()
    n = conn.execute('SELECT COALESCE(MAX(order_index)+1,0) AS n FROM special_items').fetchone()['n']
    cur = conn.execute(
        'INSERT INTO special_items (name,amount,kind,checked,order_index) VALUES (?,?,?,?,?)',
        (d.get('name', ''), float(d.get('amount', 0)), d.get('kind', 'asset'),
         1 if d.get('checked', True) else 0, n))
    conn.commit()
    _ensure_snapshot(conn)
    row = dict(conn.execute('SELECT * FROM special_items WHERE id=?', (cur.lastrowid,)).fetchone())
    conn.close()
    return jsonify(row), 201


@app.route('/api/special-items/<int:sid>', methods=['PUT'])
def update_special_item(sid):
    d = request.json
    conn = get_db()
    allowed = {'name', 'amount', 'kind', 'checked', 'order_index'}
    fields = [f'{k}=?' for k in d if k in allowed]
    values = [(1 if d[k] else 0) if k == 'checked' else d[k] for k in d if k in allowed] + [sid]
    if fields:
        conn.execute(f'UPDATE special_items SET {",".join(fields)} WHERE id=?', values)
        conn.commit()
        _ensure_snapshot(conn)
    row = conn.execute('SELECT * FROM special_items WHERE id=?', (sid,)).fetchone()
    conn.close()
    return jsonify(dict(row)) if row else (jsonify({'error': 'not found'}), 404)


@app.route('/api/special-items/<int:sid>', methods=['DELETE'])
def delete_special_item(sid):
    conn = get_db()
    conn.execute('DELETE FROM special_items WHERE id=?', (sid,))
    conn.commit()
    _ensure_snapshot(conn)
    conn.close()
    return jsonify({'ok': True})


# ── Accounting summary (balance + chart series + today totals) ──
@app.route('/api/accounting/summary', methods=['GET'])
def accounting_summary():
    conn = get_db()
    days = int(request.args.get('days', 15))
    _ensure_snapshot(conn)   # keep today's snapshot fresh on load
    today = date.today().isoformat()
    summary = {
        'current_balance': _current_balance(conn),
        'today_expense': conn.execute(
            "SELECT COALESCE(SUM(amount),0) s FROM expenses WHERE date=?", (today,)).fetchone()['s'] or 0,
        'today_income': conn.execute(
            "SELECT COALESCE(SUM(amount),0) s FROM incomes WHERE date=?", (today,)).fetchone()['s'] or 0,
        'month_expense': conn.execute(
            "SELECT COALESCE(SUM(amount),0) s FROM expenses WHERE date>=?",
            (today[:8] + '01',)).fetchone()['s'] or 0,
        'series': _balance_series(conn, days),
    }
    conn.close()
    return jsonify(summary)


@app.route('/api/export', methods=['GET'])
def export_data():
    """Dump all user data (todos, thoughts, settings, wallpaper metadata)
    as a single JSON document. Wallpaper image files themselves are not
    embedded — re-upload after import if needed."""
    conn = get_db()
    payload = {
        'version': 1,
        'exported_at': datetime.now().strftime('%Y-%m-%d %H:%M:%S'),
        'todos':    [dict(r) for r in conn.execute('SELECT * FROM todos').fetchall()],
        'thoughts': [dict(r) for r in conn.execute('SELECT * FROM thoughts').fetchall()],
        'settings': {r['key']: r['value'] for r in conn.execute('SELECT key,value FROM settings').fetchall()},
        'wallpapers': [dict(r) for r in conn.execute('SELECT * FROM wallpapers').fetchall()],
        'expenses': [dict(r) for r in conn.execute('SELECT * FROM expenses').fetchall()],
        'incomes': [dict(r) for r in conn.execute('SELECT * FROM incomes').fetchall()],
        'balance_snapshots': [dict(r) for r in conn.execute('SELECT * FROM balance_snapshots').fetchall()],
        'special_items': [dict(r) for r in conn.execute('SELECT * FROM special_items').fetchall()],
    }
    conn.close()
    return jsonify(payload)


@app.route('/api/import', methods=['POST'])
def import_data():
    """Replace all current data with the supplied JSON payload.
    Wallpaper image files are NOT restored — only the metadata. Active
    wallpaper settings that reference missing files will fall back to
    the default solid background."""
    d = request.json or {}
    if not isinstance(d, dict) or d.get('version') != 1:
        return jsonify({'error': 'invalid payload'}), 400

    conn = get_db()
    c = conn.cursor()
    c.execute('DELETE FROM todos')
    c.execute('DELETE FROM thoughts')
    c.execute('DELETE FROM settings')
    c.execute('DELETE FROM wallpapers')
    c.execute('DELETE FROM expenses')
    c.execute('DELETE FROM incomes')
    c.execute('DELETE FROM balance_snapshots')
    c.execute('DELETE FROM special_items')

    for t in d.get('todos', []) or []:
        c.execute(
            'INSERT INTO todos (id,content,priority,completed,completed_at,order_index,emoji,created_at) '
            'VALUES (?,?,?,?,?,?,?,?)',
            (t.get('id'), t.get('content', ''), t.get('priority', 2),
             t.get('completed', 0), t.get('completed_at'),
             t.get('order_index', 0), t.get('emoji', ''),
             t.get('created_at') or datetime.now().strftime('%Y-%m-%d %H:%M:%S')),
        )
    for th in d.get('thoughts', []) or []:
        c.execute(
            'INSERT INTO thoughts (id,title,content,type,emoji,created_at) VALUES (?,?,?,?,?,?)',
            (th.get('id'), th.get('title', ''), th.get('content', ''),
             th.get('type', 'thought'), th.get('emoji', ''),
             th.get('created_at') or datetime.now().strftime('%Y-%m-%d %H:%M:%S')),
        )
    for w in d.get('wallpapers', []) or []:
        c.execute(
            'INSERT INTO wallpapers (id,filename,category,name,created_at) VALUES (?,?,?,?,?)',
            (w.get('id'), w.get('filename', ''), w.get('category', 'desktop_light'),
             w.get('name', ''),
             w.get('created_at') or datetime.now().strftime('%Y-%m-%d %H:%M:%S')),
        )
    for e in d.get('expenses', []) or []:
        c.execute(
            'INSERT INTO expenses (id,info,cat1,cat2,amount,date,created_at) VALUES (?,?,?,?,?,?,?)',
            (e.get('id'), e.get('info', ''), e.get('cat1', ''), e.get('cat2', ''),
             e.get('amount', 0), e.get('date') or date.today().isoformat(),
             e.get('created_at') or datetime.now().strftime('%Y-%m-%d %H:%M:%S')))
    for inc in d.get('incomes', []) or []:
        c.execute(
            'INSERT INTO incomes (id,info,amount,category,date,created_at) VALUES (?,?,?,?,?,?)',
            (inc.get('id'), inc.get('info', ''), inc.get('amount', 0), inc.get('category', ''),
             inc.get('date') or date.today().isoformat(),
             inc.get('created_at') or datetime.now().strftime('%Y-%m-%d %H:%M:%S')))
    for b in d.get('balance_snapshots', []) or []:
        c.execute('INSERT OR REPLACE INTO balance_snapshots (id,date,amount,created_at) VALUES (?,?,?,?)',
                  (b.get('id'), b.get('date'), b.get('amount', 0),
                   b.get('created_at') or datetime.now().strftime('%Y-%m-%d %H:%M:%S')))
    for s in d.get('special_items', []) or []:
        c.execute(
            'INSERT INTO special_items (id,name,amount,kind,checked,order_index,created_at) VALUES (?,?,?,?,?,?,?)',
            (s.get('id'), s.get('name', ''), s.get('amount', 0), s.get('kind', 'asset'),
             s.get('checked', 1), s.get('order_index', 0),
             s.get('created_at') or datetime.now().strftime('%Y-%m-%d %H:%M:%S')))
    for k, v in (d.get('settings', {}) or {}).items():
        c.execute('INSERT OR REPLACE INTO settings (key,value) VALUES (?,?)', (k, str(v)))

    conn.commit()
    conn.close()
    # Re-seed any missing default settings so the app keeps working
    # (idempotent — INSERT OR IGNORE only fills in keys the import didn't supply)
    init_db()
    return jsonify({'ok': True})


# ── Open in browser ───────────────────────────────────────────────────────────
@app.route('/api/open-in-browser', methods=['POST'])
def open_in_browser():
    """Open the current service URL in the user's default browser.
    Returns the URL so the client can use it as a fallback link if the
    webbrowser module is unable to open one (e.g., headless servers)."""
    # Prefer the URL Werkzeug actually bound to (set during startup); fall
    # back to the request host so this still works if PORT was overridden.
    url = app.config.get('SERVER_URL') or request.host_url.rstrip('/')
    opened = False
    try:
        opened = webbrowser.open_new_tab(url)
    except Exception as e:
        opened = False
    return jsonify({'ok': True, 'opened': opened, 'url': url})


# ── Tutorial reset ────────────────────────────────────────────────────────────
@app.route('/api/reset-tutorial', methods=['POST'])
def reset_to_tutorial():
    """Wipe all todos + thoughts and re-seed the onboarding tutorial records.
    Settings and wallpapers are left untouched."""
    conn = get_db()
    c = conn.cursor()
    c.execute('DELETE FROM todos')
    c.execute('DELETE FROM thoughts')
    _seed_tutorial(conn)
    conn.commit()
    conn.close()
    return jsonify({'ok': True})


# ── Run ───────────────────────────────────────────────────────────────────────
def pick_free_port(start: int = 5000, end: int = 6000) -> int:
    """Pick the first available TCP port in [start, end] on 127.0.0.1.
    Falls back to a kernel-assigned port if every port in the range is taken."""
    for port in range(start, end + 1):
        with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
            s.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
            try:
                s.bind(('127.0.0.1', port))
                return port
            except OSError:
                continue
    # Nothing free in range — let the OS assign one
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
        s.bind(('127.0.0.1', 0))
        return s.getsockname()[1]


if __name__ == '__main__':
    # Allow an explicit override via PORT env var; otherwise auto-pick a free
    # port in [5000, 6000]. We avoid hard-coding 5000 because that port is
    # famously used by macOS AirPlay Receiver.
    env_port = os.environ.get('PORT')
    port = int(env_port) if env_port else pick_free_port(5000, 6000)
    # debug=True enables Werkzeug's auto-reloader: editing app.py automatically
    # restarts the server so new routes / handlers take effect without manual
    # Ctrl+C + restart. Set FLASK_DEBUG=0 in production.
    debug = os.environ.get('FLASK_DEBUG', '1') != '0'
    # Werkzeug spawns a reloader child process; only the child should open the
    # browser (otherwise it pops twice). The reloader sets WERKZEUG_RUN_MAIN.
    if not debug or os.environ.get('WERKZEUG_RUN_MAIN') == 'true':
        # Stash the actual chosen port where the running app can read it back
        # (e.g., the in-app "open in browser" button hits an endpoint that
        # returns this URL).
        app.config['SERVER_URL'] = f'http://127.0.0.1:{port}'
    print(f' * Serving on http://127.0.0.1:{port}')
    app.run(host='0.0.0.0', port=port, debug=debug)
