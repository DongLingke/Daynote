# Daynote日迹

一款 macOS 桌面待办 + 想法记录应用，液态玻璃原生窗口。

<p align="center">
  <img src="screenshots/preview.png" alt="screenshot" width="800"/>
</p>

## 特性

- **🪟 原生桌面应用** — 基于 pywebview，打开即用，不是网页、不用浏览器
- **🌊 液态玻璃 UI** — backdrop-filter 玻璃拟态，可切换毛玻璃 / 扁平 / 纸张 / 终端五种风格
- **📋 四级优先级待办** — 🌕紧急 / 🌖重要 / 🌗一般 / 🌘可选，拖拽排序
- **💭 想法 & 感受** — 内置所见即所得 Markdown 编辑器，时间线展示
- **📅 日历视图** — 多日卡片横滚，快速浏览历史
- **⚙ 全功能设置** — 壁纸库（桌面/手机 × 浅色/深色四场景独立）、字体/字号、卡片尺寸/透明度、色彩方案、自定义图标
- **📱 响应式** — 手机浏览器打开自动适配 9:20 移动端卡片
- **👋 新手引导** — 首次启动自动填充示例数据
- **💾 SQLite 本地存储** — 数据在 `~/Library/Application Support/Daynote日迹/`，不丢

## 安装

### 下载 DMG（推荐）

到 [Releases](https://github.com/你的用户名/my_todolist/releases) 下载 `Daynote日迹.dmg`，打开后把 `Daynote日迹.app` 拖入「应用程序」即可。

首次打开时，如果 macOS 提示"无法验证开发者"，右键点击 app → 打开 即可（只需一次）。

### 从源码运行

```bash
git clone https://github.com/你的用户名/my_todolist.git
cd my_todolist

# 浏览器模式
python3 -m venv .venv
source .venv/bin/activate
pip install flask
PORT=5050 python3 app.py
# 然后打开 http://localhost:5050

# 桌面模式（需要 pywebview）
pip install pywebview
python3 desktop_app.py
```

### 自己打包 DMG

```bash
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt pyinstaller
python3 build_dmg.py
# 生成 Daynote日迹.dmg
```

## 技术栈

```
Daynote日迹/
├── app.py                 # Flask 后端（API + SQLite）
├── desktop_app.py         # pywebview 原生窗口入口
├── build_dmg.py           # PyInstaller + hdiutil 打包脚本
├── generate_icon.py       # 纯 Python 图标生成（不依赖外部工具）
├── requirements.txt
├── todolist.db            # 初始化数据库（含示例数据和壁纸种子）
├── templates/
│   └── index.html         # 单页 HTML
└── static/
    ├── css/style.css      # 完整样式（~2800 行）
    ├── js/
    │   ├── app.js         # 前端 SPA（~3400 行，无框架）
    │   └── vendor/        # marked + DOMPurify + lunar
    └── wallpapers/        # 种子壁纸（桌面/手机 × 浅色/深色）
```

- **后端**: Flask + SQLite（sqlite3 标准库，零额外依赖）
- **前端**: 原生 JavaScript，无框架，marked.js 渲染 Markdown，DOMPurify 做 XSS 防护
- **桌面**: pywebview（调用系统 WebKit，不是 Electron）
- **打包**: PyInstaller → .app → hdiutil → .dmg

## License

MIT
