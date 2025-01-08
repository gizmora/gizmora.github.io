import './style.scss';
import sections from './data/tech.json';

function setColorTheme({ localStorageTheme, systemSettingDark }) {
  if (localStorageTheme !== null) {
    return localStorageTheme;
  }

  if (systemSettingDark.matches) {
    return "dark";
  }

  return "light";
}

function updateButton({ buttonEl, isDark }) {
  const icon = isDark ? "&#9728;" : "&#127769;";
  const label = isDark ? "Change to Light theme" : "Change to Dark theme";

  buttonEl.setAttribute("aria-label", label);
  buttonEl.innerHTML = icon;
}


function updateThemeOnHtmlEl({ theme }) {
  document.querySelector("html").setAttribute("data-theme", theme);
}



document.addEventListener('DOMContentLoaded', function() {
  const button = document.querySelector("[data-theme-toggle]"); 
  const localStorageTheme = localStorage.getItem("theme");
  const systemSettingDark = window.matchMedia("(prefers-color-scheme: dark)");

  let currentThemeSetting = setColorTheme({ localStorageTheme, systemSettingDark });

  updateButton({ buttonEl: button, isDark: currentThemeSetting === "dark" });
  updateThemeOnHtmlEl({ theme: currentThemeSetting });

  button.addEventListener("click", (event) => {
    const newTheme = currentThemeSetting === "dark" ? "light" : "dark";

    localStorage.setItem("theme", newTheme);
    updateButton({ buttonEl: button, isDark: newTheme === "dark" });
    updateThemeOnHtmlEl({ theme: newTheme });

    currentThemeSetting = newTheme;
  });

  const skillsContainer = document.getElementById('technologies');
  let sectionList = document.createElement('ul');

  sections.forEach((section) => {
    let subList = document.createElement('ul');
    let item = '';

    section.subsections.forEach(subsection => {
      item += `<li class="level ${subsection.level}">${subsection.name}</li>`;
    });

    subList.innerHTML = item;

    let li = `<li>
      <span class="area">${section.name}</span>
      ${subList.outerHTML}
    </li>`;

    sectionList.innerHTML += li;
  });

  skillsContainer.appendChild(sectionList);
});

