// =======================
// POINT D'ENTRÉE PRINCIPAL
// =======================

// Variable pour éviter les doubles initialisations
let isInitialized = false;

document.addEventListener('DOMContentLoaded', function() {
    if (isInitialized) return;
    isInitialized = true;

    console.log('🚀 Initialisation de l\'application...');

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

    // Détection de la page actuelle
    const currentPage = window.location.pathname.split('/').pop();
    console.log('📄 Page actuelle:', currentPage);

    if (currentPage === 'Formulaire.html' || currentPage === 'Formulaire' || document.getElementById('cvForm')) {
        // Attendre que le DOM soit complètement chargé pour le formulaire
        setTimeout(function() {
            // Initialiser d'abord le sélecteur de formulaire
            if (typeof window.initFormSwitcher === 'function') {
                window.initFormSwitcher();
            } else {
                console.error('❌ initFormSwitcher non trouvé');
                // Fallback: initialiser directement le formulaire standard
                if (typeof window.initFormulaire === 'function') {
                    window.initFormulaire();
                }
            }
        }, 100);
    }

    if (currentPage === 'templates.html' || currentPage === 'templates' || document.getElementById('carousel-ats')) {
        if (typeof window.initTemplatesPage === 'function') {
            window.initTemplatesPage();
        }
    }

    console.log('✅ Application initialisée');
});

// Export des fonctions globales pour les onclick
window.addExperience = window.addExperience || function() { console.warn('addExperience non défini'); };
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

// Export des fonctions avancées
window.addExperienceAvance = window.addExperienceAvance || function() {};
window.removeExperienceAvance = window.removeExperienceAvance || function() {};
window.addFormationAvance = window.addFormationAvance || function() {};
window.removeFormationAvance = window.removeFormationAvance || function() {};
window.addCompetenceAvance = window.addCompetenceAvance || function() {};
window.removeCompetenceAvance = window.removeCompetenceAvance || function() {};
window.addLangueAvance = window.addLangueAvance || function() {};
window.removeLangueAvance = window.removeLangueAvance || function() {};
window.saveForLaterAvance = window.saveForLaterAvance || function() {};
window.generateCVAvance = window.generateCVAvance || function() {};
window.handlePhotoUploadAvance = window.handlePhotoUploadAvance || function() {};
window.removePhotoAvance = window.removePhotoAvance || function() {};