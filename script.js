(() => {
  const root = document.documentElement;

  /* ---------- Theme ---------- */
  const T_KEY = 'cv-theme-v3';
  // light -> dark -> hack -> light. 'hack' is a DARK theme (never treat it as light).
  const THEMES = ['light', 'dark', 'hack'];
  const normTheme = (t) => (THEMES.indexOf(t) > -1 ? t : 'light');
  // Inline head script already applied the theme; this just keeps it consistent.
  if (!root.getAttribute('data-theme')) {
    root.setAttribute('data-theme', normTheme(localStorage.getItem(T_KEY)));
  }

  document.getElementById('themeToggle').addEventListener('click', () => {
    const cur = normTheme(root.getAttribute('data-theme'));
    const next = THEMES[(THEMES.indexOf(cur) + 1) % THEMES.length];
    root.setAttribute('data-theme', next);
    localStorage.setItem(T_KEY, next);
  });

  /* ---------- i18n ---------- */
  const L_KEY = 'cv-lang';
  const SUPPORTED = ['en', 'az', 'ru', 'tr'];
  const detect = () => {
    const stored = localStorage.getItem(L_KEY);
    if (stored && SUPPORTED.includes(stored)) return stored;
    const browser = (navigator.language || 'en').slice(0, 2).toLowerCase();
    return SUPPORTED.includes(browser) ? browser : 'en';
  };

  const applyLang = (lang) => {
    const dict = (window.I18N && window.I18N[lang]) || window.I18N.en;
    root.lang = lang;

    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const key = el.getAttribute('data-i18n');
      if (dict[key] !== undefined) el.textContent = dict[key];
    });

    document.querySelectorAll('[data-i18n-html]').forEach((el) => {
      const key = el.getAttribute('data-i18n-html');
      if (dict[key] !== undefined) el.innerHTML = dict[key];
    });

    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    document.getElementById('langCurrent').textContent = lang.toUpperCase();
    document.querySelectorAll('.lang-menu li').forEach((li) => {
      li.classList.toggle('active', li.dataset.lang === lang);
    });

    updateDateTime(lang);
  };

  /* ---------- Date / Time / Greeting ---------- */
  const MONTHS = {
    en: ['January','February','March','April','May','June','July','August','September','October','November','December'],
    az: ['Yanvar','Fevral','Mart','Aprel','May','İyun','İyul','Avqust','Sentyabr','Oktyabr','Noyabr','Dekabr'],
    ru: ['января','февраля','марта','апреля','мая','июня','июля','августа','сентября','октября','ноября','декабря'],
    tr: ['Ocak','Şubat','Mart','Nisan','Mayıs','Haziran','Temmuz','Ağustos','Eylül','Ekim','Kasım','Aralık'],
  };
  const WEEKDAYS = {
    en: ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'],
    az: ['bazar','bazar ertəsi','çərşənbə axşamı','çərşənbə','cümə axşamı','cümə','şənbə'],
    ru: ['воскресенье','понедельник','вторник','среда','четверг','пятница','суббота'],
    tr: ['Pazar','Pazartesi','Salı','Çarşamba','Perşembe','Cuma','Cumartesi'],
  };
  const greetings = {
    en: { morning: 'Good morning', day: 'Good afternoon', evening: 'Good evening', night: 'Good night' },
    az: { morning: 'Sabahınız xeyir', day: 'Günortanız xeyir', evening: 'Axşamınız xeyir', night: 'Gecəniz xeyir' },
    ru: { morning: 'Доброе утро', day: 'Добрый день', evening: 'Добрый вечер', night: 'Доброй ночи' },
    tr: { morning: 'Günaydın', day: 'İyi günler', evening: 'İyi akşamlar', night: 'İyi geceler' },
  };
  const greetingFor = (hour, lang) => {
    const g = greetings[lang] || greetings.en;
    if (hour >= 5 && hour < 12) return g.morning;
    if (hour >= 12 && hour < 18) return g.day;
    if (hour >= 18 && hour < 23) return g.evening;
    return g.night;
  };

  const formatDate = (now, lang) => {
    const day = now.getDate();
    const month = (MONTHS[lang] || MONTHS.en)[now.getMonth()];
    const year = now.getFullYear();
    const weekday = (WEEKDAYS[lang] || WEEKDAYS.en)[now.getDay()];
    switch (lang) {
      case 'az': return `${day} ${month.toUpperCase()} ${year}, ${weekday}`;
      case 'tr': return `${day} ${month} ${year} ${weekday}`;
      case 'ru': return `${day} ${month} ${year} г., ${weekday}`;
      default:   return `${weekday}, ${month} ${day}, ${year}`;
    }
  };

  let currentLang = 'en';
  const dtGreetingEl = document.getElementById('dtGreeting');
  const dtDateEl = document.getElementById('dtDate');
  const dtTimeEl = document.getElementById('dtTime');

  const pad = (n) => String(n).padStart(2, '0');
  const renderDateTime = () => {
    const now = new Date();
    if (dtTimeEl) {
      dtTimeEl.textContent = `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
    }
    if (dtDateEl) dtDateEl.textContent = formatDate(now, currentLang);
    if (dtGreetingEl) dtGreetingEl.textContent = greetingFor(now.getHours(), currentLang);
  };

  function updateDateTime(lang) {
    currentLang = lang;
    renderDateTime();
  }

  // Render immediately so the banner never shows empty / placeholder text,
  // even if applyLang fails for any reason.
  try { renderDateTime(); } catch (_) {}
  try { applyLang(detect()); } catch (_) {}
  setInterval(() => { try { renderDateTime(); } catch (_) {} }, 1000);

  const btn = document.getElementById('langBtn');
  const menu = document.getElementById('langMenu');
  const closeMenu = () => {
    menu.classList.remove('open');
    btn.setAttribute('aria-expanded', 'false');
  };
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    const isOpen = menu.classList.toggle('open');
    btn.setAttribute('aria-expanded', String(isOpen));
  });
  menu.addEventListener('click', (e) => {
    const li = e.target.closest('li[data-lang]');
    if (!li) return;
    const lang = li.dataset.lang;
    localStorage.setItem(L_KEY, lang);
    applyLang(lang);
    closeMenu();
  });
  document.addEventListener('click', (e) => {
    if (!menu.contains(e.target) && !btn.contains(e.target)) closeMenu();
  });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeMenu(); });

  /* ---------- Visitor counter (Abacus) ---------- */
  const counterEl = document.getElementById('visitorCounter');
  const todayEl = document.getElementById('vcToday');
  const totalEl = document.getElementById('vcTotal');
  const NS = 'goshgarhasanov-cv';
  const today = new Date();
  const todayKey = 'd' + today.getFullYear() + String(today.getMonth() + 1).padStart(2, '0') + String(today.getDate()).padStart(2, '0');
  const fmt = (n) => Number(n).toLocaleString();

  const visitedKey = 'cv-visited-' + todayKey;
  const alreadyCounted = sessionStorage.getItem(visitedKey) === '1';

  const abacus = (verb, key) =>
    fetch(`https://abacus.jasoncameron.dev/${verb}/${NS}/${key}`)
      .then((r) => (r.ok ? r.json() : null))
      .catch(() => null);

  // For unseen counters, GET returns 404 — fall back to HIT to create them.
  const fetchCount = async (key) => {
    if (alreadyCounted) {
      const got = await abacus('get', key);
      if (got && (got.value ?? got.count) != null) return got;
    }
    return abacus('hit', key);
  };

  Promise.all([fetchCount('total'), fetchCount(todayKey)]).then(([total, day]) => {
    const totalCount = total && (total.value ?? total.count);
    const todayCount = day && (day.value ?? day.count);
    if (totalCount != null) totalEl.textContent = fmt(totalCount);
    if (todayCount != null) todayEl.textContent = fmt(todayCount);
    if (totalCount != null || todayCount != null) counterEl.hidden = false;
    if (!alreadyCounted) sessionStorage.setItem(visitedKey, '1');
  });

  /* ---------- Photo modal ---------- */
  const avatarBtn = document.getElementById('avatarBtn');
  const photoModal = document.getElementById('photoModal');
  const pmClose = document.getElementById('pmClose');

  const openModal = () => {
    if (!photoModal) return;
    photoModal.classList.add('open');
    photoModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };
  const closeModal = () => {
    if (!photoModal) return;
    photoModal.classList.remove('open');
    photoModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  if (avatarBtn) avatarBtn.addEventListener('click', openModal);
  if (pmClose) pmClose.addEventListener('click', closeModal);
  if (photoModal) {
    photoModal.querySelectorAll('[data-close]').forEach((el) => {
      el.addEventListener('click', closeModal);
    });
  }
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && photoModal && photoModal.classList.contains('open')) closeModal();
  });

  /* ---------- Ambient canvas: drifting particles / matrix rain + "GH" mouse trail (behind content) ---------- */
  (function ambient() {
    const canvas = document.getElementById('bgCanvas');
    if (!canvas) return;

    const isTouch = matchMedia('(hover: none) and (pointer: coarse)').matches;
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isTouch || reduce) { canvas.remove(); return; }

    const ctx = canvas.getContext('2d', { alpha: true });
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0, h = 0;

    // Offscreen buffer for the matrix rain: it keeps its own persistent trail
    // (faded by erasing, so the buffer stays transparent) and is composited
    // onto the visible canvas once per frame.
    const rain = document.createElement('canvas');
    const rctx = rain.getContext('2d', { alpha: true });

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + 'px';
      canvas.style.height = h + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      rain.width = w * dpr;
      rain.height = h * dpr;
      rctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      layoutRain();
    };

    /* ----- theme mode ----- */
    const themeMode = () => {
      const t = document.documentElement.getAttribute('data-theme');
      return (t === 'dark' || t === 'hack') ? t : 'light';
    };
    // 'hack' is a dark theme too.
    const isDark = () => themeMode() !== 'light';

    const palette = ['#ff6b6b', '#ffb84d', '#14b8a6', '#8b5cf6', '#3b82f6', '#ec4899'];
    const hexToRgba = (hex, a) => {
      const r = parseInt(hex.slice(1, 3), 16);
      const g = parseInt(hex.slice(3, 5), 16);
      const b = parseInt(hex.slice(5, 7), 16);
      return `rgba(${r},${g},${b},${a})`;
    };

    /* ----- Matrix rain state ----- */
    const RAIN_FONT = 15;               // px, also the column pitch
    const RAIN_MIN_STEP = 50;           // ms per row  -> 20 rows/sec
    const RAIN_MAX_STEP = 71;           // ms per row  -> ~14 rows/sec
    const RAIN_ALPHA = 0.5;             // composite alpha: keep body text readable
    const RAIN_HEAD = 'rgba(200,255,215,0.92)';
    const RAIN_BODY = 'rgba(46,255,133,0.55)';
    const RAIN_FADE = 0.085;            // per 16.7ms erase strength
    // Katakana + digits + a few symbols.
    const GLYPHS = ('ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ' +
                   '0123456789' + ':.=*+-<>|/#$%&_').split('');
    const GLYPH_N = GLYPHS.length;

    let cols = 0;
    let colY = null;      // head row index per column
    let colNext = null;   // next step timestamp per column
    let colStep = null;   // ms per row per column

    function layoutRain() {
      const next = Math.max(1, Math.ceil(w / RAIN_FONT) + 1);
      if (next !== cols || !colY) {
        cols = next;
        colY = new Int32Array(cols);
        colNext = new Float64Array(cols);
        colStep = new Float32Array(cols);
        for (let i = 0; i < cols; i++) seedColumn(i, true);
      }
      rctx.font = `${RAIN_FONT}px 'JetBrains Mono', ui-monospace, monospace`;
      rctx.textAlign = 'left';
      rctx.textBaseline = 'top';
    }

    function seedColumn(i, scatter) {
      const rows = Math.ceil(h / RAIN_FONT);
      colY[i] = scatter ? -((Math.random() * rows) | 0) : -((Math.random() * 26) | 0);
      colNext[i] = 0;
      colStep[i] = RAIN_MIN_STEP + Math.random() * (RAIN_MAX_STEP - RAIN_MIN_STEP);
    }

    function resetRain() {
      rctx.setTransform(1, 0, 0, 1, 0, 0);
      rctx.clearRect(0, 0, rain.width, rain.height);
      rctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (colY) for (let i = 0; i < cols; i++) seedColumn(i, true);
    }

    function drawRain(now, dt) {
      // Fade what is already there by erasing towards transparency, so the
      // buffer never turns into an opaque black rectangle over the page bg.
      const fade = Math.min(0.4, RAIN_FADE * (dt / 16.7));
      rctx.globalCompositeOperation = 'destination-out';
      rctx.fillStyle = `rgba(0,0,0,${fade})`;
      rctx.fillRect(0, 0, w, h);
      rctx.globalCompositeOperation = 'source-over';

      const limit = h + RAIN_FONT * 2;
      for (let i = 0; i < cols; i++) {
        if (now < colNext[i]) continue;
        colNext[i] = now + colStep[i];

        const x = i * RAIN_FONT;
        const prevY = colY[i] * RAIN_FONT;
        // Old head becomes a dimmer body glyph (and mutates, as it should).
        if (prevY >= -RAIN_FONT && prevY < limit) {
          rctx.fillStyle = RAIN_BODY;
          rctx.fillText(GLYPHS[(Math.random() * GLYPH_N) | 0], x, prevY);
        }

        colY[i]++;
        const y = colY[i] * RAIN_FONT;
        if (y > limit) { seedColumn(i, false); continue; }
        if (y >= -RAIN_FONT) {
          rctx.fillStyle = RAIN_HEAD;
          rctx.fillText(GLYPHS[(Math.random() * GLYPH_N) | 0], x, y);
        }
      }

      ctx.globalAlpha = RAIN_ALPHA;
      ctx.drawImage(rain, 0, 0, w, h);
      ctx.globalAlpha = 1;
    }

    /* ----- Drifting particles ----- */
    const COUNT = 38;
    const particles = Array.from({ length: COUNT }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: 1.6 + Math.random() * 4,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
      color: palette[(Math.random() * palette.length) | 0],
      baseA: 0.18 + Math.random() * 0.22,
      pulse: Math.random() * Math.PI * 2,
      pulseSpeed: 0.008 + Math.random() * 0.012,
    }));

    function drawParticles(glowAlpha) {
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < -20) p.x = w + 20;
        if (p.x > w + 20) p.x = -20;
        if (p.y < -20) p.y = h + 20;
        if (p.y > h + 20) p.y = -20;
        p.pulse += p.pulseSpeed;

        const a = p.baseA * (0.55 + Math.sin(p.pulse) * 0.45) * glowAlpha;
        const R = p.r * 5;
        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, R);
        grad.addColorStop(0, hexToRgba(p.color, a));
        grad.addColorStop(1, hexToRgba(p.color, 0));
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(p.x, p.y, R, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    /* ----- "GH" mouse trail ----- */
    const trail = [];
    const TRAIL_LIFE_MS = 1100;
    // "GH" trail colours differ per theme: warm orange on light, cool cyan on
    // dark, neon green on hack.
    const TRAIL_COLORS = {
      light: { from: '#f97316', mid: '#fb923c', to: '#f59e0b', glow: '#f97316' },
      dark:  { from: '#22d3ee', mid: '#38bdf8', to: '#a78bfa', glow: '#22d3ee' },
      hack:  { from: '#39ff14', mid: '#7bff5a', to: '#00ffa3', glow: '#39ff14' },
    };
    let lastSpawn = 0;
    window.addEventListener('mousemove', (e) => {
      const now = performance.now();
      if (now - lastSpawn < 28) return; // throttle ~36 spawns/sec max
      lastSpawn = now;
      trail.push({ x: e.clientX, y: e.clientY, born: now });
      if (trail.length > 26) trail.shift();
    }, { passive: true });

    function drawTrail(now, mode) {
      const c = TRAIL_COLORS[mode] || TRAIL_COLORS.light;
      for (let i = trail.length - 1; i >= 0; i--) {
        const t = trail[i];
        const age = now - t.born;
        if (age > TRAIL_LIFE_MS) { trail.splice(i, 1); continue; }
        const life = 1 - age / TRAIL_LIFE_MS;
        const size = 22 + (1 - life) * 28;
        const alpha = life * (mode === 'light' ? 0.85 : 0.95);

        ctx.font = `800 ${size}px 'Inter', system-ui, sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        const g = ctx.createLinearGradient(t.x - size, t.y - size / 2, t.x + size, t.y + size / 2);
        g.addColorStop(0, hexToRgba(c.from, alpha));
        g.addColorStop(0.5, hexToRgba(c.mid, alpha));
        g.addColorStop(1, hexToRgba(c.to, alpha));
        ctx.shadowColor = hexToRgba(c.glow, alpha * 0.6);
        ctx.shadowBlur = 22 * life;
        ctx.fillStyle = g;
        ctx.fillText('GH', t.x, t.y);
      }
      ctx.shadowBlur = 0;
    }

    /* ----- Single animation loop ----- */
    resize();
    window.addEventListener('resize', resize, { passive: true });

    let mode = themeMode();
    let last = performance.now();

    const frame = (now) => {
      const dt = Math.min(64, now - last) || 16.7;
      last = now;

      const m = themeMode();
      if (m !== mode) {
        mode = m;
        // Hard swap: nothing of the previous mode survives into the next frame.
        resetRain();
      }

      ctx.clearRect(0, 0, w, h);
      if (mode === 'hack') drawRain(now, dt);
      else drawParticles(isDark() ? 1.0 : 0.85);
      drawTrail(now, mode);

      requestAnimationFrame(frame);
    };
    requestAnimationFrame(frame);
  })();

  /* ---------- Skill bar animation ---------- */
  const bars = document.querySelectorAll('.skill-fill');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });
    bars.forEach((bar) => io.observe(bar));
  } else {
    bars.forEach((bar) => bar.classList.add('animate'));
  }
})();
