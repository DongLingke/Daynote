/* ═══════════════════════════════════════════════════════════════════
   Config
   ═══════════════════════════════════════════════════════════════════ */
const CFG = {
  API: '/api',
  PRIO_LABEL: { 4: '紧急', 3: '重要', 2: '一般', 1: '可选' },
  PRIO_DEFAULT_EMOJI: { 4: '🌕', 3: '🌖', 2: '🌗', 1: '🌘' },
  COLOR_SCHEMES: [
    { key: 'extract',   name: '从壁纸提取', color: '#888888' },
    { key: 'morandi',   name: '莫兰迪',     color: '#8B7D6B' },
    { key: 'sakura',    name: '樱花粉',     color: '#E8829A' },
    { key: 'ocean',     name: '海洋',       color: '#0A84FF' },
    { key: 'sunset',    name: '日落',       color: '#FF6B35' },
    { key: 'lavender',  name: '薰衣草',     color: '#9B7BC9' },
    { key: 'rose',      name: '玫瑰红',     color: '#D24A6B' },
    { key: 'amber',     name: '琥珀',       color: '#C77F2D' },
    { key: 'graphite',  name: '石墨灰',     color: '#5C5C66' },
    { key: 'sky',       name: '天青',       color: '#56A0C7' },
  ],
  EMOJI_PICKER: [
    '🧠','💡','💭','📝','✨','🌟','⭐','💫','🔥','❤️','💚','💙','💜','🧡','💛',
    '👀','👁️','😊','😌','😴','🥰','😎','🤔','😢','😭','😡','🤯','🥺','😇','🙏',
    '🌕','🌖','🌗','🌘','🌑','🌒','🌓','🌔','☀️','🌙','⛅','🌧️','⚡','🌈','❄️',
    '✅','☑️','✔️','❌','⛔','🚫','⚠️','❗','❓','📌','🎯','🏆','🎨','📚','💼',
    '🌸','🌺','🌻','🌷','🌹','🍀','🌿','🌳','🌲','🍎','🍊','🍋','🍇','🍓','🍑',
    '🐶','🐱','🐰','🦊','🐻','🐼','🐨','🦁','🐯','🐸','🐵','🐧','🦋','🐝','🌊',
  ],
  UI_STYLES: [
    { key: 'liquid-glass', name: '液态玻璃' },
    { key: 'flat',         name: '扁平' },
    { key: 'paper',        name: '纸张' },
    { key: 'terminal',     name: '终端' },
  ],
  FONTS: [
    { key: 'system',  name: '系统',     css: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "PingFang SC", "Helvetica Neue", sans-serif' },
    { key: 'rounded', name: '圆体',     css: '"SF Pro Rounded", ui-rounded, "Hiragino Maru Gothic ProN", "Hiragino Sans GB", system-ui, sans-serif' },
    { key: 'serif',   name: '宋体',     css: 'Georgia, "Songti SC", "STSong", "SimSun", serif' },
    { key: 'kai',     name: '楷体',     css: '"Kaiti SC", "STKaiti", "KaiTi", "BiauKai", serif' },
    { key: 'hei',     name: '黑体',     css: '"Heiti SC", "STHeiti", "WenQuanYi Micro Hei", "Source Han Sans SC", "Noto Sans CJK SC", sans-serif' },
    { key: 'fangsong',name: '仿宋',     css: '"FangSong", "STFangsong", "FangSong_GB2312", serif' },
    { key: 'lishu',   name: '隶书',     css: '"LiSu", "STLiti", "Baoli SC", cursive' },
    { key: 'mono',    name: '等宽',     css: '"SF Mono", Menlo, Consolas, "Courier New", "PingFang SC", monospace' },
    { key: 'humanist',name: '人文无衬线', css: '"Optima", "Hiragino Sans GB", "PingFang SC", "Helvetica Neue", sans-serif' },
    { key: 'condensed',name: '紧凑',    css: '"SF Pro Display", "Helvetica Neue Condensed", "Arial Narrow", "PingFang SC", sans-serif' },
  ],
};

// IMPORTANT: these must stay in lock-step with the `defaults` dict in app.py
// (the values a fresh install seeds into the DB). They are the single source
// of truth for "恢复默认" so reset always lands on the same initial state a
// new user gets. If you change one side, change the other.
const DEFAULT_SETTINGS = {
  theme: 'light',
  font_size: '16',
  font_weight: '500',
  font_family: 'system',
  card_size: '80',
  card_opacity: '100',
  card_blur: '100',
  card_brightness: '100',
  card_saturation: '100',
  card_radius: '33',
  card_aspect: '140',
  card_aspect_mobile: '45',
  card_split: '65',          // desktop: thoughts/editor panel width %
  card_split_mobile: '48',   // mobile:  todos section height %
  ui_style: 'flat',
  color_scheme: 'extract',
  active_wp_desktop_light: '',
  active_wp_desktop_dark: '',
  active_wp_mobile_light: '',
  active_wp_mobile_dark: '',
  emoji_thought: '🧠',
  emoji_feeling: '👀',
  emoji_todo_4: '🌕',
  emoji_todo_3: '🌖',
  emoji_todo_2: '🌗',
  emoji_todo_1: '🌘',
  show_datetime: 'true',
  show_date: 'true',
  show_time: 'false',
  show_weekday: 'true',
  show_seconds: 'false',
  show_lunar: 'false',
  hour_format: '24',
  show_priority_emoji: 'false',
  show_thought_time: 'false',
  show_thought_content: 'true',
  hide_todo_emoji: 'false',
  extracted_accent: '',
  onboarding_done: 'false',
  cal_days_per_page: '8',
  cal_item_click_mode: 'expand',
  card_item_tint: '5',
  dim_past_thoughts: 'true',
  close_action: 'minimize',  // desktop app: 'minimize' or 'quit' on window close
};

/* ═══════════════════════════════════════════════════════════════════
   State
   ═══════════════════════════════════════════════════════════════════ */
const state = {
  view: 'main',          // main | add | calendar | settings
  viewHistory: ['main'], // stack of recent views; pop on toggle-current
  todos: [],
  thoughts: [],
  settings: { ...DEFAULT_SETTINGS },
  wallpapers: [],
  addPrio: 1,
  addType: 'thought',
  editing: null,    // { kind:'todo'|'thought', data:{...} } when edit modal is open
  settingsTab: 'appearance',
  showCompleted: true,
  isMobile: window.matchMedia('(max-width: 768px)').matches,
  immersive: false, // immersive full-card editor in add view
  addingThought: false, // main view: thoughts panel is showing its inline add editor
  addingTodo: false,    // main view: todos panel is showing its inline add row
  inlineEdit: null,   // { kind:'todo'|'thought', id, data:{...} } when a row is being edited in place
  inlineEditor: null, // WYSI editor instance for thought inline edits
};

/* SVG icons — verbatim paths from the Lucide icon library (lucide.dev, ISC).
   All icons share viewBox 0 0 24 24 and stroke="currentColor". A helper
   wraps them with a consistent style and per-call sizing. */
const LUCIDE_PATHS = {
  'chevron-up':   '<path d="m18 15-6-6-6 6"/>',
  'chevron-down': '<path d="m6 9 6 6 6-6"/>',
  'check':        '<path d="M20 6 9 17l-5-5"/>',
  'x':            '<path d="M18 6 6 18"/><path d="m6 6 12 12"/>',
  'maximize-2':   '<polyline points="15 3 21 3 21 9"/><polyline points="9 21 3 21 3 15"/><line x1="21" x2="14" y1="3" y2="10"/><line x1="3" x2="10" y1="21" y2="14"/>',
  'minimize-2':   '<polyline points="4 14 10 14 10 20"/><polyline points="20 10 14 10 14 4"/><line x1="14" x2="21" y1="10" y2="3"/><line x1="3" x2="10" y1="21" y2="14"/>',
  'settings':     '<path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/>',
  'calendar':     '<path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/>',
  'home':         '<path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>',
  'plus':         '<path d="M5 12h14"/><path d="M12 5v14"/>',
  'rotate-ccw':   '<path d="M3 12a9 9 0 1 0 3-6.7L3 8"/><path d="M3 3v5h5"/>',
};
const lucide = (name, size = 16, sw = 2) =>
  `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${LUCIDE_PATHS[name]}</svg>`;

/* Named icons used throughout the UI — semantic aliases over the Lucide set. */
const ICONS = {
  up:       lucide('chevron-up',   14, 2),
  down:     lucide('chevron-down', 14, 2),
  check:    lucide('check',        14, 2.4),
  close:    lucide('x',            14, 2),
  expand:   lucide('maximize-2',   15, 2),
  compress: lucide('minimize-2',   15, 2),
  undo:     lucide('rotate-ccw',   14, 2),
  /* Header nav (sized to the 32×32 button) */
  settings: lucide('settings',     17, 1.9),
  calendar: lucide('calendar',     17, 1.9),
  home:     lucide('home',         17, 1.9),
  plus:     lucide('plus',         18, 2.1),
};

/* ═══════════════════════════════════════════════════════════════════
   API helpers
   ═══════════════════════════════════════════════════════════════════ */
const api = {
  async req(method, path, body, isForm) {
    const opts = { method, headers: {} };
    if (body && !isForm) {
      opts.headers['Content-Type'] = 'application/json';
      opts.body = JSON.stringify(body);
    } else if (body && isForm) {
      opts.body = body;
    }
    const res = await fetch(CFG.API + path, opts);
    if (!res.ok) throw new Error(`API error: ${res.status}`);
    return res.json();
  },
  get(p)        { return this.req('GET', p); },
  post(p, b)    { return this.req('POST', p, b); },
  put(p, b)     { return this.req('PUT', p, b); },
  del(p)        { return this.req('DELETE', p); },
  upload(p, fd) { return this.req('POST', p, fd, true); },
};

/* ═══════════════════════════════════════════════════════════════════
   Utilities
   ═══════════════════════════════════════════════════════════════════ */
const utils = {
  esc(s) {
    return String(s).replace(/[&<>"']/g, c => ({
      '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'
    }[c]));
  },

  rgbToHex(r, g, b) {
    const h = (n) => Math.max(0, Math.min(255, Math.round(n))).toString(16).padStart(2,'0');
    return '#' + h(r) + h(g) + h(b);
  },

  /** Full-featured markdown renderer using marked + DOMPurify */
  md(text) {
    if (!text) return '';
    if (window.marked && window.DOMPurify) {
      marked.setOptions({ gfm: true, breaks: true, smartLists: true });
      const html = marked.parse(text);
      return DOMPurify.sanitize(html);
    }
    // Fallback if libraries failed to load
    return this.esc(text).replace(/\n/g, '<br>');
  },

  formatDate(d) {
    const dt = (d instanceof Date) ? d : new Date(d);
    const today = new Date();
    const yest = new Date(); yest.setDate(today.getDate() - 1);
    const isSame = (a, b) =>
      a.getFullYear()===b.getFullYear() &&
      a.getMonth()===b.getMonth() &&
      a.getDate()===b.getDate();
    if (isSame(dt, today)) return '今天';
    if (isSame(dt, yest))  return '昨天';
    const dayDiff = Math.floor((today - dt) / (1000*60*60*24));
    if (dayDiff < 7 && dayDiff > 0) {
      return ['周日','周一','周二','周三','周四','周五','周六'][dt.getDay()];
    }
    return `${dt.getMonth()+1}月${dt.getDate()}日`;
  },

  formatTime(d) {
    const dt = (d instanceof Date) ? d : new Date(d);
    const hh = String(dt.getHours()).padStart(2,'0');
    const mm = String(dt.getMinutes()).padStart(2,'0');
    return `${hh}:${mm}`;
  },

  dateKey(d) {
    const dt = (d instanceof Date) ? d : new Date(d);
    return `${dt.getFullYear()}-${dt.getMonth()+1}-${dt.getDate()}`;
  },

  groupByDate(items, dateField = 'created_at') {
    const groups = {};
    items.forEach(it => {
      const k = this.dateKey(it[dateField]);
      if (!groups[k]) groups[k] = { date: new Date(it[dateField]), items: [] };
      groups[k].items.push(it);
    });
    return Object.values(groups).sort((a, b) => b.date - a.date);
  },

  getEmoji(item) {
    if (item.emoji) return item.emoji;
    if (item.type === 'thought')  return state.settings.emoji_thought || '🧠';
    if (item.type === 'feeling')  return state.settings.emoji_feeling || '👀';
    if (item.priority !== undefined) return state.settings[`emoji_todo_${item.priority}`] || CFG.PRIO_DEFAULT_EMOJI[item.priority];
    return '•';
  },
};

function hexToRgba(hex, alpha) {
  hex = hex.replace('#', '');
  if (hex.startsWith('rgb')) return hex; // already rgb
  if (hex.length === 3) hex = hex.split('').map(c => c+c).join('');
  const r = parseInt(hex.slice(0,2), 16);
  const g = parseInt(hex.slice(2,4), 16);
  const b = parseInt(hex.slice(4,6), 16);
  return `rgba(${r},${g},${b},${alpha})`;
}

/* ═══════════════════════════════════════════════════════════════════
   Date & time display ticker
   ═══════════════════════════════════════════════════════════════════ */
const WEEKDAY_CN = ['周日','周一','周二','周三','周四','周五','周六'];
let dtTickerId = null;

function formatHeaderDateTime() {
  const s = state.settings;
  if (s.show_datetime !== 'true') return '';
  const now = new Date();

  // Time part
  let timeStr = '';
  if (s.show_time === 'true') {
    let h = now.getHours();
    const m = now.getMinutes();
    const sec = now.getSeconds();
    const showSec = s.show_seconds === 'true';
    const h24 = s.hour_format !== '12';
    let ampm = '';
    if (!h24) {
      ampm = h < 12 ? ' AM' : ' PM';
      h = h % 12; if (h === 0) h = 12;
    }
    const hh = h24 ? String(h).padStart(2,'0') : String(h);
    const mm = String(m).padStart(2,'0');
    timeStr = `${hh}:${mm}${showSec ? ':' + String(sec).padStart(2,'0') : ''}${ampm}`;
  }

  // Date part
  let dateStr = '';
  if (s.show_date === 'true') {
    const mo = String(now.getMonth()+1).padStart(2,'0');
    const day = String(now.getDate()).padStart(2,'0');
    dateStr = `${mo}-${day}`;
  }
  const weekday = s.show_weekday === 'true' ? WEEKDAY_CN[now.getDay()] : '';
  const lunar = s.show_lunar === 'true' && window.SolarLunar ? window.SolarLunar.format(now) : '';

  const dateLine = [dateStr, weekday, lunar].filter(Boolean).join(' ');
  return [timeStr, dateLine].filter(Boolean).join('  ·  ');
}

function updateHeaderDateTime() {
  const el = document.getElementById('header-datetime');
  if (!el) return;
  const txt = formatHeaderDateTime();
  if (!txt) { el.style.display = 'none'; return; }
  el.style.display = '';
  el.textContent = txt;
}

function startDateTimeTicker() {
  if (dtTickerId) clearInterval(dtTickerId);
  updateHeaderDateTime();
  if (state.settings.show_datetime !== 'true') return;
  const showSec = state.settings.show_seconds === 'true';
  dtTickerId = setInterval(updateHeaderDateTime, showSec ? 1000 : 15000);
}

/* ═══════════════════════════════════════════════════════════════════
   Settings application
   ═══════════════════════════════════════════════════════════════════ */
