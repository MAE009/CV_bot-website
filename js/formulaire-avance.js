// =======================
// GESTION DU FORMULAIRE AVANCÉ
// =======================

let formulaireAvanceData = null;

// Initialiser le formulaire avancé
window.initFormulaireAvance = function() {
    formulaireAvanceData = window.loadCVData() || JSON.parse(JSON.stringify(window.DEFAULT_CV_DATA));

    // Initialiser les structures avancées si nécessaire
    if (!formulaireAvanceData.infos) formulaireAvanceData.infos = {};

    const { template, category } = getURLParams();
    if (template) formulaireAvanceData.infos.type_template = template;
    if (category) formulaireAvanceData.infos.category_template = category;

    loadAvanceFormData();
    updateProgress(formulaireAvanceData);

    const form = document.getElementById('cvFormAvance');
    if (form) {
        form.addEventListener('input', function() {
            saveAvanceFormData();
        });
    }
};

// Charger les données du formulaire avancé
function loadAvanceFormData() {
    // Type template
    const typeTemplateInput = document.getElementById('type_template_avance');
    if (typeTemplateInput) {
        typeTemplateInput.value = formulaireAvanceData.infos.type_template || '';
    }

    const categoryInput = document.getElementById('category_template_avance');
    if (categoryInput) {
        categoryInput.value = formulaireAvanceData.infos.category_template || '';
    }

    // Informations personnelles
    const infos = formulaireAvanceData.infos || {};
    const fields = ['nom', 'prenom', 'poste', 'ville', 'tel', 'email', 'autre', 'resume'];
    fields.forEach(field => {
        const element = document.getElementById(field + '_avance');
        if (element) element.value = infos[field] || '';
    });

    // Photo
    loadPhotoAvance(formulaireAvanceData);

    // Expériences avancées
    loadExperiencesAvance();

    // Formations avancées
    loadFormationsAvance();

    // Compétences avancées
    loadCompetencesAvance();

    // Langues avancées
    loadLanguesAvance();
}

// Sauvegarder les données du formulaire avancé
window.saveAvanceFormData = function() {
    formulaireAvanceData.infos = {
        type_template: document.getElementById('type_template_avance')?.value || '',
        category_template: document.getElementById('category_template_avance')?.value || '',
        nom: document.getElementById('nom_avance')?.value || '',
        prenom: document.getElementById('prenom_avance')?.value || '',
        poste: document.getElementById('poste_avance')?.value || '',
        ville: document.getElementById('ville_avance')?.value || '',
        tel: document.getElementById('tel_avance')?.value || '',
        email: document.getElementById('email_avance')?.value || '',
        autre: document.getElementById('autre_avance')?.value || '',
        resume: document.getElementById('resume_avance')?.value || '',
        photo_path: formulaireAvanceData.infos?.photo_path || null
    };

    window.saveCVData(formulaireAvanceData);
    window.showSaveIndicator();
    window.updateProgress(formulaireAvanceData);
};

// ==================== EXPÉRIENCES AVANCÉES ====================
function loadExperiencesAvance() {
    const container = document.getElementById('experiences-container-avance');
    if (!container) return;

    container.innerHTML = '';
    (formulaireAvanceData.experiences || []).forEach((exp, index) => {
        container.innerHTML += createExperienceAvanceHTML(exp, index);
    });
}

window.addExperienceAvance = function() {
    if (!formulaireAvanceData.experiences) formulaireAvanceData.experiences = [];
    formulaireAvanceData.experiences.push({
        poste: '',
        entreprise: '',
        date: '',
        description: '',
        missions: [],
        realisations: ''
    });
    loadExperiencesAvance();
    saveAvanceFormData();
};

window.removeExperienceAvance = function(index) {
    formulaireAvanceData.experiences.splice(index, 1);
    loadExperiencesAvance();
    saveAvanceFormData();
};

