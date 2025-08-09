// storage.js — simple localStorage helpers
const KEY = 'cyn_saved_items';
const LAST_REQUEST = 'cyn_last_request';

export function saveItem(id, item) {
  const all = JSON.parse(localStorage.getItem(KEY) || '{}');
  all[id] = item;
  localStorage.setItem(KEY, JSON.stringify(all));
}

export function getAllSaved() {
  return JSON.parse(localStorage.getItem(KEY) || '{}');
}

export function clearSaved() {
  localStorage.removeItem(KEY);
}

export function saveLastRequest(obj) {
  localStorage.setItem(LAST_REQUEST, JSON.stringify(obj));
}

export function getLastRequest() {
  return JSON.parse(localStorage.getItem(LAST_REQUEST) || 'null');
}
