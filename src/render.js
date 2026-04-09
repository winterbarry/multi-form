import { getDataset, setDataset, getCurrentFilter, filterExtensions } from "./filter";
import logoDark from './assets/images/logo-dark.svg';
import logoLight from './assets/images/logo-light.svg';
import iconSun from './assets/images/icon-sun.svg';
import iconMoon from './assets/images/icon-moon.svg';

// return images from ./assets/images
const images = require.context("./assets/images", false, /\.(png|svg|jpg|jpeg|gif)$/);

export function initializeRender() {
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

  if (prefersDark) {
    document.body.classList.add("dark-mode");
    document.body.classList.remove("light-mode");
  } else {
    document.body.classList.add("light-mode");
    document.body.classList.remove("dark-mode");
  }

  updateThemeImages(prefersDark ? "dark" : "light");

  const container = document.querySelector(".extensions-list");
  container.innerHTML = "";

  const dataset = getDataset();

  dataset.forEach(extension => {
    const extensionDiv = document.createElement("div");
    extensionDiv.classList.add("extension-item"); 

    const logoSrc = images(`./${extension.logo}`);

    extensionDiv.innerHTML = `
      <div class="extension-info">
        <div class="extension-image">
          <img src="${logoSrc}" alt="${extension.name} logo" class="extension-logo"/>
        </div>
        <div class="extension-description">
          <h4>${extension.name}</h4>
          <p>${extension.description}</p>
        </div>
      </div>
      <div class="extension-actions">
        <button class="remove-btn" data-name="${extension.name}">Remove</button>
        <label class="toggle-switch">
          <input type="checkbox" class="toggle-btn" data-name="${extension.name}" ${extension.isActive ? "checked" : ""}>
          <span class="slider"></span>
        </label>
      </div>
    `;

    container.appendChild(extensionDiv);
  });
}

export function filteredRender(filteredList) {
  const container = document.querySelector(".extensions-list");
  container.innerHTML = "";

  if (filteredList.length === 0) {
    container.innerHTML = "<p>No extensions found.</p>";
    return;
  }

  filteredList.forEach(extension => {
    const extensionDiv = document.createElement("div");
    extensionDiv.classList.add("extension-item");

    const logoSrc = images(`./${extension.logo}`);

    extensionDiv.innerHTML = `
      <div class="extension-info">
        <div class="extension-image">
          <img src="${logoSrc}" alt="${extension.name} logo" class="extension-logo"/>
        </div>
        <div class="extension-description">
          <h4>${extension.name}</h4>
          <p>${extension.description}</p>
        </div>
      </div>
      <div class="extension-actions">
        <button class="remove-btn" data-name="${extension.name}">Remove</button>
        <label class="toggle-switch">
          <input type="checkbox" class="toggle-btn" data-name="${extension.name}" ${extension.isActive ? "checked" : ""}>
          <span class="slider"></span>
        </label>
      </div>
    `;

    container.appendChild(extensionDiv);
  });
}

export function toggleTheme() {
  const isDark = document.body.classList.contains("dark-mode");

  if (isDark) {
    document.body.classList.remove("dark-mode");
    document.body.classList.add("light-mode");
    updateThemeImages("light");
  } else {
    document.body.classList.remove("light-mode");
    document.body.classList.add("dark-mode");
    updateThemeImages("dark");
  }

}

export function deleteExtension(extensionName) {
  let dataset = getDataset();
  const newData = dataset.filter(ext => ext.name !== extensionName); // remove extension if name matches
  setDataset(newData);

  // re-render based on currenr filter
  const current = getCurrentFilter();
  filterExtensions(current);
  console.log('button sucessfully removed')
}

function updateThemeImages(theme) {
  
  const extensionLogoImg = document.querySelector('.extension-icon .logo');
  const themeButtonImg = document.querySelector('.style-button .theme-button');

  if (extensionLogoImg) {
    extensionLogoImg.src = theme === 'dark' ? logoDark : logoLight;
  }
  if (themeButtonImg) {
    themeButtonImg.src = theme === 'dark' ? iconSun : iconMoon;
  }

}