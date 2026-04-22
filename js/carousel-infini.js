// ==================== CARROUSEL INFINI POUR CV BUILDER ====================

class InfiniteCarousel {
    constructor(containerId, options = {}) {
        this.container = document.getElementById(containerId);
        if (!this.container) {
            console.error(`❌ Conteneur "${containerId}" non trouvé`);
            return;
        }

        this.options = {
            autoPlay: true,
            autoPlaySpeed: 5000,
            visibleSlides: this.getVisibleSlides(),
            gap: 24, // Modifié pour correspondre à votre gap CSS
            ...options
        };

        this.currentIndex = 0;
        this.totalSlides = 0;
        this.isAnimating = false;
        this.autoPlayInterval = null;
        this.originalSlides = [];
        this.allSlides = [];
        this.slideWidth = 0;

        // Attendre que les templates soient chargés
        setTimeout(() => this.init(), 100);
    }



    init() {
        console.log('🔄 Initialisation du carrousel infini...');

        // Récupérer les slides originaux (déjà générés par renderCarousel)
        this.originalSlides = Array.from(this.container.children);
        this.totalSlides = this.originalSlides.length;

        if (this.totalSlides === 0) {
            console.log('⚠️ Aucun template trouvé pour ce carrousel');
            return;
        }

        console.log(`📊 ${this.totalSlides} templates trouvés`);

        // Vider le conteneur
        this.container.innerHTML = '';

        // Créer l'ordre infini
        this.createInfiniteOrder();

        // Configurer le conteneur
        this.setupContainer();

        // Créer la navigation
        this.createNavigation();

        // Utiliser ResponsiveManager pour le nombre de slides
        this.options.visibleSlides = window.ResponsiveManager.getVisibleSlides();
        this.currentIndex = this.options.visibleSlides;
        this.updatePosition(false);

        // Démarrer l'autoplay
        if (this.options.autoPlay) {
            this.startAutoPlay();
        }

        // Événements
        this.bindEvents();

        console.log('✅ Carrousel infini initialisé');
    }

    createInfiniteOrder() {
        // Cloner les derniers slides pour les mettre au début
        for (let i = this.totalSlides - this.options.visibleSlides; i < this.totalSlides; i++) {
            const clone = this.originalSlides[i].cloneNode(true);
            clone.classList.add('clone', 'clone-prev');
            this.container.appendChild(clone);
        }

        // Ajouter les originaux
        this.originalSlides.forEach(slide => {
            const clone = slide.cloneNode(true);
            clone.classList.add('original');
            this.container.appendChild(clone);
        });

        // Cloner les premiers slides pour les mettre à la fin
        for (let i = 0; i < this.options.visibleSlides; i++) {
            const clone = this.originalSlides[i].cloneNode(true);
            clone.classList.add('clone', 'clone-next');
            this.container.appendChild(clone);
        }

        this.allSlides = Array.from(this.container.children);
        console.log(`🔄 ${this.allSlides.length} slides au total (avec clones)`);
    }

    setupContainer() {
        this.container.style.display = 'flex';
        this.container.style.gap = `${this.options.gap}px`;
        this.container.style.transition = 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
        this.container.style.willChange = 'transform';

        this.updateSlideWidth();
    }

    updateSlideWidth() {
        const containerWidth = this.container.parentElement.offsetWidth;
        const totalGap = this.options.gap * (this.options.visibleSlides - 1);
        this.slideWidth = (containerWidth - totalGap) / this.options.visibleSlides;

        this.allSlides.forEach(slide => {
            slide.style.flex = `0 0 ${this.slideWidth}px`;
            slide.style.minWidth = `${this.slideWidth}px`;
        });
    }

    updatePosition(animate = true) {
        if (!animate) {
            this.container.style.transition = 'none';
        }

        const translateX = -(this.currentIndex * (this.slideWidth + this.options.gap));
        this.container.style.transform = `translateX(${translateX}px)`;

        if (!animate) {
            // Forcer le reflow
            this.container.offsetHeight;
            setTimeout(() => {
                this.container.style.transition = 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
            }, 50);
        }

        this.updateActiveIndicators();
    }

    next() {
        if (this.isAnimating) return;
        this.isAnimating = true;

        this.currentIndex++;
        this.updatePosition(true);

        setTimeout(() => {
            // Si on est arrivé aux clones de fin, sauter au début
            if (this.currentIndex >= this.totalSlides + this.options.visibleSlides) {
                this.container.style.transition = 'none';
                this.currentIndex = this.options.visibleSlides;
                this.updatePosition(false);
            }
            this.isAnimating = false;
        }, 500);
    }

    prev() {
        if (this.isAnimating) return;
        this.isAnimating = true;

        this.currentIndex--;
        this.updatePosition(true);

        setTimeout(() => {
            // Si on est arrivé aux clones de début, sauter à la fin
            if (this.currentIndex < this.options.visibleSlides) {
                this.container.style.transition = 'none';
                this.currentIndex = this.totalSlides + this.options.visibleSlides - 1;
                this.updatePosition(false);
            }
            this.isAnimating = false;
        }, 500);
    }

