async function loadTranslations(lang) {
  try {
    const response = await fetch(`./assets/translations/${lang}.json`);
    if (!response.ok) throw new Error("Failed to load translations");
    return await response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
}

async function setLanguage(lang) {
  const translations = await loadTranslations(lang);
  if (!translations) return;

  localStorage.setItem("language", lang);
  document.querySelectorAll("[data-lng]").forEach((element) => {
    const key = element.getAttribute("data-lng");
    element.textContent = translations[key] || element.textContent;
  });
  document.documentElement.lang = lang;

  const langButton = document.querySelector(".lang-button");
  langButton.textContent = lang === "en" ? "Rus" : "Eng";
  langButton.setAttribute("data-lang", lang === "en" ? "ru" : "en");

  const resumeLink = document.getElementById("resume-link");
  if (resumeLink) {
    resumeLink.href =
      lang === "en" ? "./assets/resume_eng.pdf" : "./assets/resume_ru.pdf";
  }
}

document.addEventListener("DOMContentLoaded", async () => {
  const savedLang = localStorage.getItem("language") || "en";
  await setLanguage(savedLang);

  const langButton = document.querySelector(".lang-button");
  langButton.addEventListener("click", async () => {
    const currentLang = document.documentElement.lang;
    const newLang = currentLang === "en" ? "ru" : "en";
    await setLanguage(newLang);
  });
});
