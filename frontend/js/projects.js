/**
 * Projects Page Functionality
 */

document.addEventListener("DOMContentLoaded", function () {
  initProjectFilters();
});

/**
 * Initialize project filtering and sorting
 */
function initProjectFilters() {
  const filterButtons = document.querySelectorAll(".filter-btn");
  const sortSelect = document.getElementById("sort-select");
  const projectsGrid = document.getElementById("projects-grid");

  if (!projectsGrid) return;

  // Filter button event listeners
  filterButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // Update active state
      filterButtons.forEach((btn) => btn.classList.remove("active"));
      this.classList.add("active");

      // Apply filter
      applyFilters();
    });
  });

  // Sort select event listener
  if (sortSelect) {
    sortSelect.addEventListener("change", applyFilters);
  }

  // Initial filter application
  applyFilters();
}

/**
 * Apply current filters and sorting
 */
function applyFilters() {
  const activeFilter =
    document.querySelector(".filter-btn.active")?.getAttribute("data-filter") ||
    "all";
  const sortValue =
    document.getElementById("sort-select")?.value || "date-desc";
  const projectCards = Array.from(document.querySelectorAll(".project-card"));

  // Filter projects
  projectCards.forEach((card) => {
    const category = card.getAttribute("data-category");
    const shouldShow = activeFilter === "all" || category === activeFilter;

    if (shouldShow) {
      card.style.display = "";
      card.style.animation = "fadeInUp 0.5s ease-out";
    } else {
      card.style.display = "none";
    }
  });

  // Sort visible projects
  const visibleCards = projectCards.filter(
    (card) => card.style.display !== "none"
  );
  sortProjects(visibleCards, sortValue);
}

/**
 * Sort projects based on selected criteria
 */
function sortProjects(cards, sortBy) {
  const grid = document.getElementById("projects-grid");
  if (!grid) return;

  cards.sort((a, b) => {
    switch (sortBy) {
      case "date-asc":
        return (
          new Date(a.getAttribute("data-date")) -
          new Date(b.getAttribute("data-date"))
        );
      case "date-desc":
        return (
          new Date(b.getAttribute("data-date")) -
          new Date(a.getAttribute("data-date"))
        );
      case "title-asc":
        return a
          .querySelector(".project-title")
          .textContent.localeCompare(
            b.querySelector(".project-title").textContent
          );
      case "title-desc":
        return b
          .querySelector(".project-title")
          .textContent.localeCompare(
            a.querySelector(".project-title").textContent
          );
      default:
        return 0;
    }
  });

  // Re-append cards in sorted order
  cards.forEach((card) => grid.appendChild(card));
}

/**
 * Load projects from API (future enhancement)
 */
async function loadProjectsFromAPI() {
  try {
    const response = await fetch("/api/projects");
    const projects = await response.json();
    renderProjects(projects);
  } catch (error) {
    console.error("Error loading projects:", error);
  }
}

/**
 * Render projects to the grid (future enhancement)
 */
function renderProjects(projects) {
  const grid = document.getElementById("projects-grid");
  if (!grid) return;

  const projectsHTML = projects
    .map(
      (project) => `
    <div class="card project-card" data-category="${
      project.category
    }" data-date="${project.date}">

      <div class="project-content">
        <h3 class="project-title">${project.title}</h3>
        <p class="project-meta">${project.meta}</p>
        <p class="project-description">${project.description}</p>
        <div class="project-tags">
          ${project.tags
            .map((tag) => `<span class="tag">${tag}</span>`)
            .join("")}
        </div>
      </div>
    </div>
  `
    )
    .join("");

  grid.innerHTML = projectsHTML;
}
