// to store all form data
const formDataAll = {};

// to save form data
export function setStepData(step, data) {
    formDataAll[step] = data;
}

// to retrieve form data
export function getFormData() {
  return formDataAll;
}
