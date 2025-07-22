// Gestion du dark/light mode
const themeToggle = document.querySelector('.theme-toggle');
const html = document.documentElement;

// Détection du préférence système
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

function setTheme(isDark) {
  html.setAttribute('data-theme', isDark ? 'dark' : 'light');
  themeToggle.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
}

// Initialisation
setTheme(prefersDark.matches);

// Changement manuel
themeToggle.addEventListener('click', () => {
  const isDark = html.getAttribute('data-theme') === 'dark';
  setTheme(!isDark);
});

// Gestion de la taille de police
document.getElementById('font-increase').addEventListener('click', () => {
  document.body.style.fontSize = '1.1em';
});

document.getElementById('font-decrease').addEventListener('click', () => {
  document.body.style.fontSize = '0.9em';
});

// Menu mobile
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
  const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', !isExpanded);
  navLinks.style.display = isExpanded ? 'none' : 'flex';
});
