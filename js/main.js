// Main JavaScript - Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Initializing Toya Studio...');
    
    // Initialize GSAP ScrollTrigger and ScrollToPlugin
    if (typeof gsap !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
        console.log('✅ GSAP loaded');
    }

    // Initialize scroll tracking for analytics
    if (typeof initScrollTracking !== 'undefined') {
        initScrollTracking();
    }

    // Initialize all features
    initNavigation();
    console.log('✅ Navigation initialized');
    
    initAnimations();
    console.log('✅ Animations initialized');
    
    initPortfolio();
    console.log('✅ Portfolio initialized');
    
    // Initialize Partners immediately after portfolio
    try {
        initPartners();
        console.log('✅ Partners initialized');
    } catch (error) {
        console.error('❌ Error initializing partners:', error);
    }
    
    initStatsCounter();
    console.log('✅ Stats Counter initialized');
    
    initContactForm();
    console.log('✅ Contact Form initialized');
    
    initPerformanceOptimizations();
    console.log('✅ Performance Optimizations initialized');
    
    initHeroVideo();
    console.log('✅ Hero Video initialized');
    
    initBackToTop();
    console.log('✅ Back to Top initialized');
    
    initAnalyticsTracking();
    console.log('✅ Analytics tracking initialized');
    
    console.log('✅ All features initialized!');
});

// Hero Video Handler
function initHeroVideo() {
    const videoIframe = document.querySelector('.hero__video');
    const videoContainer = document.querySelector('.hero__video-container');
    
    if (videoIframe && videoContainer) {
        console.log('✅ Video elements found');
        
        // Force video to be visible
        videoIframe.style.display = 'block';
        videoIframe.style.opacity = '1';
        videoIframe.style.visibility = 'visible';
        
        // Set iframe attributes
        videoIframe.setAttribute('width', '100%');
        videoIframe.setAttribute('height', '100%');
        
        // Mark as loaded
        videoIframe.addEventListener('load', () => {
            console.log('✅ Video loaded successfully');
            videoContainer.classList.add('loaded');
        });

        // Fallback
        setTimeout(() => {
            videoContainer.classList.add('loaded');
            console.log('✅ Video fallback triggered');
        }, 1000);
    } else {
        console.error('❌ Video elements not found');
    }
}

// Navigation
function initNavigation() {
    const nav = document.getElementById('nav');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav__link');

    // Scroll effect with enhanced shadow
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.scrollY;
        
        if (currentScroll > 100) {
            nav.classList.add('scrolled');
            nav.style.boxShadow = '0 5px 30px rgba(235, 50, 35, 0.15)';
            
            // Hide nav on scroll down, show on scroll up
            if (currentScroll > lastScroll && currentScroll > 500) {
                nav.style.transform = 'translateY(-100%)';
            } else {
                nav.style.transform = 'translateY(0)';
            }
        } else {
            nav.classList.remove('scrolled');
            nav.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.05)';
            nav.style.transform = 'translateY(0)';
        }
        
        lastScroll = currentScroll;
    });

    // Mobile menu toggle with animation
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
        
        // Animate menu items
        if (navMenu.classList.contains('active')) {
            gsap.from('.nav__list li', {
                x: 50,
                opacity: 0,
                stagger: 0.1,
                duration: 0.5,
                ease: 'power4.out'
            });
        }
    });

    // Close menu on link click
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
            
            // Smooth scroll with offset for fixed nav
            e.preventDefault();
            const targetId = link.getAttribute('href');
            if (targetId.startsWith('#')) {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    const offsetTop = targetElement.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Logo animation on hover
    const logo = document.querySelector('.nav__logo-img');
    if (logo) {
        logo.addEventListener('mouseenter', () => {
            gsap.to(logo, {
                rotation: 360,
                duration: 0.6,
                ease: 'power2.out'
            });
        });
    }
}

