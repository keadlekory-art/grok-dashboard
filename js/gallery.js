// Simple lightbox: gallery thumbnails open the full-size image on click.
document.addEventListener('click', (event) => {
  const link = event.target.closest('a.gallery-item');
  if (!link) return;
  event.preventDefault();

  const overlay = document.createElement('div');
  overlay.className = 'lightbox';
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-label', 'Full-size image. Click or press Escape to close.');

  const img = document.createElement('img');
  img.src = link.getAttribute('href');
  const thumb = link.querySelector('img');
  img.alt = thumb ? thumb.alt : '';
  overlay.appendChild(img);

  const close = () => {
    overlay.remove();
    document.removeEventListener('keydown', onKey);
  };
  const onKey = (ev) => {
    if (ev.key === 'Escape') close();
  };

  overlay.addEventListener('click', close);
  document.addEventListener('keydown', onKey);
  document.body.appendChild(overlay);
});
