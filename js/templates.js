// =======================
// GESTION DES TEMPLATES AVEC CARROUSEL INFINI
// =======================

// Données des templates
let templatesData = null;
let carousels = {
    ats: null,
    moderne: null,
    creatif: null
};

// Initialiser la page des templates
window.initTemplatesPage = function() {
    templatesData = window.TEMPLATES_CONFIG || {
        ats: [], moderne: [], creatif: []
    };

    // Générer le HTML des carrousels
    renderCarousel("ats", "carousel-ats");
    renderCarousel("moderne", "carousel-moderne");
    renderCarousel("creatif", "carousel-creatif");

    // Initialiser les carrousels infinis APRÈS que le DOM est prêt
    setTimeout(() => {
        initInfiniteCarousels();
    }, 100);
};

// Fonction pour générer les carrousels
function renderCarousel(category, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = '';
    const templates = templatesData[category] || [];

    templates.forEach((cv, index) => {
        container.innerHTML += `
            <div class="carousel-item" data-template-index="${index}" data-category="${category}">
                <div class="carousel-img">
                    <img src="${cv.image}" alt="Template CV ${escapeHtml(cv.titre)}" loading="lazy" onerror="this.src='https://placehold.co/300x200?text=CV+Template'">
                    ${index === 0 ? '<span class="carousel-badge">Populaire</span>' : ''}
                </div>
                <div class="carousel-content">
                    <h3 class="text-xl font-bold mb-2">${escapeHtml(cv.titre)}</h3>
                    <p class="text-gray-600 mb-4">${escapeHtml(cv.desc)}</p>
                    <div class="flex gap-2">
                        <a href="Formulaire.html?template=${encodeURIComponent(cv.titre)}" class="btn-use-template" style="color: var(--primary); font-weight: 600;">
                            Utiliser ce template →
                        </a>
                    </div>
                </div>
            </div>
        `;
    });
}

// Initialiser tous les carrousels infinis
function initInfiniteCarousels() {
    // Carrousel ATS
    const atsContainer = document.getElementById('carousel-ats');
    if (atsContainer && atsContainer.children.length > 0) {
        if (carousels.ats) carousels.ats.destroy();
        carousels.ats = new InfiniteCarousel('carousel-ats', {
            autoPlay: true,
            autoPlaySpeed: 5000,
            gap: 24,
            visibleSlides: getVisibleSlidesCount()
        });
    }

    // Carrousel Moderne
    const moderneContainer = document.getElementById('carousel-moderne');
    if (moderneContainer && moderneContainer.children.length > 0) {
        if (carousels.moderne) carousels.moderne.destroy();
        carousels.moderne = new InfiniteCarousel('carousel-moderne', {
            autoPlay: true,
            autoPlaySpeed: 5000,
            gap: 24,
            visibleSlides: getVisibleSlidesCount()
        });
    }

    // Carrousel Créatif
    const creatifContainer = document.getElementById('carousel-creatif');
    if (creatifContainer && creatifContainer.children.length > 0) {
        if (carousels.creatif) carousels.creatif.destroy();
        carousels.creatif = new InfiniteCarousel('carousel-creatif', {
            autoPlay: true,
            autoPlaySpeed: 5000,
            gap: 24,
            visibleSlides: getVisibleSlidesCount()
        });
    }

    console.log('✅ Tous les carrousels infinis sont initialisés');
}

// Fonction helper pour le nombre de slides visibles
function getVisibleSlidesCount() {
    if (window.innerWidth < 640) return 1;
    if (window.innerWidth < 768) return 1;
    if (window.innerWidth < 1024) return 2;
    if (window.innerWidth < 1280) return 3;
    return 4;
}

// Fonction utilitaire pour échapper le HTML
function escapeHtml(text) {
    if (!text) return '';
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Redémarrer les carrousels au redimensionnement
window.addEventListener('resize', () => {
    clearTimeout(window.resizeTimer);
    window.resizeTimer = setTimeout(() => {
        const newVisibleSlides = getVisibleSlidesCount();
        if (carousels.ats) {
            carousels.ats.options.visibleSlides = newVisibleSlides;
            carousels.ats.rebuild();
        }
        if (carousels.moderne) {
            carousels.moderne.options.visibleSlides = newVisibleSlides;
            carousels.moderne.rebuild();
        }
        if (carousels.creatif) {
            carousels.creatif.options.visibleSlides = newVisibleSlides;
            carousels.creatif.rebuild();
        }
    }, 250);
});