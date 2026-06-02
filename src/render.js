// import local storage functions
import { setStepData } from "./objStorage.js";
import { getFormData } from "./objStorage.js";

// import navigation helper function
import { goToFirstStep } from "./toggle.js";

// display the active form
export function showStep(step) {
  // get all form and navigation divs
  const forms = document.querySelectorAll("form[data-step]");
  const navs = document.querySelectorAll("nav[data-step]");

  // loop through and find the matching form to display
  forms.forEach((form) => {
    form.style.display = form.dataset.step == step ? "flex" : "none";
  });

  // loop through and find the matching navigation to display
  navs.forEach((nav) => {
    nav.style.display = nav.dataset.step == step ? "flex" : "none";
  });
}

// show final confirmation screen
export function showConfirmation() {
  // hide all forms
  document.querySelectorAll("form[data-step]").forEach((f) => {
    f.style.display = "none";
  });

  // hide all navigation bars
  document.querySelectorAll("nav[data-step]").forEach((n) => {
    n.style.display = "none";
  });

  // display confirmation message
  document.querySelector(".confirmation").style.display = "flex";
}

// billing toggle and add-on rendering
const billingToggle = document.getElementById("billing-toggle"); // select toggle input

// select monthly and yearly plan containers
const monthlyPlans = document.querySelector(".monthly-plans");
const yearlyPlans = document.querySelector(".yearly-plans");

// select monthly and yearly add-on containers
const monthlyAddons = document.querySelector(".monthly-addons");
const yearlyAddons = document.querySelector(".yearly-addons");

// select monthly and yearly labels besides toggle
const monthlyLabel = document.getElementById("monthly-label");
const yearlyLabel = document.getElementById("yearly-label");

// switch visible plans andadd-ons when toggle changes
billingToggle.addEventListener("change", () => {
  // show yearly plans
  if (billingToggle.checked) {
    monthlyPlans.style.display = "none";
    yearlyPlans.style.display = "block";

    monthlyAddons.style.display = "none";
    yearlyAddons.style.display = "block";

    // toggle active label
    yearlyLabel.classList.add("active");
    monthlyLabel.classList.remove("active");

    // show monthly plans
  } else {
    monthlyPlans.style.display = "block";
    yearlyPlans.style.display = "none";

    monthlyAddons.style.display = "block";
    yearlyAddons.style.display = "none";

    // toggle active label
    monthlyLabel.classList.add("active");
    yearlyLabel.classList.remove("active");
  }
});

// select summary container
const summaryDiv = document.querySelector(".summary");

// eturn to first firm
summaryDiv.addEventListener("click", (e) => {
  if (e.target.id === "change-plan-btn") {
    goToFirstStep();
  }
});

// form 4 / summary rendering
export function renderStep4() {
  // get stored form data
  const formDataAll = getFormData();

  // select summary div
  const summaryDiv = document.querySelector(".summary");
  const summaryTotalDiv = document.querySelector(".summary-total");

  // clear previous summary content
  summaryDiv.innerHTML = "";
  summaryTotalDiv.innerHTML = "";

  // track total price
  let total = 0;

  // extract plan and billing info from form 2
  if (formDataAll.step2) {
    const { selectedPlan, billingType } = formDataAll.step2;

    // format plan name
    const formattedPlan =
      selectedPlan.charAt(0).toUpperCase() + selectedPlan.slice(1);

    // determine plan price
    let planPrice = 0;

    // set monthly or yearly price for selected plans
    if (selectedPlan.includes("arcade")) {
      planPrice = billingType === "monthly" ? 9 : 90;
    }

    if (selectedPlan.includes("advanced")) {
      planPrice = billingType === "monthly" ? 12 : 120;
    }

    if (selectedPlan.includes("pro")) {
      planPrice = billingType === "monthly" ? 15 : 150;
    }

    // add to total price
    total += planPrice;

    // append info to confirmation page / summary div
    summaryDiv.innerHTML += `
      <div class="summary-line">
        <div class="summary-plan-info">
          <span>${formattedPlan} (${billingType})</span>

          <button
            type="button"
            class="change-btn"
            id="change-plan-btn"
          >
            Change
          </button>
        </div>

        <span>
          $${planPrice}/${billingType === "monthly" ? "mo" : "yr"}
        </span>
      </div>

      <hr class="summary-divider">
    `;
  }

  // loop through each add-on from stored array in objStorage
  if (formDataAll.step3 && Array.isArray(formDataAll.step3)) {
    formDataAll.step3.forEach((addon) => {
      // track total addon price
      let addonPrice = 0;

      // set monthly or yearly price for selected add-ons
      if (addon.addonName.includes("online-service")) {
        addonPrice = addon.billingType === "monthly" ? 1 : 10;
      }

      if (addon.addonName.includes("larger-storage")) {
        addonPrice = addon.billingType === "monthly" ? 2 : 20;
      }

      if (addon.addonName.includes("custom-profile")) {
        addonPrice = addon.billingType === "monthly" ? 2 : 20;
      }

      // add to overall total
      total += addonPrice;

      // clean display text
      const formattedAddon = addon.addonName
        .replace("-monthly", "")
        .replace("-yearly", "")
        .replaceAll("-", " ")
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");

      // append info to confirmation page / summary div
      summaryDiv.innerHTML += `
        <div class="summary-line">
          <span>${formattedAddon}</span>
          <span>
            +$${addonPrice}/${addon.billingType === "monthly" ? "mo" : "yr"}
          </span>
        </div>
      `;
    });
  }

  // select stored billingtype from objstorage
  const billingType = formDataAll.step2?.billingType;

  // append total price to summary div / confirmation div
  summaryTotalDiv.innerHTML = `
      <strong>Total</strong>
      <strong>
        $${total}/${billingType === "monthly" ? "mo" : "yr"}
      </strong>
  `;
}