const applySettings = () => {
  const s = state.settings;
  const html = document.documentElement;
  const body = document.body;

  // Theme
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const isDark = s.theme === 'dark' || (s.theme === 'system' && prefersDark);
  html.classList.toggle('theme-dark', isDark);
  html.classList.toggle('theme-light', !isDark);

  // UI style — 'frosted' was retired, legacy users land back on liquid-glass.
  body.className = body.className.replace(/\bstyle-[\w-]+/g, '').trim();
  const styleKey = (s.ui_style === 'frosted') ? 'liquid-glass' : s.ui_style;
  body.classList.add(`style-${styleKey}`);

  // Dim past thought / feeling groups — toggle on body.
  body.classList.toggle('dim-past', s.dim_past_thoughts === 'true');

  // Item tint — overrides --item-glass when slider > 0 so each record
  // sits on its own translucent patch (helps readability against busy
  // wallpapers). Tint colour follows theme: dark theme adds black, light
  // theme adds white. 0 = restore the style's natural item background.
  const tint = parseInt(s.card_item_tint || '0', 10);
  if (tint > 0) {
    // 0..100 → 0..0.32 alpha; baseline 0.05 (dark) or 0.08 (light)
    // already comes from CSS — we just blend OVER it.
    const a = (tint / 100 * 0.32).toFixed(3);
    const channel = isDark ? '0,0,0' : '255,255,255';
    html.style.setProperty('--item-tint-extra', `rgba(${channel},${a})`);
  } else {
    html.style.removeProperty('--item-tint-extra');
  }

  // Color scheme
  body.className = body.className.replace(/\bscheme-\w+/g, '').trim();
  // Remove any previously applied extracted accent override
  html.style.removeProperty('--accent');
  html.style.removeProperty('--accent-hover');
  html.style.removeProperty('--scheme-accent');
  html.style.removeProperty('--scheme-tag-bg');

  if (s.color_scheme === 'extract') {
    // Use a per-category cache key so each wallpaper (desktop/mobile × light/dark)
    // gets its OWN extracted accent. Otherwise switching theme reuses the wrong color.
    const cat = (state.isMobile ? 'mobile' : 'desktop') + '_' + (isDark ? 'dark' : 'light');
    const cacheKey = `extracted_accent_${cat}`;
    const cached = s[cacheKey];
    if (cached) {
      html.style.setProperty('--accent', cached);
      html.style.setProperty('--scheme-accent', cached);
      html.style.setProperty('--scheme-tag-bg', hexToRgba(cached, 0.14));
    } else {
      // No extracted color yet for this category → extract from current wallpaper
      extractColorsFromWallpaper(true);
    }
  } else if (s.color_scheme && s.color_scheme !== 'classic') {
    body.classList.add(`scheme-${s.color_scheme}`);
  }

  // Typography — apply to both html and body to override any element style
  const fnt = CFG.FONTS.find(f => f.key === s.font_family) || CFG.FONTS[0];
  const fsizePx = `${s.font_size}px`;
  html.style.setProperty('--font-size',   fsizePx);
  html.style.setProperty('--font-weight', s.font_weight);
  html.style.setProperty('--font-family', fnt.css);
  // Force visible style on root elements (some browsers cache initial values)
  html.style.fontFamily = fnt.css;
  html.style.fontSize   = fsizePx;
  html.style.fontWeight = s.font_weight;
  body.style.fontFamily = fnt.css;
  body.style.fontSize   = fsizePx;
  body.style.fontWeight = s.font_weight;

  // Card sizing & glass parameters. At exactly 100% we go full-screen
  // (no aspect-ratio container, no rounded corners, ignores card_radius).
  body.classList.toggle('fullscreen-card', parseInt(s.card_size, 10) >= 100);
  html.style.setProperty('--card-size',       s.card_size);
  html.style.setProperty('--card-opacity',    (parseFloat(s.card_opacity) / 100).toString());
  const blurPx = parseFloat(s.card_blur);
  const sat    = parseFloat(s.card_saturation) / 100;
  html.style.setProperty('--glass-blur',      `${blurPx}px`);
  html.style.setProperty('--glass-brightness',`${parseFloat(s.card_brightness) / 100}`);
  html.style.setProperty('--glass-sat',       `${sat}`);
  // Pre-computed derivatives so CSS doesn't need calc() inside backdrop-filter
  // (iOS Safari has rendering quirks with calc() expressions inside backdrop-filter)
  html.style.setProperty('--glass-blur-lg',   `${(blurPx * 0.55).toFixed(2)}px`);
  html.style.setProperty('--glass-sat-lg',    `${(sat * 1.15).toFixed(3)}`);
  html.style.setProperty('--glass-blur-fr',   `${(blurPx * 1.5).toFixed(2)}px`);
  html.style.setProperty('--radius-card',     `${s.card_radius}px`);
  const aspectRaw = state.isMobile ? s.card_aspect_mobile : s.card_aspect;
  html.style.setProperty('--card-aspect',     (parseFloat(aspectRaw) / 100).toString());
  html.style.setProperty('--panel-split-w',   `${parseFloat(s.card_split)}%`);
  html.style.setProperty('--panel-split-h',   `${parseFloat(s.card_split_mobile)}%`);

  // Wallpaper — separate slots for mobile vs desktop
  const key = (state.isMobile ? 'mobile' : 'desktop') + '_' + (isDark ? 'dark' : 'light');
  const wpId = s[`active_wp_${key}`];
  const wp = state.wallpapers.find(w => String(w.id) === String(wpId));
  const wpEl = document.getElementById('wallpaper');
  if (wp) {
    wpEl.style.background = `url("/static/wallpapers/${wp.filename}") center/cover no-repeat`;
  } else {
    wpEl.style.background = isDark ? '#0a0a0f' : '#ffffff';
  }
};

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', applySettings);
window.matchMedia('(max-width: 768px)').addEventListener('change', e => {
  state.isMobile = e.matches;
  applySettings();
  render();
});

/* ═══════════════════════════════════════════════════════════════════
   Data fetching
   ═══════════════════════════════════════════════════════════════════ */
async function refreshAll() {
  const [todos, thoughts, settings, wallpapers] = await Promise.all([
    api.get('/todos'),
    api.get('/thoughts'),
    api.get('/settings'),
    api.get('/wallpapers'),
  ]);
  state.todos = todos;
  state.thoughts = thoughts;
  state.settings = { ...DEFAULT_SETTINGS, ...settings };
  state.wallpapers = wallpapers;
}

/* ═══════════════════════════════════════════════════════════════════
   Render – Card shell
   ═══════════════════════════════════════════════════════════════════ */
function render() {
  const wrap = document.getElementById('card-wrapper');

  // Determine active view
  const titles = { main: '', add: '添加记录', calendar: '日历', settings: '设置' };

  wrap.innerHTML = `
    <div class="glass-layer"></div>
    <div class="card-content">
      <div class="card-header">
        <div class="header-datetime" id="header-datetime"></div>
        <div class="header-title">${state.view!=='main' ? titles[state.view] : ''}</div>
        <div class="header-nav">
          <button class="nav-btn ${state.view==='settings'?'active':''}" data-act="view-settings" title="设置" aria-label="设置">${ICONS.settings}</button>
          <button class="nav-btn ${state.view==='calendar'?'active':''}" data-act="view-calendar" title="日历" aria-label="日历">${ICONS.calendar}</button>
          <button class="nav-btn ${state.view==='main'?'active':''}" data-act="view-main" title="主页" aria-label="主页">${ICONS.home}</button>
        </div>
      </div>
      <div id="view-container">
        ${renderViewBody()}
      </div>
    </div>
  `;
  startDateTimeTicker();

  // The view container should fill remaining height
  const vc = document.getElementById('view-container');
  vc.style.flex = '1';
  vc.style.minHeight = '0';
  vc.style.display = 'flex';
  vc.style.flexDirection = 'column';
  vc.style.overflow = 'hidden';

  bindGlobalEvents();
  bindViewEvents();
}

function renderViewBody() {
  switch (state.view) {
    case 'main':     return renderMainView();
    case 'add':      return renderAddView();
    case 'calendar': return renderCalendarView();
    case 'settings': return renderSettingsView();
  }
  return '';
}

/* ═══════════════════════════════════════════════════════════════════
   View – Main
   ═══════════════════════════════════════════════════════════════════ */
function renderMainView() {
  return `
    <div class="main-desktop">
      <div class="thoughts-panel">
        ${renderPanelHead('thought', '想法 & 感受')}
        <div class="panel-scroll">
          ${state.addingThought ? renderThoughtEditor(false) : ''}
          ${renderThoughtsList(state.thoughts)}
        </div>
      </div>
      <div class="panel-splitter" data-orient="v" data-skey="card_split" title="拖动调整分区比例"></div>
      <div class="todos-panel">
        ${renderPanelHead('todo', '待办')}
        <div class="panel-scroll">
          ${state.addingTodo ? renderTodoAddRow() : ''}
          ${renderTodosList(state.todos, true)}
        </div>
      </div>
    </div>
    <div class="main-mobile">
      <div class="mobile-todos-section">
        ${renderPanelHead('todo', '待办')}
        <div class="panel-scroll">
          ${state.addingTodo ? renderTodoAddRow() : ''}
          ${renderTodosList(state.todos, false, true)}
        </div>
      </div>
      <div class="panel-splitter" data-orient="h" data-skey="card_split_mobile" title="拖动调整分区比例"></div>
      <div class="mobile-thoughts-section">
        ${renderPanelHead('thought', '想法 & 感受')}
        <div class="panel-scroll">
          ${state.addingThought ? renderThoughtEditor(false) : ''}
          ${renderThoughtsList(state.thoughts)}
        </div>
      </div>
    </div>
  `;
}

/* Sticky header for a main-view panel: a title plus a "+" button that toggles
   that column into its own inline add form (✕ to close). */
function renderPanelHead(kind, title) {
  const adding = kind === 'thought' ? state.addingThought : state.addingTodo;
  const act = kind === 'thought' ? 'toggle-add-thought' : 'toggle-add-todo';
  return `
    <div class="panel-head">
      <span class="panel-head-title">${title}</span>
      <button class="panel-add-btn ${adding ? 'active' : ''}" data-act="${act}"
              title="${adding ? '收起' : '添加'}" aria-label="${adding ? '收起' : '添加'}">
        ${adding ? ICONS.close : ICONS.plus}
      </button>
    </div>
  `;
}

function renderThoughtsList(thoughts) {
  if (!thoughts.length) {
    return `<div class="empty-state"><div class="empty-icon">💭</div>还没有想法或感受<br>点右上角 + 来记录</div>`;
  }
  const groups = utils.groupByDate(thoughts);
  const todayKey = utils.dateKey(new Date());
  return groups.map(g => {
    const isToday = utils.dateKey(g.date) === todayKey;
    return `
      <div class="date-group ${isToday ? 'is-today' : 'is-past'}">
        <div class="date-label">${utils.formatDate(g.date)}</div>
        ${g.items.map(t => renderThoughtItem(t)).join('')}
      </div>
    `;
  }).join('');
}

function renderThoughtItem(t) {
  // Inline-edit mode: replace the row with an editor form
  if (state.inlineEdit && state.inlineEdit.kind === 'thought' && String(state.inlineEdit.id) === String(t.id)) {
    return renderThoughtInlineEditor(state.inlineEdit.data);
  }
  const s = state.settings;
  const showContent = s.show_thought_content !== 'false';
  const showTime = s.show_thought_time !== 'false';
  const title = (t.title && t.title.trim()) || t.content.split('\n')[0] || '';
  const body  = t.title ? t.content : t.content.split('\n').slice(1).join('\n');
  return `
    <div class="thought-item" data-thought-id="${t.id}">
      <div class="item-emoji">${utils.esc(utils.getEmoji(t))}</div>
      <div class="thought-body">
        ${title ? `<div class="thought-title">${utils.esc(title)}</div>` : ''}
        ${showContent && body ? `<div class="thought-content">${utils.md(body)}</div>` : ''}
        ${showTime ? `<div class="thought-meta">${utils.formatTime(t.created_at)}</div>` : ''}
      </div>
      <button class="item-delete-btn" data-act="del-thought" data-id="${t.id}" title="删除">×</button>
    </div>
  `;
}

function renderThoughtInlineEditor(data) {
  const s = state.settings;
  return `
    <div class="thought-item editing inline-edit inline-edit-thought" data-thought-id="${data.id}">
      <div id="inline-edit-wysi" class="wysi-editor inline-edit-wysi"></div>
      <div class="inline-edit-footer">
        <div class="type-toggle">
          <button class="${data.type==='thought'?'active':''}" data-act="inline-type" data-type="thought">${utils.esc(s.emoji_thought)} 想法</button>
          <button class="${data.type==='feeling'?'active':''}" data-act="inline-type" data-type="feeling">${utils.esc(s.emoji_feeling)} 感受</button>
        </div>
        <div class="inline-edit-actions">
          <button class="danger-btn" data-act="inline-delete">删除</button>
          <button class="glass-btn" data-act="inline-cancel">取消</button>
          <button class="glass-btn primary" data-act="inline-save">保存</button>
        </div>
      </div>
    </div>
  `;
}

function renderTodosList(todos, isDesktop, isMobile=false) {
  const active    = todos.filter(t => !t.completed);
  const completed = todos.filter(t =>  t.completed);

  // Group active by priority
  const byPrio = {4:[],3:[],2:[],1:[]};
  active.forEach(t => byPrio[t.priority]?.push(t));

  let html = '';

  // Active todos by priority
  let hasActive = false;
  [4,3,2,1].forEach(p => {
    if (byPrio[p].length) {
      hasActive = true;
      const showPrioEmoji = state.settings.show_priority_emoji !== 'false';
      html += `
        <div class="priority-group" data-priority="${p}">
          <div class="priority-label p${p}">${showPrioEmoji ? utils.esc(state.settings[`emoji_todo_${p}`]) + ' ' : ''}${CFG.PRIO_LABEL[p]}</div>
          ${byPrio[p].map(t => renderTodoItem(t)).join('')}
        </div>
      `;
    }
  });

  if (!hasActive && !completed.length) {
    return `<div class="empty-state"><div class="empty-icon">📋</div>暂无待办事项<br>点右上角 + 添加</div>`;
  }
  if (!hasActive) {
    html += `<div class="empty-state" style="padding:12px"><span>🎉 全部完成！</span></div>`;
  }

  // Completed todos (collapsed by default on mobile, expanded on desktop)
  if (completed.length) {
    let completedToShow = completed;
    if (isMobile) {
      // On mobile main view, show only last 3 days
      const cutoff = new Date(); cutoff.setDate(cutoff.getDate() - 3);
      completedToShow = completed.filter(t => new Date(t.completed_at || t.created_at) >= cutoff);
    }
    if (completedToShow.length) {
      const grouped = utils.groupByDate(completedToShow, 'completed_at');
      html += `
        <div class="completed-section-header ${state.showCompleted ? 'open' : ''}" data-act="toggle-completed">
          <span class="toggle-icon">▶</span>
          <span>已完成 (${completedToShow.length})</span>
        </div>
      `;
      if (state.showCompleted) {
        html += grouped.map(g => `
          <div class="date-group">
            <div class="date-label">${utils.formatDate(g.date)}</div>
            ${g.items.map(t => renderTodoItem(t)).join('')}
          </div>
        `).join('');
      }
    }
  }

  return html;
}

function renderTodoItem(t) {
  if (state.inlineEdit && state.inlineEdit.kind === 'todo' && String(state.inlineEdit.id) === String(t.id)) {
    return renderTodoInlineEditor(state.inlineEdit.data);
  }
  const emoji = utils.esc(utils.getEmoji(t));
  const hideEmoji = state.settings.hide_todo_emoji === 'true';
  return `
    <div class="todo-item ${t.completed?'completed':''}" data-todo-id="${t.id}">
      ${hideEmoji ? '' : `<div class="item-emoji">${emoji}</div>`}
      <div class="todo-text">${utils.esc(t.content)}</div>
      ${!t.completed ? `
        <div class="todo-actions">
          <button class="todo-action-btn up-btn"   data-act="todo-up"   data-id="${t.id}" title="提升优先级">${ICONS.up}</button>
          <button class="todo-action-btn down-btn" data-act="todo-down" data-id="${t.id}" title="降低优先级">${ICONS.down}</button>
          <button class="todo-action-btn complete-btn" data-act="todo-done" data-id="${t.id}" title="完成">${ICONS.check}</button>
        </div>
        <div class="todo-swipe-actions">
          <button class="todo-action-btn up-btn"       data-act="todo-up"   data-id="${t.id}" title="提升优先级">${ICONS.up}</button>
          <button class="todo-action-btn down-btn"     data-act="todo-down" data-id="${t.id}" title="降低优先级">${ICONS.down}</button>
          <button class="todo-action-btn complete-btn" data-act="todo-done" data-id="${t.id}" title="完成">${ICONS.check}</button>
        </div>
      ` : `
        <div class="todo-actions">
          <button class="todo-action-btn restore-btn" data-act="todo-restore" data-id="${t.id}" title="恢复未完成">${ICONS.undo}</button>
        </div>
      `}
    </div>
  `;
}

function renderTodoInlineEditor(data) {
  const s = state.settings;
  const isNew = !data.id;
  return `
    <div class="todo-item editing inline-edit inline-edit-todo ${data.completed?'completed':''}" data-todo-id="${data.id || ''}">
      <input type="text" class="inline-edit-input" value="${utils.esc(data.content)}" placeholder="代办内容…" autocapitalize="off" autocorrect="off" spellcheck="false" />
      ${data.completed && data.completed_at ? `<div class="inline-edit-meta">完成于 ${utils.formatDate(data.completed_at)} ${utils.formatTime(data.completed_at)}</div>` : ''}
      <div class="inline-edit-footer">
        <div class="priority-selector">
          ${[4,3,2,1].map(p => `
            <button class="prio-btn ${data.priority===p?'active':''}" data-act="inline-prio" data-p="${p}" title="${CFG.PRIO_LABEL[p]}">${utils.esc(s[`emoji_todo_${p}`])}</button>
          `).join('')}
        </div>
        <div class="inline-edit-actions">
          ${isNew ? '' : `<button class="danger-btn" data-act="inline-delete">删除</button>`}
          <button class="glass-btn" data-act="inline-cancel">取消</button>
          <button class="glass-btn primary" data-act="inline-save">${isNew ? '添加' : '保存'}</button>
        </div>
      </div>
    </div>
  `;
}

/* ═══════════════════════════════════════════════════════════════════
   View – Add
   ═══════════════════════════════════════════════════════════════════ */
function renderAddView() {
  if (state.immersive) {
    return `
      <div class="add-immersive">
        ${renderThoughtEditor()}
      </div>
    `;
  }
  return `
    <div class="add-desktop">
      <div class="add-editor-panel">
        ${renderThoughtEditor()}
      </div>
      <div class="panel-splitter" data-orient="v" data-skey="card_split" title="拖动调整分区比例"></div>
      <div class="add-todos-panel">
        ${renderTodoAddRow()}
        ${renderTodosList(state.todos, true)}
      </div>
    </div>
    <div class="add-mobile">
      <div class="add-mobile-top">
        ${renderTodoAddRow()}
        ${renderTodosList(state.todos, false, true)}
      </div>
      <div class="panel-splitter" data-orient="h" data-skey="card_split_mobile" title="拖动调整分区比例"></div>
      <div class="add-mobile-bottom">
        ${renderThoughtEditor()}
      </div>
    </div>
  `;
}

function renderThoughtEditor(showImmersive = true) {
  const immersiveIcon = state.immersive ? ICONS.compress : ICONS.expand;
  const immersiveTitle = state.immersive ? '退出沉浸编辑' : '沉浸编辑';
  return `
    <div class="thought-editor">
      <div id="thought-wysi" class="wysi-editor"></div>
      <div class="editor-footer">
        <div class="type-toggle">
          <button class="${state.addType==='thought'?'active':''}" data-act="set-type" data-type="thought">${utils.esc(state.settings.emoji_thought)} 想法</button>
          <button class="${state.addType==='feeling'?'active':''}" data-act="set-type" data-type="feeling">${utils.esc(state.settings.emoji_feeling)} 感受</button>
        </div>
        <div style="flex:1"></div>
        ${showImmersive ? `<button class="immersive-btn ${state.immersive?'on':''}" data-act="toggle-immersive" title="${immersiveTitle}" aria-label="${immersiveTitle}">${immersiveIcon}</button>` : ''}
        <button class="glass-btn primary" data-act="save-thought">添加</button>
      </div>
    </div>
  `;
}

