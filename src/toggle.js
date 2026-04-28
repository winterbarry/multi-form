import { showStep, showConfirmation } from "./render.js";

let currentStep = 1;

const steps = [...document.querySelectorAll("form[data-step]")].map((form) =>
  Number(form.dataset.step),
);

const maxStep = Math.max(...steps);

// target all buttons using event delegation

export function initNavigation() {
  document.addEventListener("click", (b) => {
    const action = b.target.dataset.action;

    if (action === "next") {
      if (currentStep < maxStep) {
        currentStep++;
        showStep(currentStep);
      }
    }

    if (action === "back") {
      if (currentStep > 1) {
        currentStep--;
        showStep(currentStep);
      }
    }

    if (action === "submit") {
      showConfirmation();
    }
  });

  // initialize
  showStep(currentStep);
}
