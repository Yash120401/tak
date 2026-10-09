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

// Listing pages: filter drawer on small screens, filter pills and grid or list view
const filters = document.getElementById('filters');
if (filters) {
  const setFilters = open => { filters.classList.toggle('open', open); document.documentElement.style.overflow = open ? 'hidden' : ''; };
  document.querySelectorAll('[data-filters-open]').forEach(b => b.addEventListener('click', () => setFilters(true)));
  filters.querySelectorAll('[data-filters-close]').forEach(b => b.addEventListener('click', () => setFilters(false)));
  addEventListener('keydown', e => { if (e.key === 'Escape' && filters.classList.contains('open')) setFilters(false); });
}
document.querySelectorAll('.pill-opt').forEach(p => p.addEventListener('click', () => p.classList.toggle('on')));
document.querySelectorAll('.view-tg button').forEach(b => b.addEventListener('click', () => {
  b.parentNode.querySelectorAll('button').forEach(x => { x.classList.toggle('on', x === b); x.setAttribute('aria-pressed', String(x === b)); });
  document.querySelector('.results .cards').classList.toggle('as-list', b.dataset.view === 'list');
}));

// Save buttons on listings
document.querySelectorAll('[data-save]').forEach(b => b.addEventListener('click', () => {
  const on = b.getAttribute('aria-pressed') !== 'true';
  document.querySelectorAll('[data-save]').forEach(x => x.setAttribute('aria-pressed', String(on)));
}));

// Prototype forms (newsletter, account) don't submit anywhere yet
document.querySelectorAll('form.form-lite').forEach(f => f.addEventListener('submit', e => e.preventDefault()));

// Year in the footer
document.querySelectorAll('[data-year]').forEach(el => el.textContent = new Date().getFullYear());

inlineIcons();
