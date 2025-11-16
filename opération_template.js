// =======================
// Gestion du menu mobile
// =======================
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
        const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
        menuToggle.setAttribute('aria-expanded', !isExpanded);
        navLinks.classList.toggle('active');

        // Animation de l'icône
        if (navLinks.classList.contains('active')) {
            menuToggle.innerHTML = '<i class="fas fa-times"></i>';
        } else {
            menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
        }
    });

    // Fermer le menu quand un lien est cliqué (sur mobile)
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                navLinks.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false');
                menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
            }
        });
    });
}

// =======================
// Navigation par ancres
// =======================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// =======================
// Navigation des carrousels
// =======================
document.querySelectorAll('.carousel-dot').forEach((dot, index) => {
    dot.addEventListener('click', () => {
        // Enlever la classe active de tous les points
        document.querySelectorAll('.carousel-dot').forEach(d => {
            d.classList.remove('active');
        });

        // Ajouter la classe active au point cliqué
        dot.classList.add('active');

        // Faire défiler le carrousel
        const carouselContainer = dot.closest('section').querySelector('.carousel-container');
        const carousel = carouselContainer.querySelector('.carousel');
        const itemWidth = carousel.querySelector('.carousel-item').offsetWidth + 24; // 24px pour le gap
        carouselContainer.scrollTo({
            left: index * itemWidth,
            behavior: 'smooth'
        });
    });
});

// =======================
// Données des templates
// =======================
const templates = {
    ats: [
        { image: "Assets/Cv/Cv_restaurant.jpg", titre: "Classique", desc: "Structure claire et professionnelle" },
        { image: "Assets/Cv/ats-minimaliste.jpg", titre: "Minimaliste", desc: "Simplicité et efficacité" },
        { image: "Assets/Cv/ats-professionnel.jpg", titre: "Professionnel", desc: "Design épuré mettant en valeur votre expérience" },
        { image: "Assets/Cv/ats-fonctionnel.jpg", titre: "Fonctionnel", desc: "Mise en avant des compétences" },
        { image: "Assets/Cv/Cv_restaurant.jpg", titre: "Classique", desc: "Structure claire et professionnelle" },
        { image: "Assets/Cv/ats-minimaliste.jpg", titre: "Minimaliste", desc: "Simplicité et efficacité" },
        { image: "Assets/Cv/ats-professionnel.jpg", titre: "Professionnel", desc: "Design épuré mettant en valeur votre expérience" },
        { image: "Assets/Cv/ats-fonctionnel.jpg", titre: "Fonctionnel", desc: "Mise en avant des compétences" }
    ],
    moderne: [
        { image: "Assets/Cv/Cv_restaurant.jpg", titre: "🌿 CV Dynamique & Coloré", desc: "Un template pétillant qui met en avant ton profil avec style et bonne humeur ! 🎨✨" },
        { image: "Assets/Cv/moderne-elegant.jpg", titre: "Élégant", desc: "Pour postes à responsabilité" },
        { image: "Assets/Cv/moderne-innovant.jpg", titre: "Innovant", desc: "Mise en page originale" },
        { image: "Assets/Cv/moderne-dynamique.jpg", titre: "Dynamique", desc: "Énergique et moderne" }
    ],
    creatif: [
        { image: "Assets/Cv/creatif-artistique.jpg", titre: "Artistique", desc: "Pour les métiers du design" },
        { image: "Assets/Cv/creatif-original.jpg", titre: "Original", desc: "Hors des sentiers battus" },
        { image: "Assets/Cv/creatif-colore.jpg", titre: "Coloré", desc: "Utilisation audacieuse de la couleur" },
        { image: "Assets/Cv/creatif-portfolio.jpg", titre: "Portfolio", desc: "Espace pour vos réalisations" }
    ]
};

// =======================
// Fonction pour générer les carrousels
// =======================
function renderCarousel(category, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    container.innerHTML = ''; // Vider le contenu existant
    
    templates[category].forEach(cv => {
        container.innerHTML += `
            <div class="carousel-item">
                <div class="carousel-img">
                    <img src="${cv.image}" alt="Template CV ${cv.titre}" loading="lazy">
                </div>
                <div class="carousel-content">
                    <h3 class="text-xl font-bold mb-2">${cv.titre}</h3>
                    <p class="text-gray-600 mb-4">${cv.desc}</p>
                    <a href="#" class="font-semibold" style="color: var(--primary);">Voir le template →</a>
                </div>
            </div>
        `;
    });
}

// =======================
// Générer chaque carrousel au chargement de la page
// =======================
document.addEventListener('DOMContentLoaded', function() {
    renderCarousel("ats", "carousel-ats");
    renderCarousel("moderne", "carousel-moderne");
    renderCarousel("creatif", "carousel-creatif");
});
