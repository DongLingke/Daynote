# 日迹 Daynote

一款只属于你自己的 **待办 + 想法** 记录应用。原生 macOS 桌面窗口，液态玻璃质感，数据全部存在本地，也可以用浏览器打开。

<p align="center">
  <img src="screenshots/preview.png" alt="screenshot" width="800"/>
</p>

## 特性

- **🪟 原生桌面应用** — 基于 pywebview 调用系统 WebKit，打开即用，不是 Electron，也不用开浏览器
- **🌊 多种 UI 风格** — 液态玻璃 / 扁平 / 纸张 / 终端，一键切换，配色方案可从壁纸自动取色
- **📋 四级优先级待办** — 🌕紧急 / 🌖重要 / 🌗一般 / 🌘可选；长按拖拽排序，移动端左滑操作
- **💭 想法 & 感受** — 内置所见即所得 Markdown 编辑器（标题 / 粗斜体 / 列表 / 引用 / 代码 / 分割线），按时间线展示
- **➕ 就地添加** — 主界面「想法」栏与「待办」栏右上角各有一个加号，点哪栏就在哪栏展开对应的录入框，不跳转、不打断
- **📅 日历视图** — 多日卡片横向滚动浏览历史；悬停某一天点 `+`，可直接补记一条「已完成」的待办
- **🖼 壁纸库** — 桌面 / 手机 × 浅色 / 深色 四个场景各自独立；点选深色 / 浅色壁纸会自动切换到对应主题
- **⚙ 分区设置** — 色彩外观 / 壁纸 / 界面设置 / 其他四个分区，每个分区的「恢复默认」只重置本区设置，且与首次安装的初始值完全一致
- **🗔 关闭行为可选** — 点关闭按钮默认最小化（应用继续驻留），可在「设置 → 其他」改为退出
- **⌨️ 中文输入友好** — 自动撤销 macOS 对行首字母的强制大写，写拼音不再被打断
- **📱 响应式** — 手机浏览器打开自动切换为竖向移动端布局
- **👋 新手引导** — 首次启动自动填充示例数据；可随时一键恢复
- **💾 本地存储 + 备份** — SQLite 存于 `~/Library/Application Support/Daynote/`，支持导出 / 导入 JSON 备份

## 安装

### 下载 DMG（推荐）

到 [Releases](https://github.com/DongLingke/Daynote/releases) 下载 `日迹Daynote.dmg`，打开后把 `日迹Daynote.app` 拖入「应用程序」即可。

首次打开时，如果 macOS 提示「无法验证开发者」，右键点击 App → 打开 即可（只需一次）。

### 从源码运行

```bash
git clone https://github.com/DongLingke/Daynote.git
cd Daynote

python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt

# 方式一：浏览器模式
PORT=5050 python3 app.py
# 然后打开 http://localhost:5050

# 方式二：桌面模式（原生窗口）
python3 desktop_app.py
```

### 自己打包 DMG

```bash
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt pyinstaller
python3 build_dmg.py
# 产物：日迹Daynote.dmg
```

## 项目结构

```
Daynote/
├── app.py                 # Flask 后端（REST API + SQLite + 初始数据 / 引导内容种子）
├── desktop_app.py         # pywebview 原生窗口入口（关闭→最小化、禁用系统自动大写等）
├── build_dmg.py           # PyInstaller + hdiutil 打包脚本
├── generate_icon.py       # 纯 Python 生成 icon.icns（不依赖外部素材）
├── requirements.txt       # flask / werkzeug / pywebview
├── templates/
│   └── index.html         # 单页 HTML 外壳
└── static/
    ├── css/style.css      # 完整样式
    ├── js/
    │   ├── app.js         # 前端 SPA（原生 JS，无框架）
    │   └── vendor/        # marked + DOMPurify + lunar
    └── wallpapers/        # 种子壁纸（桌面 / 手机 × 浅色 / 深色）
```

- **后端**：Flask + SQLite（`sqlite3` 标准库，零额外数据库依赖）
- **前端**：原生 JavaScript，无框架；`marked` 渲染 Markdown，`DOMPurify` 做 XSS 防护
- **桌面**：pywebview（系统 WebKit 内核，非 Electron）
- **打包**：PyInstaller → `.app` → hdiutil → `.dmg`

> 提示：前端 `DEFAULT_SETTINGS`（app.js）与后端 `defaults`（app.py）保持一一对应——它们既是新装时写入数据库的初始值，也是各设置项「恢复默认」的目标值。改一处请同步另一处。

## License

MIT
