// =======================
// MODULE RESPONSIVE UNIFIÉ
// =======================

const ResponsiveManager = (function() {
    // Breakpoints uniques et synchronisés
    const BREAKPOINTS = {
        MOBILE_SMALL: 480,
        MOBILE: 640,
        TABLET_SMALL: 768,
        TABLET: 1024,
        DESKTOP_SMALL: 1280,
        DESKTOP: 1536
    };

    // Noms des breakpoints pour faciliter la lecture
    const BREAKPOINT_NAMES = {
        480: 'mobile-small',
        640: 'mobile',
        768: 'tablet-small',
        1024: 'tablet',
        1280: 'desktop-small',
        1536: 'desktop'
    };

    let currentBreakpoint = null;
    let resizeTimeout = null;
    let listeners = [];

    // Obtenir le breakpoint actuel
    function getCurrentBreakpoint() {
        const width = window.innerWidth;

        if (width < BREAKPOINTS.MOBILE_SMALL) return BREAKPOINTS.MOBILE_SMALL;
        if (width < BREAKPOINTS.MOBILE) return BREAKPOINTS.MOBILE;
        if (width < BREAKPOINTS.TABLET_SMALL) return BREAKPOINTS.TABLET_SMALL;
        if (width < BREAKPOINTS.TABLET) return BREAKPOINTS.TABLET;
        if (width < BREAKPOINTS.DESKTOP_SMALL) return BREAKPOINTS.DESKTOP_SMALL;
        return BREAKPOINTS.DESKTOP;
    }

    // Obtenir le nombre de slides visibles selon la taille
    function getVisibleSlides() {
        const width = window.innerWidth;

        if (width < BREAKPOINTS.MOBILE) return 1;      // < 640px
        if (width < BREAKPOINTS.TABLET_SMALL) return 1; // < 768px
        if (width < BREAKPOINTS.TABLET) return 2;       // < 1024px
        if (width < BREAKPOINTS.DESKTOP_SMALL) return 3; // < 1280px
        return 4;                                        // >= 1280px
    }

    // Obtenir la taille de la marge selon la taille d'écran
    function getCarouselMargin() {
        const width = window.innerWidth;

        if (width < BREAKPOINTS.MOBILE_SMALL) return 10;  // 480px: 10px
        if (width < BREAKPOINTS.MOBILE) return 20;        // 640px: 20px
        if (width < BREAKPOINTS.TABLET_SMALL) return 30;  // 768px: 30px
        if (width < BREAKPOINTS.TABLET) return 40;        // 1024px: 40px
        return 50;                                         // >= 1024px: 50px
    }

    // Obtenir la hauteur des images selon la taille
    function getCarouselImageHeight() {
        const width = window.innerWidth;

        if (width < BREAKPOINTS.MOBILE_SMALL) return 120; // 480px: 120px
        if (width < BREAKPOINTS.MOBILE) return 140;       // 640px: 140px
        if (width < BREAKPOINTS.TABLET_SMALL) return 160; // 768px: 160px
        if (width < BREAKPOINTS.TABLET) return 180;       // 1024px: 180px
        return 220;                                        // >= 1024px: 220px
    }

    // Vérifier si c'est un appareil mobile
    function isMobile() {
        return window.innerWidth < BREAKPOINTS.TABLET_SMALL;
    }

    // Vérifier si c'est une tablette
    function isTablet() {
        return window.innerWidth >= BREAKPOINTS.TABLET_SMALL &&
               window.innerWidth < BREAKPOINTS.DESKTOP_SMALL;
    }

    // Vérifier si c'est un desktop
    function isDesktop() {
        return window.innerWidth >= BREAKPOINTS.DESKTOP_SMALL;
    }

    // Notifier tous les listeners du changement
    function notifyListeners() {
        const newBreakpoint = getCurrentBreakpoint();
        if (newBreakpoint === currentBreakpoint) return;

        currentBreakpoint = newBreakpoint;
        const breakpointName = BREAKPOINT_NAMES[currentBreakpoint];
        const visibleSlides = getVisibleSlides();

        listeners.forEach(listener => {
            listener({
                breakpoint: currentBreakpoint,
                breakpointName: breakpointName,
                visibleSlides: visibleSlides,
                isMobile: isMobile(),
                isTablet: isTablet(),
                isDesktop: isDesktop(),
                width: window.innerWidth,
                height: window.innerHeight
            });
        });
    }

    // Ajouter un listener pour les changements responsive
    function addListener(callback) {
        if (typeof callback === 'function') {
            listeners.push(callback);
            // Appeler immédiatement avec l'état actuel
            callback({
                breakpoint: getCurrentBreakpoint(),
                breakpointName: BREAKPOINT_NAMES[getCurrentBreakpoint()],
                visibleSlides: getVisibleSlides(),
                isMobile: isMobile(),
                isTablet: isTablet(),
                isDesktop: isDesktop(),
                width: window.innerWidth,
                height: window.innerHeight
            });
        }
    }

    // Supprimer un listener
    function removeListener(callback) {
        const index = listeners.indexOf(callback);
        if (index > -1) {
            listeners.splice(index, 1);
        }
    }

    // Initialiser le gestionnaire responsive avec debounce
    function init() {
        // Notifier l'état initial
        notifyListeners();

        // Écouter le redimensionnement avec debounce
        window.addEventListener('resize', function() {
            if (resizeTimeout) clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(function() {
                notifyListeners();
            }, 150); // Debounce de 150ms pour éviter les appels excessifs
        });

        console.log('📱 ResponsiveManager initialisé avec breakpoints:', BREAKPOINTS);
    }

    // API publique
    return {
        init: init,
        getVisibleSlides: getVisibleSlides,
        getCarouselMargin: getCarouselMargin,
        getCarouselImageHeight: getCarouselImageHeight,
        getCurrentBreakpoint: getCurrentBreakpoint,
        getBreakpointName: () => BREAKPOINT_NAMES[getCurrentBreakpoint()],
        isMobile: isMobile,
        isTablet: isTablet,
        isDesktop: isDesktop,
        addListener: addListener,
        removeListener: removeListener,
        BREAKPOINTS: BREAKPOINTS
    };
})();

// Exporter globalement
window.ResponsiveManager = ResponsiveManager;