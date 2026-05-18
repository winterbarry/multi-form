// import rendering and validation logic
import { showStep, showConfirmation, renderStep4 } from "./render.js";
import { validateStep } from "./validation.js";

// track the current form step
let currentStep = 1;

// get all the forms from the DOM and convert them to numbers
const steps = [...document.querySelectorAll("form[data-step]")].map((form) =>
  Number(form.dataset.step),
);

// determine the highest form number
const maxStep = Math.max(...steps);

// initialize navigation using event delegation
export function initNavigation() {
  // listen for clicks anywhere in the document
  document.addEventListener("click", (b) => {
    const action = b.target.dataset.action;

    // if the user clicks next
    if (action === "next") {
      if (!validateStep(currentStep)) {
        return; // stop running if validation fails
      }

      // otherwise move forward
      if (currentStep < maxStep) {
        currentStep++;
        showStep(currentStep);
      }
    }

    // back button logic
    if (action === "back") {
      if (currentStep > 1) {
        currentStep--;
        showStep(currentStep);
      }
    }

    // summary page rendering
    if (currentStep === 4) {
      renderStep4();
    }

    // final form / submit button
    if (action === "submit") {
      showConfirmation();
    }
  });

  // show the first step when the page loads
  showStep(currentStep);
}

// reset navigation back to form 1
export function goToFirstStep() {
  currentStep = 1;
  showStep(currentStep);
  console.log("sucess");
}
