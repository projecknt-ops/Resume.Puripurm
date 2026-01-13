// ============================================
// MAIN JAVASCRIPT - Resume Website
// ============================================

document.addEventListener('DOMContentLoaded', function () {
    // Initialize all functions
    initParticles();
    initNavbar();
    initScrollReveal();
    initSmoothScroll();
    initContactForm();
    initTheme();
    initLoadingScreen();
    initCustomCursor();
    initScrollToTop();
    initTypingEffect();

    // New visual effects
    initScrollProgress();
    initTiltEffect();
    initMagneticButtons();
    initParallaxEffect();
    initAnimatedCounters();
    initRippleEffect();

    // New sections
    initPortfolioFilter();
    initCertCarousel();
    initTestimonials();
});

// ============================================
// THEME & MODE FUNCTIONALITY
// ============================================
function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    if (savedTheme === 'light') {
        document.body.classList.add('light-mode');
        updateThemeIcon(true);
    }
}

window.setThemeMode = function (mode) {
    const body = document.body;
    if (mode === 'light') {
        body.classList.add('light-mode');
        localStorage.setItem('theme', 'light');
    } else {
        body.classList.remove('light-mode');
        localStorage.setItem('theme', 'dark');
    }
    updateThemeIcon(mode === 'light');
}

function updateThemeIcon(isLight) {
    const themeIcon = document.getElementById('theme-icon');
    if (themeIcon) {
        themeIcon.className = isLight ? 'fas fa-sun' : 'fas fa-moon';
    }
}

window.toggleTheme = function () {
    const isLight = document.body.classList.contains('light-mode');
    setThemeMode(isLight ? 'dark' : 'light');
}

// ============================================
// PARTICLES BACKGROUND
// ============================================
function initParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 15 + 's';
        particle.style.animationDuration = (15 + Math.random() * 10) + 's';
        particlesContainer.appendChild(particle);
    }
}