function renderTodoAddRow() {
  return `
    <div class="todo-add-row">
      <input type="text" class="todo-add-input" id="todo-add-input" placeholder="新建待办..." autocapitalize="off" autocorrect="off" spellcheck="false" />
      <div class="priority-selector">
        ${[4,3,2,1].map(p => `
          <button class="prio-btn ${state.addPrio===p?'active':''}" data-act="set-prio" data-p="${p}" title="${CFG.PRIO_LABEL[p]}">${utils.esc(state.settings[`emoji_todo_${p}`])}</button>
        `).join('')}
      </div>
      <button class="todo-action-btn complete-btn" data-act="save-todo" title="添加">＋</button>
    </div>
  `;
}

/* ═══════════════════════════════════════════════════════════════════
   View – Calendar
   Days are grouped into "pages" that snap horizontally. Each page is a
   rows × cols grid. Allowed settings: 4 (1×4), 5 (1×5), 8 (2×4),
   10 (2×5), 12 (3×4), 15 (3×5). Each layout divides CAL_DAYS_RANGE
   (120) evenly so the last page is never half-empty.
   ═══════════════════════════════════════════════════════════════════ */
const CAL_DAYS_RANGE = 120; // how many days back from today to render
const CAL_LAYOUTS = {
  '4':  { rows: 1, cols: 4 },
  '5':  { rows: 1, cols: 5 },
  '8':  { rows: 2, cols: 4 },
  '10': { rows: 2, cols: 5 },
  '12': { rows: 3, cols: 4 },
  '15': { rows: 3, cols: 5 },
};

function getCalLayout() {
  const dpp = state.settings.cal_days_per_page || '4';
  return CAL_LAYOUTS[dpp] || CAL_LAYOUTS['4'];
}

function renderCalendarView() {
  const days = [];
  for (let i = CAL_DAYS_RANGE - 1; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    days.push(d);
  }
  const { rows, cols } = getCalLayout();
  const dpp = rows * cols;
  // Slice days into pages
  const pages = [];
  for (let i = 0; i < days.length; i += dpp) {
    pages.push(days.slice(i, i + dpp));
  }
  return `
    <div class="calendar-view" style="--cal-rows:${rows};--cal-cols:${cols}">
      <div class="calendar-scroller" id="cal-scroller">
        ${pages.map(p => `
          <div class="calendar-page">
            ${p.map(d => renderCalDay(d)).join('')}
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

function renderCalDay(d) {
  const today = new Date();
  const isToday = utils.dateKey(d) === utils.dateKey(today);
  const dayKey = utils.dateKey(d);
  const pad = n => String(n).padStart(2, '0');
  const isoDate = `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}`;
  const dayNames = ['周日','周一','周二','周三','周四','周五','周六'];

  const dayThoughts = state.thoughts.filter(t => utils.dateKey(t.created_at) === dayKey);
  // Only show todos that were COMPLETED on this day (not uncompleted ones)
  const dayTodos    = state.todos.filter(t =>
    t.completed && t.completed_at && utils.dateKey(t.completed_at) === dayKey
  );

  // Sort by time descending: thoughts use created_at, todos use completed_at
  const all = [
    ...dayThoughts.map(t => ({...t, _kind:'thought', _ts: t.created_at})),
    ...dayTodos.map(t => ({...t, _kind:'todo', _ts: t.completed_at})),
  ].sort((a, b) => new Date(b._ts) - new Date(a._ts));

  return `
    <div class="calendar-day" data-date="${isoDate}">
      <div class="cal-day-header ${isToday?'today':''}">
        <div class="cal-day-name">${dayNames[d.getDay()]} ${isToday?'• 今天':''}</div>
        <div class="cal-day-date">${d.getMonth()+1}/${d.getDate()}</div>
        <button class="cal-day-add" data-act="cal-day-add" data-date="${isoDate}" title="添加已完成待办" aria-label="添加已完成待办">${ICONS.plus}</button>
      </div>
      <div class="cal-day-body">
        ${all.length ? all.map(item => `
          <div class="cal-item" data-cal-kind="${item._kind}" data-cal-id="${item.id}">
            <div class="cal-item-emoji">${utils.esc(utils.getEmoji(item))}</div>
            <div class="cal-item-text">${utils.esc(item._kind === 'thought' ? ((item.title&&item.title.trim())||item.content.split('\n')[0]||'') : item.content)}</div>
          </div>
        `).join('') : `<div class="empty-state" style="padding:14px 6px;font-size:11px">无记录</div>`}
      </div>
    </div>
  `;
}

/* ═══════════════════════════════════════════════════════════════════
   View – Settings
   ═══════════════════════════════════════════════════════════════════ */
function renderSettingsView() {
  const tabs = [
    { key: 'appearance', name: '色彩外观', icon: '🎨' },
    { key: 'wallpaper',  name: '壁纸',     icon: '🖼' },
    { key: 'interface',  name: '界面设置', icon: '🃏' },
    // "浏览器" merged into "其他" as a top section, so it no longer
    // owns its own sidebar tab. The rest of 其他 covers reset / data.
    { key: 'reset',      name: '其他',     icon: '🔄' },
  ];

  return `
    <div class="settings-view">
      <aside class="settings-sidebar">
        ${tabs.map(t => `
          <div class="settings-nav-item ${state.settingsTab===t.key?'active':''}" data-act="set-tab" data-tab="${t.key}">
            <span class="nav-icon">${t.icon}</span>
            <span>${t.name}</span>
          </div>
        `).join('')}
      </aside>
      <div class="settings-content">
        ${renderSettingsTab(state.settingsTab)}
      </div>
    </div>
  `;
}

function renderSettingsTab(tab) {
  switch (tab) {
    case 'appearance': return renderTabAppearance();
    case 'wallpaper':  return renderTabWallpaper();
    case 'interface':  return renderTabInterface();
    case 'reset':      return renderTabReset();
    // Legacy fallthrough: if a stored settingsTab points to the
    // removed 'browser' tab, land on 其他 instead.
    case 'browser':    return renderTabReset();
  }
  return '';
}

function renderTabAppearance() {
  const s = state.settings;
  return `
    <div class="settings-section-title">色彩外观</div>

    <div class="settings-group">
      <div class="settings-row">
        <div class="settings-row-label">主题</div>
        <div class="segment-ctrl">
          ${['light','dark','system'].map(v => `
            <button class="${s.theme===v?'active':''}" data-act="set" data-k="theme" data-v="${v}">
              ${({light:'浅色',dark:'深色',system:'跟随'})[v]}
            </button>
          `).join('')}
        </div>
      </div>
      <div class="settings-row">
        <div class="settings-row-label">UI 风格</div>
        <div class="segment-ctrl">
          ${CFG.UI_STYLES.map(st => `
            <button class="${s.ui_style===st.key?'active':''}" data-act="set" data-k="ui_style" data-v="${st.key}">${st.name}</button>
          `).join('')}
        </div>
      </div>
    </div>

    <div class="settings-group-title">配色方案</div>
    <div class="settings-group">
      <div class="scheme-grid">
        ${CFG.COLOR_SCHEMES.map(c => {
          const color = (c.key === 'extract' && s.extracted_accent) ? s.extracted_accent : c.color;
          return `
          <div class="scheme-chip ${s.color_scheme===c.key?'active':''}" data-act="set" data-k="color_scheme" data-v="${c.key}">
            <div class="scheme-dot" style="background:${color}"></div>
            ${c.name}
          </div>`;
        }).join('')}
      </div>
    </div>

    <div class="settings-group-title">字体</div>
    <div class="settings-group">
      <div class="settings-row">
        <div class="settings-row-label">字体</div>
        <select class="settings-select" data-act="set-select" data-k="font_family">
          ${CFG.FONTS.map(f => `<option value="${f.key}" ${s.font_family===f.key?'selected':''}>${f.name}</option>`).join('')}
        </select>
      </div>
      <div class="settings-row">
        <div class="settings-row-label">字号</div>
        <input type="range" class="settings-slider" min="11" max="20" value="${s.font_size}" data-act="set-slider" data-k="font_size">
        <span class="settings-slider-val">${s.font_size}px</span>
      </div>
      <div class="settings-row">
        <div class="settings-row-label">字重</div>
        <div class="segment-ctrl">
          ${[['300','细'],['400','常规'],['500','中等'],['600','粗']].map(([v,n]) => `
            <button class="${s.font_weight===v?'active':''}" data-act="set" data-k="font_weight" data-v="${v}">${n}</button>
          `).join('')}
        </div>
      </div>
    </div>

    <div class="settings-group-title">卡片</div>
    <div class="settings-group">
      <div class="settings-row">
        <div class="settings-row-label">尺寸</div>
        <input type="range" class="settings-slider" min="50" max="100" value="${s.card_size}" data-act="set-slider" data-k="card_size">
        <span class="settings-slider-val">${s.card_size}%</span>
      </div>
      <div class="settings-row">
        <div class="settings-row-label">不透明度</div>
        <input type="range" class="settings-slider" min="40" max="100" value="${s.card_opacity}" data-act="set-slider" data-k="card_opacity">
        <span class="settings-slider-val">${s.card_opacity}%</span>
      </div>
      <div class="settings-row">
        <div class="settings-row-label">磨砂强度</div>
        <input type="range" class="settings-slider" min="0" max="120" value="${s.card_blur}" data-act="set-slider" data-k="card_blur">
        <span class="settings-slider-val">${s.card_blur}px</span>
      </div>
      <div class="settings-row">
        <div class="settings-row-label">明暗</div>
        <input type="range" class="settings-slider" min="20" max="200" value="${s.card_brightness}" data-act="set-slider" data-k="card_brightness">
        <span class="settings-slider-val">${s.card_brightness}%</span>
      </div>
      <div class="settings-row">
        <div class="settings-row-label">饱和度</div>
        <input type="range" class="settings-slider" min="50" max="200" value="${s.card_saturation}" data-act="set-slider" data-k="card_saturation">
        <span class="settings-slider-val">${s.card_saturation}%</span>
      </div>
      <div class="settings-row">
        <div class="settings-row-label">圆角</div>
        <input type="range" class="settings-slider" min="0" max="60" value="${s.card_radius}" data-act="set-slider" data-k="card_radius">
        <span class="settings-slider-val">${s.card_radius}px</span>
      </div>
      <div class="settings-row">
        <div class="settings-row-label">局部底纹</div>
        <input type="range" class="settings-slider" min="0" max="100" value="${s.card_item_tint || 0}" data-act="set-slider" data-k="card_item_tint">
        <span class="settings-slider-val">${s.card_item_tint || 0}%</span>
      </div>
      ${(() => {
        const ak = state.isMobile ? 'card_aspect_mobile' : 'card_aspect';
        const av = s[ak];
        const min = state.isMobile ? 30 : 100;
        const max = state.isMobile ? 100 : 200;
        return `
      <div class="settings-row">
        <div class="settings-row-label">宽高比${state.isMobile?' (手机)':''}</div>
        <input type="range" class="settings-slider" min="${min}" max="${max}" value="${av}" data-act="set-slider" data-k="${ak}">
        <span class="settings-slider-val">${(parseFloat(av)/100).toFixed(2)}</span>
      </div>`;
      })()}
      ${(() => {
        const sk  = state.isMobile ? 'card_split_mobile' : 'card_split';
        const sv  = s[sk];
        const min = state.isMobile ? 20 : 30;
        const max = state.isMobile ? 80 : 80;
        const label = state.isMobile ? '分区比例 (待办高度)' : '分区比例 (想法宽度)';
        return `
      <div class="settings-row">
        <div class="settings-row-label">${label}</div>
        <input type="range" class="settings-slider" min="${min}" max="${max}" value="${sv}" data-act="set-slider" data-k="${sk}">
        <span class="settings-slider-val">${sv}%</span>
      </div>`;
      })()}
    </div>

    <button class="glass-btn" data-act="reset-section" data-section="appearance">恢复默认</button>
  `;
}

function renderTabInterface() {
  const s = state.settings;
  const emojiSlots = [
    { key: 'emoji_thought', label: '想法' },
    { key: 'emoji_feeling', label: '感受' },
    { key: 'emoji_todo_4',  label: '紧急' },
    { key: 'emoji_todo_3',  label: '重要' },
    { key: 'emoji_todo_2',  label: '一般' },
    { key: 'emoji_todo_1',  label: '可选' },
  ];

  // Advanced date/time builder — chip-based multi-select + format token preview
  const dtToggles = [
    { k: 'show_date',    label: '日期'   },
    { k: 'show_time',    label: '时间'   },
    { k: 'show_weekday', label: '星期'   },
    { k: 'show_seconds', label: '秒数'   },
    { k: 'show_lunar',   label: '农历'   },
  ];

  return `
    <div class="settings-section-title">界面设置</div>

    <!-- Typography -->
    <!-- (字体 group moved to 色彩外观 → 配色方案 之下) -->

    <!-- Date / Time (chip multi-select) -->
    <div class="settings-group-title">日期与时间</div>
    <div class="settings-group">
      <div class="settings-row">
        <div class="settings-row-label">显示内容</div>
        <div class="chip-row">
          ${dtToggles.map(t => `
            <button class="chip ${s[t.k]==='true'?'on':''}" data-act="toggle" data-k="${t.k}">${t.label}</button>
          `).join('')}
        </div>
      </div>
      <div class="settings-row">
        <div class="settings-row-label">时间格式</div>
        <div class="segment-ctrl">
          <button class="${s.hour_format==='24'?'active':''}" data-act="set" data-k="hour_format" data-v="24">24 小时</button>
          <button class="${s.hour_format==='12'?'active':''}" data-act="set" data-k="hour_format" data-v="12">12 小时</button>
        </div>
      </div>
    </div>

    <!-- Display elements (consolidated visibility toggles) -->
    <div class="settings-group-title">显示元素</div>
    <div class="settings-group">
      <div class="settings-row">
        <div class="settings-row-label">隐藏时间</div>
        <button class="toggle-switch ${s.show_datetime==='false'?'on':''}" data-act="toggle" data-k="show_datetime" data-inv="1"></button>
      </div>
      <div class="settings-row">
        <div class="settings-row-label">想法与感受显示时间戳</div>
        <button class="toggle-switch ${s.show_thought_time!=='false'?'on':''}" data-act="toggle" data-k="show_thought_time"></button>
      </div>
      <div class="settings-row">
        <div class="settings-row-label">想法与感受仅显示标题</div>
        <button class="toggle-switch ${s.show_thought_content==='false'?'on':''}" data-act="toggle" data-k="show_thought_content" data-inv="1"></button>
      </div>
      <div class="settings-row">
        <div class="settings-row-label">显示代办分组标题图标</div>
        <button class="toggle-switch ${s.show_priority_emoji!=='false'?'on':''}" data-act="toggle" data-k="show_priority_emoji"></button>
      </div>
      <div class="settings-row">
        <div class="settings-row-label">隐藏代办图标</div>
        <button class="toggle-switch ${s.hide_todo_emoji==='true'?'on':''}" data-act="toggle" data-k="hide_todo_emoji"></button>
      </div>
      <div class="settings-row">
        <div class="settings-row-label">灰化过去的想法和感受</div>
        <button class="toggle-switch ${s.dim_past_thoughts==='true'?'on':''}" data-act="toggle" data-k="dim_past_thoughts"></button>
      </div>
    </div>

    <!-- Calendar layout -->
    <div class="settings-group-title">日历</div>
    <div class="settings-group">
      <div class="settings-row">
        <div class="settings-row-label">单页天数</div>
        <div class="segment-ctrl">
          ${['4','5','8','10','12','15'].map(v => `
            <button class="${(s.cal_days_per_page||'4')===v?'active':''}" data-act="set" data-k="cal_days_per_page" data-v="${v}">${v}</button>
          `).join('')}
        </div>
      </div>
      <div class="settings-row">
        <div class="settings-row-label">点击记录的方式</div>
        <div class="segment-ctrl">
          <button class="${(s.cal_item_click_mode||'popup')==='expand'?'active':''}" data-act="set" data-k="cal_item_click_mode" data-v="expand">展开</button>
          <button class="${(s.cal_item_click_mode||'popup')==='popup'?'active':''}" data-act="set" data-k="cal_item_click_mode" data-v="popup">弹出</button>
        </div>
      </div>
    </div>

    <!-- Emoji (compact horizontal row) -->
    <div class="settings-group-title">表情符号</div>
    <div class="settings-group" style="padding:8px 12px">
      <div class="emoji-compact-row">
        ${emojiSlots.map(slot => `
          <div class="emoji-slot" style="position:relative">
            <div class="emoji-slot-label">${slot.label}</div>
            <div class="emoji-current" data-act="open-emoji" data-k="${slot.key}">${utils.esc(s[slot.key])}</div>
            <div class="emoji-grid-popup" data-popup="${slot.key}">
              ${CFG.EMOJI_PICKER.map(e => `<div class="emoji-opt" data-act="pick-emoji" data-k="${slot.key}" data-e="${utils.esc(e)}">${e}</div>`).join('')}
            </div>
          </div>
        `).join('')}
      </div>
    </div>

    <button class="glass-btn" data-act="reset-section" data-section="interface">恢复默认</button>
  `;
}

function renderTabWallpaper() {
  const s = state.settings;
  const cats = [
    { key: 'desktop_light', name: '电脑端 · 浅色' },
    { key: 'desktop_dark',  name: '电脑端 · 深色' },
    { key: 'mobile_light',  name: '手机端 · 浅色' },
    { key: 'mobile_dark',   name: '手机端 · 深色' },
  ];

  return `
    <div class="settings-section-title">壁纸</div>
    ${cats.map(cat => {
      const list = state.wallpapers.filter(w => w.category === cat.key);
      const active = s[`active_wp_${cat.key}`];
      return `
        <div class="settings-group">
          <div class="wp-category-title">${cat.name}</div>
          <div class="wp-grid">
            ${list.map(w => `
              <div class="wp-item ${String(active)===String(w.id)?'active':''}"
                   data-act="set-wp" data-cat="${cat.key}" data-id="${w.id}"
                   title="${utils.esc(w.name)}">
                <img src="/static/wallpapers/${w.filename}" alt=""/>
                <button class="wp-del-btn" data-act="del-wp" data-id="${w.id}" title="删除壁纸" aria-label="删除壁纸">${ICONS.close}</button>
              </div>
            `).join('')}
            <button class="wp-upload-btn" data-act="upload-wp" data-cat="${cat.key}" title="上传壁纸">+</button>
          </div>
        </div>
      `;
    }).join('')}
    <button class="glass-btn" data-act="reset-section" data-section="wallpaper">恢复默认</button>
  `;
}

function renderTabReset() {
  const s = state.settings;
  return `
    <div class="settings-section-title">其他</div>
    <div class="settings-group-title">窗口</div>
    <div class="settings-group">
      <div class="settings-row">
        <div class="settings-row-label">
          点击关闭按钮时
          <div class="settings-row-sub">桌面应用：关闭窗口是最小化还是退出</div>
        </div>
        <div class="segment-ctrl">
          <button class="${(s.close_action||'minimize')==='minimize'?'active':''}" data-act="set" data-k="close_action" data-v="minimize">最小化</button>
          <button class="${(s.close_action||'minimize')==='quit'?'active':''}" data-act="set" data-k="close_action" data-v="quit">退出</button>
        </div>
      </div>
    </div>
    <div class="settings-group-title">浏览器</div>
    <div class="settings-group">
      <div class="settings-row">
        <div class="settings-row-label">
          在浏览器中打开
          <div class="settings-row-sub">用你的默认浏览器打开本服务地址</div>
        </div>
        <button class="glass-btn primary" data-act="open-in-browser">打开</button>
      </div>
    </div>
    <div class="settings-group-title">重置</div>
    <div class="settings-group">
      <div class="settings-row">
        <div class="settings-row-label">
          一键还原样式
          <div class="settings-row-sub">恢复所有外观样式到默认，保留数据</div>
        </div>
        <button class="glass-btn" data-act="restore-style">还原</button>
      </div>
      <div class="settings-row">
        <div class="settings-row-label">
          恢复为引导数据
          <div class="settings-row-sub">清空现有数据，恢复为新手引导数据</div>
        </div>
        <button class="glass-btn" data-act="reset-tutorial">恢复</button>
      </div>
      <div class="settings-row">
        <div class="settings-row-label">
          清空数据
          <div class="settings-row-sub" style="color:#FF3B30">清空现有数据</div>
        </div>
        <button class="danger-btn" data-act="factory-reset">清空</button>
      </div>
    </div>
    <div class="settings-group-title">数据备份</div>
    <div class="settings-group">
      <div class="settings-row">
        <div class="settings-row-label">
          导出全部数据
          <div class="settings-row-sub">下载 JSON 备份文件（代办 / 想法 / 设置 / 壁纸元数据）</div>
        </div>
        <button class="glass-btn" data-act="export-data">导出</button>
      </div>
      <div class="settings-row">
        <div class="settings-row-label">
          导入数据
          <div class="settings-row-sub" style="color:#FF9500">会覆盖当前所有数据，请先导出做备份</div>
        </div>
        <button class="glass-btn" data-act="import-data">导入</button>
      </div>
    </div>
  `;
}

/* ═══════════════════════════════════════════════════════════════════
   Actions
   ═══════════════════════════════════════════════════════════════════ */
async function setSetting(key, value) {
  state.settings[key] = String(value);
  await api.put('/settings', { [key]: String(value) });
  applySettings();
}

async function setSettingNoSave(key, value) {
  state.settings[key] = String(value);
  applySettings();
}

async function saveTodo() {
  const input = document.getElementById('todo-add-input');
  if (!input) return;
  const content = input.value.trim();
  if (!content) return;
  await api.post('/todos', {
    content,
    priority: state.addPrio,
    emoji: '',
  });
  input.value = '';
  state.addPrio = 1; // reset to lowest
  state.todos = await api.get('/todos');
  render();
  setTimeout(() => document.getElementById('todo-add-input')?.focus(), 50);
}

async function saveThought() {
  if (!activeWysiEditor || activeWysiEditor.isEmpty()) return;
  let title = activeWysiEditor.getTitle();
  const body = activeWysiEditor.getBody().trim();
  if (title.length > 120) title = title.slice(0, 120);
  if (!title && !body) return;
  await api.post('/thoughts', {
    title,
    content: body || title,
    type: state.addType,
    emoji: '',
  });
  activeWysiEditor.setValue('');
  state.thoughts = await api.get('/thoughts');
  // Adding a thought / feeling collapses the inline editor back to the list
  // (todos, by contrast, keep their add row open so you can add several).
  state.addingThought = false;
  render();
}

/** Last-resort full body re-render. Only used when something truly
 *  view-wide changes (settings flip, view switch, new item added). For
 *  the common "this one item moved" actions (priority bump / complete /
 *  restore) we now use surgical DOM moves (see moveTodo*) so the user
 *  sees zero flash. */
function renderQuiet() {
  const vc = document.getElementById('view-container');
  if (!vc) { render(); return; }
  vc.innerHTML = renderViewBody();
  bindGlobalEvents();
  bindViewEvents();
}

/** Surgical DOM moves — preserve the exact same .todo-item element
 *  across the state change so the browser keeps :hover, focus, in-
 *  flight transitions, and (critically) the user's mental anchor on
 *  the item. No innerHTML rebuild, no flash. */

/* Find every visible copy of a todo's DOM (main view renders desktop +
 * mobile concurrently, hidden by CSS, and the add view has its own
 * todos panel). */
function _allTodoDom(id) {
  return [...document.querySelectorAll(`.todo-item[data-todo-id="${CSS.escape(String(id))}"]`)];
}
function _panelOf(el) {
  return el.closest('.todos-panel, .add-todos-panel, .mobile-todos-section, .add-mobile-top');
}
function _ensurePriorityGroup(panel, prio) {
  let g = panel.querySelector(`.priority-group[data-priority="${prio}"]`);
  if (g) return g;
  // Build a fresh priority group + header in the correct position
  // (priority sort: 4 > 3 > 2 > 1, and before any completed-section).
  const showPrioEmoji = state.settings.show_priority_emoji !== 'false';
  g = document.createElement('div');
  g.className = 'priority-group';
  g.dataset.priority = prio;
  const lbl = document.createElement('div');
  lbl.className = `priority-label p${prio}`;
  lbl.innerHTML = `${showPrioEmoji ? utils.esc(state.settings[`emoji_todo_${prio}`]) + ' ' : ''}${CFG.PRIO_LABEL[prio]}`;
  g.appendChild(lbl);
  // Find correct insertion point
  const groups = [...panel.querySelectorAll('.priority-group')];
  let inserted = false;
  for (const peer of groups) {
    if (parseInt(peer.dataset.priority, 10) < prio) {
      peer.parentNode.insertBefore(g, peer);
      inserted = true; break;
    }
  }
  if (!inserted) {
    const completedHeader = panel.querySelector('.completed-section-header');
    if (completedHeader) panel.insertBefore(g, completedHeader);
    else panel.appendChild(g);
  }
  // If the panel previously showed an empty-state, drop it
  panel.querySelector('.empty-state')?.remove();
  return g;
}
function _removeEmptyGroups(panel) {
  panel.querySelectorAll('.priority-group').forEach(g => {
    if (!g.querySelector('.todo-item')) g.remove();
  });
}

/* Move a todo between priority groups, in every visible DOM copy. */
function moveTodoToPriority(id, newPrio) {
  const newEmoji = state.settings[`emoji_todo_${newPrio}`] || CFG.PRIO_DEFAULT_EMOJI[newPrio] || '';
  _allTodoDom(id).forEach(item => {
    if (item.classList.contains('completed')) return;
    const panel = _panelOf(item); if (!panel) return;
    const target = _ensurePriorityGroup(panel, newPrio);
    // Insert at the top of the target group (under the label, above other items)
    const label = target.querySelector('.priority-label');
    if (label && label.nextSibling) target.insertBefore(item, label.nextSibling);
    else target.appendChild(item);
    // Update the emoji shown on the item (priority emoji is the lead icon)
    const emojiEl = item.querySelector('.item-emoji');
    if (emojiEl) emojiEl.textContent = newEmoji;
    _removeEmptyGroups(panel);
  });
}

/* Move a todo from its active priority group into the "已完成" section.
 * If the completed section isn't currently expanded we just remove the
 * item from view; the count badge will update on the next renderQuiet
 * (typical: a fresh user interaction). */
function moveTodoToCompleted(id) {
  _allTodoDom(id).forEach(item => {
    const panel = _panelOf(item); if (!panel) return;
    item.classList.add('completed');
    // Strip the active-only action UI so :hover doesn't reveal phantom buttons
    item.querySelector('.todo-actions')?.remove();
    item.querySelector('.todo-swipe-actions')?.remove();

    // ── Make sure the panel has a "已完成 (N)" header. If this is the
    //    first completed item of the session, the header may not exist
    //    yet — create it (collapsed by default so the user's view
    //    doesn't suddenly explode with old completed todos). ──
    let header = panel.querySelector('.completed-section-header');
    if (!header) {
      header = document.createElement('div');
      header.className = 'completed-section-header' + (state.showCompleted ? ' open' : '');
      header.setAttribute('data-act', 'toggle-completed');
      header.innerHTML = `<span class="toggle-icon">▶</span><span>已完成 (1)</span>`;
      panel.appendChild(header);
    } else {
      const lbl = header.querySelector('span:last-child');
      if (lbl) {
        const m = lbl.textContent.match(/\((\d+)\)/);
        const n = (m ? parseInt(m[1], 10) : 0) + 1;
        lbl.textContent = `已完成 (${n})`;
      }
    }
    // If the completed section is expanded, slot the item in at top of today's group
    if (state.showCompleted) {
      const todayLabel = utils.formatDate(new Date());
      let firstGroup = header.nextElementSibling;
      if (!firstGroup || !firstGroup.classList?.contains('date-group')
          || firstGroup.querySelector('.date-label')?.textContent.trim() !== todayLabel) {
        // Need a new date-group for today, inserted right after the section header
        const g = document.createElement('div');
        g.className = 'date-group';
        const lbl = document.createElement('div');
        lbl.className = 'date-label';
        lbl.textContent = todayLabel;
        g.appendChild(lbl);
        header.parentNode.insertBefore(g, header.nextSibling);
        firstGroup = g;
      }
      const dateLbl = firstGroup.querySelector('.date-label');
      if (dateLbl && dateLbl.nextSibling) firstGroup.insertBefore(item, dateLbl.nextSibling);
      else firstGroup.appendChild(item);
    } else {
      // Completed section collapsed → just remove from DOM, it'll show on expand
      item.remove();
    }
    _removeEmptyGroups(panel);

    // ── Last active todo was just completed? Show the "🎉 全部完成！"
    //    cheer the full re-render normally would. ──
    if (!panel.querySelector('.priority-group') && !panel.querySelector('.empty-state')) {
      const cheer = document.createElement('div');
      cheer.className = 'empty-state';
      cheer.style.padding = '12px';
      cheer.innerHTML = '<span>🎉 全部完成！</span>';
      panel.insertBefore(cheer, header);
    }
  });
}

async function completeTodo(id) {
  // Optimistic + surgical: mark the item completed in state and move
  // its existing DOM node into the "已完成" section. No render() —
  // the original element keeps its identity, so the page doesn't
  // flash.
  const todo = state.todos.find(t => String(t.id) === String(id));
  if (todo) {
    todo.completed = 1;
    todo.completed_at = new Date().toISOString();
  }
  moveTodoToCompleted(id);
  try {
    await api.post(`/todos/${id}/complete`);
    state.todos = await api.get('/todos');
  } catch (e) {
    // Rollback to whatever the server has on error
    state.todos = await api.get('/todos').catch(() => state.todos);
    render();
  }
}

async function delTodo(id) {
  if (!confirm('确定要删除这条待办吗？')) return;
  await api.del(`/todos/${id}`);
  state.todos = await api.get('/todos');
  render();
}

async function delThought(id) {
  if (!confirm('确定要删除这条记录吗？')) return;
  await api.del(`/thoughts/${id}`);
  state.thoughts = await api.get('/thoughts');
  render();
}

async function changePriority(id, delta) {
  // delta: +1 = raise (e.g., 一般→重要), -1 = lower
  const todo = state.todos.find(t => String(t.id) === String(id));
  if (!todo || todo.completed) return;
  const newPrio = Math.max(1, Math.min(4, todo.priority + delta));
  if (newPrio === todo.priority) return;
  const oldPrio = todo.priority;
  // Optimistic + surgical: move the DOM node now, persist after.
  todo.priority = newPrio;
  moveTodoToPriority(id, newPrio);
  try {
    await api.put(`/todos/${id}`, { priority: newPrio });
    state.todos = await api.get('/todos');
  } catch (e) {
    // Rollback DOM + state if the server rejected
    todo.priority = oldPrio;
    moveTodoToPriority(id, oldPrio);
  }
}

async function uploadWallpaper(category) {
  // Safari / iOS won't open the file picker for a detached <input>; some
  // browsers also lose the user-gesture if the element isn't in the DOM.
  // Attach hidden, then remove after the picker resolves (or is cancelled).
  const inp = document.createElement('input');
  inp.type = 'file';
  inp.accept = 'image/*';
  inp.style.position = 'fixed';
  inp.style.opacity = '0';
  inp.style.pointerEvents = 'none';
  inp.style.left = '-9999px';
  document.body.appendChild(inp);
  inp.onchange = async () => {
    try {
      if (!inp.files.length) return;
      const original = inp.files[0];
      const fileName = original.name.replace(/\.[^.]+$/, '');

      // Compress image via Canvas before uploading (avoid 413)
      const blob = await compressImage(original, 2560, 0.85);
      const file = new File([blob], fileName + '.jpg', { type: 'image/jpeg' });

      const fd = new FormData();
      fd.append('file', file);
      fd.append('category', category);
      fd.append('name', fileName);
      try {
        await api.upload('/wallpapers', fd);
      } catch (err) {
        alert('壁纸上传失败：' + (err.message || err));
        return;
      }
      state.wallpapers = await api.get('/wallpapers');
      render();
    } finally {
      inp.remove();
    }
  };
  // If the picker is cancelled, `change` never fires — clean up on focus restore.
  const cleanup = () => {
    setTimeout(() => { if (inp.parentNode && !inp.files.length) inp.remove(); }, 500);
    window.removeEventListener('focus', cleanup);
  };
  window.addEventListener('focus', cleanup);
  inp.click();
}

function compressImage(file, maxDim, quality) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      let w = img.width, h = img.height;
      if (w > maxDim || h > maxDim) {
        const r = Math.min(maxDim / w, maxDim / h);
        w = Math.round(w * r);
        h = Math.round(h * r);
      }
      const c = document.createElement('canvas');
      c.width = w; c.height = h;
      c.getContext('2d').drawImage(img, 0, 0, w, h);
      c.toBlob(b => b ? resolve(b) : reject(new Error('compress failed')), 'image/jpeg', quality);
    };
    img.onerror = reject;
    img.src = URL.createObjectURL(file);
  });
}

