/* BACKEER — Powers of Ten. No dependencies. */
(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));

  /* ---------- Header ---------- */
  const header = $('.header');
  const heroStage = $('.hero-stage');
  const onScrollHeader = () => {
    header.classList.toggle('is-scrolled', scrollY > 8);
    if (heroStage) header.classList.toggle('on-video', scrollY < heroStage.offsetHeight - header.offsetHeight);
  };
  addEventListener('scroll', onScrollHeader, { passive: true });
  addEventListener('resize', onScrollHeader, { passive: true });
  onScrollHeader();

  /* ---------- Hero video: respect reduced motion, pause off-screen ---------- */
  const heroVideo = $('.hero-video');
  if (heroVideo) {
    if (reduced) { heroVideo.removeAttribute('autoplay'); heroVideo.pause(); }
    else {
      new IntersectionObserver(([e]) => {
        if (e.isIntersecting) heroVideo.play().catch(() => {}); else heroVideo.pause();
      }).observe(heroVideo);
    }
  }

  const menuBtn = $('.menu-btn');
  menuBtn.addEventListener('click', () => {
    const open = document.body.classList.toggle('menu-open');
    menuBtn.setAttribute('aria-expanded', open);
  });
  $$('.nav a').forEach(a => a.addEventListener('click', () => {
    document.body.classList.remove('menu-open');
    menuBtn.setAttribute('aria-expanded', 'false');
  }));

  /* ---------- Live scale bar ---------- */
  const scale = $('.scale');
  const sBar = $('.scale-bar'), sUnit = $('.scale-unit'), sSec = $('.scale-sec');
  let curKey = '';
  const setScale = (unit, sw, name) => {
    const key = unit + '|' + name;
    if (key === curKey) return;
    curKey = key;
    sBar.style.setProperty('--sw', unit ? sw : 0);
    scale.classList.add('is-swap');
    setTimeout(() => {
      sUnit.textContent = unit || '';
      sSec.textContent = name || '';
      scale.classList.remove('is-swap');
    }, reduced ? 0 : 180);
  };

  const navLinks = $$('.nav a');
  const scaled = $$('[data-name]');
  let zoomActive = false;
  const scaleIO = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const el = e.target;
      const sec = el.closest('section') || el;
      navLinks.forEach(a => a.setAttribute('aria-current', a.getAttribute('href') === '#' + sec.id ? 'true' : 'false'));
      if (el.id === 'how' && zoomActive) return;
      setScale(el.dataset.scale || '', +el.dataset.sw || 40, el.dataset.name);
    });
  }, { rootMargin: '-48% 0px -48% 0px' });
  scaled.forEach(el => scaleIO.observe(el));

  /* ---------- Publications: Learn more toggle ---------- */
  const pubsBtn = $('.pubs-toggle');
  if (pubsBtn) {
    const panel = $('#pub-panel'), sec = pubsBtn.closest('section'), lbl = $('.lbl', pubsBtn);
    const links = () => $$('a', panel);
    links().forEach(a => a.tabIndex = -1);
    pubsBtn.addEventListener('click', () => {
      const open = pubsBtn.getAttribute('aria-expanded') !== 'true';
      pubsBtn.setAttribute('aria-expanded', open);
      panel.classList.toggle('is-open', open);
      sec.classList.toggle('is-open', open);
      lbl.textContent = open ? 'Show less' : 'Learn more';
      links().forEach(a => a.tabIndex = open ? 0 : -1);
    });
  }

  /* ---------- Reveal ---------- */
  const revealIO = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('is-in'); revealIO.unobserve(e.target); } });
  }, { threshold: 0.2 });
  $$('.rv, .ranges, .converge').forEach(el => revealIO.observe(el));

  /* ---------- Fiber cursor: tip = hotspot, slight bend while moving ---------- */
  const fc = $('.fiber-cursor');
  if (fc && matchMedia('(pointer: fine)').matches && !reduced) {
    document.documentElement.classList.add('has-fiber');
    const fiber = $('.fc-fiber', fc);
    let lx = 0, ly = 0, bend = 0, target = 0, linkWas = false, raf = 0;
    const draw = () => {
      raf = 0;
      bend += (target - bend) * 0.25;           // ease the bend back to straight
      target *= 0.6;
      fiber.setAttribute("d", `M9 12 Q${(11 + bend).toFixed(2)} 19.5 15 27`);
      if (Math.abs(bend) > 0.02 || Math.abs(target) > 0.02) raf = requestAnimationFrame(draw);
    };
    addEventListener('pointermove', e => {
      const x = e.clientX, y = e.clientY;
      fc.style.setProperty('--x', x + 'px');
      fc.style.setProperty('--y', y + 'px');
      // very slight natural bend (max ~1.2px) from vertical movement
      target = Math.max(-1.4, Math.min(1.4, -(x - lx) * 0.08));
      lx = x; ly = y;
      if (!raf) raf = requestAnimationFrame(draw);
      fc.classList.remove('is-out');
      const t = e.target;
      const link = !!t.closest('a, button, [role="tab"], summary, label');
      fc.classList.toggle('is-link', link);
      if (link && !linkWas) { fc.classList.remove('ping'); void fc.getBoundingClientRect(); fc.classList.add('ping'); }
      linkWas = link;
      fc.classList.toggle('is-dark', !!t.closest('.hero-stage, .traction, .contact, figure.dark, .header.on-video'));
    }, { passive: true });
    document.addEventListener('pointerleave', () => fc.classList.add('is-out'));
    addEventListener('blur', () => fc.classList.add('is-out'));
  }

  /* ---------- How it works: scroll-scrubbed zoom ---------- */
  const zoom = $('#how');
  const figs = $$('.stage figure');
  const steps = $$('.steps li');
  const ssText = $('.ss-text'), ssUnit = $('.ss-unit');
  const zoomCapable = () => !reduced && matchMedia('(min-width: 901px)').matches;
  if (zoom && figs.length) {
    const N = figs.length;
    figs.forEach(f => { f.style.transformOrigin = `${f.dataset.fx} ${f.dataset.fy}`; });
    let lastStep = -1, ticking = false;

    const render = () => {
      ticking = false;
      if (!zoomCapable()) { zoomActive = false; return; }
      const r = zoom.getBoundingClientRect();
      const total = zoom.offsetHeight - innerHeight;
      const p = clamp(-r.top / total, 0, 1);
      zoomActive = r.top < innerHeight * 0.5 && r.bottom > innerHeight * 0.5;
      // dwell on each plate, then zoom through to the next
      const raw = p * (N - 1);
      const base = Math.min(Math.floor(raw), N - 2);
      const frac = raw - base;
      const t = clamp((frac - 0.42) / 0.58, 0, 1);
      const eased = t * t * (3 - 2 * t);
      const pos = base + eased;

      figs.forEach((f, i) => {
        const d = pos - i;
        let o = 0, s = 1, b = 0;
        if (d >= 0 && d < 1) {            // outgoing: dive into its focal point
          s = 1 + d * d * 5;
          o = clamp(1 - (d - 0.35) / 0.5, 0, 1);
          b = clamp((d - 0.2) * 10, 0, 8);
        } else if (d < 0 && d > -1) {      // incoming: resolve from a point
          s = 0.25 + 0.75 * (1 + d);
          o = clamp((1 + d - 0.3) / 0.5, 0, 1);
          b = clamp(-d * 10, 0, 6);
        } else if (Math.abs(d) < 0.001) { o = 1; }
        if (i === N - 1 && d >= 0) { o = 1; s = 1; b = 0; }
        f.style.opacity = o.toFixed(3);
        f.style.transform = `scale(${s.toFixed(4)})`;
        f.style.filter = b > 0.05 ? `blur(${b.toFixed(2)}px)` : 'none';
        f.style.zIndex = d < 0 ? 2 : 1;
      });

      const step = clamp(Math.round(pos), 0, N - 1);
      if (step !== lastStep) {
        lastStep = step;
        steps.forEach((li, k) => li.classList.toggle('is-on', k === step));
        const f = figs[step];
        ssText.innerHTML = `<b>${f.dataset.unit}</b> · ${f.dataset.strip}`;
        ssUnit.textContent = f.dataset.unit;
      }
      if (zoomActive) setScale(figs[step].dataset.unit, +figs[step].dataset.sw, 'How it works');
    };
    const onScroll = () => { if (!ticking) { ticking = true; requestAnimationFrame(render); } };
    addEventListener('scroll', onScroll, { passive: true });
    addEventListener('resize', onScroll);
    render();
  }

  /* ---------- Applications: one figure, switched per biomarker ---------- */
  const markers = $$('.marker');
  const card = $('.app-card');
  const fig = $('.app-fig'), figImg = $('.app-fig img'), figCap = $('.app-fig figcaption');
  const select = i => {
    const b = markers[i];
    markers.forEach((m, k) => { m.setAttribute('aria-selected', k === i); m.tabIndex = k === i ? 0 : -1; });
    // on phones the tabs scroll sideways: bring the chosen one into view
    const row = b.parentElement;
    if (row.scrollWidth > row.clientWidth) row.scrollTo({ left: b.offsetLeft - row.offsetLeft - 16, behavior: reduced ? 'auto' : 'smooth' });
    fig.classList.add('is-swapping'); card.classList.add('is-swapping');
    setTimeout(() => {
      figImg.src = b.dataset.img;
      figImg.alt = b.dataset.alt;
      figImg.classList.toggle('cover', b.dataset.fit === 'cover');
      figCap.textContent = b.dataset.cap;
      $$('.app-meta dd').forEach(dd => {
        const v = b.dataset[dd.dataset.k];
        if (dd.dataset.k === 'pub' && b.dataset.doi) {
          dd.innerHTML = '';
          const a = document.createElement('a');
          a.href = 'https://doi.org/' + b.dataset.doi; a.target = '_blank'; a.rel = 'noopener'; a.textContent = v;
          dd.appendChild(a);
        } else dd.textContent = v;
      });
      const done = () => { fig.classList.remove('is-swapping'); card.classList.remove('is-swapping'); };
      figImg.complete ? done() : figImg.addEventListener('load', done, { once: true });
    }, reduced ? 0 : 220);
  };
  markers.forEach((m, i) => {
    m.addEventListener('click', () => select(i));
    m.addEventListener('keydown', e => {
      const k = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 }[e.key];
      if (!k) return;
      e.preventDefault();
      const n = (i + k + markers.length) % markers.length;
      select(n); markers[n].focus();
    });
  });
  // warm the cache so switching biomarkers is instant
  addEventListener('load', () => setTimeout(() => markers.forEach(m => { const i = new Image(); i.src = m.dataset.img; }), 600));
  $$('[data-select]').forEach(a => a.addEventListener('click', () => select(+a.dataset.select)));
})();
