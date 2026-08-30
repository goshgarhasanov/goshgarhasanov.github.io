(() => {
  const root = document.documentElement;

  /* ---------- Boot terminal ---------- */
  (function boot() {
    const screen = document.getElementById('bootScreen');
    const out = document.getElementById('bootOut');
    if (!screen || !out) return;

    // Reduced motion: never play it, never block the page.
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
      screen.remove();
      return;
    }

    document.body.classList.add('booting');

    // [text, cssClass, msPerChar, pauseAfterMs]
    const SCRIPT = [
      ['$ ./init.sh',                          '',       15,  80],
      ['loading modules ......... [ ok ]',     'b-dim',   6,  70],
      ['',                                     '',        0,  30],
      ['$ connect --host goshgarhasanov',      '',       15,  80],
      ['connecting ...',                       'b-warn', 24, 200],
      ['handshake complete',                   'b-dim',   6,  90],
      ['',                                     '',        0,  30],
      ['$ auth --user guest',                  '',       15, 110],
      ['ACCESS GRANTED',                       'b-hit',  28, 300],
      ['portfolio loaded successfully',        'b-ok',    8, 200],
    ];

    let finished = false;
    const caret = document.createElement('span');
    caret.className = 'boot-cursor';
    caret.textContent = ' ';

    function finish() {
      if (finished) return;
      finished = true;
      window.removeEventListener('keydown', finish);
      window.removeEventListener('click', finish);
      screen.classList.add('done');
      document.body.classList.remove('booting');
      setTimeout(() => screen.remove(), 500);
    }

    window.addEventListener('keydown', finish);
    window.addEventListener('click', finish);

    let li = 0;
    function line() {
      if (finished) return;
      if (li >= SCRIPT.length) { setTimeout(finish, 260); return; }

      const [text, cls, speed, pause] = SCRIPT[li++];
      const span = document.createElement('span');
      if (cls) span.className = cls;
      out.appendChild(span);

      if (!text) {
        out.appendChild(document.createTextNode('\n'));
        setTimeout(line, pause);
        return;
      }

      let ci = 0;
      (function type() {
        if (finished) return;
        span.textContent = text.slice(0, ++ci);
        caret.remove();
        span.after(caret);
        if (ci < text.length) {
          setTimeout(type, speed);
        } else {
          out.appendChild(document.createTextNode('\n'));
          setTimeout(line, pause);
        }
      })();
    }
    line();
  })();

  /* ---------- i18n ---------- */
  const L_KEY = 'cv-lang';
  const SUPPORTED = ['en', 'az', 'ru', 'tr'];
  const detect = () => {
    const stored = localStorage.getItem(L_KEY);
    if (stored && SUPPORTED.includes(stored)) return stored;
    const browser = (navigator.language || 'en').slice(0, 2).toLowerCase();
    return SUPPORTED.includes(browser) ? browser : 'en';
  };

  /* ---------- Decrypt / scramble text effect ----------
     Every run ends by writing the exact target string, and starting a new run
     on the same element cancels the previous one — so a language switch mid
     animation can never leave garbled or stale text behind. */
  const REDUCE_MOTION = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const SCRAMBLE_POOL = '!<>-_\\/[]{}=+*^?#%&01ｱｲｳｴｵｶｷｸ';
  const scrambleJobs = new WeakMap();

  const scrambleTo = (el, text) => {
    const running = scrambleJobs.get(el);
    if (running) cancelAnimationFrame(running);
    scrambleJobs.delete(el);

    const target = String(text);
    if (REDUCE_MOTION || !target) { el.textContent = target; return; }

    const chars = Array.from(target);
    const n = chars.length;
    const step = Math.max(9, Math.min(26, 520 / n));   // ms between reveals
    const hold = 150;                                  // ms a char stays scrambled
    const start = performance.now();

    const tick = (now) => {
      const t = now - start;
      let out = '';
      let pending = false;
      for (let i = 0; i < n; i++) {
        const c = chars[i];
        const at = i * step;
        if (c === ' ' || t >= at + hold) { out += c; continue; }
        pending = true;
        out += t >= at ? SCRAMBLE_POOL[(Math.random() * SCRAMBLE_POOL.length) | 0] : ' ';
      }
      if (!pending) {
        el.textContent = target;
        scrambleJobs.delete(el);
        return;
      }
      el.textContent = out;
      scrambleJobs.set(el, requestAnimationFrame(tick));
    };
    scrambleJobs.set(el, requestAnimationFrame(tick));
  };

  const applyLang = (lang) => {
    const dict = (window.I18N && window.I18N[lang]) || window.I18N.en;
    root.lang = lang;

    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const key = el.getAttribute('data-i18n');
      if (dict[key] === undefined) return;
      if (el.hasAttribute('data-scramble')) scrambleTo(el, dict[key]);
      else el.textContent = dict[key];
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

  /* Hero name: not managed by i18n, so it can decrypt freely on load. */
  try {
    document.querySelectorAll('.hero-text h1 .hn').forEach((el, i) => {
      const text = el.textContent;
      if (REDUCE_MOTION) return;
      el.textContent = '';
      setTimeout(() => scrambleTo(el, text), 90 + i * 170);
    });
  } catch (_) {}
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


  /* ---------- System line: only things that are actually true ---------- */
  (function telemetry() {
    const netEl = document.getElementById('sysNet');
    const viewEl = document.getElementById('sysView');
    const uaEl = document.getElementById('sysUa');
    const tzEl = document.getElementById('sysTz');
    const upEl = document.getElementById('sysUp');
    if (!netEl || !viewEl || !uaEl || !tzEl || !upEl) return;

    const two = (n) => String(n).padStart(2, '0');

    const clientLabel = () => {
      const ua = navigator.userAgent;
      let browser = 'Unknown';
      let m;
      if ((m = ua.match(/Firefox\/(\d+)/))) browser = 'Firefox ' + m[1];
      else if ((m = ua.match(/Edg\/(\d+)/))) browser = 'Edge ' + m[1];
      else if ((m = ua.match(/OPR\/(\d+)/))) browser = 'Opera ' + m[1];
      else if ((m = ua.match(/Chrome\/(\d+)/))) browser = 'Chrome ' + m[1];
      else if (/Safari\//.test(ua) && (m = ua.match(/Version\/(\d+)/))) browser = 'Safari ' + m[1];
      let os = 'Unknown';
      if (/Windows NT/.test(ua)) os = 'Windows';
      else if (/Android/.test(ua)) os = 'Android';
      else if (/(iPhone|iPad|iPod)/.test(ua)) os = 'iOS';
      else if (/Mac OS X/.test(ua)) os = 'macOS';
      else if (/CrOS/.test(ua)) os = 'ChromeOS';
      else if (/Linux/.test(ua)) os = 'Linux';
      return browser + ' / ' + os;
    };

    const tzLabel = () => {
      const off = -new Date().getTimezoneOffset();
      const sign = off < 0 ? '-' : '+';
      const abs = Math.abs(off);
      return 'UTC' + sign + two((abs / 60) | 0) + ':' + two(abs % 60);
    };

    const setNet = () => {
      const on = navigator.onLine !== false;
      netEl.textContent = on ? 'ONLINE' : 'OFFLINE';
      netEl.className = on ? 'online' : 'offline';
    };
    const setView = () => {
      viewEl.textContent = window.innerWidth + 'x' + window.innerHeight;
    };
    const setUptime = () => {
      const s = Math.floor(performance.now() / 1000);
      upEl.textContent = two((s / 3600) | 0) + ':' + two(((s / 60) | 0) % 60) + ':' + two(s % 60);
    };

    uaEl.textContent = clientLabel();
    tzEl.textContent = tzLabel();
    setNet();
    setView();
    setUptime();

    window.addEventListener('online', setNet);
    window.addEventListener('offline', setNet);
    window.addEventListener('resize', setView, { passive: true });
    setInterval(setUptime, 1000);
  })();

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

    /* ----- "GH" mouse trail ----- */
    const trail = [];
    const TRAIL_LIFE_MS = 1100;
    const TRAIL_COLOR = { from: '#39ff14', mid: '#7bff5a', to: '#00ffa3', glow: '#39ff14' };
    let lastSpawn = 0;
    window.addEventListener('mousemove', (e) => {
      const now = performance.now();
      if (now - lastSpawn < 28) return; // throttle ~36 spawns/sec max
      lastSpawn = now;
      trail.push({ x: e.clientX, y: e.clientY, born: now });
      if (trail.length > 26) trail.shift();
    }, { passive: true });

    function drawTrail(now) {
      const c = TRAIL_COLOR;
      for (let i = trail.length - 1; i >= 0; i--) {
        const t = trail[i];
        const age = now - t.born;
        if (age > TRAIL_LIFE_MS) { trail.splice(i, 1); continue; }
        const life = 1 - age / TRAIL_LIFE_MS;
        const size = 22 + (1 - life) * 28;
        const alpha = life * 0.95;

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

    let last = performance.now();

    const frame = (now) => {
      const dt = Math.min(64, now - last) || 16.7;
      last = now;

      ctx.clearRect(0, 0, w, h);
      drawRain(now, dt);
      drawTrail(now);

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