function createExperienceAvanceHTML(exp, index) {
    const missionsList = (exp.missions || []).map((mission, mIndex) => `
        <div class="mission-item flex gap-2 mb-2">
            <input type="text" value="${escapeHtml(mission)}"
                   oninput="updateExperienceMission(${index}, ${mIndex}, this.value)"
                   class="form-input flex-1" placeholder="Mission ou responsabilité">
            <button type="button" onclick="removeExperienceMission(${index}, ${mIndex})"
                    class="bg-red-500 text-white px-2 rounded hover:bg-red-600">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `).join('');

    return `
        <div class="dynamic-item">
            <button type="button" class="remove-btn" onclick="removeExperienceAvance(${index})">
                <i class="fas fa-times"></i>
            </button>
            <div class="grid md:grid-cols-2 gap-4">
                <div class="form-group">
                    <label class="form-label">Poste *</label>
                    <input type="text" value="${escapeHtml(exp.poste || '')}"
                           oninput="updateExperienceAvanceField(${index}, 'poste', this.value)"
                           class="form-input">
                </div>
                <div class="form-group">
                    <label class="form-label">Entreprise *</label>
                    <input type="text" value="${escapeHtml(exp.entreprise || '')}"
                           oninput="updateExperienceAvanceField(${index}, 'entreprise', this.value)"
                           class="form-input">
                </div>
                <div class="form-group">
                    <label class="form-label">Période</label>
                    <input type="text" value="${escapeHtml(exp.date || '')}"
                           oninput="updateExperienceAvanceField(${index}, 'date', this.value)"
                           class="form-input" placeholder="Ex: Octobre - Décembre 2025">
                </div>
            </div>
            <div class="form-group">
                <label class="form-label">Description globale</label>
                <textarea oninput="updateExperienceAvanceField(${index}, 'description', this.value)"
                          class="form-input" rows="2" placeholder="Description générale du poste...">${escapeHtml(exp.description || '')}</textarea>
            </div>
            <div class="form-group">
                <label class="form-label">Missions / Responsabilités</label>
                <div id="missions-container-${index}">
                    ${missionsList}
                </div>
                <button type="button" onclick="addExperienceMission(${index})"
                        class="btn-secondary text-sm mt-2">
                    <i class="fas fa-plus mr-1"></i> Ajouter une mission
                </button>
            </div>
            <div class="form-group">
                <label class="form-label">Réalisations / Résultats</label>
                <textarea oninput="updateExperienceAvanceField(${index}, 'realisations', this.value)"
                          class="form-input" rows="3" placeholder="Ex: Développement d'une macro VBA, réduction du temps de traitement de 40%...">${escapeHtml(exp.realisations || '')}</textarea>
            </div>
        </div>
    `;
}

window.updateExperienceAvanceField = function(index, field, value) {
    if (formulaireAvanceData.experiences[index]) {
        formulaireAvanceData.experiences[index][field] = value;
        saveAvanceFormData();
    }
};

window.addExperienceMission = function(expIndex) {
    if (!formulaireAvanceData.experiences[expIndex].missions) {
        formulaireAvanceData.experiences[expIndex].missions = [];
    }
    formulaireAvanceData.experiences[expIndex].missions.push('');
    loadExperiencesAvance();
    saveAvanceFormData();
};

window.updateExperienceMission = function(expIndex, missionIndex, value) {
    if (formulaireAvanceData.experiences[expIndex]?.missions) {
        formulaireAvanceData.experiences[expIndex].missions[missionIndex] = value;
        saveAvanceFormData();
    }
};

window.removeExperienceMission = function(expIndex, missionIndex) {
    if (formulaireAvanceData.experiences[expIndex]?.missions) {
        formulaireAvanceData.experiences[expIndex].missions.splice(missionIndex, 1);
        loadExperiencesAvance();
        saveAvanceFormData();
    }
};

// ==================== FORMATIONS AVANCÉES ====================
function loadFormationsAvance() {
    const container = document.getElementById('formations-container-avance');
    if (!container) return;

    container.innerHTML = '';
    (formulaireAvanceData.formations || []).forEach((formation, index) => {
        container.innerHTML += createFormationAvanceHTML(formation, index);
    });
}

window.addFormationAvance = function() {
    if (!formulaireAvanceData.formations) formulaireAvanceData.formations = [];
    formulaireAvanceData.formations.push({
        diplome: '',
        etablissement: '',
        date_debut: '',
        date_fin: '',
        lieu: '',
        description: ''
    });
    loadFormationsAvance();
    saveAvanceFormData();
};

window.removeFormationAvance = function(index) {
    formulaireAvanceData.formations.splice(index, 1);
    loadFormationsAvance();
    saveAvanceFormData();
};