// ============================================
// NAVBAR FUNCTIONALITY
// ============================================
function initNavbar() {
    const navbar = document.querySelector('.navbar');
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Scroll effect
    window.addEventListener('scroll', function () {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        updateActiveNavLink();
    });

    // Mobile toggle
    navToggle.addEventListener('click', function () {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu on link click
    navLinks.forEach(link => {
        link.addEventListener('click', function () {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Update active link based on scroll position
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollY = window.pageYOffset;

        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
}

// ============================================
// SCROLL REVEAL ANIMATION
// ============================================
function initScrollReveal() {
    const revealElements = document.querySelectorAll('.about-content, .timeline-item, .skills-category, .contact-container');

    revealElements.forEach(el => el.classList.add('reveal'));

    const revealOnScroll = function () {
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;

            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll();
}

// ============================================
// SMOOTH SCROLL
// ============================================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ============================================
// CONTACT FORM
// ============================================
function initContactForm() {
    const form = document.getElementById('contact-form');

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        // Show success message
        const btn = form.querySelector('button[type="submit"]');
        const originalText = btn.innerHTML;
        btn.innerHTML = '<i class="fas fa-check"></i> ส่งข้อความสำเร็จ!';
        btn.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';

        setTimeout(() => {
            btn.innerHTML = originalText;
            btn.style.background = '';
            form.reset();
        }, 3000);

        console.log('Form submitted:', { name, email, message });
    });
}

// ============================================
// TYPING EFFECT (Optional Enhancement)
// ============================================
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';

    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// ============================================
// LOADING SCREEN
// ============================================
function initLoadingScreen() {
    const loadingScreen = document.getElementById('loading-screen');

    window.addEventListener('load', function () {
        setTimeout(function () {
            loadingScreen.classList.add('hidden');
        }, 1500);
    });
}

// ============================================
// CUSTOM CURSOR
// ============================================
function initCustomCursor() {
    const cursorDot = document.getElementById('cursor-dot');
    const cursorOutline = document.getElementById('cursor-outline');

    if (!cursorDot || !cursorOutline) return;

    // Move cursor with mouse
    document.addEventListener('mousemove', function (e) {
        cursorDot.style.left = e.clientX + 'px';
        cursorDot.style.top = e.clientY + 'px';
        cursorOutline.style.left = e.clientX + 'px';
        cursorOutline.style.top = e.clientY + 'px';
    });

    // Hover effect on interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .skill-card-flip, .soft-skill-item, .info-item, .stat-card, .hobby-card, .timeline-content, .nav-link');

    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursorOutline.classList.add('hover');
        });
        el.addEventListener('mouseleave', () => {
            cursorOutline.classList.remove('hover');
        });
    });
}

// ============================================
// SCROLL TO TOP
// ============================================
function initScrollToTop() {
    const scrollButton = document.getElementById('scroll-top');

    window.addEventListener('scroll', function () {
        if (window.scrollY > 500) {
            scrollButton.classList.add('visible');
        } else {
            scrollButton.classList.remove('visible');
        }
    });
}

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// ============================================
// TYPING EFFECT
// ============================================
function initTypingEffect() {
    const typingElement = document.getElementById('typing-text');
    if (!typingElement) return;

    const text = '"พร้อมเรียนรู้ และพัฒนาสิ่งใหม่ๆ"';
    let charIndex = 0;

    function typeChar() {
        if (charIndex < text.length) {
            typingElement.textContent += text.charAt(charIndex);
            charIndex++;
            setTimeout(typeChar, 80);
        }
    }

    // Start typing after loading screen
    setTimeout(typeChar, 2000);
}

// ============================================
// SCROLL PROGRESS BAR
// ============================================
function initScrollProgress() {
    const progressBar = document.getElementById('scroll-progress');
    if (!progressBar) return;

    window.addEventListener('scroll', function () {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollPercent = (scrollTop / scrollHeight) * 100;
        progressBar.style.width = scrollPercent + '%';
    });
}

// ============================================
// 3D TILT EFFECT FOR CARDS
// ============================================
function initTiltEffect() {
    const tiltCards = document.querySelectorAll('.skill-card-flip, .stat-card, .hobby-card, .language-card');

    tiltCards.forEach(card => {
        card.addEventListener('mousemove', function (e) {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
        });

        card.addEventListener('mouseleave', function () {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });
}

// ============================================
// MAGNETIC BUTTONS EFFECT
// ============================================
function initMagneticButtons() {
    const magneticBtns = document.querySelectorAll('.btn-primary, .btn-secondary, .btn-download');

    magneticBtns.forEach(btn => {
        btn.addEventListener('mousemove', function (e) {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
        });

        btn.addEventListener('mouseleave', function () {
            btn.style.transform = 'translate(0, 0)';
        });
    });
}

// ============================================
// PARALLAX EFFECT
// ============================================
function initParallaxEffect() {
    const parallaxElements = document.querySelectorAll('.gradient-orb, .shape');

    window.addEventListener('scroll', function () {
        const scrollY = window.pageYOffset;

        parallaxElements.forEach((el, index) => {
            const speed = 0.1 + (index * 0.05);
            el.style.transform = `translateY(${scrollY * speed}px)`;
        });
    });

    // Mouse parallax for orbs
    document.addEventListener('mousemove', function (e) {
        const mouseX = e.clientX / window.innerWidth - 0.5;
        const mouseY = e.clientY / window.innerHeight - 0.5;

        parallaxElements.forEach((el, index) => {
            const speed = 20 + (index * 10);
            el.style.transform = `translate(${mouseX * speed}px, ${mouseY * speed}px)`;
        });
    });
}

// ============================================
// ANIMATED COUNTERS
// ============================================
function initAnimatedCounters() {
    const counters = document.querySelectorAll('.counter');

    const animateCounter = (counter) => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;

        const updateCounter = () => {
            current += step;
            if (current < target) {
                counter.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };

        updateCounter();
    };

    // Intersection Observer for counters
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => observer.observe(counter));
}

// ============================================
// RIPPLE EFFECT ON BUTTONS
// ============================================
function initRippleEffect() {
    const rippleElements = document.querySelectorAll('.btn-primary, .btn-secondary, .social-float-link');

    rippleElements.forEach(el => {
        el.classList.add('ripple');

        el.addEventListener('click', function (e) {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const ripple = document.createElement('span');
            ripple.className = 'ripple-effect';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';

            el.appendChild(ripple);

            setTimeout(() => ripple.remove(), 600);
        });
    });
}

// ============================================
// ENHANCED SCROLL REVEAL WITH STAGGER
// ============================================
function initEnhancedReveal() {
    const staggerContainers = document.querySelectorAll('.skills-grid, .hobbies-container, .soft-skills-list');

    staggerContainers.forEach(container => {
        container.classList.add('stagger-reveal');
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.2 });

    staggerContainers.forEach(container => observer.observe(container));
}

// ============================================
// PORTFOLIO FILTER
// ============================================
function initPortfolioFilter() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');

            const filter = this.getAttribute('data-filter');

            portfolioItems.forEach(item => {
                const category = item.getAttribute('data-category');

                if (filter === 'all' || category === filter) {
                    item.style.display = 'block';
                    item.style.animation = 'fadeInUp 0.5s ease forwards';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
}

// ============================================
// CERTIFICATE CAROUSEL
// ============================================
let certPosition = 0;

function initCertCarousel() {
    // Auto-scroll certificate carousel
    setInterval(() => {
        moveCertCarousel(1);
    }, 5000);
}

function moveCertCarousel(direction) {
    const track = document.getElementById('cert-track');
    if (!track) return;

    const cards = track.querySelectorAll('.certificate-card');
    const cardWidth = cards[0]?.offsetWidth + 25 || 325; // card width + gap
    const maxPosition = (cards.length - 1) * cardWidth;

    certPosition += direction * cardWidth;

    // Loop back
    if (certPosition < 0) certPosition = maxPosition;
    if (certPosition > maxPosition) certPosition = 0;

    track.scrollTo({
        left: certPosition,
        behavior: 'smooth'
    });
}

// ============================================
// TESTIMONIALS SLIDER
// ============================================
let currentTestimonial = 0;

function initTestimonials() {
    // Auto-slide testimonials
    setInterval(() => {
        currentTestimonial = (currentTestimonial + 1) % 2;
        showTestimonial(currentTestimonial);
    }, 6000);
}

function showTestimonial(index) {
    const cards = document.querySelectorAll('.testimonial-card');
    const dots = document.querySelectorAll('.testimonial-dots .dot');

    cards.forEach((card, i) => {
        card.classList.remove('active');
        if (i === index) {
            card.classList.add('active');
        }
    });

    dots.forEach((dot, i) => {
        dot.classList.remove('active');
        if (i === index) {
            dot.classList.add('active');
        }
    });

    currentTestimonial = index;
}

// ============================================
// FADE IN UP ANIMATION
// ============================================
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

// ============================================
// DOWNLOAD CV BUTTON
// ============================================
document.addEventListener('DOMContentLoaded', function () {
    const downloadBtn = document.getElementById('download-cv-btn');

    if (downloadBtn) {
        downloadBtn.addEventListener('click', function (e) {
            // Add downloading class for animation
            this.classList.add('downloading');

            // Remove animation after delay
            setTimeout(() => {
                this.classList.remove('downloading');
            }, 1000);

            // Allow default behavior to open resume.html
        });
    }
});

// ============================================
// ANIMATED SKILL BARS OBSERVER
// ============================================
document.addEventListener('DOMContentLoaded', function () {
    const skillBars = document.querySelectorAll('.skill-bar-animated');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.5 });

    skillBars.forEach(bar => observer.observe(bar));

    // Also animate existing skill-progress bars
    const existingBars = document.querySelectorAll('.skill-progress');
    const barObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Get the target width from inline style
                const targetWidth = entry.target.style.width || '100%';
                // Reset width to 0 then animate to target
                entry.target.style.width = '0';
                entry.target.style.transition = 'width 1.5s ease';
                setTimeout(() => {
                    entry.target.style.width = targetWidth;
                }, 50);
                barObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    existingBars.forEach(bar => barObserver.observe(bar));
});

// ============================================
// HOBBY IMAGE MODAL (Slideshow Version)
// ============================================
let currentModalMedia = [];
let currentMediaIndex = 0;

window.openHobbyModal = function (mediaList) {
    if (typeof mediaList === 'string') mediaList = [mediaList];

    currentModalMedia = mediaList;
    currentMediaIndex = 0;

    console.log("Opening modal slideshow with:", currentModalMedia);

    const modal = document.getElementById('image-modal');
    const container = document.getElementById('modal-images-container');
    const prevBtn = document.querySelector('.modal-nav.prev');
    const nextBtn = document.querySelector('.modal-nav.next');

    if (!modal || !container) return;

    // Clear and build content
    container.innerHTML = '';
    currentModalMedia.forEach((src, index) => {
        const isVideo = src.toLowerCase().endsWith('.mp4');
        let element = isVideo ? document.createElement('video') : document.createElement('img');

        element.src = src;
        element.className = 'modal-content';
        if (isVideo) {
            element.controls = true;
        }
        container.appendChild(element);
    });

    // Toggle navigation buttons visibility
    if (currentModalMedia.length > 1) {
        prevBtn.style.display = 'flex';
        nextBtn.style.display = 'flex';
    } else {
        prevBtn.style.display = 'none';
        nextBtn.style.display = 'none';
    }

    updateModalDisplay();

    modal.style.display = "block";
    modal.offsetHeight; // Force reflow
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function updateModalDisplay() {
    const images = document.querySelectorAll('#modal-images-container .modal-content');
    const captionText = document.getElementById('caption');
    const counter = document.getElementById('media-counter');

    // Hide all, show active
    images.forEach((img, idx) => {
        img.classList.remove('active');
        if (img.tagName === 'VIDEO') img.pause(); // Pause videos on switch
        if (idx === currentMediaIndex) {
            img.classList.add('active');
        }
    });

    // Set caption
    const currentSrc = currentModalMedia[currentMediaIndex].toLowerCase();
    let caption = "กิจกรรมและผลงานของผม";

    if (currentSrc.includes('dog')) caption = "เหล่าน้องหมาสุดที่รักของผม 🐶";
    else if (currentSrc.includes('ผลงาน') || currentSrc.includes('นำเสนอ')) caption = "ผลงานการออกแบบกราฟิก 🎨";
    else if (currentSrc.includes('ball.jpg') || currentSrc.includes('pai.jpg')) caption = "กิจกรรมออกกำลังกายและการพักผ่อน ⚽🏔️";

    captionText.innerHTML = caption;
    counter.innerHTML = `${currentMediaIndex + 1} / ${currentModalMedia.length}`;
}

window.changeModalMedia = function (n) {
    currentMediaIndex += n;

    if (currentMediaIndex >= currentModalMedia.length) {
        currentMediaIndex = 0;
    } else if (currentMediaIndex < 0) {
        currentMediaIndex = currentModalMedia.length - 1;
    }

    updateModalDisplay();
}

window.closeHobbyModal = function () {
    const modal = document.getElementById('image-modal');
    if (!modal) return;

    modal.classList.remove('active');
    setTimeout(() => {
        modal.style.display = "none";
        document.body.style.overflow = 'auto';
        // Stop any playing video
        const videos = document.querySelectorAll('#modal-images-container video');
        videos.forEach(v => v.pause());
    }, 300);
}

// Close modal event listeners
document.addEventListener('DOMContentLoaded', function () {
    const modal = document.getElementById('image-modal');
    const closeBtn = document.querySelector('.close-modal');

    if (closeBtn) {
        closeBtn.onclick = closeHobbyModal;
    }

    if (modal) {
        window.onclick = function (event) {
            if (event.target == modal) {
                closeHobbyModal();
            }
        }
    }
});

