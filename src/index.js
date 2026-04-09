import './style.css';
import { initializeRender, deleteExtension, toggleTheme } from './render.js';
import { filterExtensions, toggleExtension } from './filter.js';

// initial render
document.addEventListener('DOMContentLoaded', () => {
  initializeRender();
});

// toggle style
const styleButton = document.querySelector(".style-button");

styleButton.addEventListener("click", () => {
  toggleTheme();
});

// filter extensions via event delegation
const toggleContainer = document.querySelector(".extension-toggles-buttons");

toggleContainer.addEventListener("click", (event) => {
  if (event.target.tagName === "BUTTON") {
    const selected = event.target.textContent.trim(); 
    filterExtensions(selected); 
  }
});

// remove and toggle extensions
const extensionsList = document.querySelector(".extensions-list");

extensionsList.addEventListener("click", (event) => {
  if (event.target.classList.contains("remove-btn")) {
    const extensionName = event.target.dataset.name;
    deleteExtension(extensionName);
  }

  if (event.target.classList.contains("toggle-btn")) {
    const extensionName = event.target.dataset.name;
    toggleExtension(extensionName);
  }
});