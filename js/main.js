// ===== GLOBAL VARIABLES =====
let isRTL = true;
const typingTexts = {
    fa: [
        'توسعه‌دهنده بک‌اند',
        'متخصص ASP.NET Core',
        '۳ سال تجربه در توسعه بک‌اند',
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
let typingTimeout;

function initTypingEffect() {
    const typingElement = document.getElementById('typingText');
    if (!typingElement) return;
    
    // Clear any existing timeout
    if (typingTimeout) {
        clearTimeout(typingTimeout);
    }
    
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
        
        typingTimeout = setTimeout(typeText, typingSpeed);
    }
    
    // Start typing effect
    typingTimeout = setTimeout(typeText, 1000);
}

// ===== PARTICLES SYSTEM =====
function initParticles() {
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) return;
    
    // Disable particles on mobile devices (screen width < 768px)
    if (window.innerWidth < 768) {
        particlesContainer.style.display = 'none';
        return;
    }
    
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        createParticle(particlesContainer);
    }
    
    // Re-check on window resize
    window.addEventListener('resize', () => {
        if (window.innerWidth < 768) {
            particlesContainer.style.display = 'none';
        } else {
            particlesContainer.style.display = 'block';
        }
    });
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
    
    // Clear existing typing element content
    const typingElement = document.getElementById('typingText');
    if (typingElement) {
        typingElement.textContent = '';
    }
    
    // Restart typing effect with new language
    setTimeout(() => {
        initTypingEffect();
    }, 300);
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
    
    // Update hero buttons
    const heroButtons = document.querySelectorAll('.hero-buttons .btn');
    if (heroButtons.length >= 2) {
        heroButtons[0].innerHTML = '<i class="fas fa-user"></i> Learn More';
        heroButtons[1].innerHTML = '<i class="fas fa-envelope"></i> Contact Me';
    }
    
    // Update other content as needed
    updateHeroContent('en');
    updateSectionTitles('en');
    updateAboutContent('en');
    updateSkillsContent('en');
    updateContactContent('en');

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
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                const width = entry.target.getAttribute('data-width');
                if (width) {
                    // Add staggered animation delay
                    setTimeout(() => {
                        entry.target.style.width = width + '%';
                        entry.target.classList.add('animate');
                        
                        // Add shimmer effect after progress animation
                        setTimeout(() => {
                            entry.target.style.position = 'relative';
                            entry.target.style.overflow = 'hidden';
                        }, 500);
                    }, index * 200 + 300);
                }
                // Unobserve after animation to prevent re-triggering
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });
    
    // Observe all progress bars
    [...skillBars, ...progressBars].forEach((bar, index) => {
        // Add stagger class for CSS animations
        bar.classList.add(`progress-stagger-${(index % 8) + 1}`);
        observer.observe(bar);
    });
}

// ===== ENHANCED PROGRESS BAR ANIMATIONS =====
function animateProgressBars() {
    const progressBars = document.querySelectorAll('.skill-progress, .progress-fill');
    
    progressBars.forEach((bar, index) => {
        const width = bar.getAttribute('data-width');
        if (width) {
            // Reset width first
            bar.style.width = '0%';
            
            // Animate to target width with delay
            setTimeout(() => {
                bar.style.transition = 'width 2s cubic-bezier(0.4, 0, 0.2, 1)';
                bar.style.width = width + '%';
                
                // Add glow effect
                setTimeout(() => {
                    bar.classList.add('progress-bar-glow');
                }, 1000);
            }, index * 150);
        }
    });
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

// ===== GRADUAL SKILLS LOADING =====
function initGradualSkills() {
    const skillItems = document.querySelectorAll('.skill-progress-item');

    // Hide all skills initially
    skillItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'all 0.6s ease';
    });

    // IntersectionObserver for the skills section
    const skillsSection = document.getElementById('skills');
    if (skillsSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Start gradual reveal
                    revealSkillsGradually(skillItems);
                    observer.disconnect(); // Only animate once
                }
            });
        }, { threshold: 0.3 });

        observer.observe(skillsSection);
    }
}

