/* ============================================
   Riverbend Yoga Studio - script.js
   Interactive Feature + Form Validation + Storage
   ============================================ */

// Array of class options (used by the preference feature)
const classOptions = [
  { id: "gentle", name: "Gentle Yoga", description: "Slow and mindful" },
  { id: "vinyasa", name: "Vinyasa Flow", description: "Breath-linked movement" },
  { id: "restorative", name: "Restorative Yoga", description: "Deep relaxation" },
  { id: "private", name: "Private Session", description: "One-on-one" },
  { id: "workshop", name: "Workshop / Event", description: "Special offerings" }
];

// ---------- Feature: Save Class Preference ----------
function savePreference(classId) {
  localStorage.setItem("preferredClass", classId);
  showPreferenceFeedback(classId);
}

function loadPreference() {
  return localStorage.getItem("preferredClass");
}

function showPreferenceFeedback(classId) {
  const feedback = document.getElementById("preference-feedback");
  if (!feedback) return;

  const selected = classOptions.find(item => item.id === classId);
  if (selected) {
    feedback.textContent = "Saved: " + selected.name + " is now your preferred class.";
    feedback.style.display = "block";
  }
}

function setupPreferenceButtons() {
  const buttons = document.querySelectorAll(".pref-btn");
  buttons.forEach(function(btn) {
    btn.addEventListener("click", function() {
      const classId = btn.getAttribute("data-class");
      savePreference(classId);

      // Highlight the selected button
      buttons.forEach(function(b) {
        b.classList.remove("selected");
      });
      btn.classList.add("selected");
    });
  });

  // Pre-select the saved preference if it exists
  const saved = loadPreference();
  if (saved) {
    const activeBtn = document.querySelector('.pref-btn[data-class="' + saved + '"]');
    if (activeBtn) {
      activeBtn.classList.add("selected");
      showPreferenceFeedback(saved);
    }
  }
}

// ---------- Pre-fill the Events form from storage ----------
function prefillFormFromStorage() {
  const interestSelect = document.getElementById("interest");
  if (!interestSelect) return;

  const saved = loadPreference();
  if (saved) {
    interestSelect.value = saved;
  }
}

// ---------- Form Validation ----------
function showError(fieldId, message) {
  const errorEl = document.getElementById(fieldId + "-error");
  if (errorEl) {
    errorEl.textContent = message;
    errorEl.style.display = "block";
  }
  const field = document.getElementById(fieldId);
  if (field) {
    field.classList.add("invalid");
  }
}

function clearError(fieldId) {
  const errorEl = document.getElementById(fieldId + "-error");
  if (errorEl) {
    errorEl.textContent = "";
    errorEl.style.display = "none";
  }
  const field = document.getElementById(fieldId);
  if (field) {
    field.classList.remove("invalid");
  }
}

function validateEmail(email) {
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return pattern.test(email);
}

function validateForm(event) {
  event.preventDefault();

  let isValid = true;

  // Clear previous errors
  clearError("name");
  clearError("email");
  clearError("interest");

  // Required: Name
  const nameValue = document.getElementById("name").value.trim();
  if (nameValue === "") {
    showError("name", "Please enter your full name.");
    isValid = false;
  } else if (nameValue.length < 2) {
    showError("name", "Name must be at least 2 characters.");
    isValid = false;
  }

  // Required + Email format
  const emailValue = document.getElementById("email").value.trim();
  if (emailValue === "") {
    showError("email", "Please enter your email address.");
    isValid = false;
  } else if (!validateEmail(emailValue)) {
    showError("email", "Please enter a valid email address (example: name@email.com).");
    isValid = false;
  }

  // Required: Interest
  const interestValue = document.getElementById("interest").value;
  if (interestValue === "") {
    showError("interest", "Please select a class or event.");
    isValid = false;
  }

  if (isValid) {
    // Save the selected interest as preference
    savePreference(interestValue);

    // Simple success message
    const successMsg = document.getElementById("form-success");
    if (successMsg) {
      successMsg.textContent = "Thank you! Your request has been received. We will contact you soon.";
      successMsg.style.display = "block";
    }
  }

  return isValid;
}

// ---------- Initialize everything when the page loads ----------
document.addEventListener("DOMContentLoaded", function() {
  setupPreferenceButtons();
  prefillFormFromStorage();

  const form = document.getElementById("interest-form");
  if (form) {
    form.addEventListener("submit", validateForm);
  }
});