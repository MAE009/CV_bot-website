// =======================
// GESTION DU FORMULAIRE CV
// =======================

let formulaireCVData = null;

// Initialiser le formulaire
window.initFormulaire = function() {
    formulaireCVData = window.loadCVData() || JSON.parse(JSON.stringify(window.DEFAULT_CV_DATA));

    const { template, category } = getURLParams();

    if (!formulaireCVData.infos) formulaireCVData.infos = {};

    if (template) {
        formulaireCVData.infos.type_template = template;
    }

    if (category) {
        formulaireCVData.infos.category_template = category;
    }

    loadFormData();
    updateProgress(formulaireCVData);

    // Mettre à jour la disponibilité du formulaire avancé
    if (typeof window.checkAdvancedAvailability === 'function') {
        setTimeout(function() {
            window.checkAdvancedAvailability();
        }, 100);
    }

    const form = document.getElementById('cvForm');
    if (form) {
        form.addEventListener('input', function() {
            saveFormData();
        });
    }
};

// Charger les données dans le formulaire
function loadFormData() {
    const typeTemplateInput = document.getElementById('type_template');
    if (typeTemplateInput) {
        typeTemplateInput.value = formulaireCVData.infos.type_template || '';
    }

    const categoryInput = document.getElementById('category_template');
    if (categoryInput) {
        categoryInput.value = formulaireCVData.infos.category_template || '';
    }

    const infos = formulaireCVData.infos || {};

    const fields = ['nom', 'prenom', 'poste', 'ville', 'tel', 'email', 'autre', 'resume'];
    fields.forEach(field => {
        const element = document.getElementById(field);
        if (element) element.value = infos[field] || '';
    });

    loadPhoto(formulaireCVData);
    loadExperiences();
    loadFormations();
    loadCompetences();
    loadLangues();
}

// Sauvegarder les données du formulaire
window.saveFormData = function() {
    formulaireCVData.infos = {
        type_template: document.getElementById('type_template')?.value || 'mod',
        category_template: document.getElementById('category_template')?.value || '',
        nom: document.getElementById('nom')?.value || '',
        prenom: document.getElementById('prenom')?.value || '',
        poste: document.getElementById('poste')?.value || '',
        ville: document.getElementById('ville')?.value || '',
        tel: document.getElementById('tel')?.value || '',
        email: document.getElementById('email')?.value || '',
        autre: document.getElementById('autre')?.value || '',
        resume: document.getElementById('resume')?.value || '',
        photo_path: formulaireCVData.infos?.photo_path || null
    };

    window.saveCVData(formulaireCVData);
    window.showSaveIndicator();
    window.updateProgress(formulaireCVData);
};

// Gestion template
function getURLParams() {
    const params = new URLSearchParams(window.location.search);
    return {
        template: params.get('template'),
        category: params.get('category')
    };
}
// Gestion de photo
window.handlePhotoUpload = function(input) {
    const file = input.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = function(e) {
        const base64 = e.target.result;

        // stocker dans ton objet global
        if (!formulaireCVData.infos) formulaireCVData.infos = {};
        formulaireCVData.infos.photo_path = base64;

        // preview
        const preview = document.getElementById('photo-preview');
        const container = document.getElementById('photo-preview-container');

        if (preview) preview.src = base64;
        if (container) container.classList.remove('hidden');

        saveFormData();
    };

    reader.readAsDataURL(file);
};

window.removePhoto = function() {
    if (formulaireCVData.infos) {
        formulaireCVData.infos.photo_path = null;
    }

    const input = document.getElementById('photo');
    const preview = document.getElementById('photo-preview');
    const container = document.getElementById('photo-preview-container');

    if (input) input.value = '';
    if (preview) preview.src = '';
    if (container) container.classList.add('hidden');

    saveFormData();
};


// Gestion des expériences
function loadExperiences() {
    const container = document.getElementById('experiences-container');
    if (!container) return;

    container.innerHTML = '';
    (formulaireCVData.experiences || []).forEach((exp, index) => {
        container.innerHTML += createExperienceHTML(exp, index);
    });
}

