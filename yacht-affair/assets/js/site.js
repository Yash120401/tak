/* Yacht Affair · shared page behaviour */

// Expand <use> references into inline SVG so CSS colours apply and design-import tools see real vectors
const inlineIcons = (root = document) => root.querySelectorAll('svg > use').forEach(u => {
  const sym = document.querySelector(u.getAttribute('href')), svg = u.parentNode;
  if (!sym) return;
  svg.setAttribute('viewBox', sym.getAttribute('viewBox'));
  svg.innerHTML = sym.innerHTML;
});

// Header turns solid once the page scrolls
const header = document.getElementById('header');
if (header) {
  const solid = () => header.classList.toggle('is-solid', scrollY > 40);
  addEventListener('scroll', solid, {passive:true}); solid();
}

// Mobile menu
const menu = document.getElementById('menu'), burger = document.getElementById('burger');
if (menu && burger) {
  const setMenu = open => {
    menu.classList.toggle('open', open);
    menu.setAttribute('aria-hidden', String(!open));
    burger.setAttribute('aria-expanded', String(open));
    document.documentElement.style.overflow = open ? 'hidden' : '';
    if (open) document.getElementById('menuClose').focus(); else burger.focus();
  };
  burger.onclick = () => setMenu(true);
  document.getElementById('menuClose').onclick = () => setMenu(false);
  menu.querySelectorAll('nav a').forEach(a => a.addEventListener('click', () => setMenu(false)));
  addEventListener('keydown', e => { if (e.key === 'Escape' && menu.classList.contains('open')) setMenu(false); });
}

// Legal pages: highlight the current section in the contents list and show reading progress
const toc = document.querySelector('.toc');
if (toc) {
  const links = [...toc.querySelectorAll('ol a')];
  const sections = links.map(a => document.querySelector(a.getAttribute('href'))).filter(Boolean);
  const bar = toc.querySelector('.toc-bar i'), article = document.querySelector('.article');
  const update = () => {
    const y = scrollY + 140;
    let idx = 0;
    sections.forEach((s, i) => { if (s.offsetTop <= y) idx = i; });
    links.forEach((a, i) => a.classList.toggle('on', i === idx));
    const top = article.offsetTop, h = article.offsetHeight - innerHeight + 200;
    if (bar) bar.style.width = Math.max(0, Math.min(1, (scrollY - top + 140) / h)) * 100 + '%';
    const on = links[idx], list = on && on.closest('ol');
    if (list && (on.offsetTop < list.scrollTop || on.offsetTop > list.scrollTop + list.clientHeight - 40)) list.scrollTop = on.offsetTop - 40;
  };
  addEventListener('scroll', update, {passive:true}); addEventListener('resize', update); update();
}
document.querySelectorAll('.toc-mobile a').forEach(a => a.addEventListener('click', () => a.closest('details').open = false));

// Contact form: preselect the topic from ?topic=… and acknowledge submission (prototype, not connected yet)
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  const topic = new URLSearchParams(location.search).get('topic');
  const select = contactForm.querySelector('select[name="topic"]');
  if (topic && select && select.querySelector(`option[value="${CSS.escape(topic)}"]`)) select.value = topic;
}
document.querySelectorAll('form.form').forEach(f => f.addEventListener('submit', e => {
  e.preventDefault();
  f.classList.add('sent');
}));

// Legal pages: bring the current document's tab into view on narrow screens
const docTabs = document.querySelector('.doc-tabs'), docTab = docTabs && docTabs.querySelector('.tab.active');
if (docTab && docTabs.scrollWidth > docTabs.clientWidth) {
  const t = docTab.getBoundingClientRect(), c = docTabs.getBoundingClientRect();
  docTabs.scrollLeft += t.left - c.left - (c.width - t.width) / 2;
}

