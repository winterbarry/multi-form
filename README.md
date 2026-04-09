# Browser Extensions Manager

A lightweight web-based interface for managing browser extensions.
This project allows users to view, filter, activate/deactivate, remove, and theme-toggle extension items through a dynamic and responsive interface.

---

## 📖 Overview

The Browser Extensions Manager provides a dashboard-like experience for handling a list of browser extensions.
It dynamically renders extensions from a dataset (`data.json`), allowing the user to:

* View all available extensions with their logos and descriptions
* Filter extensions by status (*All*, *Active*, *Inactive*)
* Toggle extensions on/off
* Remove unwanted extensions
* Switch between light and dark themes

All updates happen on the client side without requiring a page reload.

---

## Project Structure

```
project-root/
│
├── assets/
│   └── images/              # Contains icons and logos
│
├── data.json                # Stores extension data (name, logo, description, isActive)
│
├── template.html            # HTML structure for the web app
├── index.js                 # Main entry script handling initialization and events
├── render.js                # Responsible for rendering and theme updates
├── filter.js                # Handles filtering logic and extension state updates
└── style.css                # Global and responsive styling
```

---

## Features

### Core Functionality

* Dynamic Rendering: Extensions are loaded and rendered dynamically from `data.json`.
* Filtering: Buttons allow filtering between *All*, *Active*, or *Inactive* extensions.
* Toggling: Each extension includes a switch to enable/disable it.
* Removal: Extensions can be removed instantly from the list.
* Theme Switching: Toggle between light and dark modes using the sun/moon icon.
* Responsive Design: Grid layout adapts seamlessly to desktop and mobile screens.   

---

## Component Breakdown

### `template.html`

Defines the structure of the page including:

* The extension bar with logo and theme toggle.
* A filter section for switching between extension categories.
* A grid container (`.extensions-list`) where extension cards are dynamically inserted.

---

### `index.js`

* Initializes rendering when the DOM is loaded.
* Handles:

  * Theme switching (`toggleTheme`)
  * Filter button clicks (`filterExtensions`)
  * Extension removal (`deleteExtension`)
  * Toggle switch updates (`toggleExtension`)

---

### `filter.js`

* Manages the extension dataset and the current filter state.
* Exposes functions:

  * `filterExtensions(filter)` – Filters dataset by status.
  * `toggleExtension(name)` – Toggles the `isActive` property.
  * `getDataset()` / `setDataset()` – Manage internal data state.

---

### `render.js`

* Handles initial rendering and filtered rendering.
* Updates DOM elements dynamically.
* Controls theme switching and image updates based on the current mode.

---

### `style.css`

Defines the project’s styling, including:

* Theme-based color palettes.
* Layouts for containers and cards.
* Buttons and toggle switch interactions.
* Responsive adjustments for screens below 768px.

---

## Theme System

The theme system supports:

* Dark Mode: Deep blue gradient background, light text.
* Light Mode: Soft, airy gradient background, dark text.

Theme preference is detected automatically via the user's system (`prefers-color-scheme`), but can be toggled manually via the theme button.

---

## Setup & Usage

### Clone the Repository

```bash
git clone https://github.com/yourusername/browser-extensions-manager.git
cd browser-extensions-manager
```

### Install Dependencies

If using a module bundler like Webpack:

```bash
npm install
```

### Run the Project

If using Webpack or similar:

```bash
npm run dev
```

Then open the local URL (e.g., `http://localhost:5173`).

### View the App

You’ll see:

* A header bar with the app logo and theme toggle.
* Filter buttons (`All`, `Active`, `Inactive`).
* A grid of extension cards with descriptions, removal buttons, and toggles.

---

## Responsive Design Layout

On mobile screens:

* The grid layout collapses into a single column.
* Filter buttons stretch across the width of the screen.
* Padding and spacing are optimized for smaller displays.

---

## Technologies Used

* HTML – Structure and semantic layout
* CSS – Styling and responsive design
* JavaScript (ES6 Modules) – Functionality and logic
* JSON – Local data handling
* Webpack – Module bundling and asset management

---

## Author

Obe Ajilima
