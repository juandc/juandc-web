import './style.css';
import data from './data.json';
import icon from './LinkIcon.png'

let $body;
let $schemeCheckbox;
let $coursesContainer;
let $portfolioContainer;

let colorScheme = '';

window.addEventListener('DOMContentLoaded', start);

function start() {
  $body = document.querySelector('body');
  $schemeCheckbox = document.querySelector('#scheme');
  $coursesContainer = document.querySelector('#courses');
  $portfolioContainer = document.querySelector('#portfolio');

  setInitialColorScheme();
  renderCourses();
  renderPortfolio();
  setAboutEffects();
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
  const mouseSpanName = x => (
    'mouse-' + x.split(' ').join('')
  );

  data.courses.forEach(course => {
    $coursesContainer.innerHTML += `
      <section
        class="card course-card"
        id="${course.name}"
      >
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

        <span id="${mouseSpanName(course.name)}" class="mouseTracker"><span>
      </section>
    `;
  });

  data.courses.forEach(course => {
    const spanName = mouseSpanName(course.name);
    const courseCard = document.getElementById(course.name);
    const mouseSpan = document.getElementById(spanName);

    mouseTracker(courseCard, mouseSpan);
  });
}

function renderPortfolio() {
  const mouseSpanName = x => (
    'mouse-' + x.split(' ').join('')
  );

  data.portfolio.forEach(project => {
    const description = project.description.split('\n');
    const descriptionRender = description.map(desc => `<p>${desc}</p>`).join('');
    $portfolioContainer.innerHTML += `
      <section class="card portfolio-card" id="${project.name}">
        <div class="portfolio-cardDescription">
          <h3>${project.name}</h3>
          ${descriptionRender}
          <p>
            <a href="${project.link}" target="_blank">
              Ver proyecto
              <span style="color: transparent">-</span>
              <img class="hero-linkIcon" src="/LinkIcon.png" />
            </a>
          </p>
        </div>

        <figure class="portfolio-cardPhoto">
          <img
            id="${mouseSpanName(project.name)}Img"
            src="${project.images[0]}"
            alt="${project.name}"
          />
        </figure>

        <span id="${mouseSpanName(project.name)}" class="mouseTracker"></span>
      </section>
    `;
  });

  data.portfolio.forEach(project => {
    const spanName = mouseSpanName(project.name);
    const projectCard = document.getElementById(project.name);
    const projectImg = document.getElementById(spanName + 'Img');
    const mouseSpan = document.getElementById(spanName);

    mouseTracker(projectCard, mouseSpan);
    projectImg.addEventListener('mousemove', e => e.stopPropagation());
  });
}

function setAboutEffects() {
  const aboutCard = document.querySelector('#about .about-card');
  const mouseSpan = document.querySelector('#aboutCardMouseTracker');

  mouseTracker(aboutCard, mouseSpan);
}

function mouseTracker(container, span) {
  container.addEventListener('mousemove', (e) => {
    const x = e.layerX - (container.offsetWidth / 2);
    const y = e.layerY - (container.offsetHeight / 2);
    span.style.transform = `
      translateX(${x}px)
      translateY(${y}px)
    `;
  });
}
