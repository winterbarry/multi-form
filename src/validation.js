import { setStepData } from "./objStorage.js";
import { getFormData } from "./objStorage.js";

// pass in the current step
export function validateStep(step) {
  const validators = {
    1: validateStep1,
    2: validateStep2,
    3: validateStep3,
    4: validateStep4,
  };

  const validate = validators[step]; // store the corresponding function for the current step
  return validate ? validate() : true; // run the corresponding function, otherwise return true
}

// step specific functions
function validateStep1() {
  const form = document.querySelector('form[data-step="1"]');

  const name = form.querySelector("#name").value.trim();
  const email = form.querySelector("#email").value.trim();
  const phone = form.querySelector("#phone").value.trim();

  const nameRegex = /^[A-Za-z\s]+$/;
  const phoneRegex = /^[0-9+\s]+$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!name) {
    return alert("This field is required");
  }

  if (!nameRegex.test(name)) {
    return alert("Name must contain only letters");
  }

  if (!email) {
    return alert("This field is required");
  }

  if (!emailRegex.test(email)) {
    return alert("Please enter a valid email address");
  }

  if (!phone) {
    return alert("This field is required");
  }

  if (!phoneRegex.test(phone)) {
    return alert("Phone must contain only numbers");
  }

  // export key-value pair as argument for storage
  setStepData("step1", { name, email, phone });

  // display form data
  console.log(getFormData());

  return true;
}

function validateStep2() {
  return true;
}

function validateStep3() {
  return true;
}

function validateStep4() {
  return true;
}
