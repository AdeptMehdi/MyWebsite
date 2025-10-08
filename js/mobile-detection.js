// ===== IMMEDIATE MOBILE DETECTION AND RESPONSIVE FIXES =====
// This script runs immediately to detect mobile devices and apply responsive styles

(function() {
    'use strict';
    
    // Mobile detection function
    function isMobileDevice() {
        return (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1) || 
               /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
               window.innerWidth <= 768;
    }
    
    // Tablet detection function
    function isTabletDevice() {
        return /iPad|Android|Tablet/i.test(navigator.userAgent) && window.innerWidth > 768 && window.innerWidth <= 1024;
    }
    
    // Apply immediate mobile styles
    function applyMobileStyles() {
        const body = document.body;
        const html = document.documentElement;
        
        if (isMobileDevice()) {
            body.classList.add('mobile-device');
            html.classList.add('mobile-device');
            
            // Add mobile-specific meta viewport if not already present
            let viewport = document.querySelector('meta[name="viewport"]');
            if (viewport) {
                viewport.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no');
            }
            
            // Disable particles immediately on mobile
            const particlesContainer = document.getElementById('particles');
            if (particlesContainer) {
                particlesContainer.style.display = 'none';
            }
            
            // Apply immediate mobile CSS variables
            document.documentElement.style.setProperty('--section-padding', '50px 0');
            document.documentElement.style.setProperty('--container-padding', '0 10px');
            
        } else if (isTabletDevice()) {
            body.classList.add('tablet-device');
            html.classList.add('tablet-device');
            
            // Apply tablet-specific styles
            document.documentElement.style.setProperty('--section-padding', '70px 0');
            
        } else {
            body.classList.add('desktop-device');
            html.classList.add('desktop-device');
            
            // Apply desktop-specific styles
            document.documentElement.style.setProperty('--section-padding', '100px 0');
        }
    }
    
    // Apply responsive navigation fixes
    function applyNavigationFixes() {
        if (isMobileDevice()) {
            const navbar = document.querySelector('.navbar');
            const navbarCollapse = document.querySelector('.navbar-collapse');
            
            if (navbar) {
                navbar.classList.add('mobile-nav');
            }
            
            if (navbarCollapse) {
                navbarCollapse.classList.add('mobile-collapse');
            }
        }
    }
    
    // Apply responsive hero section fixes
    function applyHeroFixes() {
        if (isMobileDevice()) {
            const heroSection = document.querySelector('.hero');
            const heroButtons = document.querySelector('.hero-buttons');
            const profileImage = document.querySelector('.profile-image');
            
            if (heroSection) {
                heroSection.classList.add('mobile-hero');
            }
            
            if (heroButtons) {
                heroButtons.classList.add('mobile-buttons');
            }
            
            if (profileImage) {
                profileImage.classList.add('mobile-profile');
            }
        }
    }
    
    // Apply responsive grid fixes
    function applyGridFixes() {
        if (isMobileDevice()) {
            const grids = document.querySelectorAll('.skills-grid, .projects-grid, .about-stats, .expertise-grid');
            grids.forEach(grid => {
                grid.classList.add('mobile-grid');
            });
            
            const progressGrid = document.querySelector('.skills-progress-grid');
            if (progressGrid) {
                progressGrid.classList.add('mobile-progress-grid');
            }
        }
    }
    
    // Handle window resize
    function handleResize() {
        // Debounce resize events
        clearTimeout(window.resizeTimeout);
        window.resizeTimeout = setTimeout(() => {
            applyMobileStyles();
            applyNavigationFixes();
            applyHeroFixes();
            applyGridFixes();
        }, 100);
    }
    
    // Initialize immediately when DOM is ready
    function init() {
        applyMobileStyles();
        
        // Apply fixes when DOM content is loaded
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                applyNavigationFixes();
                applyHeroFixes();
                applyGridFixes();
            });
        } else {
            applyNavigationFixes();
            applyHeroFixes();
            applyGridFixes();
        }
        
        // Handle window resize
        window.addEventListener('resize', handleResize);
        
        // Handle orientation change on mobile devices
        window.addEventListener('orientationchange', () => {
            setTimeout(() => {
                handleResize();
            }, 100);
        });
    }
    
    // Run initialization immediately
    init();
    
})();

// ===== ADDITIONAL MOBILE-SPECIFIC CSS CLASSES =====
// These classes are applied by JavaScript for immediate mobile detection

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

// Inject mobile CSS immediately
const style = document.createElement('style');
style.textContent = mobileCSS;
document.head.appendChild(style);
