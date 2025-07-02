async function setLanguage(lang) {
  let response;
  try {
    response = await fetch(`translations/${lang}.json`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const translations = await response.json();

    document.documentElement.lang = lang;

    for (const key in translations) {
      const element = document.getElementById(key);
      if (element) {
        element.textContent = translations[key];
      }
    }
    document.title = translations.pageTitle || document.title;

    localStorage.setItem("preferredLang", lang);

    const toggleButton = document.getElementById("languageToggleButton");
    toggleButton.textContent = lang === "en" ? "português" : "english";
    toggleButton.setAttribute("data-lang", lang === "en" ? "pt" : "en");
  } catch (error) {
    console.error("Erro ao carregar tradução:", error);
    if (lang !== "en") {
      setLanguage("en");
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const savedLang = localStorage.getItem("preferredLang");
  const browserLang = navigator.language || navigator.userLanguage;
  const lang = savedLang || (browserLang.startsWith("pt") ? "pt" : "en");

  setLanguage(lang);

  const toggleButton = document.getElementById("languageToggleButton");
  toggleButton.addEventListener("click", () => {
    const nextLang = toggleButton.getAttribute("data-lang") || "en";
    setLanguage(nextLang);
  });
});
