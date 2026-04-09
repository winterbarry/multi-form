import data from "./data.json";
import { filteredRender } from './render.js';

let dataset = [...data];
let currentFilter = "all"; //default filter

export function getDataset() {
    return dataset;
}

export function setDataset(newData) {
  dataset = newData;
}

export function getCurrentFilter() {
  return currentFilter;
}

export function filterExtensions(filter) {
  currentFilter = filter.toLowerCase();
  let filteredList = [];

  if (currentFilter === "active") {
    filteredList = dataset.filter(extension => extension.isActive === true);
  } else if (currentFilter === "inactive") {
    filteredList = dataset.filter(extension => extension.isActive === false);
  } else {
    filteredList = dataset;
  }

  filteredRender(filteredList);
}

export function toggleExtension(extensionName) {
  // get current dataset
  const dataset = getDataset();

  // create new dataset with active property of matching extension changed
  const updatedData = dataset.map(extension => {

    if (extension.name === extensionName) {
      return { ...extension, isActive: !extension.isActive }; // toggle isActive
    }

    return extension;
    
  });

  // update dataset
  setDataset(updatedData);

  // re-render list based on current filter
  const current = getCurrentFilter();
  filterExtensions(current);
}
