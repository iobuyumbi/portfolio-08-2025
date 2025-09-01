/**
 * Theme Toggle Module
 */

const STORAGE_KEY = "portfolio-theme";

/**
 * Initialize theme functionality
 */
export function initTheme() {
  const themeToggle = document.getElementById("theme-toggle");

  if (!themeToggle) {
    console.warn("Theme toggle not found");
    return;
  }

  // Set initial theme
  const savedTheme = getSavedTheme();
  const systemPrefersDark = window.matchMedia(
    "(prefers-color-scheme: dark)"
  ).matches;
  const initialTheme = savedTheme || (systemPrefersDark ? "dark" : "light");

  applyTheme(initialTheme);
  updateToggleState(initialTheme);

  // Listen for toggle changes
  themeToggle.addEventListener("change", handleThemeToggle);

  // Listen for system theme changes
  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", (e) => {
      if (!getSavedTheme()) {
        const newTheme = e.matches ? "dark" : "light";
        applyTheme(newTheme);
        updateToggleState(newTheme);
      }
    });
}

/**
 * Handle theme toggle change
 */
function handleThemeToggle(event) {
  const newTheme = event.target.checked ? "light" : "dark";
  applyTheme(newTheme);
  saveTheme(newTheme);
}

/**
 * Apply theme to document
 */
function applyTheme(theme) {
  const root = document.documentElement;

  if (theme === "light") {
    root.setAttribute("data-theme", "light");
  } else {
    root.removeAttribute("data-theme");
  }

  // Dispatch custom event for other modules
  window.dispatchEvent(
    new CustomEvent("themeChanged", {
      detail: { theme },
    })
  );
}

/**
 * Update toggle button state
 */
function updateToggleState(theme) {
  const themeToggle = document.getElementById("theme-toggle");
  if (themeToggle) {
    themeToggle.checked = theme === "light";
  }
}

/**
 * Save theme preference to localStorage
 */
function saveTheme(theme) {
  try {
    localStorage.setItem(STORAGE_KEY, theme);
  } catch (error) {
    console.warn("Could not save theme preference:", error);
  }
}

/**
 * Get saved theme from localStorage
 */
function getSavedTheme() {
  try {
    return localStorage.getItem(STORAGE_KEY);
  } catch (error) {
    console.warn("Could not read theme preference:", error);
    return null;
  }
}

/**
 * Get current theme
 */
export function getCurrentTheme() {
  return document.documentElement.getAttribute("data-theme") === "light"
    ? "light"
    : "dark";
}
