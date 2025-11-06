// Prosta funkcja pokazowa - dynamiczne przywitanie
window.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector("h1");
  const now = new Date();
  const hour = now.getHours();

  let greeting = "Witaj, studencie!";
  if (hour < 12) greeting = "Dzień dobry, studencie!";
  else if (hour < 18) greeting = "Miłego popołudnia!";
  else greeting = "Dobry wieczór, studencie!";

  header.textContent = "📘 Dziennik Studenta — " + greeting;
});
