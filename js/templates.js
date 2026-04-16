// =======================
// GESTION DES TEMPLATES
// =======================

// Données des templates
let templatesData = null;

// Initialiser la page des templates
window.initTemplatesPage = function() {
    templatesData = window.TEMPLATES_CONFIG || {
        ats: [], moderne: [], creatif: []
    };

    renderCarousel("ats", "carousel-ats");
    renderCarousel("moderne", "carousel-moderne");
    renderCarousel("creatif", "carousel-creatif");

    initCarouselNavigation();
};

// Fonction pour générer les carrousels
function renderCarousel(category, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = '';
    const templates = templatesData[category] || [];

    templates.forEach(cv => {
        container.innerHTML += `
            <div class="carousel-item">
                <div class="carousel-img">
                    <img src="${cv.image}" alt="Template CV ${cv.titre}" loading="lazy" onerror="this.src='https://placehold.co/300x200?text=CV+Template'">
                </div>
                <div class="carousel-content">
                    <h3 class="text-xl font-bold mb-2">${escapeHtml(cv.titre)}</h3>
                    <p class="text-gray-600 mb-4">${escapeHtml(cv.desc)}</p>
                    <a href="Formulaire.html" class="font-semibold" style="color: var(--primary);">Utiliser ce template →</a>
                </div>
            </div>
        `;
    });
}

// Initialiser la navigation des carrousels
function initCarouselNavigation() {
    document.querySelectorAll('.carousel-dot').forEach((dot, index) => {
        dot.addEventListener('click', () => {
            const section = dot.closest('section');
            const carouselContainer = section.querySelector('.carousel-container');
            const carousel = section.querySelector('.carousel');

            if (carousel && carouselContainer) {
                const itemWidth = carousel.querySelector('.carousel-item')?.offsetWidth + 24 || 324;
                carouselContainer.scrollTo({
                    left: index * itemWidth,
                    behavior: 'smooth'
                });

                // Mettre à jour les dots actifs
                section.querySelectorAll('.carousel-dot').forEach(d => d.classList.remove('active'));
                dot.classList.add('active');
            }
        });
    });

    // Synchroniser les dots avec le défilement
    document.querySelectorAll('.carousel-container').forEach(container => {
        container.addEventListener('scroll', () => {
            const section = container.closest('section');
            const scrollPosition = container.scrollLeft;
            const carousel = section.querySelector('.carousel');
            const firstItem = carousel?.querySelector('.carousel-item');

            if (firstItem) {
                const itemWidth = firstItem.offsetWidth + 24;
                const activeIndex = Math.round(scrollPosition / itemWidth);
                const dots = section.querySelectorAll('.carousel-dot');

                dots.forEach((dot, idx) => {
                    dot.classList.toggle('active', idx === activeIndex);
                });
            }
        });
    });
}

// Fonction utilitaire pour échapper le HTML
function escapeHtml(text) {
    if (!text) return '';
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}