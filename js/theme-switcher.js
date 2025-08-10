function setTheme(theme) {
  document.querySelector("body").setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);

  const themeButton = document.querySelector(".theme-button");
  const themeIcon = themeButton.querySelector(".theme-icon");
  themeIcon.src =
    theme === "light"
      ? "./assets/elements/moon.svg"
      : "./assets/elements/sun.svg";
  themeButton.setAttribute("data-theme", theme === "light" ? "dark" : "light");
}

function getThemeOnLoad() {
  const theme = localStorage.getItem("theme") || "light";
  setTheme(theme);
}

document.addEventListener("DOMContentLoaded", () => {
  getThemeOnLoad();

  const themeButton = document.querySelector(".theme-button");
  themeButton.addEventListener("click", () => {
    const currentTheme = document
      .querySelector("body")
      .getAttribute("data-theme");
    const newTheme = currentTheme === "light" ? "dark" : "light";
    setTheme(newTheme);
  });
});