window.addExperience = function() {
    if (!formulaireCVData.experiences) formulaireCVData.experiences = [];
    formulaireCVData.experiences.push({
        poste: '',
        entreprise: '',
        date: '',
        description: '',
        realisations: ''
    });
    loadExperiences();
    saveFormData();
};

window.removeExperience = function(index) {
    formulaireCVData.experiences.splice(index, 1);
    loadExperiences();
    saveFormData();
};

function createExperienceHTML(exp, index) {
    return `
        <div class="dynamic-item">
            <button type="button" class="remove-btn" onclick="removeExperience(${index})">
                <i class="fas fa-times"></i>
            </button>
            <div class="grid md:grid-cols-2 gap-4">
                <div class="form-group">
                    <label class="form-label">Poste</label>
                    <input type="text" value="${escapeHtml(exp.poste || '')}"
                           oninput="updateExperienceField(${index}, 'poste', this.value)"
                           class="form-input">
                </div>
                <div class="form-group">
                    <label class="form-label">Entreprise</label>
                    <input type="text" value="${escapeHtml(exp.entreprise || '')}"
                           oninput="updateExperienceField(${index}, 'entreprise', this.value)"
                           class="form-input">
                </div>
                <div class="form-group">
                    <label class="form-label">Période</label>
                    <input type="text" value="${escapeHtml(exp.date || '')}"
                           oninput="updateExperienceField(${index}, 'date', this.value)"
                           class="form-input" placeholder="Ex: Jan 2020 - Déc 2022">
                </div>
            </div>
            <div class="form-group">
                <label class="form-label">Description</label>
                <textarea oninput="updateExperienceField(${index}, 'description', this.value)"
                          class="form-input" rows="3">${escapeHtml(exp.description || '')}</textarea>
            </div>
            <div class="form-group">
                <label class="form-label">Réalisations</label>
                <textarea oninput="updateExperienceField(${index}, 'realisations', this.value)"
                          class="form-input" rows="2">${escapeHtml(exp.realisations || '')}</textarea>
            </div>
        </div>
    `;
}

window.updateExperienceField = function(index, field, value) {
    if (formulaireCVData.experiences[index]) {
        formulaireCVData.experiences[index][field] = value;
        saveFormData();
    }
};

// Gestion des formations
function loadFormations() {
    const container = document.getElementById('formations-container');
    if (!container) return;

    container.innerHTML = '';
    (formulaireCVData.formations || []).forEach((formation, index) => {
        container.innerHTML += createFormationHTML(formation, index);
    });
}

window.addFormation = function() {
    if (!formulaireCVData.formations) formulaireCVData.formations = [];
    formulaireCVData.formations.push({
        diplome: '',
        etablissement: '',
        date_debut: '',
        date_fin: '',
        lieu: ''
    });
    loadFormations();
    saveFormData();
};

window.removeFormation = function(index) {
    formulaireCVData.formations.splice(index, 1);
    loadFormations();
    saveFormData();
};

function createFormationHTML(formation, index) {
    return `
        <div class="dynamic-item">
            <button type="button" class="remove-btn" onclick="removeFormation(${index})">
                <i class="fas fa-times"></i>
            </button>
            <div class="grid md:grid-cols-2 gap-4">
                <div class="form-group">
                    <label class="form-label">Diplôme</label>
                    <input type="text" value="${escapeHtml(formation.diplome || '')}"
                           oninput="updateFormationField(${index}, 'diplome', this.value)"
                           class="form-input">
                </div>
                <div class="form-group">
                    <label class="form-label">Établissement</label>
                    <input type="text" value="${escapeHtml(formation.etablissement || '')}"
                           oninput="updateFormationField(${index}, 'etablissement', this.value)"
                           class="form-input">
                </div>
                <div class="form-group">
                    <label class="form-label">Date de début</label>
                    <input type="text" value="${escapeHtml(formation.date_debut || '')}"
                           oninput="updateFormationField(${index}, 'date_debut', this.value)"
                           class="form-input">
                </div>
                <div class="form-group">
                    <label class="form-label">Date de fin</label>
                    <input type="text" value="${escapeHtml(formation.date_fin || '')}"
                           oninput="updateFormationField(${index}, 'date_fin', this.value)"
                           class="form-input">
                </div>
                <div class="form-group md:col-span-2">
                    <label class="form-label">Lieu</label>
                    <input type="text" value="${escapeHtml(formation.lieu || '')}"
                           oninput="updateFormationField(${index}, 'lieu', this.value)"
                           class="form-input">
                </div>
            </div>
        </div>
    `;
}

