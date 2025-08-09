// modal.js
export function initModal() {
  const modal = document.getElementById('modal');
  if (!modal) return { open: () => {}, close: () => {} };

  const body = modal.querySelector('#modal-body');
  const closeBtn = modal.querySelector('.modal-close');

  function open(html) {
    if (body) body.innerHTML = html;
    modal.setAttribute('aria-hidden', 'false');
    // focus management
    const firstFocusable = modal.querySelector('button, a, input, [tabindex]') || closeBtn;
    firstFocusable?.focus();
    document.body.style.overflow = 'hidden';
  }

  function close() {
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  closeBtn?.addEventListener('click', close);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) close();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.getAttribute('aria-hidden') === 'false') close();
  });

  return { open, close };
}
