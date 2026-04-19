// =======================
// GESTIONNAIRE DE THÈME AWARD DARK
// =======================

const THEME_KEY = 'award-theme-preference';

// Thèmes disponibles
const THEMES = {
    LIGHT: 'light',
    AWARD_DARK: 'award-dark'
};

// Initialiser le thème
function initTheme() {
    const savedTheme = localStorage.getItem(THEME_KEY) || THEMES.AWARD_DARK;
    applyTheme(savedTheme);

    // Créer le bouton de switch si nécessaire
    createThemeSwitcher();
}

// Appliquer un thème
function applyTheme(theme) {
    const body = document.body;

    if (theme === THEMES.AWARD_DARK) {
        body.classList.add('award-dark-theme');
        body.classList.remove('light-theme');
        localStorage.setItem(THEME_KEY, THEMES.AWARD_DARK);
    } else {
        body.classList.remove('award-dark-theme');
        body.classList.add('light-theme');
        localStorage.setItem(THEME_KEY, THEMES.LIGHT);
    }

    // Mettre à jour l'icône du bouton si existant
    updateThemeIcon(theme);
}

// Créer le sélecteur de thème
function createThemeSwitcher() {
    // Vérifier si le bouton existe déjà
    if (document.querySelector('.theme-switcher-btn')) return;

    const nav = document.querySelector('nav');
    if (!nav) return;

    const themeBtn = document.createElement('button');
    themeBtn.className = 'theme-switcher-btn';
    themeBtn.setAttribute('aria-label', 'Changer de thème');
    themeBtn.innerHTML = '<i class="fas fa-moon"></i>';

    themeBtn.addEventListener('click', () => {
        const currentTheme = localStorage.getItem(THEME_KEY) || THEMES.AWARD_DARK;
        const newTheme = currentTheme === THEMES.AWARD_DARK ? THEMES.LIGHT : THEMES.AWARD_DARK;
        applyTheme(newTheme);
    });

    nav.appendChild(themeBtn);
    updateThemeIcon(localStorage.getItem(THEME_KEY) || THEMES.AWARD_DARK);
}

// Mettre à jour l'icône du bouton
function updateThemeIcon(theme) {
    const btn = document.querySelector('.theme-switcher-btn');
    if (!btn) return;

    if (theme === THEMES.AWARD_DARK) {
        btn.innerHTML = '<i class="fas fa-sun"></i>';
        btn.setAttribute('aria-label', 'Passer au thème clair');
    } else {
        btn.innerHTML = '<i class="fas fa-moon"></i>';
        btn.setAttribute('aria-label', 'Passer au thème sombre');
    }
}

// Basculer le thème (fonction globale)
window.toggleTheme = function() {
    const currentTheme = localStorage.getItem(THEME_KEY) || THEMES.AWARD_DARK;
    const newTheme = currentTheme === THEMES.AWARD_DARK ? THEMES.LIGHT : THEMES.AWARD_DARK;
    applyTheme(newTheme);
};

// Exporter les fonctions
window.initTheme = initTheme;
window.applyTheme = applyTheme;