async function openInBrowser() {
  // Try the server-side hook first — it'll use the Python webbrowser module
  // which knows the host's default browser. If anything goes wrong, fall back
  // to window.open of the current location.
  try {
    const res = await api.post('/open-in-browser', {});
    if (res && res.opened) return;
    if (res && res.url) {
      window.open(res.url, '_blank', 'noopener');
      return;
    }
  } catch (err) {
    // fall through
  }
  window.open(location.href, '_blank', 'noopener');
}

async function exportData() {
  try {
    const data = await api.get('/export');
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    const ts = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
    a.href = url;
    a.download = `todolist-backup-${ts}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  } catch (err) {
    alert('导出失败：' + err.message);
  }
}

async function importData() {
  if (!confirm('导入将覆盖当前所有数据（包括代办、想法、设置）。\n\n确定继续吗？')) return;
  const inp = document.createElement('input');
  inp.type = 'file';
  inp.accept = 'application/json,.json';
  inp.onchange = async () => {
    if (!inp.files.length) return;
    try {
      const text = await inp.files[0].text();
      const payload = JSON.parse(text);
      await api.post('/import', payload);
      alert('导入成功，即将刷新…');
      location.reload();
    } catch (err) {
      alert('导入失败：' + (err.message || '文件格式无效'));
    }
  };
  inp.click();
}

async function deleteWallpaper(id) {
  if (!id) return;
  if (!confirm('确定要删除这张壁纸吗？')) return;
  // If the wallpaper is currently active in any category, clear that slot
  const updates = {};
  ['active_wp_desktop_light','active_wp_desktop_dark','active_wp_mobile_light','active_wp_mobile_dark']
    .forEach(k => { if (String(state.settings[k]) === String(id)) updates[k] = ''; });
  if (Object.keys(updates).length) {
    Object.assign(state.settings, updates);
    await api.put('/settings', updates);
  }
  await api.del(`/wallpapers/${id}`);
  state.wallpapers = await api.get('/wallpapers');
  applySettings();
  render();
}

async function extractColorsFromWallpaper(silent) {
  const isDark = document.documentElement.classList.contains('theme-dark');
  const cat = (state.isMobile ? 'mobile' : 'desktop') + '_' + (isDark ? 'dark' : 'light');
  const cacheKey = `extracted_accent_${cat}`;
  const wpId = state.settings[`active_wp_${cat}`];
  const wp = state.wallpapers.find(w => String(w.id) === String(wpId));

  const applyAccent = (accent) => {
    state.settings[cacheKey] = accent;
    document.documentElement.style.setProperty('--accent', accent);
    document.documentElement.style.setProperty('--scheme-accent', accent);
    document.documentElement.style.setProperty('--scheme-tag-bg', hexToRgba(accent, 0.14));
  };

  if (!wp) {
    // No custom wallpaper → fall back to a sensible default per theme
    const fallback = isDark ? '#7DA5FF' : '#4B6FD9';
    applyAccent(fallback);
    try { await api.put('/settings', { [cacheKey]: fallback }); } catch(e) {}
    return fallback;
  }

  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = async () => {
      const canvas = document.createElement('canvas');
      canvas.width = 60; canvas.height = 60;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, 60, 60);
      const data = ctx.getImageData(0, 0, 60, 60).data;

      // Find a vivid representative color: weight by saturation, ignore near-white/near-black
      let r=0, g=0, b=0, count=0;
      for (let i = 0; i < data.length; i += 4) {
        const cr = data[i], cg = data[i+1], cb = data[i+2];
        const mx = Math.max(cr,cg,cb), mn = Math.min(cr,cg,cb);
        const sat = mx - mn;
        const lum = (cr + cg + cb) / 3;
        if (lum < 30 || lum > 230) continue;  // skip near-black/near-white
        const w = 1 + (sat * sat) / 600;
        r += cr * w; g += cg * w; b += cb * w; count += w;
      }
      if (count === 0) { resolve('#888888'); return; }
      r = Math.round(r/count); g = Math.round(g/count); b = Math.round(b/count);
      const accent = utils.rgbToHex(r, g, b);

      applyAccent(accent);

      try { await api.put('/settings', { [cacheKey]: accent }); } catch(e) {}
      if (!silent) {
        const chip = document.querySelector('.scheme-chip[data-v="extract"]');
        if (chip) chip.classList.add('flash');
      }
      resolve(accent);
    };
    img.onerror = () => resolve('#888888');
    img.src = `/static/wallpapers/${wp.filename}`;
  });
}

async function resetSection(section) {
  // Each list mirrors exactly the settings shown in that tab, so "恢复默认"
  // only touches its own tab's controls.
  const sectionKeys = {
    appearance: ['theme','ui_style','color_scheme',
                 'font_family','font_size','font_weight',
                 'card_size','card_opacity','card_blur','card_brightness','card_saturation',
                 'card_radius','card_item_tint','card_aspect','card_aspect_mobile','card_split','card_split_mobile'],
    wallpaper:  ['active_wp_desktop_light','active_wp_desktop_dark','active_wp_mobile_light','active_wp_mobile_dark'],
    interface:  ['show_date','show_time','show_weekday','show_seconds','show_lunar','hour_format',
                 'show_datetime','show_thought_time','show_thought_content','show_priority_emoji',
                 'hide_todo_emoji','dim_past_thoughts','cal_days_per_page','cal_item_click_mode',
                 'emoji_thought','emoji_feeling','emoji_todo_4','emoji_todo_3','emoji_todo_2','emoji_todo_1'],
  };
  const keys = sectionKeys[section];
  if (!keys) return;
  const updates = {};
  keys.forEach(k => updates[k] = DEFAULT_SETTINGS[k]);
  Object.assign(state.settings, updates);
  // Resetting the appearance tab should also drop any extracted-accent
  // override so the default color scheme shows cleanly.
  if (section === 'appearance') {
    document.documentElement.style.removeProperty('--accent');
    document.documentElement.style.removeProperty('--scheme-accent');
  }
  await api.put('/settings', updates);
  applySettings();
  render();
}

async function restoreAllStyle() {
  if (!confirm('确定要还原所有外观样式吗？数据不会丢失。')) return;
  const updates = {};
  ['theme','font_size','font_weight','font_family','card_size','card_opacity','card_radius','card_aspect','card_aspect_mobile','card_split','card_split_mobile',
   'ui_style','color_scheme','emoji_thought','emoji_feeling',
   'emoji_todo_4','emoji_todo_3','emoji_todo_2','emoji_todo_1',
   'active_wp_desktop_light','active_wp_desktop_dark',
   'active_wp_mobile_light','active_wp_mobile_dark'].forEach(k => {
    updates[k] = DEFAULT_SETTINGS[k];
  });
  Object.assign(state.settings, updates);
  document.documentElement.style.removeProperty('--accent');
  document.documentElement.style.removeProperty('--scheme-accent');
  await api.put('/settings', updates);
  applySettings();
  render();
}

async function factoryReset() {
  if (!confirm('确定要抹除所有数据？此操作不可恢复！')) return;
  if (!confirm('真的确定吗？所有的代办、想法、设置都会消失！')) return;

  // Delete all todos
  for (const t of state.todos) await api.del(`/todos/${t.id}`);
  // Delete all thoughts
  for (const th of state.thoughts) await api.del(`/thoughts/${th.id}`);
  // Delete all wallpapers
  for (const w of state.wallpapers) await api.del(`/wallpapers/${w.id}`);
  // Reset settings
  await api.put('/settings', { ...DEFAULT_SETTINGS });
  // Re-seed the tutorial records (the new "onboarding")
  await api.post('/reset-tutorial', {});

  // Reload everything
  await refreshAll();
  state.view = 'main';
  applySettings();
  render();
}

async function resetToTutorial() {
  if (!confirm('将清空当前所有代办与想法，恢复为新手引导数据。\n\n壁纸和设置会保留。继续吗？')) return;
  if (!confirm('真的确定吗？现有的代办和想法都会被替换为引导数据，且无法撤销！')) return;
  await api.post('/reset-tutorial', {});
  await refreshAll();
  state.view = 'main';
  render();
}

/* ═══════════════════════════════════════════════════════════════════
   Event binding (delegated)
   ═══════════════════════════════════════════════════════════════════ */
function bindGlobalEvents() {
  document.getElementById('card-wrapper').onclick = async (e) => {
    // Suppress the synthetic click that fires right after a drag-and-drop
    // release. Kept short so a real click immediately after a drop still
    // registers without an awkward dead-zone.
    if (Date.now() - drag.endedAt < 120) return;

    const el = e.target.closest('[data-act]');

    // 1. Item-level click → open inline editor (only when not clicking a button
    //    and not clicking inside an item already in edit mode)
    if (!el) {
      const inEditing = e.target.closest('.inline-edit');
      if (inEditing) return; // clicks inside the editor itself shouldn't re-trigger anything
      const todoEl = e.target.closest('.todo-item');
      if (todoEl) {
        openInlineEdit('todo', todoEl.dataset.todoId);
        return;
      }
      const thoughtEl = e.target.closest('.thought-item');
      if (thoughtEl) {
        openInlineEdit('thought', thoughtEl.dataset.thoughtId);
        return;
      }
      // Calendar item click → expand inline OR open popup, per setting.
      // calDragState.moved guards against a drag-pan accidentally
      // triggering a click on release.
      const calEl = e.target.closest('.cal-item');
      if (calEl && calDragState.moved < 4) {
        const mode = state.settings.cal_item_click_mode === 'expand' ? 'expand' : 'popup';
        openCalEdit(calEl.dataset.calKind, calEl.dataset.calId, mode);
        return;
      }
      // Click on card whitespace while editing → auto-save and close
      if (state.inlineEdit) { saveInlineEdit(); return; }
      // Close emoji popups when clicking outside
      document.querySelectorAll('.emoji-grid-popup.show').forEach(p => p.classList.remove('show'));
      return;
    }
    const act = el.dataset.act;
    const id = el.dataset.id;

    switch (act) {
      case 'view-settings': switchView('settings'); break;
      case 'view-calendar': switchView('calendar'); break;
      case 'view-main':     switchView('main');     break;
      case 'toggle-add-thought':
        state.addingThought = !state.addingThought;
        render();
        break;
      case 'toggle-add-todo':
        state.addingTodo = !state.addingTodo;
        render();
        if (state.addingTodo) {
          setTimeout(() => document.getElementById('todo-add-input')?.focus(), 60);
        }
        break;
      case 'todo-up':    await changePriority(id, +1); break;
      case 'todo-down':  await changePriority(id, -1); break;
      case 'todo-done':  await completeTodo(id); break;
      case 'todo-restore':
        await api.put(`/todos/${id}`, { completed: 0, completed_at: null });
        state.todos = await api.get('/todos');
        renderQuiet();
        break;
      case 'del-todo':   await delTodo(id);     break;
      case 'del-thought':await delThought(id);  break;
      case 'set-prio':
        state.addPrio = parseInt(el.dataset.p, 10);
        // In-place class toggle to avoid re-render flash
        document.querySelectorAll('.prio-btn').forEach(b => {
          b.classList.toggle('active', parseInt(b.dataset.p, 10) === state.addPrio);
        });
        break;
      case 'set-type':
        state.addType = el.dataset.type;
        document.querySelectorAll('.type-toggle button').forEach(b => {
          b.classList.toggle('active', b.dataset.type === state.addType);
        });
        break;
      case 'save-todo':    await saveTodo();    break;
      case 'save-thought': await saveThought(); break;
      case 'cal-day-add':  await openCalDayAdd(el.dataset.date); break;
      case 'toggle-immersive':
        state.immersive = !state.immersive;
        render();
        break;
      case 'set-tab':
        state.settingsTab = el.dataset.tab;
        render(); break;
      case 'set':
        await setSetting(el.dataset.k, el.dataset.v);
        render(); break;
      case 'toggle': {
        const k = el.dataset.k;
        const inv = el.dataset.inv === '1';
        const stored = state.settings[k] === 'true';
        const newStored = !stored;
        // Visual state — if inverted, ON means stored is 'false'
        const newVisual = inv ? !newStored : newStored;
        el.classList.toggle('on', newVisual);
        await setSetting(k, newStored.toString());

        // Live update side effects without full re-render where possible
        if (['show_datetime','show_date','show_time','show_weekday','show_seconds','show_lunar','hour_format'].includes(k)) {
          updateHeaderDateTime();
          const previewEl = document.getElementById('dt-preview-text');
          if (previewEl) previewEl.textContent = formatHeaderDateTime() || '— 已隐藏 —';
          if (k === 'show_seconds') startDateTimeTicker();
        }
        break;
      }
      case 'set-wp': {
        const cat = el.dataset.cat;
        // Setting a new wallpaper invalidates the cached extracted color
        // for that category, so it will be re-extracted on next render.
        const updates = {
          [`active_wp_${cat}`]: el.dataset.id,
          [`extracted_accent_${cat}`]: '',
        };
        // Picking a dark/light wallpaper also flips the app into the matching
        // theme, so what you select is what you immediately see.
        if (cat.endsWith('_dark'))  updates.theme = 'dark';
        if (cat.endsWith('_light')) updates.theme = 'light';
        Object.assign(state.settings, updates);
        await api.put('/settings', updates);
        applySettings();
        render(); break;
      }
      case 'upload-wp':
        await uploadWallpaper(el.dataset.cat);
        break;
      case 'del-wp':
        e.stopPropagation();
        await deleteWallpaper(el.dataset.id);
        break;
      case 'extract-colors':
        await extractColorsFromWallpaper();
        break;
      case 'reset-section':
        await resetSection(el.dataset.section);
        break;
      case 'restore-style':
        await restoreAllStyle();
        break;
      case 'factory-reset':
        await factoryReset();
        break;
      case 'reset-tutorial':
        await resetToTutorial();
        break;
      case 'export-data':
        await exportData();
        break;
      case 'import-data':
        await importData();
        break;
      case 'open-in-browser':
        await openInBrowser();
        break;
      case 'close-modal':
        // Overlay click on the calendar popup → treat like cancel /
        // auto-save (save if content changed, close otherwise).
        if (state.inlineEdit) await saveInlineEdit(); else hideEditModal();
        break;
      case 'inline-save':       await saveInlineEdit(); break;
      case 'inline-cancel':     closeInlineEdit(); break;
      case 'inline-delete':     await deleteInlineEdit(); break;
      case 'inline-complete':   await toggleCompleteInline(true);  break;
      case 'inline-uncomplete': await toggleCompleteInline(false); break;
      case 'inline-prio':
        if (state.inlineEdit) {
          state.inlineEdit.data.priority = parseInt(el.dataset.p, 10);
          el.parentElement.querySelectorAll('.prio-btn').forEach(b => {
            b.classList.toggle('active', parseInt(b.dataset.p, 10) === state.inlineEdit.data.priority);
          });
        }
        break;
      case 'inline-type':
        if (state.inlineEdit) {
          state.inlineEdit.data.type = el.dataset.type;
          el.parentElement.querySelectorAll('button').forEach(b => {
            b.classList.toggle('active', b.dataset.type === state.inlineEdit.data.type);
          });
        }
        break;
      case 'open-emoji': {
        const k = el.dataset.k;
        document.querySelectorAll('.emoji-grid-popup').forEach(p => p.classList.remove('show'));
        const popup = document.querySelector(`.emoji-grid-popup[data-popup="${k}"]`);
        if (popup) {
          popup.classList.add('show');
          const rect = el.getBoundingClientRect();
          const parent = el.closest('.settings-row').getBoundingClientRect();
          popup.style.top = `${rect.bottom - parent.top + 6}px`;
          popup.style.left = `${rect.left - parent.left}px`;
        }
        e.stopPropagation();
        break;
      }
      case 'pick-emoji': {
        const k = el.dataset.k;
        const emo = el.dataset.e;
        await setSetting(k, emo);
        document.querySelectorAll('.emoji-grid-popup').forEach(p => p.classList.remove('show'));
        render(); break;
      }
      case 'toggle-completed':
        state.showCompleted = !state.showCompleted;
        render(); break;
    }
  };

  // Slider input handling
  document.getElementById('card-wrapper').oninput = (e) => {
    const el = e.target.closest('[data-act="set-slider"]');
    if (!el) return;
    const k = el.dataset.k;
    const v = el.value;
    state.settings[k] = String(v);
    applySettings();
    // Update displayed value
    const valEl = el.nextElementSibling;
    if (valEl?.classList.contains('settings-slider-val')) {
      valEl.textContent = v + (k === 'font_size' ? 'px' : '%');
    }
  };
  document.getElementById('card-wrapper').onchange = async (e) => {
    const sliderEl = e.target.closest('[data-act="set-slider"]');
    if (sliderEl) {
      await setSetting(sliderEl.dataset.k, sliderEl.value);
      return;
    }
    const selEl = e.target.closest('[data-act="set-select"]');
    if (selEl) {
      await setSetting(selEl.dataset.k, selEl.value);
      render();
      return;
    }
  };
}

function bindViewEvents() {
  // Keyboard shortcuts in add view
  const ti = document.getElementById('todo-add-input');
  if (ti) {
    ti.onkeydown = e => { if (e.key === 'Enter') { e.preventDefault(); saveTodo(); } };
  }
  // Initialize WYSIWYG editor if present
  const wysiEl = document.getElementById('thought-wysi');
  if (wysiEl) {
    activeWysiEditor = setupWysiEditor(wysiEl, '');
    wysiEl.addEventListener('keydown', e => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
        e.preventDefault();
        saveThought();
      }
    });
    // When the thoughts panel just opened its inline add editor, drop the
    // caret straight in so the user can start typing.
    if (state.addingThought) setTimeout(() => wysiEl.focus(), 60);
  } else {
    activeWysiEditor = null;
  }

  // Inline editor setup: focus / mount happens after a full render too (e.g.
  // when user switched view and came back while inlineEdit was preserved)
  if (state.inlineEdit) initInlineEditDom();

  // Long-press drag-to-reorder on all non-completed todo items (mouse + touch).
  // Skip the row that's currently in inline-edit mode so typing isn't hijacked.
  document.querySelectorAll('.todo-item:not(.completed):not(.editing)').forEach(item => attachDrag(item));

  // Mobile swipe handling on todo items
  if (state.isMobile) {
    document.querySelectorAll('.todo-item').forEach(item => attachSwipe(item));
  }

  // Calendar gesture scroll
  if (state.view === 'calendar') {
    bindCalendarScroll();
  } else {
    calDragState.sc = null;
  }

  // Panel splitter drag (resize thoughts/todos panels)
  document.querySelectorAll('.panel-splitter').forEach(s => attachSplitterDrag(s));
}

/* ═══════════════════════════════════════════════════════════════════
   Panel splitter drag — resize thoughts/todos panels via dragging
   the divider. Updates --panel-split-w / --panel-split-h in real time
   and persists the setting on release.
   ═══════════════════════════════════════════════════════════════════ */
function attachSplitterDrag(handle) {
  if (handle.dataset.bound === '1') return;
  handle.dataset.bound = '1';

  const orient = handle.dataset.orient;          // 'v' (left/right) or 'h' (top/bottom)
  const skey   = handle.dataset.skey;            // 'card_split' or 'card_split_mobile'
  const cssVar = orient === 'v' ? '--panel-split-w' : '--panel-split-h';
  // Splitter sits BETWEEN two flex children — its previousElementSibling is
  // the resizable (fixed-basis) panel; we measure the containing flex parent
  // and compute the % of it that the first panel occupies.
  const parent = handle.parentElement;

  const min = orient === 'v' ? 30 : 20;
  const max = orient === 'v' ? 80 : 80;

  const begin = (e) => {
    e.preventDefault();
    const pointerType = e.touches ? 'touch' : 'mouse';
    handle.classList.add('dragging');
    document.body.classList.add('splitter-active');
    if (orient === 'h') document.body.classList.add('splitter-h');

    const move = (cx, cy) => {
      const r = parent.getBoundingClientRect();
      let pct;
      if (orient === 'v') {
        pct = ((cx - r.left) / r.width) * 100;
      } else {
        pct = ((cy - r.top) / r.height) * 100;
      }
      pct = Math.max(min, Math.min(max, pct));
      document.documentElement.style.setProperty(cssVar, pct + '%');
      handle._lastPct = pct;
    };

    const onMouseMove = (ev) => move(ev.clientX, ev.clientY);
    const onTouchMove = (ev) => { const t = ev.touches[0]; move(t.clientX, t.clientY); };

    const end = async () => {
      handle.classList.remove('dragging');
      document.body.classList.remove('splitter-active');
      document.body.classList.remove('splitter-h');
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', end);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', end);
      // Persist final value (rounded). Skip if nothing changed.
      if (handle._lastPct == null) return;
      const v = Math.round(handle._lastPct).toString();
      if (state.settings[skey] === v) return;
      state.settings[skey] = v;
      try { await api.put('/settings', { [skey]: v }); } catch (err) { console.error(err); }
      // Live-update the matching slider in the Settings view if visible
      const slider = document.querySelector(`.settings-slider[data-k="${skey}"]`);
      if (slider) {
        slider.value = v;
        const valEl = slider.parentElement.querySelector('.settings-slider-val');
        if (valEl) valEl.textContent = v + '%';
      }
    };

    if (pointerType === 'touch') {
      window.addEventListener('touchmove', onTouchMove, { passive: false });
      window.addEventListener('touchend', end);
    } else {
      window.addEventListener('mousemove', onMouseMove);
      window.addEventListener('mouseup', end);
    }
  };

  handle.addEventListener('mousedown', begin);
  handle.addEventListener('touchstart', begin, { passive: false });
}

/* ═══════════════════════════════════════════════════════════════════
   View switching with a history stack
   - Clicking a different view → push and switch.
   - Clicking the current view's button → pop and go back.
   ═══════════════════════════════════════════════════════════════════ */
async function switchView(target) {
  // Auto-save any open inline edit before navigating away
  if (state.inlineEdit) await saveInlineEdit();
  if (target === state.view) {
    state.viewHistory.pop();
    state.view = state.viewHistory[state.viewHistory.length - 1] || 'main';
    if (state.viewHistory.length === 0) state.viewHistory.push('main');
  } else {
    state.viewHistory.push(target);
    if (state.viewHistory.length > 10) state.viewHistory.shift();
    state.view = target;
  }
  // Exit immersive editor whenever the view changes
  if (state.view !== 'add') state.immersive = false;
  // Leaving the main view collapses any open inline add forms.
  if (state.view !== 'main') { state.addingThought = false; state.addingTodo = false; }
  render();
}

/* ═══════════════════════════════════════════════════════════════════
   WYSIWYG editor — Notion-style live markdown rendering.

   Each line is a <div> holding the raw markdown text *plus* inline
   styling spans. As the user types, the line under the caret is
   re-tokenized so:
     - **bold**       — content rendered bold, ** markers dimmed
     - *italic*       — italic text, * markers dimmed
     - `code`         — monospace inline code, backticks dimmed
     - ~~strike~~     — strike-through
     - leading `#`, `##`, `###`, `> `, `- `, `1. ` — line takes the
       matching block style; the leading marker is dimmed
   The raw markdown is what `getValue()` returns — the visible spans are
   purely presentational, so saving still produces clean markdown text.
   ═══════════════════════════════════════════════════════════════════ */
function setupWysiEditor(el, initialText = '') {
  el.contentEditable = 'true';
  el.classList.add('wysi-editor');
  el.spellcheck = false;
  // Mobile keyboards (iOS / Android) capitalize the first letter and
  // auto-correct by default. Both are surprising for Chinese / mixed-
  // language note-taking and especially bad when the input method
  // converts pinyin (the IME would commit a capitalized roman char).
  el.setAttribute('autocapitalize', 'off');
  el.setAttribute('autocorrect', 'off');

  const escHtml = s => String(s).replace(/[&<>]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;'}[c]));

  // ── Inline tokenizer ────────────────────────────────────────────────
  // Order matters: longer / non-greedy markers go first so that `**a**`
  // doesn't get consumed as italic by `*`. Inline code wins over
  // everything because backticks shouldn't be styled inside code.
  function renderInline(raw) {
    // 1) Inline code first — capture and stash placeholders so the
    //    remaining replacements don't touch the contents.
    const stash = [];
    let s = escHtml(raw).replace(/`([^`\n]+?)`/g, (_, p1) => {
      const i = stash.length;
      stash.push(
        '<span class="md-mark">`</span>'
        + '<code class="md-code">' + p1 + '</code>'
        + '<span class="md-mark">`</span>'
      );
      return ` ${i} `;
    });
    // 2) Bold **…** / __…__ (must be before single-marker italic)
    s = s.replace(/\*\*([^*\n]+?)\*\*/g,
      '<span class="md-mark">**</span><b class="md-bold">$1</b><span class="md-mark">**</span>');
    s = s.replace(/__([^_\n]+?)__/g,
      '<span class="md-mark">__</span><b class="md-bold">$1</b><span class="md-mark">__</span>');
    // 3) Strike-through ~~…~~
    s = s.replace(/~~([^~\n]+?)~~/g,
      '<span class="md-mark">~~</span><s class="md-strike">$1</s><span class="md-mark">~~</span>');
    // 4) Italic *…* / _…_  — single marker; require non-asterisk content
    s = s.replace(/(^|[^\*])\*([^*\n]+?)\*(?!\*)/g,
      '$1<span class="md-mark">*</span><i class="md-italic">$2</i><span class="md-mark">*</span>');
    s = s.replace(/(^|[^_])_([^_\n]+?)_(?!_)/g,
      '$1<span class="md-mark">_</span><i class="md-italic">$2</i><span class="md-mark">_</span>');
    // 5) Restore code stashes
    s = s.replace(/ (\d+) /g, (_, i) => stash[parseInt(i, 10)]);
    return s || '<br>';                            // empty → preserve height
  }

  // ── Block / line tokenizer ──────────────────────────────────────────
  // Returns { cls, html } based on leading-marker patterns. The first
  // line is always the title (large, bold) regardless of content.
  function renderLine(text, isTitle) {
    if (isTitle) {
      return { cls: 'wysi-title', html: renderInline(text) };
    }
    let m;
    if ((m = text.match(/^(#{1,3})\s/))) {
      return {
        cls: `wysi-h${m[1].length}`,
        html: `<span class="md-mark">${m[0]}</span>${renderInline(text.slice(m[0].length))}`,
      };
    }
    if ((m = text.match(/^>\s/))) {
      return {
        cls: 'wysi-quote',
        html: `<span class="md-mark">${m[0]}</span>${renderInline(text.slice(m[0].length))}`,
      };
    }
    if ((m = text.match(/^([-*+])\s/))) {
      return {
        cls: 'wysi-list',
        html: `<span class="md-mark">${m[0]}</span>${renderInline(text.slice(m[0].length))}`,
      };
    }
    if ((m = text.match(/^(\d+\.)\s/))) {
      return {
        cls: 'wysi-list',
        html: `<span class="md-mark">${m[0]}</span>${renderInline(text.slice(m[0].length))}`,
      };
    }
    if (text === '---' || text === '***') {
      return { cls: 'wysi-divider', html: renderInline(text) };
    }
    if (/^```/.test(text)) {
      return { cls: 'wysi-code', html: renderInline(text) };
    }
    return { cls: '', html: renderInline(text) };
  }

  // ── Caret save / restore (text-offset within a line) ────────────────
  function getCaretOffset(lineEl) {
    const sel = window.getSelection();
    if (!sel.rangeCount) return null;
    const r = sel.getRangeAt(0);
    if (!lineEl.contains(r.startContainer)) return null;
    let offset = 0;
    const walker = document.createTreeWalker(lineEl, NodeFilter.SHOW_TEXT, null);
    let n;
    while ((n = walker.nextNode())) {
      if (n === r.startContainer) return offset + r.startOffset;
      offset += n.nodeValue.length;
    }
    return offset;
  }
  function setCaretOffset(lineEl, offset) {
    if (offset == null) return;
    const sel = window.getSelection();
    const range = document.createRange();
    let remaining = Math.max(0, offset);
    const walker = document.createTreeWalker(lineEl, NodeFilter.SHOW_TEXT, null);
    let n;
    while ((n = walker.nextNode())) {
      const len = n.nodeValue.length;
      if (remaining <= len) {
        range.setStart(n, remaining);
        range.setEnd(n, remaining);
        sel.removeAllRanges();
        sel.addRange(range);
        return;
      }
      remaining -= len;
    }
    // Fallback — collapse to end of line
    range.selectNodeContents(lineEl);
    range.collapse(false);
    sel.removeAllRanges();
    sel.addRange(range);
  }

  // ── Reflow one line, preserving cursor position ─────────────────────
  function reflowLine(lineEl) {
    const isTitle = lineEl === el.children[0];
    const text = lineEl.textContent || '';
    const { cls, html } = renderLine(text, isTitle);
    const offset = getCaretOffset(lineEl);
    lineEl.className = cls;
    lineEl.innerHTML = html;
    if (offset != null) setCaretOffset(lineEl, offset);
  }

  function reflowAll() {
    [...el.children].forEach(reflowLine);
  }

  function setContent(text) {
    const lines = (text || '').split('\n');
    el.innerHTML = lines
      .map(l => `<div>${escHtml(l) || '<br>'}</div>`)
      .join('') || '<div><br></div>';
    reflowAll();
  }

  // Ensure new lines are <div>s (Safari otherwise emits <p>)
  try { document.execCommand('defaultParagraphSeparator', false, 'div'); } catch (e) {}

  // ── Event handling ─────────────────────────────────────────────────
  // Skip reflow while an IME composition is in progress so we don't
  // interrupt pinyin / kana entry mid-stroke.
  //
  // CRITICAL — there is a race between `input` and `compositionstart` on
  // the very first keystroke with a Chinese IME on macOS.  In Safari /
  // Chrome, `input` can fire BEFORE `compositionstart`, so our manual
  // `composing` flag is still false.  If we reflow (set innerHTML) at
  // that moment we destroy the nascent composition and the raw pinyin
  // letter gets committed — this is the "首行首字母变英文" bug.
  //
  // Two complementary safeguards:
  //   1. Check `e.isComposing` (the browser's own flag — set even before
  //      compositionstart reaches our handler).
  //   2. Defer the reflow via requestAnimationFrame so compositionstart
  //      has time to fire and set our `composing` flag before we act.
  let composing = false;
  el.addEventListener('compositionstart', () => { composing = true; });
  el.addEventListener('compositionend',   () => { composing = false; maybeUndoAutoCap(); reflowCurrentLine(); });

  // macOS "Capitalize words automatically" force-uppercases the first letter
  // of a line even with autocapitalize="off" (the attribute only covers
  // virtual keyboards). That's a constant nuisance when typing pinyin. We
  // can't disable the OS behaviour from a web page, so we undo it: if a line
  // gains a leading uppercase ASCII letter the user did NOT type with Shift /
  // Caps Lock, lower-case it back. Deliberate capitals are preserved.
  let _shiftHeld = false;
  el.addEventListener('keydown', (e) => {
    if (e.key && e.key.length === 1) {
      _shiftHeld = e.shiftKey || e.getModifierState('CapsLock');
    }
  });
  function maybeUndoAutoCap() {
    if (_shiftHeld || composing) return;
    const line = currentLine();
    if (!line) return;
    const text = line.textContent || '';
    if (!/^[A-Z]/.test(text)) return;
    const off = getCaretOffset(line);
    line.textContent = text.charAt(0).toLowerCase() + text.slice(1);
    if (off != null) setCaretOffset(line, off);
  }

  function reflowCurrentLine() {
    if (composing) return;   // extra guard
    const sel = window.getSelection();
    if (!sel.rangeCount) { reflowAll(); return; }
    let line = sel.anchorNode;
    if (!line) { reflowAll(); return; }
    if (line.nodeType === Node.TEXT_NODE) line = line.parentNode;
    while (line && line.parentNode !== el) line = line.parentNode;
    if (!line) { reflowAll(); return; }
    // If the user just split a line (Enter), the new sibling needs styling too.
    reflowLine(line);
    // Also re-apply title styling if the title line was edited (it's just
    // a class — text content isn't touched).
    const first = el.children[0];
    if (first && !first.classList.contains('wysi-title')) reflowLine(first);
  }

  // Deferred reflow — wait one animation frame so compositionstart can fire
  // before we touch the DOM.  Coalesces rapid input events into one reflow.
  let _reflowRaf = 0;
  el.addEventListener('input', (e) => {
    if (composing || e.isComposing) return;
    cancelAnimationFrame(_reflowRaf);
    _reflowRaf = requestAnimationFrame(() => {
      if (composing) return;   // composition started during the wait
      maybeUndoAutoCap();
      reflowCurrentLine();
    });
  });

  // Paste as plain text — keep the editor's markup clean
  el.addEventListener('paste', (e) => {
    e.preventDefault();
    const text = (e.clipboardData || window.clipboardData).getData('text/plain');
    document.execCommand('insertText', false, text);
  });

  /* ── Notion-ish keyboard enhancements ─────────────────────────────────
     The goal here is "typing feels right" without rebuilding into a full
     block-based editor:
       • Cmd/Ctrl+B / I / E / Shift+X — wrap (or unwrap) selection with
         **bold** / *italic* / `code` / ~~strike~~ markers.
       • Enter at end of "- foo" creates "- " on the next line. Enter on
         an empty list marker exits the list. Same for "1. " ordered.
       • Backspace at the very start of "- " deletes the marker.
       • Tab / Shift+Tab indents the current list item by two spaces.
     All shortcuts respect IME composition state (skipped while composing
     so they don't fight Chinese/Japanese pinyin entry).            */
  function currentLine() {
    const sel = window.getSelection();
    if (!sel.rangeCount) return null;
    let n = sel.anchorNode;
    if (n && n.nodeType === Node.TEXT_NODE) n = n.parentNode;
    while (n && n.parentNode !== el) n = n.parentNode;
    return n;
  }
  function caretAtStart(line) {
    const sel = window.getSelection();
    if (!sel.rangeCount) return false;
    return getCaretOffset(line) === 0;
  }
  function wrapSelection(marker, endMarker) {
    if (composing) return false;
    endMarker = endMarker || marker;
    const sel = window.getSelection();
    if (!sel.rangeCount) return false;
    const r = sel.getRangeAt(0);
    const text = r.toString();
    if (text) {
      // Toggle: if selection is already wrapped with marker, strip it
      const line = currentLine();
      if (line) {
        const lineText = line.textContent || '';
        const start = r.startOffset, end = r.endOffset;
        const before = lineText.slice(Math.max(0, start - marker.length), start);
        const after  = lineText.slice(end, end + endMarker.length);
        if (before === marker && after === endMarker) {
          // Unwrap — replace ${marker}${text}${endMarker} with ${text}
          document.execCommand('insertText', false, text);
          return true;
        }
      }
      document.execCommand('insertText', false, marker + text + endMarker);
      // Restore selection to cover the inner text
      return true;
    }
    // No selection — insert markers and place caret between them
    document.execCommand('insertText', false, marker + endMarker);
    const sel2 = window.getSelection();
    if (sel2.rangeCount) {
      const r2 = sel2.getRangeAt(0);
      r2.setStart(r2.startContainer, r2.startOffset - endMarker.length);
      r2.collapse(true);
    }
    return true;
  }
  // Match a leading bullet/ordered marker. Captures: 1=indent, 2=marker (incl. trailing space)
  const LIST_RE = /^(\s*)([-*+]\s|\d+\.\s)/;

  el.addEventListener('keydown', (e) => {
    if (composing) return;
    const meta = e.metaKey || e.ctrlKey;
    // ── Inline formatting shortcuts ──────────────────────────────────
    if (meta && !e.shiftKey && !e.altKey) {
      const k = e.key.toLowerCase();
      if (k === 'b') { e.preventDefault(); wrapSelection('**'); reflowCurrentLine(); return; }
      if (k === 'i') { e.preventDefault(); wrapSelection('*');  reflowCurrentLine(); return; }
      if (k === 'e') { e.preventDefault(); wrapSelection('`');  reflowCurrentLine(); return; }
    }
    if (meta && e.shiftKey && !e.altKey) {
      const k = e.key.toLowerCase();
      if (k === 'x' || k === 's') {
        e.preventDefault(); wrapSelection('~~'); reflowCurrentLine(); return;
      }
    }
    const line = currentLine();
    if (!line) return;
    const text = line.textContent || '';
    const m = text.match(LIST_RE);

    // ── Smart Enter inside a list ─────────────────────────────────────
    if (e.key === 'Enter' && !e.shiftKey && m) {
      const restAfterMarker = text.slice(m[0].length);
      if (restAfterMarker.trim() === '') {
        // Empty list item → exit the list (remove the marker)
        e.preventDefault();
        line.textContent = '';
        reflowLine(line);
        setCaretOffset(line, 0);
        return;
      }
      // Non-empty → after the default Enter splits, prefix the new line
      // with the same marker so the list keeps flowing. We do this by
      // letting Enter run, then in the next tick injecting the marker.
      const indent = m[1];
      let marker = m[2];
      // Auto-increment ordered list numbers (1. → 2.)
      const ord = marker.match(/^(\d+)(\.\s)$/);
      if (ord) marker = (parseInt(ord[1], 10) + 1) + ord[2];
      // Let the browser do the line split first
      setTimeout(() => {
        document.execCommand('insertText', false, indent + marker);
        reflowCurrentLine();
      }, 0);
      return;
    }

    // ── Smart Backspace: at the very start of "- " strip the marker ──
    if (e.key === 'Backspace' && !e.shiftKey && m && caretAtStart(line)) {
      e.preventDefault();
      line.textContent = text.slice(m[0].length);
      reflowLine(line);
      setCaretOffset(line, 0);
      return;
    }

    // ── Tab / Shift+Tab: indent / outdent a list line ─────────────────
    if (e.key === 'Tab' && m) {
      e.preventDefault();
      if (e.shiftKey) {
        // Outdent: remove up to 2 leading spaces
        const stripped = text.replace(/^( {1,2})/, '');
        if (stripped !== text) {
          line.textContent = stripped;
          reflowLine(line);
          setCaretOffset(line, Math.max(0, (getCaretOffset(line) || 0) - 2));
        }
      } else {
        line.textContent = '  ' + text;
        reflowLine(line);
        setCaretOffset(line, (getCaretOffset(line) || 0) + 2);
      }
      return;
    }
  });

  setContent(initialText);

  return {
    el,
    focus() {
      el.focus();
      const sel = window.getSelection();
      const range = document.createRange();
      range.selectNodeContents(el);
      range.collapse(false);
      sel.removeAllRanges();
      sel.addRange(range);
    },
    getValue() {
      return [...el.children].map(d => d.textContent || '').join('\n');
    },
    getTitle() {
      const t = (el.children[0]?.textContent || '').trim();
      return t.replace(/^#+\s*/, '');
    },
    getBody() {
      const ch = [...el.children];
      if (ch.length <= 1) return '';
      return ch.slice(1).map(d => d.textContent || '').join('\n');
    },
    setValue(text) { setContent(text); },
    isEmpty() {
      return [...el.children].every(d => !(d.textContent || '').trim());
    },
  };
}

let activeWysiEditor = null;

/* ═══════════════════════════════════════════════════════════════════
   Long-press drag-and-drop for todo items
   - 300ms long press to "pick up"
   - Drag to reorder within a priority group OR move to another group
   - Drop commits via /api/todos/reorder
   ═══════════════════════════════════════════════════════════════════ */
// How long the user must hold before "picking up" a row for drag-to-reorder.
// We want this short enough that click+drag feels immediate, but not so short
// that a plain click ever triggers a drag. The pointer-move threshold (~6px)
// already prevents a click from accidentally turning into a drag, so we can
// keep this very low.
// How long a pointer must be held STILL before we lift an item without
// any movement. We *also* promote to drag on a >4px move (see
// DRAG_MOVE_THRESHOLD below), so a "press-and-drag" still feels instant.
// This delay only matters when the user holds without moving — and
// previously it was so short (80ms) that an ordinary click that landed
// on the item body sometimes registered as a drag, eating the click that
// was meant to open the inline editor.
const LONG_PRESS_MS = 400;
const drag = {
  el: null, id: null,
  startX: 0, startY: 0,
  offX: 0, offY: 0,
  longPressTimer: null,
  active: false,
  placeholder: null,
  initialPanel: null,
  endedAt: 0,            // timestamp of last drop, used to suppress the click-after-drop
  initialDomKey: '',     // snapshot of (priority,index) for change detection
};

function attachDrag(item) {
  if (item.classList.contains('completed')) return;

  const begin = (clientX, clientY) => {
    // Don't allow a new long-press to start during cooldown after a drop
    if (Date.now() - drag.endedAt < 120) return;
    cancelDrag();
    drag.el = item;
    drag.id = item.dataset.todoId;
    drag.startX = clientX;
    drag.startY = clientY;
    const r = item.getBoundingClientRect();
    drag.offX = clientX - r.left;
    drag.offY = clientY - r.top;
    drag.longPressTimer = setTimeout(() => liftItem(), LONG_PRESS_MS);
  };

  item.addEventListener('mousedown', (e) => {
    if (e.target.closest('[data-act]')) return;
    if (e.button !== 0) return;
    begin(e.clientX, e.clientY);
  });

  item.addEventListener('touchstart', (e) => {
    if (e.target.closest('[data-act]')) return;
    begin(e.touches[0].clientX, e.touches[0].clientY);
  }, { passive: true });
}

function snapshotPanelOrder(panel) {
  // Returns a string like "p4:1,2,3|p3:4,5" representing current todo order
  if (!panel) return '';
  return [...panel.querySelectorAll('.priority-group')].map(g => {
    const ids = [...g.querySelectorAll('.todo-item:not(.completed)')]
      .map(it => it.dataset.todoId);
    return `p${g.dataset.priority}:${ids.join(',')}`;
  }).join('|');
}

function liftItem() {
  if (!drag.el) return;
  const item = drag.el;
  const r = item.getBoundingClientRect();
  drag.initialPanel = item.closest('.todos-panel, .add-todos-panel, .mobile-todos-section, .add-mobile-top');
  drag.initialDomKey = snapshotPanelOrder(drag.initialPanel);

  // Placeholder (keeps space in flow at original position)
  const ph = document.createElement('div');
  ph.className = 'todo-drag-placeholder';
  ph.style.height = r.height + 'px';
  ph.style.margin = '0 0 5px 0';
  item.parentNode.insertBefore(ph, item);
  drag.placeholder = ph;

  // Append the item to document.body so position:fixed escapes
  // any containing-block (backdrop-filter / overflow) from ancestors.
  document.body.appendChild(item);
  item.style.position = 'fixed';
  item.style.top = r.top + 'px';
  item.style.left = r.left + 'px';
  item.style.width = r.width + 'px';
  item.style.zIndex = '2000';
  item.style.pointerEvents = 'none';
  item.style.margin = '0';
  item.classList.add('dragging');

  drag.active = true;
  document.body.classList.add('drag-active');
  if (navigator.vibrate) navigator.vibrate(15);
}

function updateDrag(clientX, clientY) {
  if (!drag.active) return;
  drag.el.style.left = (clientX - drag.offX) + 'px';
  drag.el.style.top  = (clientY - drag.offY) + 'px';

  // Find the closest insertion point
  const panel = drag.initialPanel;
  if (!panel) return;

  const groups = [...panel.querySelectorAll('.priority-group')];
  // Determine target group: the priority-group whose bounding rect contains clientY (or closest by Y)
  let targetGroup = null;
  let bestGroupDist = Infinity;
  for (const g of groups) {
    const gr = g.getBoundingClientRect();
    if (clientY >= gr.top && clientY <= gr.bottom) { targetGroup = g; break; }
    const d = Math.min(Math.abs(clientY - gr.top), Math.abs(clientY - gr.bottom));
    if (d < bestGroupDist) { bestGroupDist = d; targetGroup = g; }
  }
  if (!targetGroup) return;

  // Within the target group, find which item we're above/below
  const peers = [...targetGroup.querySelectorAll('.todo-item:not(.dragging)')];
  if (peers.length === 0) {
    targetGroup.appendChild(drag.placeholder);
    return;
  }
  let inserted = false;
  for (const peer of peers) {
    const pr = peer.getBoundingClientRect();
    if (clientY < pr.top + pr.height / 2) {
      peer.parentNode.insertBefore(drag.placeholder, peer);
      inserted = true;
      break;
    }
  }
  if (!inserted) {
    // append after last peer
    const last = peers[peers.length - 1];
    last.parentNode.insertBefore(drag.placeholder, last.nextSibling);
  }
}

async function commitDrop() {
  if (!drag.active) return;
  const item = drag.el;
  const ph = drag.placeholder;
  const panel = drag.initialPanel;

  // Move item into placeholder position
  ph.parentNode.insertBefore(item, ph);
  ph.remove();

  // If the item landed in a different priority group, refresh its emoji icon
  // immediately so the user doesn't see the old icon until a full re-render.
  const newGroup = item.closest('.priority-group');
  if (newGroup) {
    const newPrio = parseInt(newGroup.dataset.priority, 10);
    const emojiEl = item.querySelector('.item-emoji');
    if (emojiEl) {
      const newEmoji = state.settings[`emoji_todo_${newPrio}`] || CFG.PRIO_DEFAULT_EMOJI[newPrio] || '';
      emojiEl.textContent = newEmoji;
    }
  }

  // Reset visual
  item.style.position = '';
  item.style.top = '';
  item.style.left = '';
  item.style.width = '';
  item.style.zIndex = '';
  item.style.pointerEvents = '';
  item.style.margin = '';
  item.classList.remove('dragging');
  document.body.classList.remove('drag-active');

  // Compute new order from DOM
  const newKey = snapshotPanelOrder(panel);
  const orderChanged = newKey !== drag.initialDomKey;

  drag.endedAt = Date.now();
  drag.active = false;
  drag.el = null;
  drag.placeholder = null;
  drag.initialPanel = null;

  if (orderChanged && panel) {
    const updates = [];
    [...panel.querySelectorAll('.priority-group')].forEach(g => {
      const p = parseInt(g.dataset.priority, 10);
      [...g.querySelectorAll('.todo-item:not(.completed)')].forEach((it, idx) => {
        updates.push({
          id: parseInt(it.dataset.todoId, 10),
          order_index: idx,
          priority: p,
        });
      });
    });
    if (updates.length) {
      // Optimistic update: patch state in-place so next drag has fresh state
      // even while the API call is in flight (the DOM is already correct).
      updates.forEach(u => {
        const t = state.todos.find(t => t.id === u.id);
        if (t) { t.order_index = u.order_index; t.priority = u.priority; }
      });
      // Update the priority label of the dragged item if its group changed
      // (its emoji/label is the same content; the item DOM doesn't store priority directly)
      // Fire and forget — UI is already updated.
      api.post('/todos/reorder', updates).catch(err => {
        console.error('Reorder failed, refetching:', err);
        api.get('/todos').then(t => { state.todos = t; render(); });
      });
    }
  }
}

function cancelDrag() {
  if (drag.longPressTimer) {
    clearTimeout(drag.longPressTimer);
    drag.longPressTimer = null;
  }
  if (drag.active && drag.el && drag.placeholder) {
    // Restore item to its placeholder position (item is currently in body)
    drag.placeholder.parentNode.insertBefore(drag.el, drag.placeholder);
    drag.placeholder.remove();
    drag.el.style.position = '';
    drag.el.style.top = '';
    drag.el.style.left = '';
    drag.el.style.width = '';
    drag.el.style.zIndex = '';
    drag.el.style.pointerEvents = '';
    drag.el.style.margin = '';
    drag.el.classList.remove('dragging');
    document.body.classList.remove('drag-active');
  }
  drag.active = false;
  drag.el = null;
  drag.placeholder = null;
  drag.initialPanel = null;
}

// Global listeners (once)
// Movement threshold for promoting a pending press into an immediate drag.
// Keep this small enough that the user feels "press = drag" but big enough
// to ignore the 1-2px jitter of a steady finger / mouse during a click.
const DRAG_MOVE_THRESHOLD = 4;

window.addEventListener('mousemove', (e) => {
  if (!drag.active && drag.longPressTimer) {
    const dx = Math.abs(e.clientX - drag.startX);
    const dy = Math.abs(e.clientY - drag.startY);
    if (dx > DRAG_MOVE_THRESHOLD || dy > DRAG_MOVE_THRESHOLD) {
      // User started dragging before the long-press timer fired — promote
      // straight to active drag instead of cancelling. This is what makes
      // "press and drag" feel immediate.
      clearTimeout(drag.longPressTimer);
      drag.longPressTimer = null;
      liftItem();
    }
    return;
  }
  if (drag.active) {
    e.preventDefault();
    updateDrag(e.clientX, e.clientY);
  }
});

window.addEventListener('mouseup', () => {
  if (drag.longPressTimer) {
    clearTimeout(drag.longPressTimer);
    drag.longPressTimer = null;
  }
  if (drag.active) commitDrop();
});

window.addEventListener('touchmove', (e) => {
  if (!drag.active && drag.longPressTimer) {
    // On touch, do NOT promote to drag on early movement — that would hijack
    // every scroll gesture as a drag-reorder. Keep the long-press requirement
    // so a quick finger swipe still scrolls the list normally.
    const t = e.touches[0];
    if (Math.abs(t.clientX - drag.startX) > 6 || Math.abs(t.clientY - drag.startY) > 6) {
      clearTimeout(drag.longPressTimer);
      drag.longPressTimer = null;
    }
    return;
  }
  if (drag.active) {
    e.preventDefault();
    const t = e.touches[0];
    updateDrag(t.clientX, t.clientY);
  }
}, { passive: false });

window.addEventListener('touchend', () => {
  if (drag.longPressTimer) {
    clearTimeout(drag.longPressTimer);
    drag.longPressTimer = null;
  }
  if (drag.active) commitDrop();
});

/* ═══════════════════════════════════════════════════════════════════
   Calendar drag/wheel scroll
   ═══════════════════════════════════════════════════════════════════ */
const calDragState = { sc: null, dragging: false, startX: 0, startScroll: 0, moved: 0 };

function bindCalendarScroll() {
  const sc = document.getElementById('cal-scroller');
  if (!sc) { calDragState.sc = null; return; }
  calDragState.sc = sc;

  // Initial: scroll to rightmost (today is last)
  requestAnimationFrame(() => { sc.scrollLeft = sc.scrollWidth; });

  // Wheel = page-by-page snap. We advance/retreat by the visible-width
  // (one whole calendar page) per wheel tick, and lock for a short
  // moment so a rapid trackpad flick doesn't fly past several pages.
  // Horizontal wheel (deltaX, trackpad) is treated the same way.
  let wheelLock = false;
  sc.addEventListener('wheel', (e) => {
    const dy = e.deltaY;
    const dx = e.deltaX;
    const delta = Math.abs(dy) > Math.abs(dx) ? dy : dx;
    if (Math.abs(delta) < 1) return;
    e.preventDefault();
    if (wheelLock) return;
    const pageW = sc.clientWidth;
    const dir = delta > 0 ? 1 : -1;
    sc.scrollTo({ left: sc.scrollLeft + dir * pageW, behavior: 'smooth' });
    wheelLock = true;
    setTimeout(() => { wheelLock = false; }, 320);
  }, { passive: false });

  // Mouse drag (grab and pan)
  sc.addEventListener('mousedown', (e) => {
    if (e.target.closest('.cal-item')) return;
    calDragState.dragging = true;
    calDragState.startX = e.clientX;
    calDragState.startScroll = sc.scrollLeft;
    calDragState.moved = 0;
    sc.classList.add('dragging');
    e.preventDefault();
  });
}

// Window-level handlers (bound once below)
window.addEventListener('mousemove', (e) => {
  if (!calDragState.dragging || !calDragState.sc) return;
  const dx = e.clientX - calDragState.startX;
  calDragState.sc.scrollLeft = calDragState.startScroll - dx;
  calDragState.moved = Math.abs(dx);
});

window.addEventListener('mouseup', () => {
  if (!calDragState.dragging) return;
  calDragState.dragging = false;
  calDragState.sc?.classList.remove('dragging');
  // Reset .moved on the next tick so the click that fires immediately
  // after a pan-release still gets suppressed if the user just dragged.
  setTimeout(() => { calDragState.moved = 0; }, 50);
});

function attachSwipe(item) {
  let startX = 0, currentX = 0, swiping = false, opened = false;
  const swipeBtns = item.querySelector('.todo-swipe-actions');
  if (!swipeBtns) return;
  const SWIPE_WIDTH = 108; // width of the pill panel + a touch of overshoot

  const setBtnsX = (px) => {
    // Preserve vertical centering from CSS
    swipeBtns.style.transform = `translate(${px}px, -50%)`;
  };

  item.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
    swiping = true;
  }, { passive: true });

  item.addEventListener('touchmove', (e) => {
    if (!swiping || drag.active) return;
    currentX = e.touches[0].clientX;
    const dx = startX - currentX;
    if (dx > 0) {
      const t = Math.min(dx, SWIPE_WIDTH);
      item.style.transform = `translateX(-${t}px)`;
      setBtnsX(SWIPE_WIDTH - t);
    } else if (opened && dx < 0) {
      const t = Math.max(0, SWIPE_WIDTH + dx);
      item.style.transform = `translateX(-${t}px)`;
      setBtnsX(SWIPE_WIDTH - t);
    }
  }, { passive: true });

  item.addEventListener('touchend', () => {
    swiping = false;
    const dx = startX - currentX;
    if (dx > 50) {
      item.style.transform = `translateX(-${SWIPE_WIDTH}px)`;
      setBtnsX(0);
      opened = true;
    } else {
      item.style.transform = '';
      swipeBtns.style.transform = '';
      opened = false;
    }
  });
}

