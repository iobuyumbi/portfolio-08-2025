/**
 * Navigation Module
 */

/**
 * Initialize navigation functionality
 */
export function initNavigation() {
  initMobileMenu();
  setActiveNavLink();
  initSmoothScrolling();
}

/**
 * Initialize mobile menu toggle
 */
function initMobileMenu() {
  const mobileToggle = document.getElementById("mobile-menu-toggle");
  const navMenu = document.getElementById("nav-menu");

  if (!mobileToggle || !navMenu) return;

  mobileToggle.addEventListener("click", () => {
    mobileToggle.classList.toggle("active");
    navMenu.classList.toggle("active");
    document.body.style.overflow = navMenu.classList.contains("active")
      ? "hidden"
      : "";
  });

  // Close menu when clicking nav links
  navMenu.addEventListener("click", (e) => {
    if (e.target.classList.contains("nav-link")) {
      mobileToggle.classList.remove("active");
      navMenu.classList.remove("active");
      document.body.style.overflow = "";
    }
  });

  // Close menu when clicking outside
  document.addEventListener("click", (e) => {
    if (!mobileToggle.contains(e.target) && !navMenu.contains(e.target)) {
      mobileToggle.classList.remove("active");
      navMenu.classList.remove("active");
      document.body.style.overflow = "";
    }
  });

  // Close menu on escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      mobileToggle.classList.remove("active");
      navMenu.classList.remove("active");
      document.body.style.overflow = "";
    }
  });
}

/**
 * Set active navigation link based on current page
 */
function setActiveNavLink() {
  const currentPage = getCurrentPageFromURL();
  const navLinks = document.querySelectorAll(".nav-link");

  navLinks.forEach((link) => {
    const linkPage = link.getAttribute("data-page");
    if (linkPage === currentPage) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
}

/**
 * Get current page identifier from URL
 */
function getCurrentPageFromURL() {
  const path = window.location.pathname;
  if (path === "/" || path === "/index.html" || path.includes("home"))
    return "home";
  if (path.includes("about")) return "about";
  if (path.includes("projects")) return "projects";
  if (path.includes("contact")) return "contact";
  return "home";
}

/**
 * Initialize smooth scrolling for anchor links
 */
function initSmoothScrolling() {
  document.addEventListener("click", (e) => {
    const link = e.target.closest('a[href^="#"]');
    if (!link) return;

    e.preventDefault();
    const targetId = link.getAttribute("href");
    const targetElement = document.querySelector(targetId);

    if (targetElement) {
      const headerHeight = document.querySelector(".navbar")?.offsetHeight || 0;
      const elementPosition = targetElement.offsetTop - headerHeight - 20;

      window.scrollTo({
        top: elementPosition,
        behavior: "smooth",
      });

      // Update URL without jumping
      history.pushState(null, null, targetId);
    }
  });
}

/**
 * Update navigation state (useful for SPA-like behavior)
 */
export function updateNavigation(page) {
  const navLinks = document.querySelectorAll(".nav-link");

  navLinks.forEach((link) => {
    const linkPage = link.getAttribute("data-page");
    if (linkPage === page) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
}
