// =======================
// CONFIGURATION GLOBALE
// =======================

// Configuration des couleurs
window.COLORS = {
    primary: '#FF6B6B',
    secondary: '#4ECDC4',
    accent: '#FFE66D',
    dark: '#292F36',
    light: '#F7FFF7',
    primaryLight: '#FF8E8E',
    secondaryLight: '#6EDDD6',
    accentLight: '#FFF192',
    darkLight: '#3A4750'
};



// Configuration des templates
window.TEMPLATES_CONFIG = {
    ats: [
        { image: "/assets/Cv/ATS/ats.jpg", titre: "Pro", desc: "Structure claire et professionnelle", template: "ats", category: "ATS" },
        { image: "/assets/Cv/ATS/ats_classique.jpg", titre: "ats_classique", desc: "", template: "ats_classique", category: "ATS" },
        { image: "/assets/Cv/ATS/ats_moderne.jpg", titre: "ats_moderne", desc: "", template: "ats_moderne", category: "ATS" },
        { image: "/assets/Cv/ATS/ats_minimaliste.jpg", titre: "ats_minimaliste", desc: "", template: "ats_minimaliste", category: "ATS" }
    ],
    moderne: [
        { image: "/assets/Cv/MODERNE/mod_blue.jpg", titre: "mod_blue", desc: "", template: "mod_blue", category: "Moderne" },
        { image: "/assets/Cv/MODERNE/mod_white_orange.jpg", titre: "mod_white_orange.pdf", desc: "", template: "mod_white_orange", category: "Moderne" },
        { image: "/assets/Cv/MODERNE/cv_etudiant.jpg", titre: "cv_etudiant", desc: "", template: "cv_etudiant", category: "Moderne" },
        { image: "/assets/Cv/MODERNE/cv_etudiant_rosegold.jpg", titre: "ROSE GOLD / COSMOPOLITAIN", desc: "Design féminin/luxueux avec des tons rose cuivré et dorés", template: "cv_etudiant_rosegold", category: "Moderne"},
        { image: "/assets/Cv/MODERNE/cv_etudiant_dark.jpg", titre: "DARK MODE / TECH ", desc: "Design sombre moderne pour profils tech, développeurs, créatifs", template: "cv_etudiant_dark", category: "Moderne"},
        { image: "/assets/Cv/MODERNE/cv_etudiant_swiss.jpg", titre: "MINIMALIST / SWISS STYLE", desc: "Design ultra épuré inspiré du style suisse, parfait pour architecture, design, arts", template: "cv_etudiant_swiss", category: "Moderne"},
        { image: "/assets/Cv/MODERNE/cv_etudiant_1.jpg", titre: "cv_etudiant_1", desc: "", template: "cv_etudiant_1", category: "Moderne" },
        { image: "/assets/Cv/MODERNE/cv_etudiant_2.jpg", titre: "cv_etudiant_2", desc: "", template: "cv_etudiant_2", category: "Moderne" },
        { image: "/assets/Cv/MODERNE/cv_etudiant_ats.jpg", titre: "cv_etudiant_ats", desc: "", template: "cv_etudiant_ats", category: "Moderne" }
    ],
    creatif: [
        { image: "/assets/Cv/Crea.jpg", titre: "crea", desc: "Pour les métiers du design", template: "Crea", category: "Creative" },
        { image: "/assets/Cv/Crea2.jpg", titre: "crea2", desc: "Hors des sentiers battus", template: "Crea2", category: "Creative" },
        { image: "/assets/Cv/Crea3.jpg", titre: "crea3", desc: "Utilisation audacieuse de la couleur", template: "Crea3", category: "Creative" },
        { image: "/assets/Cv/Crea4.jpg", titre: "Crea4", desc: "Espace pour vos réalisations", template: "Crea4", category: "Creative" }
    ]
};

// Données par défaut pour le CV
window.DEFAULT_CV_DATA = {
    infos: {
        nom: "",
        prenom: "",
        poste: "",
        ville: "",
        tel: "",
        email: "",
        autre: "",
        resume: "",
        photo_path: null
    },
    experiences: [],
    formations: [],
    competences: [],
    langues: []
};

// Configuration des URLs
window.URLS = {
    telegramBot: "https://t.me/Temoin005Bot",
    supportEmail: "emmanuelmayala40@gmail.com"
};

// Messages d'alerte
window.ALERT_MESSAGES = {
    photoTooLarge: "La photo est trop volumineuse. Maximum 2MB autorisé.",
    saveSuccess: "Vos informations ont été sauvegardées ! Vous pourrez y accéder plus tard pour générer votre CV.",
    loadError: "Erreur lors du chargement des données.",
    generateConfirm: "Voulez-vous générer votre CV maintenant ?"
};