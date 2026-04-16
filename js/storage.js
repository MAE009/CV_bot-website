// =======================
// GESTION DU STOCKAGE
// =======================

// Clé de stockage localStorage
const STORAGE_KEY = 'cvData';

// Sauvegarder les données
window.saveCVData = function(data) {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
        return true;
    } catch (error) {
        console.error('Erreur lors de la sauvegarde:', error);
        return false;
    }
};

// Charger les données
window.loadCVData = function() {
    try {
        const savedData = localStorage.getItem(STORAGE_KEY);
        if (savedData) {
            return JSON.parse(savedData);
        }
        return window.DEFAULT_CV_DATA ? JSON.parse(JSON.stringify(window.DEFAULT_CV_DATA)) : null;
    } catch (error) {
        console.error('Erreur lors du chargement:', error);
        return null;
    }
};

// Exporter les données en JSON
window.exportCVDataAsJSON = function(data) {
    const dataStr = JSON.stringify(data, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = "cv_data.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
};

// Effacer les données sauvegardées
window.clearCVData = function() {
    localStorage.removeItem(STORAGE_KEY);
};

// Vérifier si des données existent
window.hasSavedCVData = function() {
    return localStorage.getItem(STORAGE_KEY) !== null;
};