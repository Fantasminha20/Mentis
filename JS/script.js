const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.navigation');

if (toggle && nav) {
  toggle.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!open));
    toggle.setAttribute('aria-label', open ? 'Abrir menu' : 'Fechar menu');
    nav.classList.toggle('open', !open);
  });

  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Abrir menu');
      nav.classList.remove('open');
    });
  });
}

const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();

const track = document.getElementById('team-track');
const previous = document.querySelector('.team-prev');
const next = document.querySelector('.team-next');
const counter = document.getElementById('team-counter');
const progress = document.getElementById('team-progress-fill');

if (track && previous && next) {
  const cards = [...track.querySelectorAll('.team-card')];

  function updateCarousel() {
    const max = Math.max(0, track.scrollWidth - track.clientWidth);
    const current = track.scrollLeft;
    const index = cards.reduce((found, card, i) =>
      card.offsetLeft - track.offsetLeft <= current + 12 ? i : found, 0);

    if (counter) counter.textContent =
      `${String(index + 1).padStart(2, '0')} / ${String(cards.length).padStart(2, '0')}`;
    if (progress) progress.style.width = `${max ? Math.max(9, current / max * 100) : 100}%`;

    previous.disabled = current <= 2;
    next.disabled = current >= max - 2;
  }

  function move(direction) {
    const card = cards[0];
    if (!card) return;
    const gap = parseFloat(getComputedStyle(track).gap) || 0;
    track.scrollBy({ left: (card.getBoundingClientRect().width + gap) * direction, behavior: 'smooth' });
  }

  previous.addEventListener('click', () => move(-1));
  next.addEventListener('click', () => move(1));
  track.addEventListener('scroll', updateCarousel, { passive: true });
  window.addEventListener('resize', updateCarousel);
  updateCarousel();
}