function createFormationAvanceHTML(formation, index) {
    return `
        <div class="dynamic-item">
            <button type="button" class="remove-btn" onclick="removeFormationAvance(${index})">
                <i class="fas fa-times"></i>
            </button>
            <div class="grid md:grid-cols-2 gap-4">
                <div class="form-group">
                    <label class="form-label">Diplôme / Formation *</label>
                    <input type="text" value="${escapeHtml(formation.diplome || '')}"
                           oninput="updateFormationAvanceField(${index}, 'diplome', this.value)"
                           class="form-input" placeholder="Ex: Licence 3 — Génie Industriel et Maintenance">
                </div>
                <div class="form-group">
                    <label class="form-label">Établissement *</label>
                    <input type="text" value="${escapeHtml(formation.etablissement || '')}"
                           oninput="updateFormationAvanceField(${index}, 'etablissement', this.value)"
                           class="form-input">
                </div>
                <div class="form-group">
                    <label class="form-label">Date de début</label>
                    <input type="text" value="${escapeHtml(formation.date_debut || '')}"
                           oninput="updateFormationAvanceField(${index}, 'date_debut', this.value)"
                           class="form-input" placeholder="2023">
                </div>
                <div class="form-group">
                    <label class="form-label">Date de fin</label>
                    <input type="text" value="${escapeHtml(formation.date_fin || '')}"
                           oninput="updateFormationAvanceField(${index}, 'date_fin', this.value)"
                           class="form-input" placeholder="2026">
                </div>
                <div class="form-group">
                    <label class="form-label">Lieu</label>
                    <input type="text" value="${escapeHtml(formation.lieu || '')}"
                           oninput="updateFormationAvanceField(${index}, 'lieu', this.value)"
                           class="form-input" placeholder="Pointe-Noire">
                </div>
            </div>
            <div class="form-group">
                <label class="form-label">Description / Spécialités</label>
                <textarea oninput="updateFormationAvanceField(${index}, 'description', this.value)"
                          class="form-input" rows="2" placeholder="Formation axée sur la maintenance industrielle, la gestion de production...">${escapeHtml(formation.description || '')}</textarea>
            </div>
        </div>
    `;
}

window.updateFormationAvanceField = function(index, field, value) {
    if (formulaireAvanceData.formations[index]) {
        formulaireAvanceData.formations[index][field] = value;
        saveAvanceFormData();
    }
};

// ==================== COMPÉTENCES AVANCÉES ====================
function loadCompetencesAvance() {
    const container = document.getElementById('competences-container-avance');
    if (!container) return;

    container.innerHTML = '';
    (formulaireAvanceData.competences || []).forEach((competence, index) => {
        container.innerHTML += createCompetenceAvanceHTML(competence, index);
    });
}

window.addCompetenceAvance = function() {
    if (!formulaireAvanceData.competences) formulaireAvanceData.competences = [];
    formulaireAvanceData.competences.push({
        comp: '',
        niveau: '',
        description: ''
    });
    loadCompetencesAvance();
    saveAvanceFormData();
};

window.removeCompetenceAvance = function(index) {
    formulaireAvanceData.competences.splice(index, 1);
    loadCompetencesAvance();
    saveAvanceFormData();
};

function createCompetenceAvanceHTML(competence, index) {
    return `
        <div class="dynamic-item">
            <button type="button" class="remove-btn" onclick="removeCompetenceAvance(${index})">
                <i class="fas fa-times"></i>
            </button>
            <div class="grid md:grid-cols-3 gap-4">
                <div class="form-group">
                    <label class="form-label">Compétence *</label>
                    <input type="text" value="${escapeHtml(competence.comp || '')}"
                           oninput="updateCompetenceAvanceField(${index}, 'comp', this.value)"
                           class="form-input" placeholder="Ex: VBA / Excel">
                </div>
                <div class="form-group">
                    <label class="form-label">Niveau</label>
                    <select onchange="updateCompetenceAvanceField(${index}, 'niveau', this.value)"
                            class="form-input">
                        <option value="">Sélectionner un niveau</option>
                        <option value="Débutant" ${competence.niveau === 'Débutant' ? 'selected' : ''}>Débutant</option>
                        <option value="Intermédiaire" ${competence.niveau === 'Intermédiaire' ? 'selected' : ''}>Intermédiaire</option>
                        <option value="Avancé" ${competence.niveau === 'Avancé' ? 'selected' : ''}>Avancé</option>
                        <option value="Expert" ${competence.niveau === 'Expert' ? 'selected' : ''}>Expert</option>
                        <option value="Notions" ${competence.niveau === 'Notions' ? 'selected' : ''}>Notions</option>
                    </select>
                </div>
                <div class="form-group">
                    <label class="form-label">Description</label>
                    <input type="text" value="${escapeHtml(competence.description || '')}"
                           oninput="updateCompetenceAvanceField(${index}, 'description', this.value)"
                           class="form-input" placeholder="Ex: Développement de macros, automatisation...">
                </div>
            </div>
        </div>
    `;
}

window.updateCompetenceAvanceField = function(index, field, value) {
    if (formulaireAvanceData.competences[index]) {
        formulaireAvanceData.competences[index][field] = value;
        saveAvanceFormData();
    }
};