// Animations
function initAnimations() {
    // Hero title animation with enhanced effects - without opacity
    gsap.from('.hero__title-line', {
        y: 120,
        duration: 1.4,
        stagger: 0.25,
        ease: 'power4.out',
        delay: 0.2,
        clearProps: 'all'
    });

    gsap.from('.hero__subtitle', {
        y: 60,
        duration: 1.2,
        delay: 0.8,
        ease: 'power4.out',
        clearProps: 'all'
    });

    gsap.from('.btn--primary', {
        y: 60,
        scale: 0.9,
        duration: 1,
        delay: 1.1,
        ease: 'back.out(1.7)',
        clearProps: 'all'
    });

    // Hero 3D container animation - without opacity
    gsap.from('.hero__3d', {
        x: 100,
        scale: 0.95,
        duration: 1.4,
        delay: 0.5,
        ease: 'power4.out',
        clearProps: 'all'
    });

    // Logo animation
    gsap.from('.nav__logo-img', {
        scale: 0,
        rotation: -180,
        duration: 1,
        ease: 'elastic.out(1, 0.5)'
    });

    // Section animations - without opacity
    gsap.utils.toArray('.section__title').forEach(title => {
        gsap.from(title, {
            scrollTrigger: {
                trigger: title,
                start: 'top 80%',
            },
            y: 50,
            duration: 1,
            ease: 'power4.out',
            clearProps: 'all'
        });
    });

    // Service cards animation with stagger - without opacity
    gsap.utils.toArray('.service__card').forEach((card, index) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top 85%',
            },
            y: 100,
            scale: 0.95,
            rotation: -5,
            duration: 1,
            delay: index * 0.12,
            ease: 'power4.out',
            clearProps: 'all'
        });
    });

    // Testimonials animation - without opacity
    gsap.utils.toArray('.testimonial__card').forEach((card, index) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top 85%',
            },
            y: 60,
            duration: 0.8,
            delay: index * 0.15,
            ease: 'power4.out',
            clearProps: 'all'
        });
    });

    // Stats animation - without opacity
    gsap.from('.stats__item', {
        scrollTrigger: {
            trigger: '.stats',
            start: 'top 70%',
        },
        y: 50,
        scale: 0.9,
        stagger: 0.15,
        duration: 0.8,
        ease: 'power4.out',
        clearProps: 'all'
    });

    // Client logos floating animation
    gsap.utils.toArray('.client__logo').forEach((logo, index) => {
        gsap.to(logo, {
            y: -10,
            duration: 2 + (index * 0.2),
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
            delay: index * 0.2
        });
    });

    // About image animation - without opacity
    gsap.from('.about__logo-large', {
        scrollTrigger: {
            trigger: '.about__image',
            start: 'top 70%',
        },
        scale: 0.8,
        rotation: -10,
        duration: 1.2,
        ease: 'elastic.out(1, 0.5)',
        clearProps: 'all'
    });

    // Contact form animation - without opacity
    gsap.from('.form__group', {
        scrollTrigger: {
            trigger: '.contact__form',
            start: 'top 80%',
        },
        x: -50,
        stagger: 0.1,
        duration: 0.8,
        ease: 'power4.out',
        clearProps: 'all'
    });
}

// Portfolio - Rebuilt without opacity effects
// This function handles product display with filtering and load more functionality
function initPortfolio() {
    const portfolioGrid = document.getElementById('portfolioGrid');
    const filterBtns = document.querySelectorAll('.filter__btn');
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    let itemsToShow = 12;
    let currentFilter = 'all';

    console.log('Portfolio initialized. Load More Button:', loadMoreBtn);
    console.log('Total projects:', portfolioProjects.length);

    // Initial render
    renderPortfolio('all');

    // Load More functionality
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', () => {
            itemsToShow += 12;
            console.log('Load more clicked. Items to show:', itemsToShow);
            renderPortfolio(currentFilter);
        });
    } else {
        console.error('Load More button not found!');
    }

    // Filter functionality
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Reset items count and apply filter
            const filter = btn.dataset.filter;
            currentFilter = filter;
            itemsToShow = 12;
            renderPortfolio(filter);
        });
    });

    function renderPortfolio(filter) {
        // Filter projects
        const filteredProjects = filter === 'all' 
            ? portfolioProjects 
            : portfolioProjects.filter(project => project.category === filter);

        // Get projects to show
        const projectsToShow = filteredProjects.slice(0, itemsToShow);

        console.log('Rendering:', projectsToShow.length, 'of', filteredProjects.length, 'projects');

        // Clear and render new items with lazy loading
        portfolioGrid.innerHTML = projectsToShow.map(project => `
            <div class="portfolio__item" data-category="${project.category}">
                <img data-src="${project.image}" alt="${project.title}" class="portfolio__image" loading="lazy">
            </div>
        `).join('');

        // Implement Intersection Observer for lazy loading
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        img.classList.add('loaded');
                    }
                    observer.unobserve(img);
                }
            });
        }, {
            rootMargin: '50px'
        });

        // Observe all images
        document.querySelectorAll('.portfolio__image[data-src]').forEach(img => {
            imageObserver.observe(img);
        });

        // Show/hide load more button
        if (loadMoreBtn) {
            if (itemsToShow >= filteredProjects.length) {
                loadMoreBtn.style.display = 'none';
                console.log('Load more button hidden');
            } else {
                loadMoreBtn.style.display = 'inline-block';
                console.log('Load more button shown');
            }
        }

        // Animate new items with GSAP (scale and position only, no opacity)
        if (typeof gsap !== 'undefined') {
            gsap.from('.portfolio__item', {
                scale: 0.9,
                y: 30,
                duration: 0.5,
                stagger: 0.05,
                ease: 'power2.out',
                clearProps: 'all'
            });
        }
    }
}

