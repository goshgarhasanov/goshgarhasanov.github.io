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
    showVisitors();
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
  // How many people have opened each project, by id; filled in from the counter service.
  const views = {};
  const viewBadges = {};

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
    download: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="M7 10l5 5 5-5"/><path d="M12 15V3"/>',
    image: '<rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="m21 15-5-5L5 21"/>',
    eye: '<path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',
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
      } else if (p.logo) {
        const ph = el('div', 'placeholder');
        const img = el('img', 'project-logo');
        img.src = p.logo;
        img.alt = title;
        img.loading = 'lazy';
        ph.append(img);
        coverBox.append(ph);
      } else {
        coverBox.append(el('div', 'placeholder', initials(title)));
      }
      if (shots.length > 1) {
        const badge = el('span', 'project-shots');
        badge.append(icon('image', 13), document.createTextNode(String(shots.length)));
        coverBox.append(badge);
      }
      const viewBadge = el('span', 'project-views');
      viewBadges[p.id] = viewBadge;
      showViews(p.id);
      coverBox.append(viewBadge);

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
    fillProjectMeta(p);

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
      const a = el('a', kind === 'demo' || (kind === 'download' && !p.links.demo) ? 'btn primary' : 'btn');
      a.href = url;
      a.target = '_blank';
      a.rel = 'noopener';
      const label = kind === 'demo' ? t('projects.demo')
        : kind === 'source' ? t('projects.source')
          : kind === 'download' ? t('projects.download') : t('projects.link');
      const glyph = kind === 'source' ? 'code' : kind === 'download' ? 'download' : 'external';
      a.append(icon(glyph, 17), el('span', null, label));
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

  function fillProjectMeta(p) {
    const seen = views[p.id] != null ? t('projects.views').replace('{n}', fmt(views[p.id])) : '';
    document.getElementById('pmMeta').textContent = [p.year, pick(p.role), seen].filter(Boolean).join(' · ');
  }

  function openProjectModal(p) {
    lastFocus = document.activeElement;
    countView(p);
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

  /* ---------- Full-screen image viewer ---------- */
  const lightbox = document.getElementById('lightbox');
  const lbImage = document.getElementById('lbImage');
  const lbPrev = document.getElementById('lbPrev');
  const lbNext = document.getElementById('lbNext');
  const lbCount = document.getElementById('lbCount');
  let lbShots = [];
  let lbIndex = 0;
  let lbTitle = '';
  let lbFocus = null;
  let lbTimer = 0;
  const lightboxOpen = () => lightbox.classList.contains('open');

  const showLightbox = (index, animate = true) => {
    lbIndex = (index + lbShots.length) % lbShots.length;
    const swap = () => {
      lbImage.src = lbShots[lbIndex];
      lbImage.alt = lbShots.length > 1 ? `${lbTitle} — ${lbIndex + 1}` : lbTitle;
      lbImage.classList.remove('swap');
    };
    clearTimeout(lbTimer);
    if (animate && !reduceMotion) {
      lbImage.classList.add('swap');
      lbTimer = setTimeout(swap, 150);
    } else {
      swap();
    }
    lbCount.textContent = lbShots.length > 1 ? `${lbIndex + 1} / ${lbShots.length}` : '';
  };

  function openLightbox(shots, index, title) {
    lbShots = shots;
    lbTitle = title;
    lbFocus = document.activeElement;
    lbPrev.hidden = lbNext.hidden = shots.length < 2;
    showLightbox(index, false);
    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    document.getElementById('lbClose').focus({ preventScroll: true });
  }

  const closeLightbox = () => {
    lightbox.classList.remove('open');
    lightbox.setAttribute('aria-hidden', 'true');
    // The project modal underneath keeps the page locked.
    if (!openProject) document.body.style.overflow = '';
    // Keep the project gallery on the screenshot the viewer ended on.
    if (openProject && openProject.screenshots === lbShots) showShot(lbIndex, false);
    if (lbFocus) lbFocus.focus({ preventScroll: true });
  };

  document.getElementById('lbClose').addEventListener('click', closeLightbox);
  lbPrev.addEventListener('click', () => showLightbox(lbIndex - 1));
  lbNext.addEventListener('click', () => showLightbox(lbIndex + 1));
  // A tap on the dark area around the image closes the viewer.
  lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });

  let lbTouch = null;
  lightbox.addEventListener('touchstart', (e) => {
    lbTouch = e.touches.length === 1 ? { x: e.touches[0].clientX, y: e.touches[0].clientY } : null;
  }, { passive: true });
  lightbox.addEventListener('touchend', (e) => {
    if (!lbTouch) return;
    const dx = e.changedTouches[0].clientX - lbTouch.x;
    const dy = e.changedTouches[0].clientY - lbTouch.y;
    lbTouch = null;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) && lbShots.length > 1) showLightbox(lbIndex + (dx < 0 ? 1 : -1));
    else if (dy > 90 && Math.abs(dy) > Math.abs(dx)) closeLightbox();
  });

  document.addEventListener('keydown', (e) => {
    if (!lightboxOpen()) return;
    // The viewer sits above the project modal, so it owns these keys while open.
    e.stopImmediatePropagation();
    if (e.key === 'Escape') closeLightbox();
    else if (e.key === 'ArrowLeft' && lbShots.length > 1) showLightbox(lbIndex - 1);
    else if (e.key === 'ArrowRight' && lbShots.length > 1) showLightbox(lbIndex + 1);
    else if (e.key === 'Tab') {
      const focusables = Array.from(lightbox.querySelectorAll('button')).filter((n) => !n.hidden);
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });

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

  /* ---------- Visitor counters ---------- */
  // Counts are kept by a free counter service. Each browser is counted once per
  // counter, so the numbers mean people rather than page loads.
  const COUNTER = 'https://abacus.jasoncameron.dev';
  const COUNTER_NS = 'goshgarhasanov-github-io';
  const visitsEl = document.getElementById('visits');
  let visitors = null;

  function fmt(n) {
    return new Intl.NumberFormat(currentLang).format(n);
  }

  // True the first time this browser asks for a key, false afterwards.
  const firstTime = (key) => {
    try {
      if (localStorage.getItem('cv-seen-' + key)) return false;
      localStorage.setItem('cv-seen-' + key, '1');
    } catch (e) { /* storage blocked: count every visit */ }
    return true;
  };

  // A counter nobody has hit yet answers 404, which means zero.
  const counter = (key, hit) => fetch(`${COUNTER}/${hit ? 'hit' : 'get'}/${COUNTER_NS}/${key}`)
    .then((r) => (r.status === 404 ? { value: 0 } : r.ok ? r.json() : Promise.reject(new Error(String(r.status)))))
    .then((d) => d.value);

  function showViews(id) {
    const badge = viewBadges[id];
    if (!badge) return;
    badge.hidden = views[id] == null;
    badge.textContent = '';
    if (views[id] != null) badge.append(icon('eye', 13), document.createTextNode(fmt(views[id])));
  }

  function showVisitors() {
    visitsEl.hidden = visitors == null;
    visitsEl.textContent = '';
    if (visitors != null) visitsEl.append(icon('eye', 15), el('span', null, t('stats.visitors').replace('{n}', fmt(visitors))));
  }

  function countView(p) {
    const key = 'project-' + p.id;
    counter(key, firstTime(key)).then((n) => {
      views[p.id] = n;
      showViews(p.id);
      if (openProject === p) fillProjectMeta(p);
    }).catch(() => {});
  }

  /* ---------- Start ---------- */
  applyLang(detect());

  counter('site-visitors', firstTime('site-visitors')).then((n) => {
    visitors = n;
    showVisitors();
  }).catch(() => {});
  projects.forEach((p) => {
    counter('project-' + p.id, false).then((n) => {
      if (views[p.id] == null) views[p.id] = n;
      showViews(p.id);
    }).catch(() => {});
  });

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

  /* ---------- Full-screen image viewer ---------- */
  document.getElementById('avatarBtn').addEventListener('click', (e) => {
    const img = e.currentTarget.querySelector('img');
    openLightbox([img.getAttribute('src')], 0, img.alt);
  });
  stageImg.addEventListener('click', () => {
    if (openProject && stageImg.getAttribute('src')) {
      openLightbox(openProject.screenshots, galleryIndex, pick(openProject.title));
    }
  });
})();