function revealSkillsGradually(skillItems) {
    skillItems.forEach((item, index) => {
        setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }, index * 300); // 300ms delay between each skill
    });
}

// ===== INITIALIZE ENHANCED FEATURES =====
document.addEventListener('DOMContentLoaded', function() {
    // Initialize existing features
    initTypingEffect();
    initParticles();
    initSmoothScrolling();
    initNavigation();
    initLanguageToggle();
    initContactForm();
    initScrollToTop();
    initAOS();

    // Initialize enhanced features
    initSkillProgressBars();
    initProjectCards();
    initExpertiseCards();
    initGradualSkills();

    // Set initial state for expertise cards
    const expertiseCards = document.querySelectorAll('.expertise-card');
    expertiseCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'all 0.6s ease';
    });
});

// ===== ADDITIONAL CONTENT UPDATE FUNCTIONS =====
function updateAboutContent(lang) {
    const aboutTitle = document.querySelector('#about .section-title');
    const aboutSubtitle = document.querySelector('#about .section-subtitle');
    const aboutDescription = document.querySelector('.about-description');
    const aboutInfo = document.querySelectorAll('.info-item span');
    const statItems = document.querySelectorAll('.stat-item p');
    
    if (lang === 'en') {
        if (aboutTitle) aboutTitle.innerHTML = '<i class="fas fa-user"></i> About Me';
        if (aboutSubtitle) aboutSubtitle.textContent = 'Get to know me better';
        if (aboutDescription) {
            aboutDescription.textContent = 'I am a backend developer specializing in ASP.NET Core and C#, currently studying Computer Software Engineering. My experience includes developing complex web applications with multi-layered architecture, working with various databases, and implementing modern security systems. I am also learning React Native for mobile app development and am passionate about building scalable software.';
        }
        
        // Update info items
        if (aboutInfo.length >= 3) {
            aboutInfo[0].textContent = 'Iran';
            aboutInfo[1].textContent = 'Telegram: @cobramahdi';
            aboutInfo[2].textContent = 'Computer Software Student';
        }
        
        // Update stats
        if (statItems.length >= 3) {
            statItems[0].textContent = 'Years Experience';
            statItems[1].textContent = 'Completed Projects';
            statItems[2].textContent = 'Core Technologies';
        }
    }
}

function updateSkillsContent(lang) {
    const skillsTitle = document.querySelector('#skills .section-title');
    const skillsSubtitle = document.querySelector('#skills .section-subtitle');
    const categoryHeaders = document.querySelectorAll('.category-header h4');
    
    if (lang === 'en') {
        if (skillsTitle) skillsTitle.innerHTML = '<i class="fas fa-cogs"></i> My Skills';
        if (skillsSubtitle) skillsSubtitle.textContent = 'Technologies I work with';
        
        // Update category headers
        if (categoryHeaders.length >= 4) {
            categoryHeaders[0].textContent = 'Backend';
            categoryHeaders[1].textContent = 'Frontend & Mobile';
            categoryHeaders[2].textContent = 'Database & Security';
            categoryHeaders[3].textContent = 'Languages';
        }
    }
}

function updateContactContent(lang) {
    const contactTitle = document.querySelector('#contact .section-title');
    const contactSubtitle = document.querySelector('#contact .section-subtitle');
    const contactItems = document.querySelectorAll('.contact-item h5');
    const formLabels = document.querySelectorAll('.contact-form label');
    const submitBtn = document.querySelector('#contactForm button[type="submit"]');
    
    if (lang === 'en') {
        if (contactTitle) contactTitle.innerHTML = '<i class="fas fa-envelope"></i> Contact Me';
        if (contactSubtitle) contactSubtitle.textContent = 'Let\'s get in touch';
        
        // Update contact items
        if (contactItems.length >= 2) {
            contactItems[0].textContent = 'Email';
            contactItems[1].textContent = 'Location';
        }
        
        // Update form labels
        if (formLabels.length >= 4) {
            formLabels[0].textContent = 'Name';
            formLabels[1].textContent = 'Email';
            formLabels[2].textContent = 'Subject';
            formLabels[3].textContent = 'Message';
        }
        
        if (submitBtn) {
            submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
        }
    }
}