// Yacht page: gallery with thumbnails, swipe and an enlarged view
const gallery = document.querySelector('[data-gallery]');
if (gallery) {
  const thumbs = [...gallery.querySelectorAll('.thumb[data-src]')], main = gallery.querySelector('[data-gal-img]');
  const count = gallery.querySelector('[data-gal-n]'), lightbox = document.getElementById('lightbox'), lbImg = lightbox.querySelector('[data-lb-img]');
  let at = 0;
  const show = i => {
    at = (i + thumbs.length) % thumbs.length;
    main.src = thumbs[at].dataset.src; lbImg.src = main.src;
    thumbs.forEach((t, k) => t.classList.toggle('on', k === at));
    count.textContent = at + 1;
  };
  thumbs.forEach((t, k) => t.addEventListener('click', () => show(k)));
  document.querySelectorAll('[data-gal-prev]').forEach(b => b.addEventListener('click', () => show(at - 1)));
  document.querySelectorAll('[data-gal-next]').forEach(b => b.addEventListener('click', () => show(at + 1)));
  let x0 = null;
  main.addEventListener('touchstart', e => { x0 = e.touches[0].clientX; }, {passive:true});
  main.addEventListener('touchend', e => { if (x0 === null) return; const dx = e.changedTouches[0].clientX - x0; if (Math.abs(dx) > 40) show(at + (dx < 0 ? 1 : -1)); x0 = null; });
  const setLb = open => { lightbox.hidden = !open; document.documentElement.style.overflow = open ? 'hidden' : ''; if (open) lbImg.src = main.src; };
  main.addEventListener('click', () => setLb(true));
  gallery.querySelectorAll('[data-gal-zoom]').forEach(b => b.addEventListener('click', () => setLb(true)));
  lightbox.querySelector('[data-lb-close]').addEventListener('click', () => setLb(false));
  addEventListener('keydown', e => {
    if (lightbox.hidden) return;
    if (e.key === 'Escape') setLb(false);
    if (e.key === 'ArrowRight') show(at + 1);
    if (e.key === 'ArrowLeft') show(at - 1);
  });
}

// Yacht page: Request Full Specs / Deck Plans / Brochure open a short form
const reqModal = document.getElementById('reqModal');
if (reqModal) {
  const setReq = (open, doc) => {
    reqModal.hidden = !open;
    document.documentElement.style.overflow = open ? 'hidden' : '';
    if (open) {
      reqModal.querySelector('[data-req-title]').textContent = 'Request ' + doc;
      reqModal.querySelector('form').classList.remove('sent');
      reqModal.querySelector('input').focus();
    }
  };
  document.querySelectorAll('[data-request]').forEach(b => b.addEventListener('click', () => setReq(true, b.dataset.request)));
  reqModal.querySelectorAll('[data-req-close]').forEach(b => b.addEventListener('click', () => setReq(false)));
  addEventListener('keydown', e => { if (e.key === 'Escape' && !reqModal.hidden) setReq(false); });
}

// Contact page: switch the map between the two offices
const OFFICES = {
  vancouver: {k: 'Vancouver office', v: '800-525 West 8th Avenue', href: 'https://www.google.com/maps/search/?api=1&query=800-525+West+8th+Avenue+Vancouver+BC+V5Z+1C6', x: '58%', y: '48%'},
  dubai: {k: 'Dubai office', v: 'Address to be confirmed', href: 'https://www.google.com/maps/search/?api=1&query=Dubai+United+Arab+Emirates', x: '36%', y: '62%'}
};
document.querySelectorAll('.map-tabs [data-office]').forEach(b => b.addEventListener('click', () => {
  const o = OFFICES[b.dataset.office], map = document.querySelector('.map-lg');
  b.parentNode.querySelectorAll('.tab').forEach(t => t.classList.toggle('active', t === b));
  map.querySelector('.map-label .k').textContent = o.k;
  map.querySelector('.map-label .v').textContent = o.v;
  map.querySelector('.map-label a').href = o.href;
  map.querySelector('.pin').style.left = o.x; map.querySelector('.pin').style.top = o.y;
  map.setAttribute('aria-label', 'Map showing the ' + o.k);
}));

// Save buttons on listings
document.querySelectorAll('[data-save]').forEach(b => b.addEventListener('click', () => {
  const on = b.getAttribute('aria-pressed') !== 'true';
  document.querySelectorAll('[data-save]').forEach(x => x.setAttribute('aria-pressed', String(on)));
}));

// Year in the footer
document.querySelectorAll('[data-year]').forEach(el => el.textContent = new Date().getFullYear());

inlineIcons();
