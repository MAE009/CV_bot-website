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
        { image: "Assets/Cv/Cv_restaurant.jpg", titre: "ats", desc: "Structure claire et professionnelle" },
        { image: "Assets/Cv/ats-minimaliste.jpg", titre: "ats_classique", desc: "" },
        { image: "Assets/Cv/ats-professionnel.jpg", titre: "ats_moderne", desc: "" },
        { image: "Assets/Cv/ats-fonctionnel.jpg", titre: "ats_minimaliste", desc: "" }
    ],
    moderne: [
        { image: "Assets/Cv/Cv_restaurant.jpg", titre: "mod", desc: "" },
        { image: "Assets/Cv/moderne-elegant.jpg", titre: "mod_blue", desc: "" },
        { image: "Assets/Cv/moderne-innovant.jpg", titre: "cv_etudiant", desc: "" },
        { image: "Assets/Cv/moderne-innovant.jpg", titre: "cv_etudiant_1", desc: "" },
        { image: "Assets/Cv/moderne-dynamique.jpg", titre: "cv_etudiant_ats", desc: "" }
    ],
    creatif: [
        { image: "Assets/Cv/creatif-artistique.jpg", titre: "crea", desc: "Pour les métiers du design" },
        { image: "Assets/Cv/creatif-original.jpg", titre: "crea2", desc: "Hors des sentiers battus" },
        { image: "Assets/Cv/creatif-colore.jpg", titre: "crea3", desc: "Utilisation audacieuse de la couleur" },
        { image: "Assets/Cv/creatif-portfolio.jpg", titre: "Crea4", desc: "Espace pour vos réalisations" }
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