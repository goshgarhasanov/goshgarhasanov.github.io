(() => {
  const root = document.documentElement;

  /* ---------- Theme ---------- */
  const T_KEY = 'cv-theme-v3';
  // Inline head script already applied the theme; this just keeps it consistent.
  if (!root.getAttribute('data-theme')) {
    root.setAttribute('data-theme', localStorage.getItem(T_KEY) === 'dark' ? 'dark' : 'light');
  }

  document.getElementById('themeToggle').addEventListener('click', () => {
    const next = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
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

  /* ---------- Ambient canvas: drifting particles + "GH" mouse trail (behind content) ---------- */
  (function ambient() {
    const canvas = document.getElementById('bgCanvas');
    if (!canvas) return;

    const isTouch = matchMedia('(hover: none) and (pointer: coarse)').matches;
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isTouch || reduce) { canvas.remove(); return; }

    const ctx = canvas.getContext('2d', { alpha: true });
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0, h = 0;
    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + 'px';
      canvas.style.height = h + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener('resize', resize, { passive: true });

    const isDark = () => document.documentElement.getAttribute('data-theme') === 'dark';
    const palette = ['#ff6b6b', '#ffb84d', '#14b8a6', '#8b5cf6', '#3b82f6', '#ec4899'];
    const hexToRgba = (hex, a) => {
      const r = parseInt(hex.slice(1, 3), 16);
      const g = parseInt(hex.slice(3, 5), 16);
      const b = parseInt(hex.slice(5, 7), 16);
      return `rgba(${r},${g},${b},${a})`;
    };

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

    const trail = [];
    const TRAIL_LIFE_MS = 1100;
    // "GH" trail colours differ per theme: warm orange on light, cool cyan on dark.
    const TRAIL_COLORS = {
      light: { from: '#f97316', mid: '#fb923c', to: '#f59e0b', glow: '#f97316' },
      dark:  { from: '#22d3ee', mid: '#38bdf8', to: '#a78bfa', glow: '#22d3ee' },
    };
    let lastSpawn = 0;
    window.addEventListener('mousemove', (e) => {
      const now = performance.now();
      if (now - lastSpawn < 28) return; // throttle ~36 spawns/sec max
      lastSpawn = now;
      trail.push({ x: e.clientX, y: e.clientY, born: now });
      if (trail.length > 26) trail.shift();
    }, { passive: true });

    const frame = (now) => {
      ctx.clearRect(0, 0, w, h);
      const dark = isDark();
      const glowAlpha = dark ? 1.0 : 0.85;

      // Particles
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

      // GH mouse trail — drawn to same canvas so it sits behind content,
      // visible only in empty / gap areas of the layout.
      for (let i = trail.length - 1; i >= 0; i--) {
        const t = trail[i];
        const age = now - t.born;
        if (age > TRAIL_LIFE_MS) { trail.splice(i, 1); continue; }
        const life = 1 - age / TRAIL_LIFE_MS;
        const size = 22 + (1 - life) * 28;
        const alpha = life * (dark ? 0.95 : 0.85);

        ctx.font = `800 ${size}px 'Inter', system-ui, sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        const c = TRAIL_COLORS[dark ? 'dark' : 'light'];
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
