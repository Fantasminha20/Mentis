const cards = document.querySelectorAll(".pilar-card");

cards.forEach(card => {
    card.addEventListener("click", () => {
        card.classList.toggle("ativo");
    });
});