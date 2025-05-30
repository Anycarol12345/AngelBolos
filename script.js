const scrollToTopButton = document.getElementById("scrollToTop");

window.addEventListener("scroll", () => {
  if (window.scrollY > 200) {
    scrollToTopButton.style.display = "block";
  } else {
    scrollToTopButton.style.display = "none";
  }
});

function confirmWhatsApp(event) {
  const userConfirmed = confirm(
    "Você deseja enviar uma mensagem pelo WhatsApp?"
  );
  if (!userConfirmed) {
    event.preventDefault(); // Impede o redirecionamento se o usuário cancelar
  }
}