// Partners Section
function initPartners() {
    console.log('=== Initializing Partners Section ===');
    
    const partnersGrid = document.getElementById('partnersGrid');
    console.log('Partners Grid Element:', partnersGrid);
    
    // Check if portfolioProjects is defined
    if (typeof portfolioProjects === 'undefined') {
        console.error('portfolioProjects is not defined!');
        return;
    }
    
    console.log('Total portfolio projects:', portfolioProjects.length);
    
    // Get all branding images from portfolio data
    const partnerImages = portfolioProjects.filter(project => project.category === 'branding');
    
    console.log('Partner Images (branding category):', partnerImages.length);
    console.log('Partner Images:', partnerImages);
    
    if (!partnersGrid) {
        console.error('Partners Grid element not found!');
        return;
    }
    
    if (partnerImages.length === 0) {
        console.error('No partner images found!');
        return;
    }
    
    // Render partners with lazy loading
    partnersGrid.innerHTML = partnerImages.map(partner => `
        <div class="partner__item">
            <img data-src="${partner.image}" alt="${partner.title}" class="partner__image" loading="lazy">
        </div>
    `).join('');
    
    console.log('Partners HTML rendered. Items count:', partnersGrid.children.length);
    
    // Implement Intersection Observer for lazy loading
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    img.classList.add('loaded');
                }
                observer.unobserve(img);
            }
        });
    }, {
        rootMargin: '50px'
    });

    // Observe all partner images
    document.querySelectorAll('.partner__image[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
    
    // Animate partner items
    if (typeof gsap !== 'undefined') {
        gsap.from('.partner__item', {
            scrollTrigger: {
                trigger: '.clients__logos',
                start: 'top 80%',
            },
            scale: 0.8,
            y: 30,
            duration: 0.6,
            stagger: 0.08,
            ease: 'power4.out',
            clearProps: 'all'
        });
        console.log('Partners animation initialized');
    } else {
        console.warn('GSAP not available for partners animation');
    }
    
    console.log('=== Partners Section Initialized Successfully ===');
}

// Stats Counter - Enhanced
function initStatsCounter() {
    const stats = document.querySelectorAll('.stats__number');
    const bars = document.querySelectorAll('.stats__bar-fill');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Animate numbers
                const statsNumbers = entry.target.querySelectorAll('.stats__number');
                statsNumbers.forEach(stat => {
                    const target = parseInt(stat.dataset.target);
                    animateCounter(stat, target);
                });
                
                // Animate progress bars
                const progressBars = entry.target.querySelectorAll('.stats__bar-fill');
                progressBars.forEach(bar => {
                    const width = bar.dataset.width;
                    setTimeout(() => {
                        bar.style.width = width + '%';
                    }, 300);
                });
                
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    // Observe the stats section
    const statsSection = document.querySelector('.stats');
    if (statsSection) {
        observer.observe(statsSection);
    }

    function animateCounter(element, target) {
        let current = 0;
        const increment = target / 60;
        const duration = 2000;
        const stepTime = duration / 60;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target + '+';
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current);
            }
        }, stepTime);
    }
}

