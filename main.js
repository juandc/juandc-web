import './style.css'

let $body;
let $schemeCheckbox;

let colorScheme = '';

window.addEventListener('DOMContentLoaded', start);

function start() {
  $body = document.querySelector('body');
  $schemeCheckbox = document.querySelector('#scheme');
  
  setInitialColorScheme();
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
  } else {
    $body.classList.add('light')
    $body.classList.remove('dark')
  }

  localStorage.setItem('color-scheme', JSON.stringify(newColorScheme))

  colorScheme = newColorScheme;
}
