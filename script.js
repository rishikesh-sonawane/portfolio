// Navigation scroll effect
const nav = document.querySelector('.nav');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});

// Mobile navigation toggle
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Close mobile nav when clicking a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// Typewriter effect
const roles = [
    'Platform Engineer',
    'DevOps Engineer',
    'AWS Infrastructure Expert',
    'CI/CD Specialist',
    'Terraform Enthusiast'
];

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typewriterElement = document.querySelector('.typewriter');

function typewriter() {
    const currentRole = roles[roleIndex];

    if (isDeleting) {
        typewriterElement.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typewriterElement.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
    }

    let typeSpeed = isDeleting ? 50 : 100;

    if (!isDeleting && charIndex === currentRole.length) {
        typeSpeed = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        typeSpeed = 500;
    }

    setTimeout(typewriter, typeSpeed);
}

typewriter();

// Counter animation for stats
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);

    function update() {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start);
            requestAnimationFrame(update);
        } else {
            element.textContent = target;
        }
    }

    update();
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');

            // Check for counters to animate
            const counters = entry.target.querySelectorAll('[data-count]');
            counters.forEach(counter => {
                const target = parseInt(counter.dataset.count);
                animateCounter(counter, target);
            });
        }
    });
}, observerOptions);

// Observe all fade-in elements
document.querySelectorAll('.fade-in').forEach(el => {
    fadeInObserver.observe(el);
});

// Hero stats counter animation
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counters = entry.target.querySelectorAll('[data-count]');
            counters.forEach(counter => {
                const target = parseInt(counter.dataset.count);
                animateCounter(counter, target);
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) {
    statsObserver.observe(heroStats);
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
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

// Parallax effect for background
window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const bgGlow = document.querySelector('.bg-glow');
    if (bgGlow) {
        bgGlow.style.transform = `translateY(${scrollY * 0.3}px)`;
    }
});

// Make sections visible immediately (remove fade-in for better UX)
// document.querySelectorAll('.section').forEach(section => {
//     section.classList.add('fade-in');
// });

// Observe achievements section
document.querySelectorAll('.achievement-card').forEach(el => {
    el.classList.add('fade-in');
    fadeInObserver.observe(el);
});

// Initial observer for first section
setTimeout(() => {
    fadeInObserver.observe(document.querySelector('.hero'));
}, 100);

// Cursor blink fix for accessibility
document.addEventListener('visibilitychange', () => {
    const cursor = document.querySelector('.cursor');
    if (cursor) {
        if (document.hidden) {
            cursor.style.animation = 'none';
        } else {
            cursor.style.animation = 'blink 1s infinite';
        }
    }
});

// Preload animations
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});