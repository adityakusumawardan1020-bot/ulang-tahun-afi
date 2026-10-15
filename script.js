const pages = [...document.querySelectorAll(".page")];
const confettiLayer = document.getElementById("confettiLayer");
const envelope = document.getElementById("envelope");
const letterCard = document.getElementById("letterCard");
const music = document.getElementById("bgMusic");
const musicToggle = document.getElementById("musicToggle");

function showPage(id) {
  pages.forEach(page => page.classList.toggle("active", page.id === id));
  window.scrollTo({ top: 0, behavior: "smooth" });
}
function celebrate(amount = 90) {
  const colors = ["#ff789f", "#ffd166", "#ffffff", "#c9a7ff", "#ffb6cb"];
  for (let i = 0; i < amount; i++) {
    const bit = document.createElement("span");
    bit.className = "confetti";
    bit.style.left = Math.random() * 100 + "%";
    bit.style.background = colors[Math.floor(Math.random() * colors.length)];
    bit.style.animationDelay = Math.random() * 1.2 + "s";
    bit.style.animationDuration = (2 + Math.random() * 2) + "s";
    bit.style.transform = `rotate(${Math.random() * 360}deg)`;
    confettiLayer.appendChild(bit);
    setTimeout(() => bit.remove(), 4500);
  }
}
document.getElementById("openSurprise").addEventListener("click", () => {
  celebrate();
  showPage("memories");
});
document.querySelectorAll("[data-next]").forEach(button => {
  button.addEventListener("click", () => showPage(button.dataset.next));
});
envelope.addEventListener("click", () => {
  envelope.classList.add("open");
  letterCard.classList.add("show");
  letterCard.setAttribute("aria-hidden", "false");
  celebrate(35);
  setTimeout(() => letterCard.scrollIntoView({ behavior: "smooth", block: "center" }), 150);
});
document.getElementById("closeLetter").addEventListener("click", () => {
  letterCard.classList.remove("show");
  letterCard.setAttribute("aria-hidden", "true");
  envelope.classList.remove("open");
});
document.getElementById("replay").addEventListener("click", () => {
  letterCard.classList.remove("show");
  envelope.classList.remove("open");
  showPage("home");
  celebrate(50);
});
musicToggle.addEventListener("click", async () => {
  const source = music.querySelector("source");
  if (!source) {
    alert("Untuk menambahkan musik, simpan lagu yang kamu punya izin untuk gunakan sebagai music.mp3, lalu ikuti petunjuk di README.");
    return;
  }
  try {
    if (music.paused) {
      await music.play();
      musicToggle.innerHTML = "♫ <span>Matikan</span>";
    } else {
      music.pause();
      musicToggle.innerHTML = "♫ <span>Musik</span>";
    }
  } catch {
    alert("Musik tidak dapat diputar. Coba tekan tombol musik sekali lagi.");
  }
});
// Efek bintang dan animasi tetap ringan di ponsel.
