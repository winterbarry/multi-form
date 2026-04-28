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
