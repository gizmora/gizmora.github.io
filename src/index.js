import './style.scss';
import sections from './data/tech.json';
import experiences from './data/experience.json'

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

  /**
   * Dark/Light theme toggle
   */
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

  /**
   * Dynamic skills container
   */

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

  /**
   * Dynamic work experience
   */

  const workExpContainer = document.getElementById('work-experience');
  let workHistory = '';
  let timeline = document.createElement('div');
  timeline.className = 'timeline';

  experiences.forEach(exp => {
    workHistory += `<div class="exp">
      <div class="day">${exp.date}</div>
      <div class="work-card">
        <div class="designation">${exp.position} at ${exp.company}</div>
        <div class="description">
          <p>${exp.description}</p>
        </div>
      </div>
    </div>`;
  });

  timeline.innerHTML = workHistory;
  workExpContainer.appendChild(timeline);
});

