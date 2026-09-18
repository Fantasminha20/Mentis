const carousel = document.getElementById("teamCarousel");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");

let autoScroll;
const speed = 2500;

const originalCards = [...carousel.children];

originalCards.forEach(card => {
  const clone = card.cloneNode(true);
  carousel.appendChild(clone);
});

let currentIndex = 0;

function getCardWidth() {
  return document.querySelector(".team-card").offsetWidth + 30;
}

function updateCarousel(animated = true) {
  carousel.style.transition = animated ? "transform 0.6s ease" : "none";
  carousel.style.transform = `translateX(-${currentIndex * getCardWidth()}px)`;
}

function nextSlide() {
  currentIndex++;
  updateCarousel();

  if (currentIndex >= originalCards.length) {
    setTimeout(() => {
      currentIndex = 0;
      updateCarousel(false);
    }, 600);
  }
}

function prevSlide() {
  if (currentIndex <= 0) {
    currentIndex = originalCards.length;
    updateCarousel(false);
  }

  setTimeout(() => {
    currentIndex--;
    updateCarousel();
  }, 10);
}

function startAutoScroll() {
  stopAutoScroll();
  autoScroll = setInterval(nextSlide, speed);
}

function stopAutoScroll() {
  clearInterval(autoScroll);
}

nextBtn.addEventListener("click", () => {
  stopAutoScroll();
  nextSlide();
});

prevBtn.addEventListener("click", () => {
  stopAutoScroll();
  prevSlide();
});

carousel.addEventListener("mouseenter", stopAutoScroll);
carousel.addEventListener("mouseleave", startAutoScroll);

startAutoScroll();


const cards = document.querySelectorAll(".pilar-card");

cards.forEach(card => {
    card.addEventListener("click", () => {
        card.classList.toggle("ativo");
    });
});