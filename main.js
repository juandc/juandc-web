import './style.css';
import data from './data.json';
import icon from './LinkIcon.png'

let $body;
let $schemeCheckbox;
let $coursesContainer;

let colorScheme = '';

window.addEventListener('DOMContentLoaded', start);

function start() {
  $body = document.querySelector('body');
  $schemeCheckbox = document.querySelector('#scheme');
  $coursesContainer = document.querySelector('#courses');
  
  setInitialColorScheme();
  renderCourses();
}

function setInitialColorScheme() {
  getColorScheme();
  
  if (colorScheme === 'dark') {
    $schemeCheckbox.checked = true;
  }

  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', osColorSchemeToggle);
  $schemeCheckbox.addEventListener('change', schemeCheckboxToggle);
}

function osColorSchemeToggle(e) {
  const newColorScheme = e.matches ? 'dark' : 'light';
  setColorScheme(newColorScheme);
}

function schemeCheckboxToggle() {
  if (colorScheme === 'dark') {
    setColorScheme('light');
  } else {
    setColorScheme('dark')
  }
}

function getColorScheme() {
  const savedColorScheme = localStorage.getItem('color-scheme');

  if (savedColorScheme) {
    colorScheme = JSON.parse(savedColorScheme);
    $body.classList.add(colorScheme);
    return;
  }

  const isSystemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  if (isSystemDark) {
    setColorScheme('dark');
  } else {
    setColorScheme('light');
  }

  return;
}

function setColorScheme(newColorScheme) {
  if (newColorScheme === 'dark') {
    $body.classList.remove('light')
    $body.classList.add('dark')
    $schemeCheckbox.checked = true;
  } else {
    $body.classList.add('light')
    $body.classList.remove('dark')
    $schemeCheckbox.checked = false;
  }

  localStorage.setItem('color-scheme', JSON.stringify(newColorScheme))

  colorScheme = newColorScheme;
}

function renderCourses() {
  data.courses.forEach(course => {
    $coursesContainer.innerHTML += `
      <section class="course-card">
      <figure class="course-cardBadge">
        <img
          src="${course.badge}"
          alt="${course.name}"
        />
      </figure>

      <h3 class="course-cardTitle">
        ${course.name}
      </h3>
      <p class="course-cardDescription">
        ${course.description}
      </p>

      <a
        class="course-cardLink"
        href="${course.link}"
        target="_blank"
      >
        Tomar el curso
        <span style="color: transparent">.</span>
        <img
          class="course-cardLinkIcon"
          src="${icon}"
        />
      </a>
    </section>
    `;
  });
}
