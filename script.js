/* ============================================================
   RICORDIO QUARTET — script.js
   i18n toggle · scroll state · section reveal · filter · form
   ============================================================ */

(function () {
  'use strict';

  const STORAGE_KEY = 'ricordio-lang';
  const DEFAULT_LANG = 'sr';
  const html = document.documentElement;

  /* ---------- i18n ---------- */
  function setLang(lang) {
    if (lang !== 'sr' && lang !== 'en') lang = DEFAULT_LANG;

    html.lang = lang;

    document.querySelectorAll('[data-sr]').forEach(function (el) {
      const val = el.dataset[lang];
      if (val !== undefined) el.textContent = val;
    });

    document.querySelectorAll('[data-sr-placeholder]').forEach(function (el) {
      const key = lang === 'sr' ? 'srPlaceholder' : 'enPlaceholder';
      const val = el.dataset[key];
      if (val !== undefined) el.setAttribute('placeholder', val);
    });

    document.querySelectorAll('[data-sr-alt]').forEach(function (el) {
      const key = lang === 'sr' ? 'srAlt' : 'enAlt';
      const val = el.dataset[key];
      if (val !== undefined) el.setAttribute('alt', val);
    });

    // <title> and <meta name="description"> have data-sr/data-en too
    const titleEl = document.querySelector('title[data-sr]');
    if (titleEl) document.title = titleEl.dataset[lang] || document.title;

    const descMeta = document.querySelector('meta[name="description"][data-sr]');
    if (descMeta) descMeta.setAttribute('content', descMeta.dataset[lang] || '');

    document.querySelectorAll('.lang-toggle button').forEach(function (b) {
      b.classList.toggle('active', b.dataset.lang === lang);
      b.setAttribute('aria-pressed', b.dataset.lang === lang ? 'true' : 'false');
    });

    try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) { /* no-op */ }
  }

  function initLang() {
    let saved = DEFAULT_LANG;
    try { saved = localStorage.getItem(STORAGE_KEY) || DEFAULT_LANG; } catch (e) {}
    setLang(saved);

    document.querySelectorAll('.lang-toggle button').forEach(function (b) {
      b.addEventListener('click', function () {
        setLang(b.dataset.lang);
      });
    });
  }

  /* ---------- Nav scroll state ---------- */
  function initNavScroll() {
    function update() {
      html.classList.toggle('scrolled', window.scrollY > 80);
    }
    update();
    window.addEventListener('scroll', update, { passive: true });
  }

  /* ---------- Mobile burger ---------- */
  function initBurger() {
    const burger = document.getElementById('navBurger');
    const links = document.getElementById('navLinks');
    if (!burger || !links) return;

    function close() {
      html.classList.remove('nav-open');
      burger.classList.remove('open');
      burger.setAttribute('aria-expanded', 'false');
    }

    burger.addEventListener('click', function () {
      const open = !html.classList.contains('nav-open');
      html.classList.toggle('nav-open', open);
      burger.classList.toggle('open', open);
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    });

    links.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', close);
    });
  }

  /* ---------- Section reveal ---------- */
  function initReveal() {
    if (!('IntersectionObserver' in window)) {
      document.querySelectorAll('.section').forEach(function (s) { s.classList.add('visible'); });
      return;
    }
    const io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.section').forEach(function (s) { io.observe(s); });
  }

  /* ---------- Repertoire filter ---------- */
  function initFilter() {
    const buttons = document.querySelectorAll('.filter');
    const works = document.querySelectorAll('.work');
    if (!buttons.length) return;

    buttons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        buttons.forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');

        const f = btn.dataset.filter;
        works.forEach(function (w) {
          const tags = (w.dataset.tags || '').split(',');
          const show = f === 'all' || tags.indexOf(f) !== -1;
          w.classList.toggle('hidden', !show);
        });
      });
    });
  }

  /* ---------- Contact form (placeholder handler) ---------- */
  function initForm() {
    const form = document.getElementById('contactForm');
    const status = document.getElementById('formStatus');
    if (!form) return;

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const lang = html.lang === 'en' ? 'en' : 'sr';
      const msg = lang === 'sr'
        ? 'Hvala, vaša poruka je zabeležena. Javićemo vam se uskoro.'
        : 'Thank you, your message has been received. We will reply soon.';
      if (status) status.textContent = msg;
      form.reset();
    });
  }

  /* ---------- Boot ---------- */
  function boot() {
    initLang();
    initNavScroll();
    initBurger();
    initReveal();
    initFilter();
    initForm();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
