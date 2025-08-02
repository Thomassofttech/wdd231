const visitMsg = document.getElementById("visit-msg");
const today = Date.now();
const lastVisit = localStorage.getItem("lastVisit");

if (!lastVisit) {
  visitMsg.textContent = "Welcome! Let us know if you have any questions.";
} else {
  const days = Math.floor((today - Number(lastVisit)) / (1000 * 60 * 60 * 24));
  if (days < 1) {
    visitMsg.textContent = "Back so soon! Awesome!";
  } else {
    visitMsg.textContent = `You last visited ${days} ${days === 1 ? "day" : "days"} ago.`;
  }
}

localStorage.setItem("lastVisit", today);