// ===== GITHUB STATS FUNCTIONALITY =====
function initGitHubStats() {
    initContributionGraph();
    initLanguageProgressBars();
    initGitHubCounters();
}

function initContributionGraph() {
    const contributionGraph = document.getElementById('contributionGraph');
    if (!contributionGraph) return;
    
    // Generate contribution squares for the past year (53 weeks * 7 days)
    const totalSquares = 371; // 53 weeks * 7 days
    const today = new Date();
    
    for (let i = 0; i < totalSquares; i++) {
        const square = document.createElement('div');
        square.className = 'contribution-square';
        
        // Generate random contribution level (0-4)
        const level = Math.floor(Math.random() * 5);
        if (level > 0) {
            square.classList.add(`level-${level}`);
        }
        
        // Add date information
        const date = new Date(today);
        date.setDate(date.getDate() - (totalSquares - i));
        square.setAttribute('data-date', date.toISOString().split('T')[0]);
        square.setAttribute('data-level', level);
        
        // Add tooltip functionality
        square.addEventListener('mouseenter', (e) => {
            showContributionTooltip(e, date, level);
        });
        
        square.addEventListener('mouseleave', hideContributionTooltip);
        
        contributionGraph.appendChild(square);
    }
}

function showContributionTooltip(event, date, level) {
    const tooltip = document.createElement('div');
    tooltip.className = 'contribution-tooltip';
    tooltip.innerHTML = `
        <div class="tooltip-date">${date.toLocaleDateString('fa-IR')}</div>
        <div class="tooltip-contributions">${level} مشارکت</div>
    `;
    
    tooltip.style.cssText = `
        position: absolute;
        background: rgba(0, 0, 0, 0.9);
        color: white;
        padding: 8px 12px;
        border-radius: 6px;
        font-size: 0.8rem;
        z-index: 1000;
        pointer-events: none;
        white-space: nowrap;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    `;
    
    document.body.appendChild(tooltip);
    
    const rect = event.target.getBoundingClientRect();
    tooltip.style.left = (rect.left + rect.width / 2 - tooltip.offsetWidth / 2) + 'px';
    tooltip.style.top = (rect.top - tooltip.offsetHeight - 8) + 'px';
    
    // Store reference for cleanup
    event.target._tooltip = tooltip;
}

function hideContributionTooltip(event) {
    if (event.target._tooltip) {
        document.body.removeChild(event.target._tooltip);
        delete event.target._tooltip;
    }
}

function initLanguageProgressBars() {
    const languageProgressBars = document.querySelectorAll('.language-progress');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                const width = entry.target.getAttribute('data-width');
                if (width) {
                    setTimeout(() => {
                        entry.target.style.width = width + '%';
                    }, index * 200 + 500);
                }
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });
    
    languageProgressBars.forEach(bar => observer.observe(bar));
}

function initGitHubCounters() {
    const counters = document.querySelectorAll('.stat-number, .summary-number');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });
    
    counters.forEach(counter => observer.observe(counter));
}

function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target')) || parseInt(element.textContent);
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;
    
    const updateCounter = () => {
        current += increment;
        if (current < target) {
            element.textContent = Math.floor(current);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    };
    
    updateCounter();
}

