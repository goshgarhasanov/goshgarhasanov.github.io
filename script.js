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
  };

  applyLang(detect());

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

  if (photoModal) photoModal.hidden = false; // visibility handled by .open class

  const openModal = () => {
    if (!photoModal) return;
    photoModal.classList.add('open');
    document.body.style.overflow = 'hidden';
  };
  const closeModal = () => {
    if (!photoModal) return;
    photoModal.classList.remove('open');
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
