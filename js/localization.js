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

    // Armazenar a preferência do idioma no localStorage para lembrar da próxima vez
    localStorage.setItem("preferredLang", lang);
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
  if (savedLang) {
    setLanguage(savedLang);
  } else {
    setLanguage(browserLang.startsWith("pt") ? "pt" : "en");
  }
});