/* ═══════════════════════════════════════════════════════════════════
   Edit Modal
   ═══════════════════════════════════════════════════════════════════ */
/* ═══════════════════════════════════════════════════════════════════
   Inline editing (in-place row editor)
   ═══════════════════════════════════════════════════════════════════ */
/* ═══════════════════════════════════════════════════════════════════
   Calendar item editor — same `state.inlineEdit` machinery is reused
   for both display modes:
     - expand: replace the `.cal-item` in place with the inline editor
     - popup : render the editor inside #edit-modal (centered modal)
   On save/cancel/delete, `state.inlineEdit.mode === 'popup'` tells the
   save/close handlers to also hide the modal. After that, `render()`
   redraws the calendar with fresh data and the editor unmounts cleanly.
   ═══════════════════════════════════════════════════════════════════ */
async function openCalEdit(kind, id, mode) {
  // If something else is being edited, save it first so we don't strand state.
  if (state.inlineEdit) { await saveInlineEdit(); }
  const source = (kind === 'todo'
    ? state.todos.find(t => String(t.id) === String(id))
    : state.thoughts.find(t => String(t.id) === String(id)));
  if (!source) return;
  state.inlineEdit  = { kind, id, data: { ...source }, mode };
  state.inlineEditor = null;
  const html = (kind === 'todo'
    ? renderTodoInlineEditor(source)
    : renderThoughtInlineEditor(source)).trim();

  if (mode === 'popup') {
    const modal = document.getElementById('edit-modal');
    const card  = modal.querySelector('.modal-card');
    card.innerHTML = html;
    modal.classList.remove('hidden');
  } else {
    // expand: replace just the cal-item with the editor
    const item = document.querySelector(
      `.cal-item[data-cal-kind="${kind}"][data-cal-id="${CSS.escape(String(id))}"]`
    );
    if (!item) { state.inlineEdit = null; return; }
    const tmp = document.createElement('template');
    tmp.innerHTML = html;
    const ed = tmp.content.firstElementChild;
    ed.classList.add('cal-inline-edit');
    item.replaceWith(ed);
  }
  initInlineEditDom();
}

