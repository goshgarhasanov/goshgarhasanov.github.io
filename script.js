(function () {
  'use strict';

  const root = document.documentElement;
  root.classList.add('js');

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let currentLang = 'en';
  let dict = {};

  /* ---------- i18n ---------- */
  const L_KEY = 'cv-lang';
  const SUPPORTED = ['en', 'az', 'ru', 'tr'];

  const detect = () => {
    const stored = localStorage.getItem(L_KEY);
    if (stored && SUPPORTED.includes(stored)) return stored;
    const browser = (navigator.language || 'en').slice(0, 2).toLowerCase();
    return SUPPORTED.includes(browser) ? browser : 'en';
  };

  const t = (key) => (dict[key] !== undefined ? dict[key] : (window.I18N.en[key] || key));

  const applyLang = (lang) => {
    dict = (window.I18N && window.I18N[lang]) || window.I18N.en;
    currentLang = lang;
    root.lang = lang;

    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const key = el.getAttribute('data-i18n');
      if (dict[key] !== undefined) el.textContent = dict[key];
    });

    document.querySelectorAll('[data-i18n-html]').forEach((el) => {
      const key = el.getAttribute('data-i18n-html');
      if (dict[key] !== undefined) el.innerHTML = dict[key];
    });

    document.querySelectorAll('[data-i18n-aria]').forEach((el) => {
      const key = el.getAttribute('data-i18n-aria');
      if (dict[key] !== undefined) el.setAttribute('aria-label', dict[key]);
    });

    // The footer is re-rendered by the line above, so the year goes in after it.
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    document.getElementById('langCurrent').textContent = lang.toUpperCase();
    document.querySelectorAll('.lang-menu li').forEach((li) => {
      li.classList.toggle('active', li.dataset.lang === lang);
    });

    renderProjects();
    if (openProject) fillProjectModal(openProject, galleryIndex);
    moveIndicator();
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

  /* ---------- Navigation ---------- */
  const topbar = document.getElementById('topbar');
  const nav = document.getElementById('nav');
  const navToggle = document.getElementById('navToggle');
  const indicator = nav.querySelector('.nav-indicator');
  const links = Array.from(nav.querySelectorAll('.nav-link'));
  const sections = links.map((a) => document.querySelector(a.getAttribute('href')));
  let activeLink = null;

  function moveIndicator() {
    if (!activeLink) {
      indicator.classList.remove('ready');
      return;
    }
    indicator.style.width = activeLink.offsetWidth + 'px';
    indicator.style.height = activeLink.offsetHeight + 'px';
    indicator.style.transform = `translate(${activeLink.offsetLeft}px, ${activeLink.offsetTop}px)`;
    indicator.classList.add('ready');
  }

  const setActive = (link) => {
    if (link === activeLink) return;
    links.forEach((a) => {
      a.classList.toggle('active', a === link);
      if (a === link) a.setAttribute('aria-current', 'true');
      else a.removeAttribute('aria-current');
    });
    activeLink = link;
    moveIndicator();
  };

  // The active section is the last one whose top has passed a line a quarter down the screen.
  const spy = () => {
    const line = topbar.offsetHeight + window.innerHeight * 0.25;
    let current = null;
    sections.forEach((sec, i) => {
      if (sec && sec.getBoundingClientRect().top <= line) current = links[i];
    });
    if (window.scrollY > 0 && window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2) {
      current = links[links.length - 1];
    }
    setActive(current);
    topbar.classList.toggle('scrolled', window.scrollY > 4);
  };

  let ticking = false;
  window.addEventListener('scroll', () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      spy();
      ticking = false;
    });
  }, { passive: true });

  const setNavOpen = (open) => {
    nav.classList.toggle('open', open);
    navToggle.setAttribute('aria-expanded', String(open));
  };

  navToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    setNavOpen(!nav.classList.contains('open'));
  });
  links.forEach((a) => a.addEventListener('click', () => setNavOpen(false)));
  document.addEventListener('click', (e) => {
    if (!nav.contains(e.target)) setNavOpen(false);
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') setNavOpen(false);
  });
  window.addEventListener('resize', () => {
    if (window.innerWidth > 980) setNavOpen(false);
    moveIndicator();
  });

  /* ---------- Scroll reveal ---------- */
  const revealObserver = 'IntersectionObserver' in window && !reduceMotion
    ? new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const target = entry.target;
        target.classList.add('in');
        // Drop the reveal styles once shown, so hover transitions run without the stagger delay.
        const done = (e) => {
          if (e.target !== target) return; // ignore transitions bubbling up from children
          target.removeEventListener('transitionend', done);
          target.classList.remove('reveal', 'in');
          target.style.removeProperty('--d');
        };
        target.addEventListener('transitionend', done);
        revealObserver.unobserve(target);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 })
    : null;

  const reveal = (elements, step = 70) => {
    if (!revealObserver) return;
    const counts = new Map();
    elements.forEach((node) => {
      const n = counts.get(node.parentElement) || 0;
      counts.set(node.parentElement, n + 1);
      node.classList.add('reveal');
      node.style.setProperty('--d', Math.min(n * step, 420) + 'ms');
      revealObserver.observe(node);
    });
  };

  /* ---------- Projects ---------- */
  const projects = Array.isArray(window.PROJECTS) ? window.PROJECTS : [];
  const grid = document.getElementById('projectGrid');
  const emptyNote = document.getElementById('projectsEmpty');

  // A text field is either a string or { en, az, ru, tr }.
  const pick = (value) => {
    if (value == null) return '';
    if (typeof value === 'string') return value;
    return value[currentLang] || value.en || Object.values(value)[0] || '';
  };

  const el = (tag, className, text) => {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text != null) node.textContent = text;
    return node;
  };

  const ICON = {
    arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
    external: '<path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><path d="M15 3h6v6M10 14 21 3"/>',
    code: '<polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>',
    image: '<rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="m21 15-5-5L5 21"/>',
  };

  const icon = (name, size = 16) => {
    const wrap = document.createElement('span');
    wrap.innerHTML = `<svg viewBox="0 0 24 24" width="${size}" height="${size}" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICON[name]}</svg>`;
    return wrap.firstChild;
  };

  const initials = (title) => title.split(/\s+/).filter(Boolean).slice(0, 2).map((w) => w[0].toUpperCase()).join('');

  function renderProjects() {
    grid.textContent = '';
    emptyNote.hidden = projects.length > 0;
    grid.hidden = projects.length === 0;

    projects.forEach((p) => {
      const title = pick(p.title);
      const shots = p.screenshots || [];
      const cover = p.cover || shots[0];

      const card = el('a', 'project');
      card.href = '#project-' + encodeURIComponent(p.id);
      card.addEventListener('click', (e) => {
        e.preventDefault();
        openProjectModal(p);
      });

      const coverBox = el('div', 'project-cover');
      if (cover) {
        const img = el('img');
        img.src = cover;
        img.alt = title;
        img.loading = 'lazy';
        coverBox.append(img);
      } else {
        coverBox.append(el('div', 'placeholder', initials(title)));
      }
      if (shots.length > 1) {
        const badge = el('span', 'project-shots');
        badge.append(icon('image', 13), document.createTextNode(String(shots.length)));
        coverBox.append(badge);
      }

      const body = el('div', 'project-body');
      body.append(el('h3', null, title));
      const summary = pick(p.summary);
      if (summary) body.append(el('p', 'project-summary', summary));
      if (p.tags && p.tags.length) {
        const tags = el('div', 'project-tags');
        p.tags.slice(0, 5).forEach((tag) => tags.append(el('span', 'tag', tag)));
        body.append(tags);
      }
      const more = el('span', 'project-more', t('projects.more'));
      more.append(icon('arrow', 15));
      body.append(more);

      card.append(coverBox, body);
      grid.append(card);
    });

    reveal(Array.from(grid.children));
  }

  /* ---------- Project modal ---------- */
  const modal = document.getElementById('projectModal');
  const dialog = modal.querySelector('.prm-dialog');
  const gallery = document.getElementById('pmGallery');
  const stageImg = document.getElementById('pmImage');
  const prevBtn = document.getElementById('pmPrev');
  const nextBtn = document.getElementById('pmNext');
  const countEl = document.getElementById('pmCount');
  const thumbs = document.getElementById('pmThumbs');
  let openProject = null;
  let galleryIndex = 0;
  let swapTimer = 0;
  let lastFocus = null;

  const showShot = (index, animate = true) => {
    const shots = (openProject && openProject.screenshots) || [];
    if (!shots.length) return;
    galleryIndex = (index + shots.length) % shots.length;
    const src = shots[galleryIndex];
    const alt = `${pick(openProject.title)} — ${galleryIndex + 1}`;
    const swap = () => {
      stageImg.src = src;
      stageImg.alt = alt;
      stageImg.classList.remove('swap');
    };
    clearTimeout(swapTimer);
    if (animate && !reduceMotion && stageImg.getAttribute('src')) {
      stageImg.classList.add('swap');
      swapTimer = setTimeout(swap, 180);
    } else {
      swap();
    }
    countEl.textContent = shots.length > 1 ? `${galleryIndex + 1} / ${shots.length}` : '';
    Array.from(thumbs.children).forEach((b, i) => {
      b.classList.toggle('active', i === galleryIndex);
      if (i === galleryIndex && modal.classList.contains('open')) {
        b.scrollIntoView({ block: 'nearest', inline: 'nearest', behavior: reduceMotion ? 'auto' : 'smooth' });
      }
    });
  };

  function fillProjectModal(p, index = 0) {
    const shots = p.screenshots || [];
    const title = pick(p.title);

    document.getElementById('pmTitle').textContent = title;
    document.getElementById('pmMeta').textContent = [p.year, pick(p.role)].filter(Boolean).join(' · ');

    const tags = document.getElementById('pmTags');
    tags.textContent = '';
    (p.tags || []).forEach((tag) => tags.append(el('span', 'tag', tag)));

    const desc = document.getElementById('pmDesc');
    desc.textContent = '';
    pick(p.description || p.summary).split(/\n\s*\n/).filter((s) => s.trim()).forEach((para) => {
      desc.append(el('p', null, para.trim()));
    });

    const linkBox = document.getElementById('pmLinks');
    linkBox.textContent = '';
    Object.entries(p.links || {}).forEach(([kind, url]) => {
      if (!url) return;
      const a = el('a', kind === 'demo' ? 'btn primary' : 'btn');
      a.href = url;
      a.target = '_blank';
      a.rel = 'noopener';
      const label = kind === 'demo' ? t('projects.demo') : kind === 'source' ? t('projects.source') : t('projects.link');
      a.append(icon(kind === 'source' ? 'code' : 'external', 17), el('span', null, label));
      linkBox.append(a);
    });

    gallery.hidden = shots.length === 0;
    prevBtn.hidden = nextBtn.hidden = shots.length < 2;
    thumbs.textContent = '';
    if (shots.length > 1) {
      shots.forEach((src, i) => {
        const b = el('button');
        b.type = 'button';
        b.setAttribute('aria-label', `${title} — ${i + 1}`);
        const img = el('img');
        img.src = src;
        img.alt = '';
        img.loading = 'lazy';
        b.append(img);
        b.addEventListener('click', () => showShot(i));
        thumbs.append(b);
      });
    }
    openProject = p;
    if (index === 0) stageImg.removeAttribute('src');
    showShot(index, false);
  }

  function openProjectModal(p) {
    lastFocus = document.activeElement;
    fillProjectModal(p);
    dialog.scrollTop = 0;
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    history.replaceState(null, '', '#project-' + encodeURIComponent(p.id));
    modal.querySelector('.prm-close').focus({ preventScroll: true });
  }

  const closeProjectModal = () => {
    if (!openProject) return;
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    openProject = null;
    history.replaceState(null, '', location.pathname + location.search);
    if (lastFocus) lastFocus.focus({ preventScroll: true });
  };

  modal.querySelectorAll('[data-close]').forEach((b) => b.addEventListener('click', closeProjectModal));
  prevBtn.addEventListener('click', () => showShot(galleryIndex - 1));
  nextBtn.addEventListener('click', () => showShot(galleryIndex + 1));

  document.addEventListener('keydown', (e) => {
    if (!openProject) return;
    if (e.key === 'Escape') closeProjectModal();
    else if (e.key === 'ArrowLeft') showShot(galleryIndex - 1);
    else if (e.key === 'ArrowRight') showShot(galleryIndex + 1);
    else if (e.key === 'Tab') {
      // Keep focus inside the dialog.
      const focusables = Array.from(modal.querySelectorAll('button, a[href]'))
        .filter((n) => !n.hidden && n.offsetParent !== null);
      if (!focusables.length) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });

  // Swipe between screenshots on touch screens.
  let touchX = null;
  const stage = gallery.querySelector('.gallery-stage');
  stage.addEventListener('touchstart', (e) => { touchX = e.touches[0].clientX; }, { passive: true });
  stage.addEventListener('touchend', (e) => {
    if (touchX === null) return;
    const dx = e.changedTouches[0].clientX - touchX;
    touchX = null;
    if (Math.abs(dx) > 40) showShot(galleryIndex + (dx < 0 ? 1 : -1));
  });

  /* ---------- Start ---------- */
  applyLang(detect());

  reveal(Array.from(document.querySelectorAll('.intro > *')), 120);
  reveal(Array.from(document.querySelectorAll(
    '.section > h2, .section > p, .stat, .entry, .skill-group, .card, .lang-item, .projects-empty'
  )));

  spy();
  // Web fonts change link widths after load; place the indicator again once they are in.
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(moveIndicator);

  const deepLink = location.hash.match(/^#project-(.+)$/);
  if (deepLink) {
    const p = projects.find((x) => String(x.id) === decodeURIComponent(deepLink[1]));
    if (p) openProjectModal(p);
  }

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
    photoModal.querySelectorAll('[data-close]').forEach((node) => {
      node.addEventListener('click', closeModal);
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && photoModal.classList.contains('open')) closeModal();
    });
  }
})();
