// ===== GLOBAL VARIABLES =====
let isRTL = true;
const typingTexts = {
    fa: [
        'توسعه‌دهنده بک‌اند',
        'متخصص ASP.NET Core',
        '3 سال تجربه در توسعه بک‌اند',
        'علاقه‌مند به یادگیری'
    ],
    en: [
        'Backend Developer',
        'ASP.NET Core Specialist',
        'Learning Enthusiast'
    ]
};

// ===== DOM CONTENT LOADED =====
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    // initPreloader();
    initNavigation();
    initTypingEffect();
    initParticles();
    initScrollAnimations();
    initContactForm();
    initScrollToTop();
    initLanguageToggle();
    initSmoothScrolling();
    initAOS();
    
    // Remove preloader after everything is loaded
    setTimeout(() => {
        hidePreloader();
    }, 2000);
});

// ===== PRELOADER =====
function initPreloader() {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        preloader.style.display = 'flex';
    }
}

function hidePreloader() {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }
}

// ===== NAVIGATION =====
function initNavigation() {
    const navbar = document.getElementById('mainNav');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Update active nav link
        updateActiveNavLink();
    });
    
    // Mobile menu close on link click
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            const navbarCollapse = document.querySelector('.navbar-collapse');
            if (navbarCollapse.classList.contains('show')) {
                const bsCollapse = new bootstrap.Collapse(navbarCollapse);
                bsCollapse.hide();
            }
        });
    });
}

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

// ===== TYPING EFFECT =====
function initTypingEffect() {
    const typingElement = document.getElementById('typingText');
    if (!typingElement) return;
    
    const texts = isRTL ? typingTexts.fa : typingTexts.en;
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;
    
    function typeText() {
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            typingElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            typingElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }
        
        if (!isDeleting && charIndex === currentText.length) {
            typingSpeed = 2000; // Pause at end
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            typingSpeed = 500; // Pause before next text
        }
        
        setTimeout(typeText, typingSpeed);
    }
    
    // Start typing effect
    setTimeout(typeText, 1000);
}

// ===== PARTICLES SYSTEM =====
function initParticles() {
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) return;
    
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        createParticle(particlesContainer);
    }
}

function createParticle(container) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    // Random position
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + '%';
    
    // Random size
    const size = Math.random() * 4 + 2;
    particle.style.width = size + 'px';
    particle.style.height = size + 'px';
    
    // Random animation duration
    particle.style.animationDuration = (Math.random() * 3 + 3) + 's';
    particle.style.animationDelay = Math.random() * 2 + 's';
    
    // Random opacity
    particle.style.opacity = Math.random() * 0.5 + 0.3;
    
    container.appendChild(particle);
    
    // Remove and recreate particle after animation
    setTimeout(() => {
        if (particle.parentNode) {
            particle.parentNode.removeChild(particle);
            createParticle(container);
        }
    }, 8000);
}

// ===== SCROLL ANIMATIONS =====
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.scroll-animate, .scroll-animate-left, .scroll-animate-right, .scroll-animate-scale');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

// ===== CONTACT FORM =====
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const name = formData.get('name') || document.getElementById('name').value;
        const email = formData.get('email') || document.getElementById('email').value;
        const subject = formData.get('subject') || document.getElementById('subject').value;
        const message = formData.get('message') || document.getElementById('message').value;
        
        // Basic validation
        if (!name || !email || !subject || !message) {
            showNotification('لطفاً تمام فیلدها را پر کنید.', 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            showNotification('لطفاً ایمیل معتبر وارد کنید.', 'error');
            return;
        }
        
        // Show loading state
        const submitBtn = contactForm.querySelector('button[type=\"submit\"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class=\"fas fa-spinner fa-spin\"></i> در حال ارسال...';
        submitBtn.disabled = true;
        
        // Simulate form submission (replace with actual API call)
        setTimeout(() => {
            showNotification('پیام شما با موفقیت ارسال شد!', 'success');
            contactForm.reset();
            
            // Reset button
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }, 2000);
    });
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#00b894' : type === 'error' ? '#e17055' : '#6c5ce7'};
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.3);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 5000);
}

