// main.js - app initializer (ES module)
import { fetchServices } from './dataFetcher.js';
import { initModal } from './modal.js';
import { saveItem, getAllSaved, clearSaved, saveLastRequest, getLastRequest } from './storage.js';

const modal = initModal();

function el(q) { return document.querySelector(q); }
function els(q) { return Array.from(document.querySelectorAll(q)); }

function setLastModified() {
  const elLM = el('#last-modified');
  if (elLM) elLM.textContent = document.lastModified;
}

/* ---- menu toggle for small screens ---- */
function initMenuToggle() {
  const btn = el('#menu-toggle');
  const nav = el('.nav');
  if (!btn || !nav) return;
  btn.addEventListener('click', () => {
    const visible = nav.style.display === 'flex';
    nav.style.display = visible ? 'none' : 'flex';
    btn.setAttribute('aria-expanded', String(!visible));
  });
}

/* ---- Templates ---- */
function createCard(item) {
  return `
    <article class="card" data-id="${item.id}">
      <img loading="lazy" src="images/${item.image}" alt="${item.title} image">
      <h4>${item.title}</h4>
      <p><strong>Provider:</strong> ${item.provider}</p>
      <p><strong>Location:</strong> ${item.location}</p>
      <p class="desc">${truncate(item.details, 110)}</p>
      <div class="actions">
        <button class="btn view">View</button>
        <button class="btn save">Save</button>
      </div>
    </article>
  `;
}

function truncate(s, n) {
  return s.length > n ? s.slice(0, n - 1) + '…' : s;
}

/* ---- render services and attach listeners ---- */
async function renderServices() {
  const grid = el('#services-grid');
  if (!grid) return;

  const data = await fetchServices();

  // ensure array and at least 15 available from JSON
  const items = Array.isArray(data) ? data : [];
  if (items.length === 0) {
    grid.innerHTML = `<p>No services available at the moment.</p>`;
    return;
  }

  // populate location filter
  const filter = el('#filter-location');
  if (filter) {
    const locs = [...new Set(items.map(i => i.location))].sort();
    locs.forEach(loc => { const o = document.createElement('option'); o.value = loc; o.textContent = loc; filter.appendChild(o); });
    filter.addEventListener('change', () => applyFilter(items, filter.value));
  }

  // render at least the first 15 items
  const toRender = items.slice(0, 15);
  grid.innerHTML = toRender.map(createCard).join('');

  // attach handlers
  grid.querySelectorAll('.view').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const card = e.target.closest('.card');
      const id = card.dataset.id;
      const item = items.find(x => String(x.id) === String(id));
      if (!item) return;
      const html = `
        <h3>${item.title}</h3>
        <p><strong>Provider:</strong> ${item.provider}</p>
        <p><strong>Location:</strong> ${item.location}</p>
        <p>${item.details}</p>
        <p><strong>Contact:</strong> <a href="mailto:${item.contact}">${item.contact}</a></p>
      `;
      modal.open(html);
    });
  });

  grid.querySelectorAll('.save').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const card = e.target.closest('.card');
      const id = card.dataset.id;
      const item = items.find(x => String(x.id) === String(id));
      if (!item) return;
      saveItem(id, item);
      alert('Saved locally — view in localStorage.');
    });
  });

  // clear saved button
  const clearBtn = el('#clear-favs');
  clearBtn?.addEventListener('click', () => {
    clearSaved();
    alert('Saved items cleared.');
  });
}

/* ---- Filter application (array method: filter) ---- */
function applyFilter(allItems, locationVal) {
  const grid = el('#services-grid');
  if (!grid) return;
  const filtered = locationVal === 'all' ? allItems.slice(0,15) : allItems.filter(it => it.location === locationVal).slice(0, 15);
  grid.innerHTML = filtered.map(createCard).join('');
  // reattach handlers (basic approach)
  grid.querySelectorAll('.view').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const card = e.target.closest('.card');
      const id = card.dataset.id;
      const item = allItems.find(x => String(x.id) === String(id));
      modal.open(`<h3>${item.title}</h3><p>${item.details}</p>`);
    });
  });
  grid.querySelectorAll('.save').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const card = e.target.closest('.card');
      const id = card.dataset.id;
      const item = allItems.find(x => String(x.id) === String(id));
      saveItem(id, item);
      alert('Saved locally — view in localStorage.');
    });
  });
}

/* ---- Populate request form services (map) ---- */
function populateRequestOptions(items) {
  const select = el('#service');
  if (!select || !Array.isArray(items)) return;
  // use map to create unique titles
  const titles = [...new Set(items.map(i => i.title))];
  titles.forEach(t => {
    const opt = document.createElement('option');
    opt.value = t; opt.textContent = t;
    select.appendChild(opt);
  });
}

/* ---- Form handling ---- */
function handleRequestForm() {
  const form = el('#service-request-form');
  if (!form) return;
  form.addEventListener('submit', (e) => {
    // Let GET submission go to confirmation page; store a copy in localStorage
    const data = new FormData(form);
    const obj = Object.fromEntries(data.entries());
    saveLastRequest(obj);
    // default submit continues to form-confirmation.html with query string
  });
}

/* ---- Confirmation UI (reads query or localStorage) ---- */
function showConfirmation() {
  const elConfirm = el('#confirmation');
  if (!elConfirm) return;
  const params = new URLSearchParams(window.location.search);
  let out = null;
  if ([...params].length) {
    const name = params.get('name') || 'Friend';
    const service = params.get('service') || 'service';
    out = `<p>Thanks <strong>${escapeHtml(name)}</strong>! Your request for <strong>${escapeHtml(service)}</strong> was recorded. We'll contact you at <strong>${escapeHtml(params.get('email')||'your email')}</strong>.</p>`;
  } else {
    const saved = getLastRequest();
    if (saved) {
      out = `<p>Thanks <strong>${escapeHtml(saved.name||'Friend')}</strong>! Your request for <strong>${escapeHtml(saved.service||'service')}</strong> was recorded. We'll contact you at <strong>${escapeHtml(saved.email||'your email')}</strong>.</p>`;
    }
  }
  if (out) elConfirm.innerHTML = out;
}

/* ---- Utilities ---- */
function escapeHtml(unsafe = '') {
  return String(unsafe)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

/* ---- App init ---- */
async function init() {
  setLastModified();
  initMenuToggle();

  // determine page file
  const path = window.location.pathname;
  const page = path.substring(path.lastIndexOf('/') + 1) || 'index.html';

  // fetch data once and reuse
  const data = await fetchServices();

  if (page === 'services.html') {
    await renderServices();
  }

  if (page === 'request.html') {
    populateRequestOptions(data);
    handleRequestForm();
  }

  if (page === 'form-confirmation.html') {
    showConfirmation();
  }
}

init();


document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('navMenu');

  hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('show');
  });
});
