// ===== ADVANCED ANIMATIONS CONTROLLER =====

class AnimationController {
    constructor() {
        this.animations = new Map();
        this.observers = new Map();
        this.isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        this.init();
    }

    init() {
        this.setupIntersectionObservers();
        this.setupScrollAnimations();
        this.setupHoverAnimations();
        this.setupParallaxEffects();
        this.setupMorphingShapes();
    }

    // ===== INTERSECTION OBSERVERS =====
    setupIntersectionObservers() {
        // Fade in animation observer
        const fadeObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateFadeIn(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        // Scale animation observer
        const scaleObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateScaleIn(entry.target);
                }
            });
        }, {
            threshold: 0.2
        });

        // Slide animation observer
        const slideObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateSlideIn(entry.target);
                }
            });
        }, {
            threshold: 0.15
        });

        // Apply observers to elements
        document.querySelectorAll('[data-animate=\"fade\"]').forEach(el => {
            fadeObserver.observe(el);
        });

        document.querySelectorAll('[data-animate=\"scale\"]').forEach(el => {
            scaleObserver.observe(el);
        });

        document.querySelectorAll('[data-animate=\"slide\"]').forEach(el => {
            slideObserver.observe(el);
        });

        this.observers.set('fade', fadeObserver);
        this.observers.set('scale', scaleObserver);
        this.observers.set('slide', slideObserver);
    }

    // ===== ANIMATION METHODS =====
    animateFadeIn(element) {
        if (this.isReducedMotion) {
            element.style.opacity = '1';
            return;
        }

        const delay = element.dataset.delay || 0;
        const duration = element.dataset.duration || 800;

        setTimeout(() => {
            element.style.transition = `opacity ${duration}ms ease-out, transform ${duration}ms ease-out`;
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, delay);
    }

    animateScaleIn(element) {
        if (this.isReducedMotion) {
            element.style.opacity = '1';
            element.style.transform = 'scale(1)';
            return;
        }

        const delay = element.dataset.delay || 0;
        const duration = element.dataset.duration || 600;

        setTimeout(() => {
            element.style.transition = `opacity ${duration}ms ease-out, transform ${duration}ms cubic-bezier(0.175, 0.885, 0.32, 1.275)`;
            element.style.opacity = '1';
            element.style.transform = 'scale(1)';
        }, delay);
    }

    animateSlideIn(element) {
        if (this.isReducedMotion) {
            element.style.opacity = '1';
            element.style.transform = 'translateX(0)';
            return;
        }

        const direction = element.dataset.direction || 'left';
        const delay = element.dataset.delay || 0;
        const duration = element.dataset.duration || 700;

        setTimeout(() => {
            element.style.transition = `opacity ${duration}ms ease-out, transform ${duration}ms cubic-bezier(0.23, 1, 0.32, 1)`;
            element.style.opacity = '1';
            element.style.transform = 'translateX(0)';
        }, delay);
    }

    // ===== SCROLL ANIMATIONS =====
    setupScrollAnimations() {
        let ticking = false;

        const updateScrollAnimations = () => {
            const scrollY = window.scrollY;
            const windowHeight = window.innerHeight;

            // Parallax backgrounds
            this.updateParallaxElements(scrollY);

            // Floating elements
            this.updateFloatingElements(scrollY);

            // Progress indicators
            this.updateProgressIndicators(scrollY);

            ticking = false;
        };

        const requestTick = () => {
            if (!ticking) {
                requestAnimationFrame(updateScrollAnimations);
                ticking = true;
            }
        };

        window.addEventListener('scroll', requestTick, { passive: true });
    }

    updateParallaxElements(scrollY) {
        const parallaxElements = document.querySelectorAll('[data-parallax]');
        
        parallaxElements.forEach(element => {
            const speed = parseFloat(element.dataset.parallax) || 0.5;
            const yPos = -(scrollY * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    }

    updateFloatingElements(scrollY) {
        const floatingElements = document.querySelectorAll('.floating-element');
        
        floatingElements.forEach((element, index) => {
            const speed = 0.5 + (index * 0.1);
            const yPos = Math.sin(scrollY * 0.01 + index) * 10;
            element.style.transform = `translateY(${yPos}px)`;
        });
    }

    updateProgressIndicators(scrollY) {
        const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = (scrollY / documentHeight) * 100;
        
        const progressBar = document.querySelector('.scroll-progress');
        if (progressBar) {
            progressBar.style.width = `${progress}%`;
        }
    }

    // ===== HOVER ANIMATIONS =====
    setupHoverAnimations() {
        // Magnetic effect for buttons
        this.setupMagneticEffect();
        
        // Tilt effect for cards
        this.setupTiltEffect();
        
        // Glow effect for interactive elements
        this.setupGlowEffect();
    }

    setupMagneticEffect() {
        const magneticElements = document.querySelectorAll('.magnetic');
        
        magneticElements.forEach(element => {
            element.addEventListener('mousemove', (e) => {
                if (this.isReducedMotion) return;
                
                const rect = element.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                
                const strength = 0.3;
                const moveX = x * strength;
                const moveY = y * strength;
                
                element.style.transform = `translate(${moveX}px, ${moveY}px)`;
            });
            
            element.addEventListener('mouseleave', () => {
                element.style.transform = 'translate(0px, 0px)';
            });
        });
    }

    setupTiltEffect() {
        const tiltElements = document.querySelectorAll('.tilt-effect');
        
        tiltElements.forEach(element => {
            element.addEventListener('mousemove', (e) => {
                if (this.isReducedMotion) return;
                
                const rect = element.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / centerY * -10;
                const rotateY = (x - centerX) / centerX * 10;
                
                element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            });
            
            element.addEventListener('mouseleave', () => {
                element.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
            });
        });
    }

    setupGlowEffect() {
        const glowElements = document.querySelectorAll('.glow-effect');
        
        glowElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                if (this.isReducedMotion) return;
                element.classList.add('glowing');
            });
            
            element.addEventListener('mouseleave', () => {
                element.classList.remove('glowing');
            });
        });
    }

    // ===== PARALLAX EFFECTS =====
    setupParallaxEffects() {
        const parallaxSections = document.querySelectorAll('.parallax-section');
        
        parallaxSections.forEach(section => {
            const layers = section.querySelectorAll('.parallax-layer');
            
            layers.forEach((layer, index) => {
                const speed = (index + 1) * 0.2;
                layer.dataset.parallax = speed;
            });
        });
    }

    // ===== MORPHING SHAPES =====
    setupMorphingShapes() {
        const morphingShapes = document.querySelectorAll('.morphing-shape');
        
        morphingShapes.forEach(shape => {
            this.animateMorphingShape(shape);
        });
    }

    animateMorphingShape(shape) {
        if (this.isReducedMotion) return;
        
        const morphStates = [
            'polygon(50% 0%, 0% 100%, 100% 100%)',
            'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
            'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)',
            'polygon(50% 0%, 0% 100%, 100% 100%)'
        ];
        
        let currentState = 0;
        
        const morphInterval = setInterval(() => {
            shape.style.clipPath = morphStates[currentState];
            currentState = (currentState + 1) % morphStates.length;
        }, 3000);
        
        // Store interval for cleanup
        this.animations.set(shape, morphInterval);
    }

    // ===== TEXT ANIMATIONS =====
    animateTextReveal(element, options = {}) {
        if (this.isReducedMotion) {
            element.style.opacity = '1';
            return;
        }
        
        const {
            duration = 1000,
            delay = 0,
            stagger = 50
        } = options;
        
        const text = element.textContent;
        const chars = text.split('');
        
        element.innerHTML = '';
        
        chars.forEach((char, index) => {
            const span = document.createElement('span');
            span.textContent = char === ' ' ? '\\u00A0' : char;
            span.style.opacity = '0';
            span.style.transform = 'translateY(20px)';
            span.style.display = 'inline-block';
            span.style.transition = `opacity ${duration}ms ease-out, transform ${duration}ms ease-out`;
            element.appendChild(span);
            
            setTimeout(() => {
                span.style.opacity = '1';
                span.style.transform = 'translateY(0)';
            }, delay + (index * stagger));
        });
    }

    animateCountUp(element, options = {}) {
        const {
            start = 0,
            end = parseInt(element.textContent),
            duration = 2000,
            easing = 'easeOutQuart'
        } = options;
        
        const startTime = performance.now();
        const suffix = element.textContent.replace(/[0-9]/g, '');
        
        const easingFunctions = {
            linear: t => t,
            easeOutQuart: t => 1 - (--t) * t * t * t,
            easeInOutQuart: t => t < 0.5 ? 8 * t * t * t * t : 1 - 8 * (--t) * t * t * t
        };
        
        const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easedProgress = easingFunctions[easing](progress);
            
            const current = Math.floor(start + (end - start) * easedProgress);
            element.textContent = current + suffix;
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };
        
        requestAnimationFrame(animate);
    }

    // ===== PARTICLE SYSTEM =====
    createParticleSystem(container, options = {}) {
        const {
            count = 50,
            colors = ['#6c5ce7', '#a29bfe', '#fd79a8'],
            sizes = [2, 4, 6],
            speed = 1,
            direction = 'up'
        } = options;
        
        const particles = [];
        
        for (let i = 0; i < count; i++) {
            const particle = this.createParticle(container, colors, sizes, speed, direction);
            particles.push(particle);
        }
        
        return particles;
    }

    createParticle(container, colors, sizes, speed, direction) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random properties
        const color = colors[Math.floor(Math.random() * colors.length)];
        const size = sizes[Math.floor(Math.random() * sizes.length)];
        const x = Math.random() * container.offsetWidth;
        const y = Math.random() * container.offsetHeight;
        
        // Style particle
        particle.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: ${color};
            border-radius: 50%;
            left: ${x}px;
            top: ${y}px;
            pointer-events: none;
            opacity: ${Math.random() * 0.5 + 0.3};
        `;
        
        container.appendChild(particle);
        
        // Animate particle
        this.animateParticle(particle, container, speed, direction);
        
        return particle;
    }

    animateParticle(particle, container, speed, direction) {
        if (this.isReducedMotion) return;
        
        let x = parseFloat(particle.style.left);
        let y = parseFloat(particle.style.top);
        
        const animate = () => {
            // Update position based on direction
            switch (direction) {
                case 'up':
                    y -= speed;
                    break;
                case 'down':
                    y += speed;
                    break;
                case 'left':
                    x -= speed;
                    break;
                case 'right':
                    x += speed;
                    break;
                case 'random':
                    x += (Math.random() - 0.5) * speed * 2;
                    y += (Math.random() - 0.5) * speed * 2;
                    break;
            }
            
            // Reset position if out of bounds
            if (y < -10) y = container.offsetHeight + 10;
            if (y > container.offsetHeight + 10) y = -10;
            if (x < -10) x = container.offsetWidth + 10;
            if (x > container.offsetWidth + 10) x = -10;
            
            particle.style.left = x + 'px';
            particle.style.top = y + 'px';
            
            requestAnimationFrame(animate);
        };
        
        animate();
    }

    // ===== CLEANUP =====
    destroy() {
        // Clear all intervals
        this.animations.forEach(animation => {
            if (typeof animation === 'number') {
                clearInterval(animation);
            }
        });
        
        // Disconnect observers
        this.observers.forEach(observer => {
            observer.disconnect();
        });
        
        // Clear maps
        this.animations.clear();
        this.observers.clear();
    }
}

// ===== SPECIFIC ANIMATION FUNCTIONS =====

// Loading animation
function showLoadingAnimation(element) {
    element.innerHTML = `
        <div class="loading-animation">
            <div class="loading-spinner"></div>
            <div class="loading-text">Loading<span class="loading-dots"></span></div>
        </div>
    `;
}

// Success animation
function showSuccessAnimation(element, message = 'Success!') {
    element.innerHTML = `
        <div class="success-animation">
            <div class="success-icon">
                <i class="fas fa-check"></i>
            </div>
            <div class="success-text">${message}</div>
        </div>
    `;
    
    // Add animation classes
    setTimeout(() => {
        element.querySelector('.success-icon').classList.add('animate-scaleInBounce');
        element.querySelector('.success-text').classList.add('animate-fadeInUp');
    }, 100);
}

// Error animation
function showErrorAnimation(element, message = 'Error occurred!') {
    element.innerHTML = `
        <div class="error-animation">
            <div class="error-icon">
                <i class="fas fa-times"></i>
            </div>
            <div class="error-text">${message}</div>
        </div>
    `;
    
    // Add shake animation
    element.classList.add('animate-shake');
    setTimeout(() => {
        element.classList.remove('animate-shake');
    }, 1000);
}

// Stagger animation for lists
function staggerAnimation(elements, animationClass = 'animate-fadeInUp', delay = 100) {
    elements.forEach((element, index) => {
        setTimeout(() => {
            element.classList.add(animationClass);
        }, index * delay);
    });
}

// Initialize animation controller when DOM is loaded
let animationController;

document.addEventListener('DOMContentLoaded', () => {
    animationController = new AnimationController();
    
    // Add initial animation states
    document.querySelectorAll('[data-animate]').forEach(element => {
        const animationType = element.dataset.animate;
        
        switch (animationType) {
            case 'fade':
                element.style.opacity = '0';
                element.style.transform = 'translateY(30px)';
                break;
            case 'scale':
                element.style.opacity = '0';
                element.style.transform = 'scale(0.8)';
                break;
            case 'slide':
                element.style.opacity = '0';
                const direction = element.dataset.direction || 'left';
                const translateX = direction === 'left' ? '-50px' : '50px';
                element.style.transform = `translateX(${translateX})`;
                break;
        }
    });
});

// Cleanup on page unload
window.addEventListener('beforeunload', () => {
    if (animationController) {
        animationController.destroy();
    }
});

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        AnimationController,
        showLoadingAnimation,
        showSuccessAnimation,
        showErrorAnimation,
        staggerAnimation
    };
}
