import { setStepData } from "./objStorage.js";
import { getFormData } from "./objStorage.js";

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

// form 4 rendering
export function renderStep4() {
  // get stored form data
  const formDataAll = getFormData();

  // select summary div
  const summaryDiv = document.querySelector(".summary");

  // clear previous summary content
  summaryDiv.innerHTML = "";

  // ---------- STEP 1 ----------
  if (formDataAll.step1) {
    const { name, email, phone } = formDataAll.step1;

    summaryDiv.innerHTML += `
      <div class="summary-section">
        <h3>Personal Info</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
      </div>

      <hr>
    `;
  }

  // ---------- STEP 2 ----------
  if (formDataAll.step2) {
    const { selectedPlan, billingType } = formDataAll.step2;

    summaryDiv.innerHTML += `
      <div class="summary-section">
        <h3>Selected Plan</h3>
        <p><strong>Plan:</strong> ${selectedPlan}</p>
        <p><strong>Billing:</strong> ${billingType}</p>
      </div>

      <hr>
    `;
  }

  // ---------- STEP 3 ----------
  if (
    formDataAll.step3 &&
    Array.isArray(formDataAll.step3) &&
    formDataAll.step3.length > 0
  ) {
    summaryDiv.innerHTML += `
      <div class="summary-section">
        <h3>Add-ons</h3>
      </div>
    `;

    formDataAll.step3.forEach((addon) => {
      summaryDiv.innerHTML += `
        <p>${addon.addonName}</p>
      `;
    });

    summaryDiv.innerHTML += `<hr>`;
  }
}