// Contact Form with Firebase Integration
function initContactForm() {
    const form = document.getElementById('contactForm');
    
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
        // Validate form data
        if (!validateFormData(data)) {
            showErrorMessage('❌ Please fill in all required fields correctly.');
            return;
        }
        
        // Disable submit button
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        try {
            // Save to Firebase
            const saveContactForm = (await import('./firebase-config.js')).saveContactForm;
            const result = await saveContactForm(data);
            
            if (result.success) {
                console.log('✅ Form submitted successfully:', data);
                console.log('📝 Saved to Firebase with ID:', result.id);
                
                // Track in Analytics
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'form_submit_success', {
                        event_category: 'engagement',
                        event_label: 'contact_form',
                        service: data.service
                    });
                }
                
                // Show success message with animation
                showSuccessMessage();
                
                // Reset form
                form.reset();
                
                // Remove focused class from all form groups
                form.querySelectorAll('.form__group').forEach(group => {
                    group.classList.remove('focused');
                });
            } else {
                throw new Error(result.error || 'Failed to save form');
            }
        } catch (error) {
            console.error('❌ Error submitting form:', error);
            
            // Track error in Analytics
            if (typeof gtag !== 'undefined') {
                gtag('event', 'form_submit_error', {
                    event_category: 'error',
                    event_label: error.message
                });
            }
            
            // Show error message
            showErrorMessage('❌ Failed to send message. Please try again or contact us directly.');
        } finally {
            // Re-enable submit button
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
    });

    // Floating label effect with animation
    const inputs = form.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', () => {
            if (!input.value) {
                input.parentElement.classList.remove('focused');
            }
            if (input.value) {
                input.classList.add('filled');
            } else {
                input.classList.remove('filled');
            }
        });
        
        // Real-time validation
        input.addEventListener('input', () => {
            validateField(input);
        });
    });
}

// Validate form data
function validateFormData(data) {
    // Check required fields
    if (!data.name || !data.email || !data.service || !data.message) {
        return false;
    }
    
    // Validate name length
    if (data.name.length < 2 || data.name.length > 100) {
        return false;
    }
    
    // Validate email format
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(data.email)) {
        return false;
    }
    
    // Validate message length
    if (data.message.length < 10 || data.message.length > 1000) {
        return false;
    }
    
    return true;
}

// Validate individual field
function validateField(input) {
    const value = input.value.trim();
    const fieldName = input.name;
    
    let isValid = true;
    let errorMessage = '';
    
    switch(fieldName) {
        case 'name':
            if (value.length < 2) {
                isValid = false;
                errorMessage = 'Name must be at least 2 characters';
            } else if (value.length > 100) {
                isValid = false;
                errorMessage = 'Name is too long';
            }
            break;
            
        case 'email':
            const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            if (!emailRegex.test(value)) {
                isValid = false;
                errorMessage = 'Please enter a valid email';
            }
            break;
            
        case 'message':
            if (value.length < 10) {
                isValid = false;
                errorMessage = 'Message must be at least 10 characters';
            } else if (value.length > 1000) {
                isValid = false;
                errorMessage = 'Message is too long (max 1000 characters)';
            }
            break;
            
        case 'service':
            if (!value) {
                isValid = false;
                errorMessage = 'Please select a service';
            }
            break;
    }
    
    // Update field styling
    const formGroup = input.parentElement;
    if (!isValid && value.length > 0) {
        formGroup.classList.add('error');
        
        // Show error message
        let errorElement = formGroup.querySelector('.field-error');
        if (!errorElement) {
            errorElement = document.createElement('span');
            errorElement.className = 'field-error';
            errorElement.style.cssText = `
                display: block;
                color: #ef4444;
                font-size: 0.875rem;
                margin-top: 0.5rem;
            `;
            formGroup.appendChild(errorElement);
        }
        errorElement.textContent = errorMessage;
    } else {
        formGroup.classList.remove('error');
        const errorElement = formGroup.querySelector('.field-error');
        if (errorElement) {
            errorElement.remove();
        }
    }
    
    return isValid;
}

