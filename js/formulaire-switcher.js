// =======================
// BASCULEMENT ENTRE FORMULAIRES
// =======================

// État actuel du formulaire
let currentFormType = localStorage.getItem('preferredFormType') || 'standard';

// Initialiser le sélecteur de formulaire
window.initFormSwitcher = function() {
    console.log('🔄 Initialisation du sélecteur de formulaire...');

    const standardBtn = document.getElementById('switch-to-standard');
    const avanceBtn = document.getElementById('switch-to-avance');

    if (!standardBtn || !avanceBtn) {
        console.error('❌ Boutons de switch non trouvés');
        return;
    }

    // Supprimer les anciens événements pour éviter les doublons
    const newStandardBtn = standardBtn.cloneNode(true);
    const newAvanceBtn = avanceBtn.cloneNode(true);
    standardBtn.parentNode.replaceChild(newStandardBtn, standardBtn);
    avanceBtn.parentNode.replaceChild(newAvanceBtn, avanceBtn);

    // Ajouter les nouveaux événements
    newStandardBtn.addEventListener('click', function(e) {
        e.preventDefault();
        console.log('📄 Switch vers formulaire STANDARD');
        switchToStandard();
    });

    newAvanceBtn.addEventListener('click', function(e) {
        e.preventDefault();
        console.log('⭐ Switch vers formulaire AVANCÉ');
        switchToAvance();
    });

    // Restaurer l'état sauvegardé
    if (currentFormType === 'standard') {
        switchToStandard();
    } else {
        switchToAvance();
    }

    console.log('✅ Sélecteur de formulaire initialisé, mode actuel:', currentFormType);
};

// Basculer vers le formulaire standard
function switchToStandard() {
    currentFormType = 'standard';
    localStorage.setItem('preferredFormType', 'standard');

    // Cacher le formulaire avancé
    const avanceContainer = document.getElementById('form-avance-container');
    if (avanceContainer) avanceContainer.classList.add('hidden');

    // Afficher le formulaire standard
    const standardContainer = document.getElementById('form-standard-container');
    if (standardContainer) standardContainer.classList.remove('hidden');

    // Mettre à jour l'apparence des boutons
    const standardBtn = document.getElementById('switch-to-standard');
    const avanceBtn = document.getElementById('switch-to-avance');

    if (standardBtn) standardBtn.classList.add('active');
    if (avanceBtn) avanceBtn.classList.remove('active');

    // Réinitialiser le formulaire standard avec les données
    if (typeof window.initFormulaire === 'function') {
        window.initFormulaire();
    }

    console.log('✅ Formulaire STANDARD activé');
}

// Basculer vers le formulaire avancé
function switchToAvance() {
    currentFormType = 'avance';
    localStorage.setItem('preferredFormType', 'avance');

    // Cacher le formulaire standard
    const standardContainer = document.getElementById('form-standard-container');
    if (standardContainer) standardContainer.classList.add('hidden');

    // Afficher le formulaire avancé
    const avanceContainer = document.getElementById('form-avance-container');
    if (avanceContainer) avanceContainer.classList.remove('hidden');

    // Mettre à jour l'apparence des boutons
    const standardBtn = document.getElementById('switch-to-standard');
    const avanceBtn = document.getElementById('switch-to-avance');

    if (standardBtn) standardBtn.classList.remove('active');
    if (avanceBtn) avanceBtn.classList.add('active');

    // Réinitialiser le formulaire avancé avec les données
    if (typeof window.initFormulaireAvance === 'function') {
        window.initFormulaireAvance();
    }

    console.log('✅ Formulaire AVANCÉ activé');
}

// Exporter les fonctions globales
window.switchToStandard = switchToStandard;
window.switchToAvance = switchToAvance;
window.getCurrentFormType = function() { return currentFormType; };