/* Calendar day "+" button → inline-add a brand-new completed todo dated to
   that day, using the same expand editor as item editing. The item has no id
   yet; saveInlineEdit() sees `isNew` and POSTs + marks it complete on the
   chosen date. */
async function openCalDayAdd(isoDate) {
  if (state.inlineEdit) { await saveInlineEdit(); }
  const data = { id: '', content: '', priority: 1, completed: 0 };
  state.inlineEdit  = { kind: 'todo', id: null, isNew: true, newDate: isoDate, data, mode: 'expand' };
  state.inlineEditor = null;

  const dayBody = document.querySelector(
    `.calendar-day[data-date="${CSS.escape(isoDate)}"] .cal-day-body`
  );
  if (!dayBody) { state.inlineEdit = null; return; }

  const tmp = document.createElement('template');
  tmp.innerHTML = renderTodoInlineEditor(data).trim();
  const ed = tmp.content.firstElementChild;
  ed.classList.add('cal-inline-edit');

  // Drop the "无记录" placeholder if present, then prepend the editor.
  const empty = dayBody.querySelector('.empty-state');
  if (empty) empty.remove();
  dayBody.prepend(ed);

  initInlineEditDom();
}

function hideEditModal() {
  const modal = document.getElementById('edit-modal');
  if (!modal) return;
  modal.classList.add('hidden');
  const card = modal.querySelector('.modal-card');
  if (card) card.innerHTML = '';
}