// Show success message
function showSuccessMessage(message) {
    // Create overlay
    const overlay = document.createElement('div');
    overlay.className = 'notification-overlay';
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.6);
        z-index: 9999;
        backdrop-filter: blur(5px);
        opacity: 0;
    `;
    document.body.appendChild(overlay);
    
    // Create success message
    const successMsg = document.createElement('div');
    successMsg.className = 'notification notification--success';
    successMsg.innerHTML = `
        <div style="text-align: center;">
            <div style="font-size: 4rem; margin-bottom: 1rem; animation: checkmark 0.8s ease;">✓</div>
            <h3 style="font-size: 1.8rem; margin-bottom: 1rem; font-weight: 700; color: white;">شكراً لتواصلك معنا!</h3>
            <p style="font-size: 1.1rem; margin-bottom: 0.5rem; opacity: 0.95; color: white;">تم استلام رسالتك بنجاح</p>
            <p style="font-size: 1rem; opacity: 0.9; color: white;">سيتم الرد عليك في أقرب وقت ممكن</p>
            <div style="margin-top: 1.5rem; padding-top: 1.5rem; border-top: 1px solid rgba(255,255,255,0.3);">
                <p style="font-size: 0.9rem; opacity: 0.85; color: white;">📧 sales@toya-studio.com</p>
                <p style="font-size: 0.9rem; opacity: 0.85; color: white;">📱 +20 1116111860</p>
            </div>
        </div>
    `;
    successMsg.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%) scale(0);
        background: linear-gradient(135deg, #10b981, #059669);
        color: white;
        padding: 3rem 3.5rem;
        border-radius: 24px;
        box-shadow: 0 30px 80px rgba(16, 185, 129, 0.6);
        z-index: 10000;
        text-align: center;
        max-width: 550px;
        width: 90%;
    `;
    document.body.appendChild(successMsg);
    
    if (typeof gsap !== 'undefined') {
        // Animate overlay
        gsap.to(overlay, {
            opacity: 1,
            duration: 0.3
        });
        
        // Animate message
        gsap.to(successMsg, {
            scale: 1,
            duration: 0.6,
            ease: 'back.out(1.7)',
            delay: 0.1
        });
        
        // Auto close after 5 seconds
        setTimeout(() => {
            gsap.to(successMsg, {
                scale: 0,
                duration: 0.4,
                ease: 'back.in(1.7)'
            });
            
            gsap.to(overlay, {
                opacity: 0,
                duration: 0.3,
                onComplete: () => {
                    successMsg.remove();
                    overlay.remove();
                }
            });
        }, 5000);
        
        // Click overlay to close
        overlay.addEventListener('click', () => {
            gsap.to(successMsg, {
                scale: 0,
                duration: 0.3
            });
            gsap.to(overlay, {
                opacity: 0,
                duration: 0.3,
                onComplete: () => {
                    successMsg.remove();
                    overlay.remove();
                }
            });
        });
    } else {
        overlay.style.opacity = '1';
        successMsg.style.transform = 'translate(-50%, -50%) scale(1)';
        
        setTimeout(() => {
            successMsg.remove();
            overlay.remove();
        }, 5000);
        
        overlay.addEventListener('click', () => {
            successMsg.remove();
            overlay.remove();
        });
    }
}

