// dataFetcher.js
export async function fetchServices() {
  // GitHub Pages URL for published project — replace YOURUSERNAME
  const DATA_URL = 'https://thomassofttech.github.io/wdd231/final/data/services.json';

  try {
    const resp = await fetch(DATA_URL);
    if (!resp.ok) {
      throw new Error(`HTTP error ${resp.status}`);
    }
    const json = await resp.json();
    return json;
  } catch (err) {
    console.error('fetchServices error:', err);
    // fallback to a relative path (useful for local dev)
    try {
      const resp2 = await fetch('./data/services.json');
      if (!resp2.ok) throw new Error('fallback failed');
      return await resp2.json();
    } catch (err2) {
      console.error('fallback fetch failed:', err2);
      return [];
    }
  }
}
