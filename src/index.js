import './style.scss';
import { initializeTheme } from './theme';
import { initializeSkills } from './skills';
import { initializeExperience } from './experience';

document.addEventListener('DOMContentLoaded', function () {
  initializeTheme();
  initializeSkills();
  initializeExperience();
});