    createNavigation() {
        const carouselWrapper = this.container.parentElement;

        // Supprimer les anciennes flèches si elles existent
        const oldArrows = carouselWrapper.querySelectorAll('.carousel-arrow');
        oldArrows.forEach(arrow => arrow.remove());

        // Créer les nouvelles flèches
        const prevBtn = document.createElement('button');
        prevBtn.className = 'carousel-arrow carousel-prev';
        prevBtn.innerHTML = '<i class="fas fa-chevron-left"></i>';
        prevBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            this.prev();
        });

        const nextBtn = document.createElement('button');
        nextBtn.className = 'carousel-arrow carousel-next';
        nextBtn.innerHTML = '<i class="fas fa-chevron-right"></i>';
        nextBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            this.next();
        });

        carouselWrapper.appendChild(prevBtn);
        carouselWrapper.appendChild(nextBtn);

        // Supprimer les anciens points de navigation
        const oldNav = carouselWrapper.querySelector('.carousel-nav');
        if (oldNav) oldNav.remove();

        // Créer les nouveaux points
        const navContainer = document.createElement('div');
        navContainer.className = 'carousel-nav';

        for (let i = 0; i < this.totalSlides; i++) {
            const dot = document.createElement('div');
            dot.className = 'carousel-dot';
            dot.dataset.index = i;
            dot.addEventListener('click', (e) => {
                e.stopPropagation();
                this.goToSlide(i);
            });
            navContainer.appendChild(dot);
        }

        carouselWrapper.appendChild(navContainer);
        this.navDots = navContainer.children;
    }

    goToSlide(index) {
        if (this.isAnimating) return;

        this.stopAutoPlay();

        this.isAnimating = true;
        this.currentIndex = index + this.options.visibleSlides;
        this.updatePosition(true);

        setTimeout(() => {
            this.isAnimating = false;
            if (this.options.autoPlay) {
                this.startAutoPlay();
            }
        }, 500);
    }

    updateActiveIndicators() {
        if (!this.navDots) return;

        let realIndex = (this.currentIndex - this.options.visibleSlides) % this.totalSlides;
        if (realIndex < 0) realIndex += this.totalSlides;

        Array.from(this.navDots).forEach((dot, index) => {
            dot.classList.toggle('active', index === realIndex);
        });
    }

    getVisibleSlides() {
        // Déléguer à ResponsiveManager
        return window.ResponsiveManager.getVisibleSlides();
    }

    bindEvents() {
        // Utiliser ResponsiveManager au lieu de l'écoute directe
        if (window.ResponsiveManager) {
            this.resizeListener = (data) => {
                const newVisibleSlides = data.visibleSlides;
                if (newVisibleSlides !== this.options.visibleSlides) {
                    this.options.visibleSlides = newVisibleSlides;
                    this.rebuild();
                } else {
                    this.updateSlideWidth();
                    this.updatePosition(false);
                }
            };
            window.ResponsiveManager.addListener(this.resizeListener);
        } else {
            // Fallback si ResponsiveManager n'est pas chargé
            let resizeTimeout;
            window.addEventListener('resize', () => {
                clearTimeout(resizeTimeout);
                resizeTimeout = setTimeout(() => {
                    const newVisibleSlides = this.getVisibleSlides();
                    if (newVisibleSlides !== this.options.visibleSlides) {
                        this.options.visibleSlides = newVisibleSlides;
                        this.rebuild();
                    } else {
                        this.updateSlideWidth();
                        this.updatePosition(false);
                    }
                }, 150);
            });
        }

        // Pause autoplay au survol
        this.container.addEventListener('mouseenter', () => this.stopAutoPlay());
        this.container.addEventListener('mouseleave', () => this.startAutoPlay());
        this.container.addEventListener('touchstart', () => this.stopAutoPlay());
        this.container.addEventListener('touchend', () => this.startAutoPlay());
    }

    rebuild() {
        console.log('🔄 Reconstruction du carrousel...');
        const currentRealIndex = (this.currentIndex - this.options.visibleSlides) % this.totalSlides;

        // Sauvegarder l'index réel
        const savedIndex = currentRealIndex >= 0 ? currentRealIndex : 0;

        // Re-créer l'ordre infini
        this.container.innerHTML = '';
        this.createInfiniteOrder();
        this.setupContainer();

        // Restaurer la position
        this.currentIndex = savedIndex + this.options.visibleSlides;
        this.updatePosition(false);
        this.updateActiveIndicators();
    }

    startAutoPlay() {
        if (!this.options.autoPlay) return;
        this.stopAutoPlay();
        this.autoPlayInterval = setInterval(() => this.next(), this.options.autoPlaySpeed);
    }

    stopAutoPlay() {
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
            this.autoPlayInterval = null;
        }
    }

    // Méthode publique pour détruire le carrousel
    destroy() {
        this.stopAutoPlay();

        if (this.resizeListener && window.ResponsiveManager) {
            window.ResponsiveManager.removeListener(this.resizeListener);
        }

        this.container.innerHTML = '';
        this.originalSlides.forEach(slide => {
            this.container.appendChild(slide.cloneNode(true));
        });
        this.container.style.transform = '';
        this.container.style.transition = '';

        const wrapper = this.container.parentElement;
        const arrows = wrapper.querySelectorAll('.carousel-arrow');
        arrows.forEach(arrow => arrow.remove());
        const nav = wrapper.querySelector('.carousel-nav');
        if (nav) nav.remove();
    }

}

// Export pour utilisation globale
window.InfiniteCarousel = InfiniteCarousel;