// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 1000,
    once: false,
    mirror: true,
    offset: 100,
    easing: 'ease-in-out'
});

// Add animation order to skill items
function initSkillAnimations() {
    const skillItems = document.querySelectorAll('.skill-item');
    skillItems.forEach((item, index) => {
        item.style.setProperty('--animation-order', index);
    });
}

// Add animation order to social links
function initSocialAnimations() {
    const socialLinks = document.querySelectorAll('.social-link');
    socialLinks.forEach((link, index) => {
        link.style.setProperty('--animation-order', index);
    });
}

// Smooth scrolling with offset for header
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            const headerOffset = 100;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        });
    });
}

// Active navigation link update with intersection observer
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    const options = {
        threshold: 0.5,
        rootMargin: '-50% 0% -50% 0%'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const currentId = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${currentId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, options);

    sections.forEach(section => observer.observe(section));
}

// Form submission handling with animation
function handleFormSubmission() {
    const form = document.getElementById('contactForm');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Add animation class to form
            form.classList.add('form-submitted');
            
            // Show success message with animation
            const successMessage = document.createElement('div');
            successMessage.className = 'alert alert-success mt-3';
            successMessage.textContent = 'Thank you for your message! I will get back to you soon.';
            successMessage.style.opacity = '0';
            form.appendChild(successMessage);
            
            // Animate success message
            setTimeout(() => {
                successMessage.style.transition = 'opacity 0.5s ease';
                successMessage.style.opacity = '1';
            }, 100);

            // Reset form after delay
            setTimeout(() => {
                form.reset();
                successMessage.style.opacity = '0';
                setTimeout(() => {
                    successMessage.remove();
                    form.classList.remove('form-submitted');
                }, 500);
            }, 3000);
        });
    }
}

// Parallax effect for hero section
function initParallax() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        if (hero) {
            hero.style.backgroundPositionY = scrolled * 0.5 + 'px';
        }
    });
}

// Active section highlighting
const sections = document.querySelectorAll('section[id]');

let highlightTimeout;
window.addEventListener('scroll', () => {
    if (highlightTimeout) {
        window.cancelAnimationFrame(highlightTimeout);
    }

    highlightTimeout = window.requestAnimationFrame(() => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });
    });
});

// Floating company link
const companyLink = document.querySelector('.company-link');
const heroSection = document.querySelector('.hero');
let lastScrollTop = 0;
let ticking = false;

function updateCompanyLinkPosition() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;

    if (scrollTop > heroBottom) {
        if (!companyLink.classList.contains('floating')) {
            companyLink.classList.add('floating');
            companyLink.style.transform = 'translateY(0)';
            companyLink.style.opacity = '0';
            setTimeout(() => {
                companyLink.style.opacity = '1';
                companyLink.style.transform = 'translateY(0)';
            }, 50);
        }
    } else {
        if (companyLink.classList.contains('floating')) {
            companyLink.style.opacity = '0';
            companyLink.style.transform = 'translateY(20px)';
            setTimeout(() => {
                companyLink.classList.remove('floating');
                companyLink.style.opacity = '1';
                companyLink.style.transform = 'translateY(0)';
            }, 300);
        }
    }

    lastScrollTop = scrollTop;
    ticking = false;
}

window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            updateCompanyLinkPosition();
        });
        ticking = true;
    }
});

// Initial check for position
updateCompanyLinkPosition();

// Initialize all functions when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initSkillAnimations();
    initSocialAnimations();
    initSmoothScroll();
    updateActiveNavLink();
    handleFormSubmission();
    initParallax();
});