async function openInlineEdit(kind, id) {
  // If already editing this row, no-op
  if (state.inlineEdit && state.inlineEdit.kind === kind && String(state.inlineEdit.id) === String(id)) return;
  // If editing a different row, auto-save it first (full re-render, then continue)
  if (state.inlineEdit) {
    await saveInlineEdit();
  }
  const source = (kind === 'todo'
    ? state.todos.find(t => String(t.id) === String(id))
    : state.thoughts.find(t => String(t.id) === String(id)));
  if (!source) return;
  state.inlineEdit = { kind, id, data: { ...source } };
  state.inlineEditor = null;
  swapViewRowToInline();
}

function closeInlineEdit() {
  if (!state.inlineEdit) return;
  const mode = state.inlineEdit.mode;
  if (mode === 'popup' || mode === 'expand') {
    // Calendar editor → hide the modal (if any) and let render() redraw
    // the calendar with whatever state.thoughts / state.todos hold now.
    state.inlineEdit = null;
    state.inlineEditor = null;
    if (mode === 'popup') hideEditModal();
    render();
    return;
  }
  swapInlineRowToView();
  state.inlineEdit = null;
  state.inlineEditor = null;
}

/* Targeted DOM swap: replace just the one row instead of re-rendering the
   whole card. Avoids the full-card flash + the itemIn animation re-running
   on every other todo/thought. */
