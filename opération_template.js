// =======================
// Gestion du menu mobile
// =======================
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

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

// =======================
// Navigation par ancres
// =======================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
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

        // Ici, ajouter la logique pour faire défiler le carrousel
    });
});

// =======================
// Données des templates
// =======================
const templates = {
    ats: [
        { image: "Assets/Cv/ats-classique.jpg", titre: "Classique", desc: "Structure claire et pro" },
        { image: "Assets/Cv/ats-minimaliste.jpg", titre: "Minimaliste", desc: "Simplicité et efficacité" }
    ],
    moderne: [
        { image: "Assets/Cv/moderne-contemporain.jpg", titre: "Contemporain", desc: "Lignes épurées et modernes" },
        { image: "Assets/Cv/moderne-elegant.jpg", titre: "Élégant", desc: "Pour postes à responsabilité" }
    ],
    creatif: [
        { image: "Assets/Cv/creatif-artistique.jpg", titre: "Artistique", desc: "Pour les métiers du design" },
        { image: "Assets/Cv/creatif-colore.jpg", titre: "Coloré", desc: "Met en avant l’originalité" }
    ]
};

// =======================
// Fonction pour générer les carrousels
// =======================
function renderCarousel(category, containerId) {
    const container = document.getElementById(containerId);
    templates[category].forEach(cv => {
        container.innerHTML += `
            <div class="carousel-item">
                <div class="carousel-img">
                    <img src="${cv.image}" alt="${cv.titre}">
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
// Générer chaque carrousel
// =======================
renderCarousel("ats", "carousel-ats");
renderCarousel("moderne", "carousel-moderne");
renderCarousel("creatif", "carousel-creatif");