window.updateFormationField = function(index, field, value) {
    if (formulaireCVData.formations[index]) {
        formulaireCVData.formations[index][field] = value;
        saveFormData();
    }
};

// Gestion des compétences
function loadCompetences() {
    const container = document.getElementById('competences-container');
    if (!container) return;

    container.innerHTML = '';
    (formulaireCVData.competences || []).forEach((competence, index) => {
        container.innerHTML += createCompetenceHTML(competence, index);
    });
}

window.addCompetence = function() {
    if (!formulaireCVData.competences) formulaireCVData.competences = [];
    formulaireCVData.competences.push({ comp: '' });
    loadCompetences();
    saveFormData();
};

window.removeCompetence = function(index) {
    formulaireCVData.competences.splice(index, 1);
    loadCompetences();
    saveFormData();
};

function createCompetenceHTML(competence, index) {
    return `
        <div class="dynamic-item">
            <button type="button" class="remove-btn" onclick="removeCompetence(${index})">
                <i class="fas fa-times"></i>
            </button>
            <div class="form-group">
                <label class="form-label">Compétence</label>
                <input type="text" value="${escapeHtml(competence.comp || '')}"
                       oninput="updateCompetenceField(${index}, this.value)"
                       class="form-input" placeholder="Ex: SolidWorks, AMDEC, Word...">
            </div>
        </div>
    `;
}

window.updateCompetenceField = function(index, value) {
    if (formulaireCVData.competences[index]) {
        formulaireCVData.competences[index].comp = value;
        saveFormData();
    }
};

// Gestion des langues
function loadLangues() {
    const container = document.getElementById('langues-container');
    if (!container) return;

    container.innerHTML = '';
    (formulaireCVData.langues || []).forEach((langue, index) => {
        container.innerHTML += createLangueHTML(langue, index);
    });
}

window.addLangue = function() {
    if (!formulaireCVData.langues) formulaireCVData.langues = [];
    formulaireCVData.langues.push({ nom: '' });
    loadLangues();
    saveFormData();
};

window.removeLangue = function(index) {
    formulaireCVData.langues.splice(index, 1);
    loadLangues();
    saveFormData();
};

function createLangueHTML(langue, index) {
    return `
        <div class="dynamic-item">
            <button type="button" class="remove-btn" onclick="removeLangue(${index})">
                <i class="fas fa-times"></i>
            </button>
            <div class="form-group">
                <label class="form-label">Langue</label>
                <input type="text" value="${escapeHtml(langue.nom || '')}"
                       oninput="updateLangueField(${index}, this.value)"
                       class="form-input" placeholder="Ex: Français (natif), Anglais (intermédiaire)...">
            </div>
        </div>
    `;
}

window.updateLangueField = function(index, value) {
    if (formulaireCVData.langues[index]) {
        formulaireCVData.langues[index].nom = value;
        saveFormData();
    }
};

// Sauvegarder pour plus tard
window.saveForLater = function() {
    saveFormData();
    alert(window.ALERT_MESSAGES.saveSuccess);
};

// Générer le CV
window.generateCV = function() {
    saveFormData();
    window.saveCVData(formulaireCVData);
    window.exportCVDataAsJSON(formulaireCVData);
    window.location.href = 'templates.html?generate=true';
};

// Fonction utilitaire pour échapper le HTML
function escapeHtml(text) {
    if (!text) return '';
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}