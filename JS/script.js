const menuToggle = document.querySelector('.menu-toggle');
const mainNav = document.querySelector('.main-nav');

// Menu mobile: abre e fecha com o botão, e fecha ao escolher uma seção.
if (menuToggle && mainNav) {
  menuToggle.addEventListener('click', () => {
    const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', String(!isOpen));
    menuToggle.setAttribute('aria-label', isOpen ? 'Abrir menu' : 'Fechar menu');
    mainNav.classList.toggle('is-open', !isOpen);
  });

  mainNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      menuToggle.setAttribute('aria-expanded', 'false');
      menuToggle.setAttribute('aria-label', 'Abrir menu');
      mainNav.classList.remove('is-open');
    });
  });
}

// Animações de entrada ao rolar a página; conteúdo continua acessível sem JS.
const revealElements = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries, currentObserver) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        currentObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealElements.forEach((element) => observer.observe(element));
} else {
  revealElements.forEach((element) => element.classList.add('is-visible'));
}

// Atualiza o ano do rodapé automaticamente.
const yearElement = document.getElementById('year');
if (yearElement) yearElement.textContent = new Date().getFullYear();


const teamTrack = document.querySelector("#team-track");
const teamPrev = document.querySelector(".team-prev");
const teamNext = document.querySelector(".team-next");
const teamCounter = document.querySelector("#team-counter");
const teamProgress = document.querySelector("#team-progress-fill");

if (teamTrack && teamPrev && teamNext) {
  const cards = [...teamTrack.querySelectorAll(".team-card")];

  function updateTeamCarousel() {
    const maxScroll =
      teamTrack.scrollWidth - teamTrack.clientWidth;

    const currentScroll = teamTrack.scrollLeft;

    const progress = maxScroll > 0
      ? currentScroll / maxScroll
      : 0;

    const currentIndex = cards.reduce((last, card, index) => {
      return card.offsetLeft - teamTrack.offsetLeft
        <= currentScroll + 10
        ? index
        : last;
    }, 0);

    teamCounter.textContent =
      `${String(currentIndex + 1).padStart(2, "0")} / ` +
      `${String(cards.length).padStart(2, "0")}`;

    teamProgress.style.width =
      `${Math.max(25, progress * 100)}%`;

    teamPrev.disabled = currentScroll <= 2;
    teamNext.disabled = currentScroll >= maxScroll - 2;

    teamPrev.style.opacity = teamPrev.disabled ? "0.4" : "1";
    teamNext.style.opacity = teamNext.disabled ? "0.4" : "1";
  }

  function moveTeam(direction) {
    const card = cards[0];

    if (!card) return;

    const gap = parseFloat(
      getComputedStyle(teamTrack).gap
    ) || 0;

    const distance = card.getBoundingClientRect().width + gap;

    teamTrack.scrollBy({
      left: distance * direction,
      behavior: "smooth"
    });
  }

  teamPrev.addEventListener("click", () => moveTeam(-1));
  teamNext.addEventListener("click", () => moveTeam(1));

  teamTrack.addEventListener("scroll", updateTeamCarousel, {
    passive: true
  });

  window.addEventListener("resize", updateTeamCarousel);

  updateTeamCarousel();
}
