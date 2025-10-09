// ===== IMPROVED MOBILE DETECTION AND RESPONSIVE FIXES =====
// This version waits for DOM readiness to avoid layout jumps or flickering.

(function() {
    'use strict';
    
    // ===== DEVICE DETECTION =====
    function isMobileDevice() {
        return (
            typeof window.orientation !== "undefined" ||
            navigator.userAgent.indexOf('IEMobile') !== -1 ||
            /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
            window.innerWidth <= 768
        );
    }

    function isTabletDevice() {
        return (
            /iPad|Android|Tablet/i.test(navigator.userAgent) &&
            window.innerWidth > 768 &&
            window.innerWidth <= 1024
        );
    }

    // ===== STYLE APPLICATION =====
    function applyMobileStyles() {
        const body = document.body;
        const html = document.documentElement;

        // Remove all previous device classes to avoid duplication
        body.classList.remove('mobile-device', 'tablet-device', 'desktop-device');
        html.classList.remove('mobile-device', 'tablet-device', 'desktop-device');

        if (isMobileDevice()) {
            body.classList.add('mobile-device');
            html.classList.add('mobile-device');

            let viewport = document.querySelector('meta[name="viewport"]');
            if (viewport) {
                viewport.setAttribute(
                    'content',
                    'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no'
                );
            }

            // Hide particles
            const particlesContainer = document.getElementById('particles');
            if (particlesContainer) particlesContainer.style.display = 'none';

            // CSS vars
            document.documentElement.style.setProperty('--section-padding', '50px 0');
            document.documentElement.style.setProperty('--container-padding', '0 10px');

        } else if (isTabletDevice()) {
            body.classList.add('tablet-device');
            html.classList.add('tablet-device');
            document.documentElement.style.setProperty('--section-padding', '70px 0');
        } else {
            body.classList.add('desktop-device');
            html.classList.add('desktop-device');
            document.documentElement.style.setProperty('--section-padding', '100px 0');
        }
    }

    // ===== ELEMENT FIXES =====
    function applyNavigationFixes() {
        if (!isMobileDevice()) return;
        const navbar = document.querySelector('.navbar');
        const navbarCollapse = document.querySelector('.navbar-collapse');
        if (navbar) navbar.classList.add('mobile-nav');
        if (navbarCollapse) navbarCollapse.classList.add('mobile-collapse');
    }

    function applyHeroFixes() {
        if (!isMobileDevice()) return;
        const heroSection = document.querySelector('.hero');
        const heroButtons = document.querySelector('.hero-buttons');
        const profileImage = document.querySelector('.profile-image');
        if (heroSection) heroSection.classList.add('mobile-hero');
        if (heroButtons) heroButtons.classList.add('mobile-buttons');
        if (profileImage) profileImage.classList.add('mobile-profile');
    }

    function applyGridFixes() {
        if (!isMobileDevice()) return;
        const grids = document.querySelectorAll('.skills-grid, .projects-grid, .about-stats, .expertise-grid');
        grids.forEach(grid => grid.classList.add('mobile-grid'));
        const progressGrid = document.querySelector('.skills-progress-grid');
        if (progressGrid) progressGrid.classList.add('mobile-progress-grid');
    }

    // ===== MAIN INITIALIZER =====
    function init() {
        applyMobileStyles();
        applyNavigationFixes();
        applyHeroFixes();
        applyGridFixes();

        // Handle resize and orientation change
        let resizeTimeout;
        const handleResize = () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                applyMobileStyles();
                applyNavigationFixes();
                applyHeroFixes();
                applyGridFixes();
            }, 150);
        };

        window.addEventListener('resize', handleResize);
        window.addEventListener('orientationchange', () => setTimeout(handleResize, 150));
    }

    // ===== DOM READY SAFETY =====
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // ===== INLINE MOBILE CSS (unchanged) =====
    const mobileCSS = `
    .mobile-device .hero-title {
        font-size: 1.6rem !important;
    }

    .mobile-device .hero-subtitle {
        font-size: 1rem !important;
    }

    .mobile-device .profile-image {
        width: 180px !important;
        height: 180px !important;
    }

    .mobile-device .hero-buttons {
        flex-direction: column !important;
        width: 100% !important;
    }

    .mobile-device .hero-buttons .btn {
        width: 100% !important;
    }

    .mobile-device .skills-grid,
    .mobile-device .projects-grid,
    .mobile-device .about-stats,
    .mobile-device .expertise-grid {
        grid-template-columns: 1fr !important;
    }

    .mobile-device .skills-progress-grid {
        grid-template-columns: 1fr !important;
    }

    .mobile-device .section-title {
        font-size: 1.6rem !important;
    }

    .mobile-device .navbar-collapse {
        background: rgba(26, 26, 46, 0.98) !important;
        border-radius: 12px !important;
        margin-top: 10px !important;
        padding: 15px !important;
        border: 1px solid rgba(255, 255, 255, 0.1) !important;
    }

    .mobile-device #particles {
        display: none !important;
    }

    .tablet-device .skills-grid {
        grid-template-columns: repeat(2, 1fr) !important;
    }

    .tablet-device .projects-grid {
        grid-template-columns: repeat(2, 1fr) !important;
    }

    .desktop-device .skills-grid {
        grid-template-columns: repeat(4, 1fr) !important;
    }
    `;

    const style = document.createElement('style');
    style.textContent = mobileCSS;
    document.head.appendChild(style);

})();