// ==================== LANGUES AVANCÉES ====================
function loadLanguesAvance() {
    const container = document.getElementById('langues-container-avance');
    if (!container) return;

    container.innerHTML = '';
    (formulaireAvanceData.langues || []).forEach((langue, index) => {
        container.innerHTML += createLangueAvanceHTML(langue, index);
    });
}

window.addLangueAvance = function() {
    if (!formulaireAvanceData.langues) formulaireAvanceData.langues = [];
    formulaireAvanceData.langues.push({ nom: '', niveau: '' });
    loadLanguesAvance();
    saveAvanceFormData();
};

window.removeLangueAvance = function(index) {
    formulaireAvanceData.langues.splice(index, 1);
    loadLanguesAvance();
    saveAvanceFormData();
};

function createLangueAvanceHTML(langue, index) {
    return `
        <div class="dynamic-item">
            <button type="button" class="remove-btn" onclick="removeLangueAvance(${index})">
                <i class="fas fa-times"></i>
            </button>
            <div class="grid md:grid-cols-2 gap-4">
                <div class="form-group">
                    <label class="form-label">Langue *</label>
                    <input type="text" value="${escapeHtml(langue.nom || '')}"
                           oninput="updateLangueAvanceField(${index}, 'nom', this.value)"
                           class="form-input" placeholder="Ex: Français, Anglais...">
                </div>
                <div class="form-group">
                    <label class="form-label">Niveau</label>
                    <select onchange="updateLangueAvanceField(${index}, 'niveau', this.value)"
                            class="form-input">
                        <option value="">Sélectionner un niveau</option>
                        <option value="Natif" ${langue.niveau === 'Natif' ? 'selected' : ''}>Natif</option>
                        <option value="Courant" ${langue.niveau === 'Courant' ? 'selected' : ''}>Courant</option>
                        <option value="Professionnel" ${langue.niveau === 'Professionnel' ? 'selected' : ''}>Professionnel</option>
                        <option value="Intermédiaire" ${langue.niveau === 'Intermédiaire' ? 'selected' : ''}>Intermédiaire</option>
                        <option value="Notions" ${langue.niveau === 'Notions' ? 'selected' : ''}>Notions</option>
                    </select>
                </div>
            </div>
        </div>
    `;
}

window.updateLangueAvanceField = function(index, field, value) {
    if (formulaireAvanceData.langues[index]) {
        formulaireAvanceData.langues[index][field] = value;
        saveAvanceFormData();
    }
};

// ==================== PHOTO ====================
window.handlePhotoUploadAvance = function(input) {
    const file = input.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(e) {
        const base64 = e.target.result;
        if (!formulaireAvanceData.infos) formulaireAvanceData.infos = {};
        formulaireAvanceData.infos.photo_path = base64;

        const preview = document.getElementById('photo-preview-avance');
        const container = document.getElementById('photo-preview-container-avance');
        if (preview) preview.src = base64;
        if (container) container.classList.remove('hidden');

        saveAvanceFormData();
    };
    reader.readAsDataURL(file);
};

window.removePhotoAvance = function() {
    if (formulaireAvanceData.infos) {
        formulaireAvanceData.infos.photo_path = null;
    }
    const input = document.getElementById('photo_avance');
    const preview = document.getElementById('photo-preview-avance');
    const container = document.getElementById('photo-preview-container-avance');
    if (input) input.value = '';
    if (preview) preview.src = '';
    if (container) container.classList.add('hidden');
    saveAvanceFormData();
};

function loadPhotoAvance(cvData) {
    if (cvData.infos && cvData.infos.photo_path) {
        const preview = document.getElementById('photo-preview-avance');
        const container = document.getElementById('photo-preview-container-avance');
        if (preview && container && cvData.infos.photo_path !== 'none') {
            preview.src = cvData.infos.photo_path;
            container.classList.remove('hidden');
        }
    }
}

// Sauvegarder pour plus tard
window.saveForLaterAvance = function() {
    saveAvanceFormData();
    alert(window.ALERT_MESSAGES.saveSuccess);
};

// Générer le CV
window.generateCVAvance = function() {
    saveAvanceFormData();
    window.saveCVData(formulaireAvanceData);
    window.exportCVDataAsJSON(formulaireAvanceData);
    alert('CV généré avec succès ! Les données ont été exportées.');
};

function getURLParams() {
    const params = new URLSearchParams(window.location.search);
    return {
        template: params.get('template'),
        category: params.get('category')
    };
}

function escapeHtml(text) {
    if (!text) return '';
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}