// ===== SCROLL TO TOP =====
function initScrollToTop() {
    const scrollToTopBtn = document.getElementById('scrollToTop');
    if (!scrollToTopBtn) return;
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollToTopBtn.classList.add('show');
        } else {
            scrollToTopBtn.classList.remove('show');
        }
    });
    
    // Scroll to top on click
    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ===== LANGUAGE TOGGLE =====
function initLanguageToggle() {
    const langToggle = document.getElementById('langToggle');
    if (!langToggle) return;
    
    langToggle.addEventListener('click', () => {
        toggleLanguage();
    });
}

function toggleLanguage() {
    isRTL = !isRTL;
    const html = document.documentElement;
    const langToggle = document.getElementById('langToggle');
    
    if (isRTL) {
        html.setAttribute('lang', 'fa');
        html.setAttribute('dir', 'rtl');
        langToggle.innerHTML = '<i class=\"fas fa-language\"></i> EN';
        updateContentToFarsi();
    } else {
        html.setAttribute('lang', 'en');
        html.setAttribute('dir', 'ltr');
        langToggle.innerHTML = '<i class=\"fas fa-language\"></i> فا';
        updateContentToEnglish();
    }
    
    // Restart typing effect with new language
    setTimeout(() => {
        initTypingEffect();
    }, 500);
}

function updateContentToFarsi() {
    // Update navigation
    const navItems = {
        'خانه': '#home',
        'درباره من': '#about',
        'مهارت‌ها': '#skills',
        'پروژه‌ها': '#projects',
        'تماس': '#contact'
    };
    
    const navLinks = document.querySelectorAll('.nav-link');
    const navTexts = Object.keys(navItems);
    navLinks.forEach((link, index) => {
        if (navTexts[index]) {
            const icon = link.querySelector('i');
            link.innerHTML = icon.outerHTML + ' ' + navTexts[index];
        }
    });
    
    // Update other content as needed
    updateHeroContent('fa');
    updateSectionTitles('fa');
}

function updateContentToEnglish() {
    // Update navigation
    const navItems = {
        'Home': '#home',
        'About Me': '#about',
        'Skills': '#skills',
        'Projects': '#projects',
        'Contact': '#contact'
    };
    
    const navLinks = document.querySelectorAll('.nav-link');
    const navTexts = Object.keys(navItems);
    navLinks.forEach((link, index) => {
        if (navTexts[index]) {
            const icon = link.querySelector('i');
            link.innerHTML = icon.outerHTML + ' ' + navTexts[index];
        }
    });
    
    // Update other content as needed
    updateHeroContent('en');
    updateSectionTitles('en');
}

function updateHeroContent(lang) {
    const heroTitle = document.querySelector('.hero-title');
    const heroDescription = document.querySelector('.hero-description');
    
    if (lang === 'fa') {
        heroTitle.innerHTML = 'سلام، من <span class=\"highlight\">مهدی</span> هستم';
        heroDescription.textContent = '"کد مثل طنز است. وقتی باید توضیحش بدی، بده."';
    } else {
        heroTitle.innerHTML = 'Hi, I\'m <span class=\"highlight\">Mahdi</span>';
        heroDescription.textContent = '"Code is like humor. When you have to explain it, it\'s bad."';
    }
}

function updateSectionTitles(lang) {
    const titles = {
        fa: {
            about: 'درباره من',
            skills: 'مهارت‌های من',
            projects: 'پروژه‌های برجسته',
            contact: 'تماس با من'
        },
        en: {
            about: 'About Me',
            skills: 'My Skills',
            projects: 'Featured Projects',
            contact: 'Contact Me'
        }
    };
    
    const sectionTitles = document.querySelectorAll('.section-title');
    const titleKeys = Object.keys(titles[lang]);
    
    sectionTitles.forEach((title, index) => {
        if (titleKeys[index]) {
            const icon = title.querySelector('i');
            title.innerHTML = icon.outerHTML + ' ' + titles[lang][titleKeys[index]];
        }
    });
}

// ===== SMOOTH SCROLLING =====
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^=\"#\"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===== AOS INITIALIZATION =====
function initAOS() {
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 1000,
            easing: 'ease-out-cubic',
            once: true,
            offset: 100,
            delay: 100
        });
    }
}

// ===== SKILL BARS ANIMATION =====
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    skillBars.forEach(bar => {
        const progress = bar.getAttribute('data-progress');
        const progressBar = bar.querySelector('.progress-bar');
        
        if (progressBar) {
            progressBar.style.width = progress + '%';
        }
    });
}

