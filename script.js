(function () {
  'use strict';

  const root = document.documentElement;

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

    // The footer is re-rendered by the line above, so the year goes in after it.
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    document.getElementById('langCurrent').textContent = lang.toUpperCase();
    document.querySelectorAll('.lang-menu li').forEach((li) => {
      li.classList.toggle('active', li.dataset.lang === lang);
    });
  };

  /* ---------- Language switcher ---------- */
  const langBtn = document.getElementById('langBtn');
  const langMenu = document.getElementById('langMenu');

  const closeMenu = () => {
    langMenu.classList.remove('open');
    langBtn.setAttribute('aria-expanded', 'false');
  };

  langBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    const open = langMenu.classList.toggle('open');
    langBtn.setAttribute('aria-expanded', String(open));
  });

  langMenu.addEventListener('click', (e) => {
    const li = e.target.closest('li[data-lang]');
    if (!li) return;
    const lang = li.dataset.lang;
    localStorage.setItem(L_KEY, lang);
    applyLang(lang);
    closeMenu();
  });

  document.addEventListener('click', closeMenu);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu();
  });

  applyLang(detect());

  /* ---------- Photo modal ---------- */
  const avatarBtn = document.getElementById('avatarBtn');
  const photoModal = document.getElementById('photoModal');
  const pmClose = document.getElementById('pmClose');

  const openModal = () => {
    photoModal.classList.add('open');
    photoModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };
  const closeModal = () => {
    photoModal.classList.remove('open');
    photoModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  if (avatarBtn && photoModal) {
    avatarBtn.addEventListener('click', openModal);
    if (pmClose) pmClose.addEventListener('click', closeModal);
    photoModal.querySelectorAll('[data-close]').forEach((el) => {
      el.addEventListener('click', closeModal);
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && photoModal.classList.contains('open')) closeModal();
    });
  }
})();
