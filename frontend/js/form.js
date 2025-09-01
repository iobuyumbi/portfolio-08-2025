/**
 * Form Handling Module
 */

/**
 * Initialize form functionality
 */
export function initForms() {
  initContactForm();
}

/**
 * Initialize contact form
 */
function initContactForm() {
  const contactForm = document.getElementById("contact-form");
  if (!contactForm) return;

  const formInputs = contactForm.querySelectorAll(".form-control");

  // Add real-time validation
  formInputs.forEach((input) => {
    input.addEventListener("blur", () => validateField(input));
    input.addEventListener("input", () => clearFieldError(input));
  });

  // Handle form submission
  contactForm.addEventListener("submit", handleFormSubmit);
}

/**
 * Handle contact form submission
 */
async function handleFormSubmit(e) {
  e.preventDefault();

  const form = e.target;
  const submitBtn = form.querySelector('button[type="submit"]');
  const statusContainer = document.getElementById("form-status");

  // Validate all fields
  const isValid = validateForm(form);
  if (!isValid) return;

  // Show loading state
  const originalBtnText = submitBtn.innerHTML;
  submitBtn.disabled = true;
  submitBtn.innerHTML = '<span class="spinner"></span> Sending...';

  // Clear previous status
  if (statusContainer) {
    statusContainer.innerHTML = "";
  }

  try {
    // Get form data
    const formData = {
      name: form.querySelector("#name").value.trim(),
      email: form.querySelector("#email").value.trim(),
      subject: form.querySelector("#subject").value.trim(),
      message: form.querySelector("#message").value.trim(),
    };

    // Submit to backend
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const result = await response.json();

    if (result.success) {
      showFormStatus(
        "success",
        "Message sent successfully! I'll get back to you within 24 hours."
      );
      form.reset();
    } else {
      showFormStatus(
        "error",
        result.message || "Failed to send message. Please try again."
      );
    }
  } catch (error) {
    console.error("Form submission error:", error);
    showFormStatus(
      "error",
      "Network error. Please check your connection and try again."
    );
  } finally {
    // Reset button state
    submitBtn.disabled = false;
    submitBtn.innerHTML = originalBtnText;
  }
}

/**
 * Validate entire form
 */
function validateForm(form) {
  const inputs = form.querySelectorAll(".form-control");
  let isValid = true;

  inputs.forEach((input) => {
    if (!validateField(input)) {
      isValid = false;
    }
  });

  return isValid;
}

/**
 * Validate individual field
 */
function validateField(input) {
  const value = input.value.trim();
  const fieldName = input.name;
  let isValid = true;
  let errorMessage = "";

  switch (fieldName) {
    case "name":
      if (value.length < 2) {
        isValid = false;
        errorMessage = "Name must be at least 2 characters";
      } else if (value.length > 50) {
        isValid = false;
        errorMessage = "Name must be less than 50 characters";
      }
      break;

    case "email":
      if (!isValidEmail(value)) {
        isValid = false;
        errorMessage = "Please enter a valid email address";
      }
      break;

    case "subject":
      if (value.length < 3) {
        isValid = false;
        errorMessage = "Subject must be at least 3 characters";
      } else if (value.length > 100) {
        isValid = false;
        errorMessage = "Subject must be less than 100 characters";
      }
      break;

    case "message":
      if (value.length < 10) {
        isValid = false;
        errorMessage = "Message must be at least 10 characters";
      } else if (value.length > 1000) {
        isValid = false;
        errorMessage = "Message must be less than 1000 characters";
      }
      break;
  }

  // Update field state
  if (isValid) {
    clearFieldError(input);
  } else {
    showFieldError(input, errorMessage);
  }

  return isValid;
}

/**
 * Validate email format
 */
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Show field error
 */
function showFieldError(input, message) {
  input.classList.add("is-invalid");

  let errorElement = input.parentNode.querySelector(".form-error");
  if (!errorElement) {
    errorElement = document.createElement("div");
    errorElement.className = "form-error";
    input.parentNode.appendChild(errorElement);
  }

  errorElement.textContent = message;
}

/**
 * Clear field error
 */
function clearFieldError(input) {
  input.classList.remove("is-invalid");

  const errorElement = input.parentNode.querySelector(".form-error");
  if (errorElement) {
    errorElement.remove();
  }
}

/**
 * Show form status message
 */
function showFormStatus(type, message) {
  const statusContainer = document.getElementById("form-status");
  if (!statusContainer) return;

  const icon =
    type === "success" ? "fas fa-check-circle" : "fas fa-exclamation-circle";

  statusContainer.innerHTML = `
    <div class="status-message status-${type}">
      <i class="${icon}"></i>
      <span>${message}</span>
    </div>
  `;

  // Scroll to status message
  statusContainer.scrollIntoView({
    behavior: "smooth",
    block: "nearest",
  });
}
