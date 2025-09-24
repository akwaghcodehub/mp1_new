/* Your JS here. */


class PortfolioWebsite {
    constructor() {
        this.navbar = document.getElementById('navbar');
        this.progressFill = document.getElementById('progressFill');
        this.navLinks = document.querySelectorAll('.nav-link');
        this.sections = document.querySelectorAll('section');
        this.carousel = document.getElementById('carousel');
        this.currentSlide = 0;
        this.totalSlides = document.querySelectorAll('.carousel-slide').length;
        
        this.init();
    }
    
    init() {
        this.setupScrollEffects();
        this.setupSmoothScrolling();
        this.setupCarousel();
        this.setupModal();
        this.setupFormSubmission();
        this.startCarouselAutoplay();
    }
    
    
    setupScrollEffects() {
        window.addEventListener('scroll', () => {
            this.updateNavbar();
            this.updateProgressBar();
            this.updateActiveSection();
        });
    }
    
    updateNavbar() {
        const scrolled = window.scrollY > 50;
        this.navbar.classList.toggle('scrolled', scrolled);
    }
    
    updateProgressBar() {
        const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        this.progressFill.style.width = `${Math.min(scrolled, 100)}%`;
    }
    
    updateActiveSection() {
        const navbarHeight = this.navbar.offsetHeight;
        let currentSection = '';
        
        
        if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 10) {
            currentSection = this.sections[this.sections.length - 1].id;
        } else {
            this.sections.forEach(section => {
                const sectionTop = section.offsetTop - navbarHeight - 50;
                const sectionHeight = section.offsetHeight;
                
                if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                    currentSection = section.id;
                }
            });
        }
        
        
        this.navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    }
    
    setupSmoothScrolling() {
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    const navbarHeight = this.navbar.offsetHeight;
                    const targetPosition = targetSection.offsetTop - navbarHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
    
    setupCarousel() {
        this.updateCarousel();
    }
    
    updateCarousel() {
        const slides = document.querySelectorAll('.carousel-slide');
        const indicators = document.querySelectorAll('.indicator');
        
        slides.forEach((slide, index) => {
            slide.classList.toggle('active', index === this.currentSlide);
        });
        
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === this.currentSlide);
        });
    }
    
    nextSlide() {
        this.currentSlide = (this.currentSlide + 1) % this.totalSlides;
        this.updateCarousel();
    }
    
    prevSlide() {
        this.currentSlide = (this.currentSlide - 1 + this.totalSlides) % this.totalSlides;
        this.updateCarousel();
    }
    
    goToSlide(slideIndex) {
        this.currentSlide = slideIndex;
        this.updateCarousel();
    }
    
    startCarouselAutoplay() {
        setInterval(() => {
            this.nextSlide();
        }, 5000); 
    }
    
    setupModal() {
        window.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal')) {
                this.closeModal(e.target.id);
            }
        });
        
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                const openModal = document.querySelector('.modal.show');
                if (openModal) {
                    this.closeModal(openModal.id);
                }
            }
        });
    }
    
    openModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.add('show');
            document.body.style.overflow = 'hidden';
        }
    }
    
    closeModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.remove('show');
            document.body.style.overflow = 'auto';
        }
    }
    
    setupFormSubmission() {
        const contactForm = document.querySelector('.contact-form');
        if (contactForm) {
            contactForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleFormSubmission(e.target);
            });
        }
    }
    
    handleFormSubmission(form) {
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
        console.log('Form submitted:', data);
        
        alert('Thank you for your message! I\'ll get back to you soon.');
        
        form.reset();
        this.closeModal('contact-modal');
    }
}

function changeSlide(direction) {
    if (direction === 1) {
        portfolioSite.nextSlide();
    } else {
        portfolioSite.prevSlide();
    }
}

function currentSlide(slideIndex) {
    portfolioSite.goToSlide(slideIndex - 1);
}

function openModal(modalId) {
    portfolioSite.openModal(modalId);
}

function closeModal(modalId) {
    portfolioSite.closeModal(modalId);
}

window.changeSlide = changeSlide;
window.currentSlide = currentSlide;
window.openModal = openModal;
window.closeModal = closeModal;

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.addEventListener('DOMContentLoaded', () => {
    
    window.portfolioSite = new PortfolioWebsite();
    
    const animatedElements = document.querySelectorAll('.stat-item, .skills-column, .project-card');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    
    const heroElements = document.querySelectorAll('.hero-title, .hero-subtitle, .hero-buttons, .social-icons');
    heroElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            el.style.transition = 'opacity 1s ease, transform 1s ease';
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, index * 200);
    });
});