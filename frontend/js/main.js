/**
 * Main JavaScript file - coordinates all functionality
 */

// Import modules
import { initTheme } from "./theme.js";
import { initNavigation } from "./navigation.js";
import { initForms } from "./form.js";

// Initialize app when DOM is loaded
document.addEventListener("DOMContentLoaded", async function () {
  try {
    // Load partials first
    await loadPartials();

    // Initialize modules
    initTheme();
    initNavigation();
    initForms();

    // Add page-specific functionality
    initPageSpecific();

    console.log("Portfolio app initialized successfully");
  } catch (error) {
    console.error("Error initializing app:", error);
  }
});

/**
 * Load HTML partials (header, footer)
 */
async function loadPartials() {
  const partials = [
    { selector: "#header", file: "/partials/header.html" },
    { selector: "#footer", file: "/partials/footer.html" },
  ];

  const loadPromises = partials.map(async ({ selector, file }) => {
    const element = document.querySelector(selector);
    if (element) {
      try {
        const response = await fetch(file);
        if (!response.ok) throw new Error(`Failed to load ${file}`);
        const html = await response.text();
        element.innerHTML = html;
      } catch (error) {
        console.error(`Error loading ${file}:`, error);
        element.innerHTML = `<!-- Failed to load ${file} -->`;
      }
    }
  });

  await Promise.all(loadPromises);
}

/**
 * Initialize page-specific functionality
 */
function initPageSpecific() {
  const currentPage = getCurrentPage();

  switch (currentPage) {
    case "projects":
      initProjectsPage();
      break;
    case "contact":
      initContactPage();
      break;
    case "about":
      initAboutPage();
      break;
    default:
      initHomePage();
  }
}

/**
 * Get current page from URL
 */
function getCurrentPage() {
  const path = window.location.pathname;
  if (path === "/" || path === "/index.html" || path.includes("home"))
    return "home";
  if (path.includes("about")) return "about";
  if (path.includes("projects")) return "projects";
  if (path.includes("contact")) return "contact";
  return "home";
}

/**
 * Initialize home page functionality
 */
function initHomePage() {
  // Add scroll animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate-fade-in-up");
      }
    });
  }, observerOptions);

  // Observe sections for animation
  document.querySelectorAll(".section").forEach((section) => {
    observer.observe(section);
  });
}

/**
 * Initialize projects page functionality
 */
function initProjectsPage() {
  // Project filtering and sorting will be handled here
  console.log("Projects page initialized");
}

/**
 * Initialize contact page functionality
 */
function initContactPage() {
  // Contact form handling will be initialized by form.js
  console.log("Contact page initialized");
}

/**
 * Initialize about page functionality
 */
function initAboutPage() {
  // About page specific functionality
  console.log("About page initialized");
}

/**
 * Utility function to debounce function calls
 */
export function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Utility function for smooth scrolling
 */
export function smoothScrollTo(target, offset = 0) {
  const element = document.querySelector(target);
  if (element) {
    const elementPosition = element.offsetTop - offset;
    window.scrollTo({
      top: elementPosition,
      behavior: "smooth",
    });
  }
}
