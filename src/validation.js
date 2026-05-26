// import functions for saving/retrieving data
import { setStepData } from "./objStorage.js";
import { getFormData } from "./objStorage.js";

// pass in the current step
export function validateStep(step) {
  const validators = {
    1: validateStep1,
    2: validateStep2,
    3: validateStep3,
  };

  const validate = validators[step]; // store the corresponding function for the current step
  return validate ? validate() : true; // run the corresponding function, otherwise return true
}

// step specific functions

function validateStep1() {
  // select form 1
  const form = document.querySelector('form[data-step="1"]');

  // get input values
  const name = form.querySelector("#name").value.trim();
  const email = form.querySelector("#email").value.trim();
  const phone = form.querySelector("#phone").value.trim();

  // validation patterns
  const nameRegex = /^[A-Za-z\s]+$/;
  const phoneRegex = /^[0-9+\s]+$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // get error elements
  const nameError = document.querySelector("#name-error");
  const emailError = document.querySelector("#email-error");
  const phoneError = document.querySelector("#phone-error");

  // clear previous errors
  nameError.textContent = "";
  emailError.textContent = "";
  phoneError.textContent = "";

  let isValid = true;

  // field validations
  if (!name) {
    nameError.textContent = "This field is equired";
    isValid = false;
  } else if (!nameRegex.test(name)) {
    nameError.textContent = "Letters only";
    isValid = false;
  }

  if (!email) {
    emailError.textContent = "This field is equired";
    isValid = false;
  } else if (!emailRegex.test(email)) {
    emailError.textContent = "Invalid email";
    isValid = false;
  }

  if (!phone) {
    phoneError.textContent = "This field is equired";
    isValid = false;
  } else if (!phoneRegex.test(phone)) {
    phoneError.textContent = "Numbers only";
    isValid = false;
  }

  if (!isValid) return false;

  // export key-value pair as argument for storage
  setStepData("step1", { name, email, phone });

  // display form data
  console.log(getFormData());

  return true;
}

function validateStep2() {
  // store selected plan
  const selectedPlan = document.querySelector('input[name="plan"]:checked');

  // store billing toggle state
  const billingToggle = document.querySelector("#billing-toggle");

  // validation
  if (!selectedPlan) {
    alert("Please select a payment plan");
    return false;
  }

  // prevent continuing without a selected plan
  const planData = {
    selectedPlan: selectedPlan.value,
    isYearly: billingToggle.checked,
    billingType: billingToggle.checked ? "yearly" : "monthly",
  };

  // save object
  setStepData("step2", planData);

  // display stored data
  console.log(getFormData());

  return true;
}

// select toggle
const billingToggle = document.querySelector("#billing-toggle");

// listen for changes in billing toggle
billingToggle.addEventListener("change", () => {
  const toggleData = {
    isYearly: billingToggle.checked,
    billingType: billingToggle.checked ? "yearly" : "monthly",
  };

  console.log(toggleData);
});

function validateStep3() {
  // select monthly div if not hidden, otherwise select yearly
  const activeContainer =
    document.querySelector(".monthly-addons").style.display !== "none"
      ? document.querySelector(".monthly-addons")
      : document.querySelector(".yearly-addons");

  // get checked checkboxes only from visible container
  const checkedAddons = activeContainer.querySelectorAll(
    'input[name="addon"]:checked',
  );

  // validation
  if (checkedAddons.length < 1) {
    alert("Please select at least one add-on");
    return false;
  }

  // convert selections into array of objects
  const addonsData = Array.from(checkedAddons).map((addon) => ({
    addonName: addon.value,
  }));

  // store data
  setStepData("step3", addonsData);

  // display stored object
  console.log(getFormData());

  return true;
}

// RESET PLAN + ADDONS WHEN BILLING CHANGES

// track previous toggle state
let previousBillingMode = billingToggle.checked;

// listen for billing toggle changes
billingToggle.addEventListener("change", () => {
  const currentBillingMode = billingToggle.checked;

  if (previousBillingMode !== currentBillingMode) {
    resetStep2();
    resetStep3();
  }

  previousBillingMode = currentBillingMode;
});

function resetStep2() {
  // uncheck all plan radio buttons
  const planInputs = document.querySelectorAll('input[name="plan"]');

  planInputs.forEach((input) => {
    input.checked = false;
  });

  // 2. remove stored step 2 data
  setStepData("step2", []);

  console.log("Step 2 selections cleared");
}

function resetStep3() {
  // uncheck all addon checkboxes
  const addonCheckboxes = document.querySelectorAll('input[name="addon"]');

  addonCheckboxes.forEach((checkbox) => {
    checkbox.checked = false;
  });

  // remove stored step3 data
  setStepData("step3", []);

  console.log("Step 3 selections cleared");
}