// ===== GITHUB STATS ENGLISH CONTENT =====
function updateGitHubStatsContent(lang) {
    const githubTitle = document.querySelector('#github-stats .section-title');
    const githubSubtitle = document.querySelector('#github-stats .section-subtitle');
    const githubCardHeaders = document.querySelectorAll('.github-card-header h4');
    const statLabels = document.querySelectorAll('.stat-label');
    const summaryLabels = document.querySelectorAll('.summary-label');
    const activityContent = document.querySelectorAll('.activity-content p');
    const activityTimes = document.querySelectorAll('.activity-time');
    const githubBtn = document.querySelector('.github-profile-btn');

    if (lang === 'en') {
        if (githubTitle) githubTitle.innerHTML = '<i class="fab fa-github"></i> GitHub Stats';
        if (githubSubtitle) githubSubtitle.textContent = 'A look at my GitHub activities';

        // Update card headers
        if (githubCardHeaders.length >= 3) {
            githubCardHeaders[0].innerHTML = '<i class="fas fa-chart-line"></i> Contribution Graph';
            githubCardHeaders[1].innerHTML = '<i class="fas fa-code"></i> Programming Languages';
            githubCardHeaders[2].innerHTML = '<i class="fas fa-history"></i> Recent Activity';
        }

        // Update stat labels
        if (statLabels.length >= 4) {
            statLabels[0].textContent = 'Public Repos';
            statLabels[1].textContent = 'Followers';
            statLabels[2].textContent = 'Following';
            statLabels[3].textContent = 'Stars';
        }

        // Update summary labels
        if (summaryLabels.length >= 2) {
            summaryLabels[0].textContent = 'Contributions in the last year';
            summaryLabels[1].textContent = 'Active weeks';
        }

        // Update activity content
        if (activityContent.length >= 4) {
            activityContent[0].innerHTML = '<strong>Pushed</strong> to ExpenseTracker-ReactNative';
            activityContent[1].innerHTML = '<strong>Starred</strong> microsoft/dotnet';
            activityContent[2].innerHTML = '<strong>Created</strong> BookStore-Asp.netCoreMVC';
            activityContent[3].innerHTML = '<strong>Pushed</strong> to CourseWebapp-With-ASP.NetCoreMVC';
        }

        // Update activity times
        if (activityTimes.length >= 4) {
            activityTimes[0].textContent = '2 days ago';
            activityTimes[1].textContent = '5 days ago';
            activityTimes[2].textContent = '1 week ago';
            activityTimes[3].textContent = '2 weeks ago';
        }

        if (githubBtn) {
            githubBtn.innerHTML = '<i class="fab fa-github"></i> View Full GitHub Profile';
        }
    }
}

