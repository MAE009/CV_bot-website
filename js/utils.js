// =======================
// UTILITAIRES GÉNÉRAUX
// =======================

// Gestion du menu mobile (globale)
window.initMobileMenu = function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (!menuToggle || !navLinks) return;

    menuToggle.addEventListener('click', () => {
        const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
        menuToggle.setAttribute('aria-expanded', !isExpanded);
        navLinks.classList.toggle('active');

        if (navLinks.classList.contains('active')) {
            menuToggle.innerHTML = '<i class="fas fa-times"></i>';
        } else {
            menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
        }
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                navLinks.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false');
                menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
            }
        });
    });
};

// Smooth scrolling pour les ancres
window.initSmoothScroll = function() {
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
};

// FAQ Accordéon
window.initFaqAccordion = function() {
    document.querySelectorAll('.faq-question').forEach(button => {
        button.addEventListener('click', () => {
            const item = button.parentNode;
            item.classList.toggle('active');

            const icon = button.querySelector('i');
            if (icon) {
                icon.style.transform = item.classList.contains('active')
                    ? 'rotate(180deg)'
                    : 'rotate(0)';
            }
        });
    });
};

// Afficher un indicateur de sauvegarde
window.showSaveIndicator = function() {
    const indicator = document.getElementById('saveIndicator');
    if (!indicator) return;

    indicator.classList.add('show');
    setTimeout(() => {
        indicator.classList.remove('show');
    }, 2000);
};

// Mettre à jour la barre de progression
window.updateProgress = function(cvData) {
    const progressFill = document.getElementById('progressFill');
    if (!progressFill) return;

    let progress = 20;
    const infos = cvData.infos || {};

    if (infos.nom && infos.prenom && infos.poste) progress += 20;
    if (infos.email && infos.ville) progress += 10;
    if (infos.resume) progress += 10;
    if (cvData.experiences && cvData.experiences.length > 0) progress += 15;
    if (cvData.formations && cvData.formations.length > 0) progress += 15;
    if (cvData.competences && cvData.competences.length > 0) progress += 10;
    if (infos.photo_base64) progress += 5;

    progressFill.style.width = Math.min(progress, 100) + '%';
};

// Gestion de la photo
window.handlePhotoUpload = function(input, cvData, saveCallback) {
    const file = input.files[0];
    if (file) {
        if (file.size > 2 * 1024 * 1024) {
            alert(window.ALERT_MESSAGES.photoTooLarge);
            return;
        }

        const reader = new FileReader();
        reader.onload = function(e) {
            if (!cvData.infos) cvData.infos = {};
            cvData.infos.photo_base64 = e.target.result;

            const preview = document.getElementById('photo-preview');
            const container = document.getElementById('photo-preview-container');
            if (preview && container) {
                preview.src = e.target.result;
                container.classList.remove('hidden');
            }

            if (saveCallback) saveCallback();
        };
        reader.readAsDataURL(file);
    }
};

window.removePhoto = function(cvData, saveCallback) {
    if (!cvData.infos) cvData.infos = {};
    cvData.infos.photo_base64 = null;

    const photoInput = document.getElementById('photo');
    const container = document.getElementById('photo-preview-container');

    if (photoInput) photoInput.value = '';
    if (container) container.classList.add('hidden');

    if (saveCallback) saveCallback();
};

window.loadPhoto = function(cvData) {
    if (cvData.infos && cvData.infos.photo_base64) {
        const preview = document.getElementById('photo-preview');
        const container = document.getElementById('photo-preview-container');
        if (preview && container) {
            preview.src = cvData.infos.photo_base64;
            container.classList.remove('hidden');
        }
    }
};