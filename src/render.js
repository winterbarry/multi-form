import { setStepData } from "./objStorage.js";
import { getFormData } from "./objStorage.js";
import { goToFirstStep } from "./toggle.js";

export function showStep(step) {
  const forms = document.querySelectorAll("form[data-step]");
  const navs = document.querySelectorAll("nav[data-step]");

  // loop through and find the matching step to display
  forms.forEach((form) => {
    form.style.display = form.dataset.step == step ? "block" : "none";
  });

  navs.forEach((nav) => {
    nav.style.display = nav.dataset.step == step ? "block" : "none";
  });
}

export function showConfirmation() {
  document.querySelectorAll("form[data-step]").forEach((f) => {
    f.style.display = "none";
  });

  document.querySelectorAll("nav[data-step]").forEach((n) => {
    n.style.display = "none";
  });

  document.querySelector(".confirmation").style.display = "block";
}

// billing toggle and add-on rendering
const billingToggle = document.getElementById("billing-toggle");

const monthlyPlans = document.querySelector(".monthly-plans");
const yearlyPlans = document.querySelector(".yearly-plans");

const monthlyAddons = document.querySelector(".monthly-addons");
const yearlyAddons = document.querySelector(".yearly-addons");

billingToggle.addEventListener("change", () => {
  if (billingToggle.checked) {
    monthlyPlans.style.display = "none";
    yearlyPlans.style.display = "block";

    monthlyAddons.style.display = "none";
    yearlyAddons.style.display = "block";
  } else {
    monthlyPlans.style.display = "block";
    yearlyPlans.style.display = "none";

    monthlyAddons.style.display = "block";
    yearlyAddons.style.display = "none";
  }
});

// back to form 1
const summaryDiv = document.querySelector(".summary");

summaryDiv.addEventListener("click", (e) => {
  if (e.target.id === "change-plan-btn") {
    goToFirstStep();
  }
});

// form 4 rendering
export function renderStep4() {
  // get stored form data
  const formDataAll = getFormData();

  // select summary div
  const summaryDiv = document.querySelector(".summary");

  // clear previous summary content
  summaryDiv.innerHTML = "";

  // ---------------- PLAN INFO ----------------
  let total = 0;

  if (formDataAll.step2) {
    const { selectedPlan, billingType } = formDataAll.step2;

    // format plan name
    const formattedPlan =
      selectedPlan.charAt(0).toUpperCase() + selectedPlan.slice(1);

    // determine plan price
    let planPrice = 0;

    if (selectedPlan.includes("arcade")) {
      planPrice = billingType === "monthly" ? 9 : 90;
    }

    if (selectedPlan.includes("advanced")) {
      planPrice = billingType === "monthly" ? 12 : 120;
    }

    if (selectedPlan.includes("pro")) {
      planPrice = billingType === "monthly" ? 15 : 150;
    }

    total += planPrice;

    summaryDiv.innerHTML += `
      <div class="summary-line">
        <div class="summary-plan-info">
          <span>
            ${formattedPlan} (${billingType})
          </span>

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
  `;
  }

  // ---------------- ADD-ONS ----------------
  if (formDataAll.step3 && Array.isArray(formDataAll.step3)) {
    formDataAll.step3.forEach((addon) => {
      let addonPrice = 0;

      // determine add-on price
      if (addon.addonName.includes("online-service")) {
        addonPrice = addon.billingType === "monthly" ? 1 : 10;
      }

      if (addon.addonName.includes("larger-storage")) {
        addonPrice = addon.billingType === "monthly" ? 2 : 20;
      }

      if (addon.addonName.includes("custom-profile")) {
        addonPrice = addon.billingType === "monthly" ? 2 : 20;
      }

      total += addonPrice;

      // clean display text
      const formattedAddon = addon.addonName
        .replace("-monthly", "")
        .replace("-yearly", "")
        .replaceAll("-", " ");

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

  // ---------------- TOTAL ----------------
  const billingType = formDataAll.step2?.billingType;

  summaryDiv.innerHTML += `
    <hr>

    <div class="summary-total">
      <strong>Total</strong>
      <strong>
        $${total}/${billingType === "monthly" ? "mo" : "yr"}
      </strong>
    </div>
  `;
}