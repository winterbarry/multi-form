// to store all form data
const formDataAll = {};

export function setStepData(step, data) {
    formDataAll[step] = data;
}

export function getFormData() {
  return formDataAll;
}