// Show error message
function showErrorMessage(message) {
    const errorMsg = document.createElement('div');
    errorMsg.className = 'notification notification--error';
    errorMsg.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%) scale(0);
        background: linear-gradient(135deg, #ef4444, #dc2626);
        color: white;
        padding: 2rem 3rem;
        border-radius: 16px;
        box-shadow: 0 20px 60px rgba(239, 68, 68, 0.4);
        z-index: 10000;
        text-align: center;
        font-weight: 600;
        font-size: 1.1rem;
        max-width: 90%;
    `;
    errorMsg.textContent = message;
    document.body.appendChild(errorMsg);
    
    if (typeof gsap !== 'undefined') {
        gsap.to(errorMsg, {
            scale: 1,
            duration: 0.5,
            ease: 'back.out(1.7)'
        });
        
        setTimeout(() => {
            gsap.to(errorMsg, {
                scale: 0,
                duration: 0.3,
                onComplete: () => errorMsg.remove()
            });
        }, 4000);
    } else {
        errorMsg.style.transform = 'translate(-50%, -50%) scale(1)';
        setTimeout(() => errorMsg.remove(), 4000);
    }
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Lazy loading images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[loading="lazy"]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Performance Optimizations
function initPerformanceOptimizations() {
    // Lazy load images with Intersection Observer
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    }, {
        rootMargin: '50px'
    });

    document.querySelectorAll('img[loading="lazy"]').forEach(img => {
        imageObserver.observe(img);
    });

    // Fade-in elements on scroll
    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                fadeObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    document.querySelectorAll('.fade-in').forEach(el => {
        fadeObserver.observe(el);
    });

    // Debounce resize events
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            if (typeof ScrollTrigger !== 'undefined') {
                ScrollTrigger.refresh();
            }
        }, 250);
    }, { passive: true });

    // Reduce animations on low-end devices
    if (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) {
        document.body.classList.add('reduce-motion');
    }

    // Prefetch important pages
    const prefetchLinks = document.querySelectorAll('a[href^="#"]');
    prefetchLinks.forEach(link => {
        link.addEventListener('mouseenter', () => {
            const target = document.querySelector(link.getAttribute('href'));
            if (target) {
                target.style.willChange = 'transform';
                setTimeout(() => {
                    target.style.willChange = 'auto';
                }, 1000);
            }
        }, { once: true });
    });
}

// Back to Top Button
function initBackToTop() {
    console.log('🔧 Initializing Back to Top...');
    
    const backToTopBtn = document.getElementById('backToTop');
    
    if (!backToTopBtn) {
        console.error('❌ Back to top button not found!');
        return;
    }
    
    console.log('✅ Back to top button found:', backToTopBtn);
    
    // Show/hide button based on scroll position
    function handleScroll() {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('visible');
            console.log('🔝 Back to Top button visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    }
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Check initial scroll position
    handleScroll();
    
    // Scroll to top when clicked
    backToTopBtn.addEventListener('click', (e) => {
        e.preventDefault();
        console.log('🔝 Back to top clicked!');
        
        // Use GSAP if available with faster animation
        if (typeof gsap !== 'undefined' && gsap.to) {
            gsap.to(window, {
                duration: 0.6,
                scrollTo: { y: 0 },
                ease: 'power3.out'
            });
        } else {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
    });
    
    console.log('✅ Back to Top initialized!');
}


// Analytics Tracking Integration
function initAnalyticsTracking() {
    // Track portfolio filter clicks
    const filterBtns = document.querySelectorAll('.filter__btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.dataset.filter;
            if (typeof gtag !== 'undefined') {
                gtag('event', 'portfolio_filter', {
                    event_category: 'engagement',
                    event_label: filter
                });
            }
        });
    });

    // Track load more button
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', () => {
            if (typeof gtag !== 'undefined') {
                gtag('event', 'load_more', {
                    event_category: 'engagement',
                    event_label: 'portfolio'
                });
            }
        });
    }

    // Track contact form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', () => {
            if (typeof gtag !== 'undefined') {
                gtag('event', 'form_submit', {
                    event_category: 'engagement',
                    event_label: 'contact_form'
                });
            }
        });
    }

    // Track social media clicks
    const socialLinks = document.querySelectorAll('.footer__column a[href*="facebook"], .footer__column a[href*="instagram"], .footer__column a[href*="linkedin"], .footer__column a[href*="tiktok"], .footer__column a[href*="wa.me"]');
    socialLinks.forEach(link => {
        link.addEventListener('click', () => {
            const platform = link.href.includes('facebook') ? 'Facebook' :
                           link.href.includes('instagram') ? 'Instagram' :
                           link.href.includes('linkedin') ? 'LinkedIn' :
                           link.href.includes('tiktok') ? 'TikTok' :
                           link.href.includes('wa.me') ? 'WhatsApp' : 'Unknown';
            
            if (typeof gtag !== 'undefined') {
                gtag('event', 'social_click', {
                    event_category: 'engagement',
                    event_label: platform
                });
            }
        });
    });

    // Track contact method clicks
    const contactMethods = document.querySelectorAll('.contact__method');
    contactMethods.forEach(method => {
        method.addEventListener('click', () => {
            const methodType = method.href.includes('mailto') ? 'Email' :
                              method.href.includes('tel') ? 'Phone' :
                              method.href.includes('wa.me') ? 'WhatsApp' : 'Address';
            
            if (typeof gtag !== 'undefined') {
                gtag('event', 'contact_click', {
                    event_category: 'engagement',
                    event_label: methodType
                });
            }
        });
    });

    // Track CTA button clicks
    const ctaButtons = document.querySelectorAll('.btn--primary');
    ctaButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const buttonText = btn.textContent.trim();
            if (typeof gtag !== 'undefined') {
                gtag('event', 'cta_click', {
                    event_category: 'engagement',
                    event_label: buttonText
                });
            }
        });
    });

    // Track scroll depth
    let scrollMarks = [25, 50, 75, 100];
    let trackedMarks = [];

    window.addEventListener('scroll', () => {
        const scrollPercent = Math.round(
            (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
        );

        scrollMarks.forEach(mark => {
            if (scrollPercent >= mark && !trackedMarks.includes(mark)) {
                trackedMarks.push(mark);
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'scroll_depth', {
                        event_category: 'engagement',
                        event_label: mark + '%'
                    });
                }
            }
        });
    }, { passive: true });

    console.log('📊 Analytics tracking initialized');
}
