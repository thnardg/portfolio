function setColorScheme(mode) {
  const body = document.body;
  if (mode === "dark") {
    body.classList.add("dark-mode");
    body.classList.remove("light-mode");
    localStorage.setItem("colorScheme", "dark");
  } else {
    body.classList.add("light-mode");
    body.classList.remove("dark-mode");
    localStorage.setItem("colorScheme", "light");
  }
  updateToggleButtonText(mode);
}

function updateToggleButtonText(currentMode) {
  const themeToggleButton = document.getElementById("themeToggleButton");
  if (themeToggleButton) {
    themeToggleButton.textContent =
      currentMode === "dark" ? "light mode" : "dark mode";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  let currentMode = localStorage.getItem("colorScheme") || "light";

  setColorScheme(currentMode);

  const themeToggleButton = document.getElementById("themeToggleButton");
  if (themeToggleButton) {
    themeToggleButton.addEventListener("click", () => {
      currentMode = currentMode === "light" ? "dark" : "light";
      setColorScheme(currentMode);
    });
  }

  const currentYearElement = document.getElementById("currentYear");
  if (currentYearElement) {
    const currentYear = new Date().getFullYear();
    currentYearElement.textContent = currentYear;
  }
});
