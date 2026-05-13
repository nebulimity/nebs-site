const toggle = document.getElementById("theme-toggle");
const icon = toggle.querySelector("img");
const mq = window.matchMedia("(prefers-color-scheme: dark)");

function getTheme() {
  return localStorage.getItem("theme") || (mq.matches ? "dark" : "light");
}

function updateIcon() {
  icon.src = getTheme() === "dark" ? "/images/sun.svg" : "/images/moon.svg";
}

toggle.addEventListener("click", () => {
  const next = getTheme() === "dark" ? "light" : "dark";
  document.documentElement.style.colorScheme = next;
  localStorage.setItem("theme", next);
  updateIcon();
});

mq.addEventListener("change", () => {
  if (!localStorage.getItem("theme")) updateIcon();
});

updateIcon();