// ===== COUNTER ANIMATION =====
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target')) || parseInt(counter.textContent);
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;
        
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counter.textContent = Math.floor(current) + (counter.textContent.includes('+') ? '+' : '');
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target + (counter.textContent.includes('+') ? '+' : '');
            }
        };
        
        updateCounter();
    });
}

// ===== PROJECT FILTER =====
function initProjectFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.getAttribute('data-filter');
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Filter projects
            projectCards.forEach(card => {
                if (filter === 'all' || card.classList.contains(filter)) {
                    card.style.display = 'block';
                    card.classList.add('animate-fadeIn');
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

// ===== LAZY LOADING =====
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.getAttribute('data-src');
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// ===== THEME TOGGLE (if needed) =====
function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    if (!themeToggle) return;
    
    const currentTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', currentTheme);
    
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        // Update toggle icon
        const icon = themeToggle.querySelector('i');
        icon.className = newTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    });
}

// ===== UTILITY FUNCTIONS =====
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// ===== PERFORMANCE OPTIMIZATIONS =====
// Use requestAnimationFrame for smooth animations
function smoothAnimation(callback) {
    requestAnimationFrame(callback);
}

// Optimize scroll events
const optimizedScrollHandler = throttle(() => {
    updateActiveNavLink();
    // Other scroll-based functions
}, 16);

window.addEventListener('scroll', optimizedScrollHandler);

// ===== ERROR HANDLING =====
window.addEventListener('error', function(e) {
    console.error('JavaScript Error:', e.error);
    // You can add error reporting here
});

// ===== RESIZE HANDLER =====
const optimizedResizeHandler = debounce(() => {
    // Handle responsive changes
    if (window.innerWidth < 768) {
        // Mobile optimizations
    } else {
        // Desktop optimizations
    }
}, 250);

window.addEventListener('resize', optimizedResizeHandler);

// ===== EXPORT FUNCTIONS (if using modules) =====
// export { initTypingEffect, initParticles, showNotification };

// ===== ENHANCED ABOUT SECTION ANIMATIONS =====
function initSkillProgressBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    const progressBars = document.querySelectorAll('.progress-fill');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const width = entry.target.getAttribute('data-width');
                if (width) {
                    setTimeout(() => {
                        entry.target.style.width = width + '%';
                    }, 300);
                }
                // Unobserve after animation to prevent re-triggering
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });
    
    skillBars.forEach(bar => observer.observe(bar));
    progressBars.forEach(bar => observer.observe(bar));
}

// ===== ENHANCED PROJECT CARDS INTERACTIONS =====
function initProjectCards() {
    const projectCards = document.querySelectorAll('.project-card.enhanced');
    
    projectCards.forEach(card => {
        const overlay = card.querySelector('.project-overlay');
        const links = card.querySelectorAll('.project-link');
        
        // Add click event to project links
        links.forEach(link => {
            link.addEventListener('click', (e) => {
                e.stopPropagation();
                // Add smooth transition effect
                link.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    link.style.transform = 'scale(1.1)';
                }, 100);
            });
        });
        
        // Add keyboard navigation
        card.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                const firstLink = card.querySelector('.project-link');
                if (firstLink) firstLink.click();
            }
        });
        
        // Add focus management
        card.setAttribute('tabindex', '0');
        card.addEventListener('focus', () => {
            card.style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('blur', () => {
            card.style.transform = 'translateY(0)';
        });
    });
}

// ===== EXPERTISE CARDS ANIMATION =====
function initExpertiseCards() {
    const expertiseCards = document.querySelectorAll('.expertise-card');
    
    expertiseCards.forEach((card, index) => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
        
        // Stagger animation on load
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

// ===== INITIALIZE ENHANCED FEATURES =====
document.addEventListener('DOMContentLoaded', function() {
    // Initialize existing features
    initTypingEffect();
    initParticles();
    initSmoothScrolling();
    initNavbarScroll();
    initLanguageToggle();
    initContactForm();
    initAOS();
    
    // Initialize enhanced features
    initSkillProgressBars();
    initProjectCards();
    initExpertiseCards();
    
    // Set initial state for expertise cards
    const expertiseCards = document.querySelectorAll('.expertise-card');
    expertiseCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'all 0.6s ease';
    });
});
