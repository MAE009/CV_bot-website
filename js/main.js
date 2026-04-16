// =======================
// POINT D'ENTRÉE PRINCIPAL
// =======================

// Initialisation générale au chargement du DOM
document.addEventListener('DOMContentLoaded', function() {
    // Initialiser le menu mobile
    if (typeof window.initMobileMenu === 'function') {
        window.initMobileMenu();
    }

    // Initialiser le smooth scroll
    if (typeof window.initSmoothScroll === 'function') {
        window.initSmoothScroll();
    }

    // Initialiser la FAQ accordéon
    if (typeof window.initFaqAccordion === 'function') {
        window.initFaqAccordion();
    }

    // Détection de la page actuelle et initialisation spécifique
    const currentPage = window.location.pathname.split('/').pop();

    if (currentPage === 'Formulaire.html' || currentPage === 'Formulaire' || document.getElementById('cvForm')) {
        if (typeof window.initFormulaire === 'function') {
            window.initFormulaire();
        }
    }

    if (currentPage === 'templates.html' || currentPage === 'templates' || document.getElementById('carousel-ats')) {
        if (typeof window.initTemplatesPage === 'function') {
            window.initTemplatesPage();
        }
    }
});

// Export des fonctions globales nécessaires pour les onclick
window.addExperience = window.addExperience || function() {};
window.removeExperience = window.removeExperience || function() {};
window.addFormation = window.addFormation || function() {};
window.removeFormation = window.removeFormation || function() {};
window.addCompetence = window.addCompetence || function() {};
window.removeCompetence = window.removeCompetence || function() {};
window.addLangue = window.addLangue || function() {};
window.removeLangue = window.removeLangue || function() {};
window.saveForLater = window.saveForLater || function() {};
window.generateCV = window.generateCV || function() {};
window.handlePhotoUpload = window.handlePhotoUpload || function() {};
window.removePhoto = window.removePhoto || function() {};