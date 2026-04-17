// =======================
// BASCULEMENT ENTRE FORMULAIRES
// =======================

// État actuel du formulaire
let currentFormType = localStorage.getItem('preferredFormType') || 'standard';
let isAdvancedAvailable = false;

// Vérifier si le formulaire avancé est disponible
window.checkAdvancedAvailability = function() {
    const templateType = getCurrentTemplateType();
    isAdvancedAvailable = templateType && templateType.toLowerCase().includes('cv_etudiant');

    console.log('🔍 Vérification formulaire avancé:', {
        templateType: templateType,
        isAdvancedAvailable: isAdvancedAvailable
    });

    // Afficher ou cacher le bouton du formulaire avancé
    const avanceBtn = document.getElementById('switch-to-avance');
    const avanceContainer = document.getElementById('form-avance-container');
    const infoMessage = document.getElementById('advanced-info-message');

    if (avanceBtn) {
        if (isAdvancedAvailable) {
            avanceBtn.style.display = 'flex';
            avanceBtn.style.opacity = '1';
            avanceBtn.disabled = false;
            if (infoMessage) infoMessage.classList.remove('show');
        } else {
            avanceBtn.style.display = 'none';
            avanceBtn.style.opacity = '0.5';
            avanceBtn.disabled = true;
            if (infoMessage) infoMessage.classList.add('show');
            // Si on était en mode avancé, revenir au standard
            if (currentFormType === 'avance') {
                switchToStandard();
            }
        }
    }

    // Si le formulaire avancé est affiché mais pas disponible, le cacher
    if (avanceContainer && !isAdvancedAvailable) {
        avanceContainer.classList.add('hidden');
        const standardContainer = document.getElementById('form-standard-container');
        if (standardContainer) standardContainer.classList.remove('hidden');
    }

    return isAdvancedAvailable;
};

// Récupérer le type de template actuel
function getCurrentTemplateType() {
    // Essayer de récupérer depuis les champs du formulaire
    const templateField = document.getElementById('type_template') || document.getElementById('type_template_avance');
    if (templateField && templateField.value) {
        return templateField.value;
    }

    // Essayer depuis les données sauvegardées
    const savedData = window.loadCVData();
    if (savedData && savedData.infos && savedData.infos.type_template) {
        return savedData.infos.type_template;
    }

    // Essayer depuis l'URL
    const urlParams = new URLSearchParams(window.location.search);
    const template = urlParams.get('template');
    if (template) return template;

    return null;
}

// Initialiser le sélecteur de formulaire
window.initFormSwitcher = function() {
    console.log('🔄 Initialisation du sélecteur de formulaire...');

    const standardBtn = document.getElementById('switch-to-standard');
    const avanceBtn = document.getElementById('switch-to-avance');

    if (!standardBtn || !avanceBtn) {
        console.error('❌ Boutons de switch non trouvés');
        return;
    }

    // Vérifier la disponibilité du formulaire avancé
    checkAdvancedAvailability();

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
        // Vérifier à nouveau la disponibilité avant de basculer
        if (checkAdvancedAvailability()) {
            console.log('⭐ Switch vers formulaire AVANCÉ');
            switchToAvance();
        } else {
            console.log('❌ Formulaire avancé non disponible pour ce template');
            alert('Le formulaire avancé est uniquement disponible pour les templates "cv_etudiant".');
        }
    });

    // Restaurer l'état sauvegardé
    if (currentFormType === 'standard') {
        switchToStandard();
    } else if (currentFormType === 'avance' && isAdvancedAvailable) {
        switchToAvance();
    } else {
        switchToStandard();
    }

    // Observer les changements du champ template
    observeTemplateChanges();

    console.log('✅ Sélecteur de formulaire initialisé, mode actuel:', currentFormType);
};

// Observer les changements du champ template
function observeTemplateChanges() {
    // Observer le champ type_template dans le formulaire standard
    const templateFieldStandard = document.getElementById('type_template');
    if (templateFieldStandard) {
        const observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (mutation.type === 'attributes' && mutation.attributeName === 'value') {
                    checkAdvancedAvailability();
                }
            });
        });
        observer.observe(templateFieldStandard, { attributes: true });

        // Aussi écouter l'événement input
        templateFieldStandard.addEventListener('change', function() {
            checkAdvancedAvailability();
        });
    }

    // Observer le champ type_template_avance dans le formulaire avancé
    const templateFieldAvance = document.getElementById('type_template_avance');
    if (templateFieldAvance) {
        templateFieldAvance.addEventListener('change', function() {
            checkAdvancedAvailability();
        });
    }
}

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
    // Vérifier à nouveau la disponibilité
    if (!checkAdvancedAvailability()) {
        console.log('❌ Impossible de basculer: formulaire avancé non disponible');
        alert('Le formulaire avancé est uniquement disponible pour les templates "cv_etudiant".');
        return;
    }

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
window.checkAdvancedAvailability = checkAdvancedAvailability;