// ===== PROJECT MODAL FUNCTIONS =====
function showProjectModal(projectId) {
    const modal = document.getElementById('projectModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalContent = document.getElementById('modalContent');

    const projects = {
        1: {
            title: 'ExpenseTracker - اپلیکیشن مدیریت هزینه‌ها',
            content: `
                <div class="project-modal-details">
                    <h4>🔍 ویژگی‌های کلیدی:</h4>
                    <ul>
                        <li>ثبت و دسته‌بندی هوشمند هزینه‌ها</li>
                        <li>گزارش‌گیری تحلیلی پیشرفته با نمودارها</li>
                        <li>رابط کاربری مدرن و کاربرپسند</li>
                        <li>۴٫۸ امتیاز از کاربران</li>
                        <li>بیش از ۱۰۰۰ کاربر فعال</li>
                    </ul>

                    <h4>💻 تکنولوژی‌های استفاده شده:</h4>
                    <div class="modal-tech-list">
                        <span class="modal-tech-chip"><i class="fab fa-react"></i> React Native</span>
                        <span class="modal-tech-chip"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-plain.svg" alt="TypeScript" class="tech-icon-small"> TypeScript</span>
                        <span class="modal-tech-chip"><i class="fas fa-mobile-alt"></i> AsyncStorage</span>
                    </div>

                    <h4>📱 پلتفرم‌ها:</h4>
                    <p>iOS و Android</p>

                    <h4>🏆 دستاوردها:</h4>
                    <ul>
                        <li>۵ ستاره در گوگل پلی</li>
                        <li>افزایش بهره‌وری کاربران تا ۷۰%</li>
                        <li>رابط کاربری پیشرو در صنعت</li>
                    </ul>

                    <div class="modal-links">
                        <a href="https://github.com/AdeptMehdi/ExpenseTracker-ReactNative-TypeScript" target="_blank" class="modal-btn modal-btn-primary">
                            <i class="fab fa-github"></i> مشاهده سورس کد
                        </a>
                        <a href="#" target="_blank" class="modal-btn modal-btn-secondary">
                            <i class="fab fa-google-play"></i> دریافت از پلی استور
                        </a>
                    </div>
                </div>
            `
        },
        2: {
            title: 'Shortner API - کوتاه‌کننده لینک امن',
            content: `
                <div class="project-modal-details">
                    <h4>🔒 ویژگی‌های امنیتی:</h4>
                    <ul>
                        <li>Rate Limiting پیشرفته</li>
                        <li>اعتبارسنجی URL بصورت Real-time</li>
                        <li>لاگ‌گیری کامل عملیات</li>
                        <li>پوشش تست ۹۹ درصدی</li>
                    </ul>

                    <h4>🧪 تکنولوژی‌های تست:</h4>
                    <div class="modal-tech-list">
                        <span class="modal-tech-chip"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jest/jest-plain.svg" alt="Jest" class="tech-icon-small"> Jest</span>
                        <span class="modal-tech-chip"><i class="fas fa-flask"></i> Supertest</span>
                        <span class="modal-tech-chip"><i class="fas fa-shield-alt"></i> Helmet</span>
                        <span class="modal-tech-chip"><i class="fas fa-cors"></i> CORS</span>
                    </div>

                    <h4>⚡ عملکرد:</h4>
                    <ul>
                        <li>زمان پاسخ کمتر از ۱۰۰ms</li>
                        <li>۸ تست موفق کامل (۱۰۰% pass)</li>
                        <li>آبوت‌گیری روزانه ۱۰ هزار درخواست</li>
                    </ul>

                    <h4>📊 آمار استفاده:</h4>
                    <div class="stat-grid">
                        <div class="stat-item-modal">۱۲۰۰۰۰+ لینک کوتاه شده</div>
                        <div class="stat-item-modal">۹۹.۹% uptime</div>
                        <div class="stat-item-modal">۱۰+ وبسایت ادغام شده</div>
                    </div>

                    <div class="modal-links">
                        <a href="https://github.com/AdeptMehdi/Shortner-With-Expressjs" target="_blank" class="modal-btn modal-btn-primary">
                            <i class="fab fa-github"></i> مشاهده API Docs
                        </a>
                        <button class="modal-btn modal-btn-secondary" onclick="testAPI()">
                            <i class="fas fa-play"></i> تست API
                        </button>
                    </div>
                </div>
            `
        },
        3: {
            title: 'Course WebApp - پلتفرم آموزشی جامع',
            content: `
                <div class="project-modal-details">
                    <h4>🎓 امکانات آموزشی:</h4>
                    <ul>
                        <li>سیستم مدیریت دوره‌های آموزشی</li>
                        <li>ثبت‌نام و پرداخت آنلاین</li>
                        <li>سیستم امتیازدهی و نظرات</li>
                        <li>پیگیری پیشرفت تحصیلی</li>
                        <li>گزارش‌گیری برای اساتید</li>
                    </ul>

                    <h4>🏗️ معماری نرم‌افزار:</h4>
                    <div class="modal-tech-list">
                        <span class="modal-tech-chip"><i class="fab fa-microsoft"></i> ASP.NET Core 6</span>
                        <span class="modal-tech-chip"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-plain.svg" alt="C#" class="tech-icon-small"> C# MVC</span>
                        <span class="modal-tech-chip"><i class="fas fa-database"></i> SQL Server</span>
                        <span class="modal-tech-chip"><i class="fas fa-shield-alt"></i> Identity Framework</span>
                        <span class="modal-tech-chip"><i class="fab fa-bootstrap"></i> Bootstrap 5</span>
                    </div>

                    <h4>👥 مدل‌های کاربر:</h4>
                    <ul>
                        <li>دانشجو - دسترسی به دوره‌ها</li>
                        <li>استاد - مدیریت دوره‌ها و نمرات</li>
                        <li>مدیر - کنترل کامل سیستم</li>
                        <li>ادمین - تنظیمات سیستمی</li>
                    </ul>

                    <h4>📈 آمار و ارقام:</h4>
                    <div class="stat-grid">
                        <div class="stat-item-modal">۵۰۰+ دوره فعال</div>
                        <div class="stat-item-modal">۱۰۰۰۰+ دانش‌آموخته</div>
                        <div class="stat-item-modal">۹۵% رضایت کاربران</div>
                    </div>

                    <h4>🔧 ویژگی‌های فنی:</h4>
                    <ul>
                        <li>Authentication & Authorization</li>
                        <li>RESTful API Design</li>
                        <li>Entity Framework Code First</li>
                        <li>Session Management</li>
                        <li>File Upload System</li>
                    </ul>

                    <div class="modal-links">
                        <a href="https://github.com/AdeptMehdi/CourseWebapp-With-ASP.NetCoreMVC" target="_blank" class="modal-btn modal-btn-primary">
                            <i class="fab fa-github"></i> مشاهده سورس کد
                        </a>
                        <a href="#" target="_blank" class="modal-btn modal-btn-secondary">
                            <i class="fas fa-external-link-alt"></i> دمو زنده
                        </a>
                    </div>
                </div>
            `
        },
        4: {
            title: 'Weather App - اپلیکیشن آب و هوا',
            content: `
                <div class="project-modal-details">
                    <h4>🌤️ ویژگی‌های طراحی:</h4>
                    <ul>
                        <li>Glassmorphism UI Design</li>
                        <li>انیمیشن‌های پویا بر اساس آب و هوا</li>
                        <li>رابط کاربری Responsive</li>
                        <li> predictive data caching</li>
                        <li>Offline mode support</li>
                    </ul>

                    <h4>🎨 تکنولوژی‌های frontend:</h4>
                    <div class="modal-tech-list">
                        <span class="modal-tech-chip"><i class="fab fa-html5"></i> HTML5</span>
                        <span class="modal-tech-chip"><i class="fab fa-css3-alt"></i> CSS3</span>
                        <span class="modal-tech-chip"><i class="fab fa-js-square"></i> JavaScript ES6</span>
                        <span class="modal-tech-chip"><i class="fab fa-bootstrap"></i> Bootstrap 5</span>
                    </div>

                    <h4>🔧 API Backend:</h4>
                    <div class="modal-tech-list">
                        <span class="modal-tech-chip"><i class="fab fa-node-js"></i> Node.js</span>
                        <span class="modal-tech-chip"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" alt="Express" class="tech-icon-small"> Express.js</span>
                        <span class="modal-tech-chip"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jest/jest-plain.svg" alt="Jest" class="tech-icon-small"> Jest Testing</span>
                        <span class="modal-tech-chip"><i class="fas fa-server"></i> REST API</span>
                    </div>

                    <h4>🎯 تجربه کاربری:</h4>
                    <ul>
                        <li>Background animations synced with weather</li>
                        <li>Glass morphism effects</li>
                        <li>Real-time weather updates</li>
                        <li>10+ supported cities</li>
                        <li>100% responsive design</li>
                    </ul>

                    <h4>📱 پشتیبانی دستگاه‌ها:</h4>
                    <div class="device-support">
                        <span class="device-chip"><i class="fas fa-desktop"></i> Desktop</span>
                        <span class="device-chip"><i class="fas fa-tablet-alt"></i> Tablet</span>
                        <span class="device-chip"><i class="fas fa-mobile-alt"></i> Mobile</span>
                    </div>

                    <h4>🌟 ویژگی‌های منحصر به فرد:</h4>
                    <ul>
                        <li>Dynamic CSS gradients</li>
                        <li>Weather-based particles</li>
                        <li>Mock API with realistic data</li>
                        <li>Full Jest test coverage</li>
                        <li>Modern ES6+ features</li>
                    </ul>

                    <div class="modal-links">
                        <a href="https://github.com/AdeptMehdi/Weather-App" target="_blank" class="modal-btn modal-btn-primary">
                            <i class="fab fa-github"></i> مشاهده کد کامل
                        </a>
                        <button class="modal-btn modal-btn-secondary" onclick="openWeatherDemo()">
                            <i class="fas fa-cloud-sun"></i> مشاهده پیش‌نمایش
                        </button>
                    </div>
                </div>
            `
        }
    };

    const project = projects[projectId];
    if (!project) return;

    modalTitle.textContent = project.title;
    modalContent.innerHTML = project.content;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent scrolling
}

function closeProjectModal() {
    const modal = document.getElementById('projectModal');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto'; // Restore scrolling
}

// ===== MODAL HELPER FUNCTIONS =====
function testAPI() {
    alert('در حال باز کردن محیط تست API...\n\nبرای امتحان API می‌توانید از ابزارهایی مانند Postman یا برنامه‌های مشابه استفاده کنید.');
}

function openWeatherDemo() {
    // Create a simple weather demo
    const demoWindow = window.open('', '_blank', 'width=400,height=600');
    demoWindow.document.write(`
        <!DOCTYPE html>
        <html lang="fa" dir="rtl">
        <head>
            <meta charset="UTF-8">
            <title>Weather App Demo</title>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
            <style>
                body { font-family: Arial, sans-serif; margin: 0; padding: 20px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; text-align: center; }
                .weather-card { background: rgba(255,255,255,0.1); backdrop-filter: blur(20px); border-radius: 20px; padding: 20px; margin: 20px; }
                .temp { font-size: 4rem; font-weight: bold; margin: 10px 0; }
                .condition { font-size: 1.5rem; margin-bottom: 10px; }
            </style>
        </head>
        <body>
            <div class="weather-card">
                <h1>تهران</h1>
                <div class="temp">25°C</div>
                <div class="condition">
                    <i class="fas fa-sun"></i> آفتابی
                </div>
                <p>بهترین نمونه از طراحی Glassmorphism</p>
            </div>
        </body>
        </html>
    `);
}

// ===== PROJECT MODAL STYLES =====
document.addEventListener('DOMContentLoaded', function() {
    const modalStyles = document.createElement('style');
    modalStyles.textContent = `
        .project-modal-details h4 {
            color: var(--primary-color);
            margin: 20px 0 10px 0;
            font-size: 1.1rem;
        }

        .modal-tech-list, .device-support {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
            margin: 10px 0 20px 0;
        }

        .modal-tech-chip, .device-chip {
            display: inline-flex;
            align-items: center;
            gap: 6px;
            background: rgba(108, 92, 231, 0.1);
            border: 1px solid rgba(108, 92, 231, 0.2);
            color: var(--text-primary);
            padding: 6px 10px;
            border-radius: 12px;
            font-size: 0.85rem;
            font-weight: 500;
        }

        .tech-icon-small {
            width: 14px;
            height: 14px;
        }

        .stat-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
            gap: 10px;
            margin: 15px 0;
        }

        .stat-item-modal {
            background: rgba(108, 92, 231, 0.1);
            padding: 10px;
            border-radius: 8px;
            text-align: center;
            font-weight: 500;
        }

        .modal-links {
            display: flex;
            gap: 12px;
            margin-top: 25px;
            flex-wrap: wrap;
        }

        .modal-btn {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            padding: 12px 16px;
            border-radius: 12px;
            text-decoration: none;
            font-weight: 600;
            transition: all 0.3s ease;
            border: none;
            cursor: pointer;
            min-width: 120px;
            justify-content: center;
        }

        .modal-btn-primary {
            background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
            color: white;
        }

        .modal-btn-primary:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(108, 92, 231, 0.4);
        }

        .modal-btn-secondary {
            background: rgba(255, 255, 255, 0.1);
            color: white;
            border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .modal-btn-secondary:hover {
            background: rgba(255, 255, 255, 0.2);
        }

        .project-modal-details ul {
            padding-right: 20px;
        }

        .project-modal-details li {
            margin-bottom: 8px;
        }

        @media (max-width: 768px) {
            .modal-links {
                flex-direction: column;
            }

            .modal-btn {
                width: 100%;
            }
        }
    `;
    document.head.appendChild(modalStyles);
});