function swapViewRowToInline() {
  if (!state.inlineEdit) return;
  const { kind, id, data } = state.inlineEdit;
  const sel = kind === 'todo'
    ? `.todo-item[data-todo-id="${CSS.escape(String(id))}"]`
    : `.thought-item[data-thought-id="${CSS.escape(String(id))}"]`;
  const el = document.querySelector(sel);
  if (!el) { render(); return; }
  const html = (kind === 'todo' ? renderTodoInlineEditor(data) : renderThoughtInlineEditor(data)).trim();
  const tmp = document.createElement('template');
  tmp.innerHTML = html;
  const newEl = tmp.content.firstElementChild;
  el.replaceWith(newEl);
  initInlineEditDom();
}

function swapInlineRowToView() {
  if (!state.inlineEdit) return;
  const { kind, id } = state.inlineEdit;
  const sel = kind === 'todo'
    ? `.inline-edit[data-todo-id="${CSS.escape(String(id))}"]`
    : `.inline-edit[data-thought-id="${CSS.escape(String(id))}"]`;
  const el = document.querySelector(sel);
  if (!el) return;
  const source = (kind === 'todo'
    ? state.todos.find(t => String(t.id) === String(id))
    : state.thoughts.find(t => String(t.id) === String(id)));
  if (!source) { el.remove(); return; }
  // Temporarily clear inlineEdit so renderTodoItem / renderThoughtItem produce
  // the view markup instead of recursively returning the editor markup
  const saved = state.inlineEdit;
  state.inlineEdit = null;
  const html = (kind === 'todo' ? renderTodoItem(source) : renderThoughtItem(source)).trim();
  state.inlineEdit = saved;
  const tmp = document.createElement('template');
  tmp.innerHTML = html;
  const newEl = tmp.content.firstElementChild;
  newEl.style.animation = 'none'; // prevent itemIn flash on the restored row
  el.replaceWith(newEl);
  // Re-attach gestures on the restored row
  if (kind === 'todo' && !source.completed) attachDrag(newEl);
  if (state.isMobile && kind === 'todo')   attachSwipe(newEl);
}

/* DOM-level init for the inline editor (focus, WYSI mount, key bindings).
   Extracted so it can run after either a full render() or a targeted swap. */
function initInlineEditDom() {
  if (!state.inlineEdit) return;
  const { kind, data } = state.inlineEdit;
  if (kind === 'todo') {
    const inp = document.querySelector('.inline-edit-input');
    if (!inp) return;
    inp.focus();
    const len = inp.value.length;
    inp.setSelectionRange(len, len);
    inp.onkeydown = (e) => {
      if (e.key === 'Enter')        { e.preventDefault(); saveInlineEdit(); }
      else if (e.key === 'Escape')  { e.preventDefault(); closeInlineEdit(); }
    };
  } else {
    const wel = document.getElementById('inline-edit-wysi');
    if (!wel) return;
    const fullText = data.title ? (data.title + '\n' + (data.content || '')) : (data.content || '');
    state.inlineEditor = setupWysiEditor(wel, fullText);
    wel.addEventListener('keydown', (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') { e.preventDefault(); saveInlineEdit(); }
      else if (e.key === 'Escape')                       { e.preventDefault(); closeInlineEdit(); }
    });
    setTimeout(() => {
      wel.focus();
      const sel = window.getSelection();
      const range = document.createRange();
      range.selectNodeContents(wel);
      range.collapse(false);
      sel.removeAllRanges();
      sel.addRange(range);
    }, 30);
  }
}

async function saveInlineEdit() {
  if (!state.inlineEdit) return;
  const { kind, id, data, isNew, newDate } = state.inlineEdit;
  if (kind === 'todo') {
    const inp = document.querySelector('.inline-edit-input');
    const newContent = (inp?.value || '').trim();
    // Empty content → silently cancel (no alert; user just exited an empty edit)
    if (!newContent) { closeInlineEdit(); return; }
    if (isNew) {
      // New calendar entry: create the todo, then mark it completed on the
      // chosen day (noon, so it sorts naturally and matches that date).
      const created = await api.post('/todos', { content: newContent, priority: data.priority, emoji: '' });
      await api.put(`/todos/${created.id}`, { completed: 1, completed_at: `${newDate} 12:00:00` });
      state.todos = await api.get('/todos');
    } else {
      // No change → just close, skip the network round-trip
      if (newContent === data.content && (data._origPriority === data.priority || data.priority === undefined)) {
        closeInlineEdit(); return;
      }
      await api.put(`/todos/${id}`, { content: newContent, priority: data.priority });
      state.todos = await api.get('/todos');
    }
  } else {
    if (!state.inlineEditor || state.inlineEditor.isEmpty()) { closeInlineEdit(); return; }
    let title = state.inlineEditor.getTitle();
    const body = state.inlineEditor.getBody().trim();
    if (title.length > 120) title = title.slice(0, 120);
    if (!title && !body) { closeInlineEdit(); return; }
    await api.put(`/thoughts/${id}`, { title, content: body || title, type: data.type });
    state.thoughts = await api.get('/thoughts');
  }
  // Data may have reordered (priority / created_at) — do a full render
  const mode = state.inlineEdit.mode;
  state.inlineEdit = null;
  state.inlineEditor = null;
  if (mode === 'popup') hideEditModal();
  render();
}

async function deleteInlineEdit() {
  if (!state.inlineEdit) return;
  if (!confirm('确定删除这条记录？')) return;
  const { kind, id } = state.inlineEdit;
  if (kind === 'todo') {
    await api.del(`/todos/${id}`);
    state.todos = await api.get('/todos');
  } else {
    await api.del(`/thoughts/${id}`);
    state.thoughts = await api.get('/thoughts');
  }
  closeInlineEdit();
}

async function toggleCompleteInline(newCompleted) {
  if (!state.inlineEdit || state.inlineEdit.kind !== 'todo') return;
  const { id } = state.inlineEdit;
  if (newCompleted) {
    await api.post(`/todos/${id}/complete`);
  } else {
    await api.put(`/todos/${id}`, { completed: 0, completed_at: null });
  }
  state.todos = await api.get('/todos');
  closeInlineEdit();
}

function openEditModal(kind, id) {
  let data;
  if (kind === 'todo') {
    data = state.todos.find(t => t.id == id);
  } else {
    data = state.thoughts.find(t => t.id == id);
  }
  if (!data) return;
  state.editing = { kind, data: { ...data } };
  renderEditModal();
  document.getElementById('edit-modal').classList.remove('hidden');
  setTimeout(() => {
    document.querySelector('#edit-modal .modal-input, #edit-modal .modal-textarea')?.focus();
  }, 60);
}

function closeEditModal() {
  state.editing = null;
  document.getElementById('edit-modal').classList.add('hidden');
}

function renderEditModal() {
  const card = document.querySelector('#edit-modal .modal-card');
  if (!state.editing) { card.innerHTML = ''; return; }
  const { kind, data } = state.editing;

  if (kind === 'todo') {
    card.innerHTML = `
      <div class="modal-header">
        <div class="modal-title">编辑代办</div>
        <button class="icon-btn" data-act="close-modal" title="关闭">×</button>
      </div>
      <div class="modal-body">
        <div>
          <div class="modal-field-label">内容</div>
          <input type="text" class="modal-input" id="edit-todo-content" value="${utils.esc(data.content)}" autocapitalize="off" autocorrect="off" spellcheck="false">
        </div>
        <div>
          <div class="modal-field-label">优先级</div>
          <div class="priority-selector" style="gap:6px">
            ${[4,3,2,1].map(p => `
              <button class="prio-btn ${data.priority===p?'active':''}" data-act="edit-prio" data-p="${p}" title="${CFG.PRIO_LABEL[p]}">${utils.esc(state.settings[`emoji_todo_${p}`])}</button>
            `).join('')}
          </div>
        </div>
        ${data.completed ? `
        <div style="font-size:12px;color:var(--text-tertiary)">已完成于 ${utils.formatDate(data.completed_at)} ${utils.formatTime(data.completed_at)}</div>
        ` : ''}
      </div>
      <div class="modal-footer">
        <button class="danger-btn" data-act="delete-editing">删除</button>
        <div style="flex:1"></div>
        ${!data.completed ? `<button class="glass-btn" data-act="complete-editing">标记完成</button>` : `<button class="glass-btn" data-act="uncomplete-editing">恢复未完成</button>`}
        <button class="glass-btn" data-act="close-modal">取消</button>
        <button class="glass-btn primary" data-act="save-editing">保存</button>
      </div>
    `;
  } else {
    // thought
    const fullText = data.title ? (data.title + '\n' + (data.content || '')) : (data.content || '');
    card.innerHTML = `
      <div class="modal-header">
        <div class="modal-title">编辑${data.type==='feeling'?'感受':'想法'}</div>
        <button class="icon-btn" data-act="close-modal" title="关闭">×</button>
      </div>
      <div class="modal-body">
        <div>
          <div class="modal-field-label">类型</div>
          <div class="type-toggle" style="display:inline-flex">
            <button class="${data.type==='thought'?'active':''}" data-act="edit-type" data-type="thought">${utils.esc(state.settings.emoji_thought)} 想法</button>
            <button class="${data.type==='feeling'?'active':''}" data-act="edit-type" data-type="feeling">${utils.esc(state.settings.emoji_feeling)} 感受</button>
          </div>
        </div>
        <div style="flex:1;min-height:240px;display:flex;flex-direction:column">
          <div class="modal-field-label">内容（第一行为标题）</div>
          <div id="edit-thought-wysi" class="wysi-editor" style="min-height:200px;border:1px solid var(--item-border);border-radius:var(--radius-btn);padding:8px 12px;background:var(--item-glass)"></div>
        </div>
        <div style="font-size:11px;color:var(--text-tertiary)">创建于 ${utils.formatDate(data.created_at)} ${utils.formatTime(data.created_at)}</div>
      </div>
      <div class="modal-footer">
        <button class="danger-btn" data-act="delete-editing">删除</button>
        <div style="flex:1"></div>
        <button class="glass-btn" data-act="close-modal">取消</button>
        <button class="glass-btn primary" data-act="save-editing">保存</button>
      </div>
    `;
    // Initialize the WYSIWYG editor with current content
    const wEl = document.getElementById('edit-thought-wysi');
    if (wEl) {
      state.editing.editor = setupWysiEditor(wEl, fullText);
    }
  }
}

async function saveEditing() {
  if (!state.editing) return;
  const { kind, data } = state.editing;

  if (kind === 'todo') {
    const newContent = document.getElementById('edit-todo-content').value.trim();
    if (!newContent) { alert('内容不能为空'); return; }
    await api.put(`/todos/${data.id}`, {
      content: newContent,
      priority: data.priority,
    });
    state.todos = await api.get('/todos');
  } else {
    const editor = state.editing.editor;
    if (!editor || editor.isEmpty()) { alert('内容不能为空'); return; }
    let title = editor.getTitle();
    const body = editor.getBody().trim();
    if (title.length > 120) title = title.slice(0, 120);
    if (!title && !body) { alert('内容不能为空'); return; }
    await api.put(`/thoughts/${data.id}`, {
      title,
      content: body || title,
      type: data.type,
    });
    state.thoughts = await api.get('/thoughts');
  }
  closeEditModal();
  render();
}

async function deleteEditing() {
  if (!state.editing) return;
  const { kind, data } = state.editing;
  if (!confirm('确定删除这条记录？')) return;
  if (kind === 'todo') {
    await api.del(`/todos/${data.id}`);
    state.todos = await api.get('/todos');
  } else {
    await api.del(`/thoughts/${data.id}`);
    state.thoughts = await api.get('/thoughts');
  }
  closeEditModal();
  render();
}

async function toggleCompleteEditing(newCompleted) {
  if (!state.editing || state.editing.kind !== 'todo') return;
  const { data } = state.editing;
  if (newCompleted) {
    await api.post(`/todos/${data.id}/complete`);
  } else {
    await api.put(`/todos/${data.id}`, { completed: 0, completed_at: null });
  }
  state.todos = await api.get('/todos');
  closeEditModal();
  render();
}

// Click handler for the edit modal (delegated). Handles both the legacy
// `state.editing` modal AND the new calendar popup, which reuses the
// inline-* action set (`inline-save`, `inline-cancel`, etc).
document.getElementById('edit-modal').addEventListener('click', async (e) => {
  const el = e.target.closest('[data-act]');
  if (!el) return;
  const act = el.dataset.act;
  switch (act) {
    case 'close-modal':
      if (state.inlineEdit && state.inlineEdit.mode === 'popup') {
        await saveInlineEdit();   // overlay click → auto-save & close
      } else {
        closeEditModal();
      }
      break;
    case 'save-editing':      await saveEditing(); break;
    case 'delete-editing':    await deleteEditing(); break;
    case 'complete-editing':  await toggleCompleteEditing(true);  break;
    case 'uncomplete-editing':await toggleCompleteEditing(false); break;
    case 'edit-prio':
      state.editing.data.priority = parseInt(el.dataset.p, 10);
      renderEditModal(); break;
    case 'edit-type':
      state.editing.data.type = el.dataset.type;
      renderEditModal(); break;
    // Inline-editor actions (calendar popup mode reuses these)
    case 'inline-save':       await saveInlineEdit();          break;
    case 'inline-cancel':     closeInlineEdit();               break;
    case 'inline-delete':     await deleteInlineEdit();        break;
    case 'inline-complete':   await toggleCompleteInline(true);  break;
    case 'inline-uncomplete': await toggleCompleteInline(false); break;
    case 'inline-prio':
      if (state.inlineEdit) {
        state.inlineEdit.data.priority = parseInt(el.dataset.p, 10);
        el.parentElement.querySelectorAll('.prio-btn').forEach(b => {
          b.classList.toggle('active', parseInt(b.dataset.p, 10) === state.inlineEdit.data.priority);
        });
      }
      break;
    case 'inline-type':
      if (state.inlineEdit) {
        state.inlineEdit.data.type = el.dataset.type;
        el.parentElement.querySelectorAll('button').forEach(b => {
          b.classList.toggle('active', b.dataset.type === state.inlineEdit.data.type);
        });
      }
      break;
  }
});

// ESC to close edit modal / inline editor (ESC always CANCELS, never saves)
document.addEventListener('keydown', (e) => {
  if (e.key !== 'Escape') return;
  if (state.editing)   { closeEditModal(); return; }
  if (state.inlineEdit) { closeInlineEdit(); return; }
});

// Click outside the card entirely (e.g. on the wallpaper) auto-saves
// the open inline editor. Clicks inside #card-wrapper are handled by the
// card-level dispatcher above.
//
// IMPORTANT: when an in-place row is swapped to the editor, the original
// click target is detached from the DOM by the time this handler runs.
// `e.target.closest('#card-wrapper')` would then return null (the
// detached node has no parent chain) and we'd auto-save the editor we
// just opened — closing it immediately. Use composedPath() which is
// captured at dispatch time and survives detachment.
document.addEventListener('click', (e) => {
  if (!state.inlineEdit) return;
  const path = e.composedPath();
  if (path.some(n => n && (n.id === 'card-wrapper' || n.id === 'edit-modal'))) return;
  saveInlineEdit();
});

/* ═══════════════════════════════════════════════════════════════════
   Init
   ═══════════════════════════════════════════════════════════════════ */
async function init() {
  await refreshAll();
  applySettings();
  render();
}

init().catch(err => {
  console.error('Init failed:', err);
  document.getElementById('card-wrapper').innerHTML =
    `<div style="padding:24px;color:#fff;background:rgba(255,0,0,0.3);border-radius:16px">
       <h3>启动失败</h3>
       <p>${err.message}</p>
       <p>请检查后端服务是否启动 (python app.py)</p>
     </div>`;
});
