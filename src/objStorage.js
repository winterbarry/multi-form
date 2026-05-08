// variable to store all form data
const formDataAll = {};

// to store form 1 inputs
export function setStepData(step, data) {
    formDataAll[step] = data;
}

export function getFormData() {
  return formDataAll;
}

// to store form 2 inputs
const paymentPlanInput = document.querySelectorAll('input[name="plan"]') // select all radio buttons 

// loop through and attach event listeners to radio buttons
paymentPlanInput.forEach((input) => {
  // store the selected plan
  input.addEventListener("change", () => { 
    formDataAll.plan = {
      selectedPlan: input.value,
      billingType: input.value.includes("monthly") ? "monthly" : "yearly",
    }
    
    console.log(formDataAll);
  });
});