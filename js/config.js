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
        { image: "Assets/Cv/Cv_restaurant.jpg", titre: "Classique", desc: "Structure claire et professionnelle" },
        { image: "Assets/Cv/ats-minimaliste.jpg", titre: "Minimaliste", desc: "Simplicité et efficacité" },
        { image: "Assets/Cv/ats-professionnel.jpg", titre: "Professionnel", desc: "Design épuré mettant en valeur votre expérience" },
        { image: "Assets/Cv/ats-fonctionnel.jpg", titre: "Fonctionnel", desc: "Mise en avant des compétences" }
    ],
    moderne: [
        { image: "Assets/Cv/Cv_restaurant.jpg", titre: "🌿 CV Dynamique & Coloré", desc: "Un template pétillant qui met en avant ton profil avec style et bonne humeur ! 🎨✨" },
        { image: "Assets/Cv/moderne-elegant.jpg", titre: "Élégant", desc: "Pour postes à responsabilité" },
        { image: "Assets/Cv/moderne-innovant.jpg", titre: "Innovant", desc: "Mise en page originale" },
        { image: "Assets/Cv/moderne-dynamique.jpg", titre: "Dynamique", desc: "Énergique et moderne" }
    ],
    creatif: [
        { image: "Assets/Cv/creatif-artistique.jpg", titre: "Artistique", desc: "Pour les métiers du design" },
        { image: "Assets/Cv/creatif-original.jpg", titre: "Original", desc: "Hors des sentiers battus" },
        { image: "Assets/Cv/creatif-colore.jpg", titre: "Coloré", desc: "Utilisation audacieuse de la couleur" },
        { image: "Assets/Cv/creatif-portfolio.jpg", titre: "Portfolio", desc: "Espace pour vos réalisations" }
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
        photo_base64: null
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