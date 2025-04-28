// Add smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Add animation on scroll
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all sections and animate-on-scroll elements
document.querySelectorAll('section, .animate-on-scroll').forEach(element => {
    observer.observe(element);
});

// Testimonial Carousel
let currentTestimonial = 0;
const testimonials = document.querySelectorAll('.testimonial-card');
const testimonialContainer = document.querySelector('.testimonial-grid');

function showTestimonial(index) {
    testimonials.forEach((testimonial, i) => {
        testimonial.style.display = i === index ? 'block' : 'none';
    });
}

// Auto-rotate testimonials every 5 seconds
setInterval(() => {
    currentTestimonial = (currentTestimonial + 1) % testimonials.length;
    showTestimonial(currentTestimonial);
}, 5000);

// Initialize first testimonial
showTestimonial(0);

// Add click event to testimonial cards
testimonials.forEach((testimonial, index) => {
    testimonial.addEventListener('click', () => {
        currentTestimonial = index;
        showTestimonial(index);
    });
});

// Add scroll progress indicator
const progressBar = document.createElement('div');
progressBar.className = 'progress-bar';
document.body.appendChild(progressBar);

window.addEventListener('scroll', () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    progressBar.style.width = scrolled + '%';
});

// Add back to top button
const backToTopButton = document.createElement('button');
backToTopButton.className = 'back-to-top';
backToTopButton.innerHTML = '↑';
document.body.appendChild(backToTopButton);

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopButton.style.opacity = '1';
        backToTopButton.style.visibility = 'visible';
    } else {
        backToTopButton.style.opacity = '0';
        backToTopButton.style.visibility = 'hidden';
    }
});

backToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Stats Counter Animation
const stats = document.querySelectorAll('.stat-number');
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const target = entry.target;
            const finalValue = parseInt(target.textContent);
            let currentValue = 0;
            const duration = 2000; // 2 seconds
            const increment = finalValue / (duration / 16); // 60fps
            
            const updateCounter = () => {
                currentValue += increment;
                if (currentValue < finalValue) {
                    target.textContent = Math.floor(currentValue);
                    requestAnimationFrame(updateCounter);
                } else {
                    target.textContent = finalValue;
                }
            };
            
            updateCounter();
            statsObserver.unobserve(target);
        }
    });
}, { threshold: 0.5 });

stats.forEach(stat => statsObserver.observe(stat));

// Mobile Menu Toggle
const menuToggle = document.createElement('button');
menuToggle.className = 'menu-toggle';
menuToggle.innerHTML = '☰';
document.body.appendChild(menuToggle);

const nav = document.querySelector('nav');
menuToggle.addEventListener('click', () => {
    nav.classList.toggle('active');
    menuToggle.classList.toggle('active');
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!nav.contains(e.target) && !menuToggle.contains(e.target)) {
        nav.classList.remove('active');
        menuToggle.classList.remove('active');
    }
});

// DateTime Section: Show current date and time
function updateDateTime() {
    console.log('Updating date and time...');
    const now = new Date();
    const dateOptions = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    };
    const timeOptions = {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
    };
    
    const dateStr = now.toLocaleDateString('en-US', dateOptions);
    const timeStr = now.toLocaleTimeString('en-US', timeOptions);
    const el = document.getElementById('datetime-value');
    console.log('Found element:', el);
    if (el) {
        el.textContent = `${dateStr} | ${timeStr}`;
        console.log('Updated date and time:', `${dateStr} | ${timeStr}`);
    } else {
        console.error('Could not find element with ID datetime-value');
    }
}

// Update immediately and then every second
console.log('Initializing date and time updates...');
updateDateTime();
setInterval(updateDateTime, 1000);

// Interactive Feature: Color Mode Toggle
const colorModeBtn = document.createElement('button');
colorModeBtn.textContent = '🌙';  // Simplified text to just the icon
colorModeBtn.style.position = 'fixed';
colorModeBtn.style.bottom = 'calc(100px)';  // Position it above the subscribe button
colorModeBtn.style.left = '20px';
colorModeBtn.style.zIndex = '999';  // Below the nav z-index
colorModeBtn.style.width = '50px';  // Make it circular
colorModeBtn.style.height = '50px';
colorModeBtn.style.borderRadius = '50%';
colorModeBtn.style.padding = '0';
colorModeBtn.style.display = 'flex';
colorModeBtn.style.alignItems = 'center';
colorModeBtn.style.justifyContent = 'center';
colorModeBtn.style.fontSize = '1.5rem';
colorModeBtn.className = 'cta-button';
document.body.appendChild(colorModeBtn);

let darkMode = false;
colorModeBtn.addEventListener('click', () => {
    darkMode = !darkMode;
    if (darkMode) {
        document.documentElement.style.setProperty('--light-bg', '#23272f');
        document.documentElement.style.setProperty('--white', '#23272f');
        document.documentElement.style.setProperty('--text-color', '#f7f9fc');
        document.documentElement.style.setProperty('--card-shadow', '0 8px 16px rgba(0,0,0,0.4)');
        document.documentElement.style.setProperty('--hover-shadow', '0 12px 24px rgba(0,0,0,0.5)');
        colorModeBtn.textContent = '☀️';
    } else {
        document.documentElement.style.setProperty('--light-bg', '#F7F9FC');
        document.documentElement.style.setProperty('--white', '#FFFFFF');
        document.documentElement.style.setProperty('--text-color', '#2C3E50');
        document.documentElement.style.setProperty('--card-shadow', '0 8px 16px rgba(0,0,0,0.1)');
        document.documentElement.style.setProperty('--hover-shadow', '0 12px 24px rgba(0,0,0,0.15)');
        colorModeBtn.textContent = '🌙';
    }
});

// Interactive Feature: Animated Text Shadow on Headings
function animateTextShadow() {
    const headings = document.querySelectorAll('h1, h2, h3');
    let t = Date.now() / 500;
    headings.forEach(h => {
        const x = Math.sin(t) * 4;
        const y = Math.cos(t) * 4;
        h.style.textShadow = `${x}px ${y}px 12px rgba(0,0,0,0.12)`;
    });
    requestAnimationFrame(animateTextShadow);
}
animateTextShadow();

// Dynamic Greeting Message
function updateGreeting() {
    const hour = new Date().getHours();
    const greetingEl = document.getElementById('greeting-message');
    let greeting = '';

    if (hour >= 5 && hour < 12) {
        greeting = 'Good Morning! 🌅';
    } else if (hour >= 12 && hour < 17) {
        greeting = 'Good Afternoon! ☀️';
    } else if (hour >= 17 && hour < 21) {
        greeting = 'Good Evening! 🌆';
    } else {
        greeting = 'Good Night! 🌙';
    }

    if (greetingEl) {
        greetingEl.textContent = greeting;
    }
}

// Update greeting immediately and then every minute
updateGreeting();
setInterval(updateGreeting, 60000);

// Loading Animation
document.addEventListener('DOMContentLoaded', () => {
    const loadingAnimation = document.querySelector('.loading-animation');
    if (loadingAnimation) {
        loadingAnimation.style.opacity = '1';
        setTimeout(() => {
            loadingAnimation.style.opacity = '0';
            setTimeout(() => {
                loadingAnimation.style.display = 'none';
            }, 300);
        }, 1000);
    }
});

// Mobile Menu Toggle
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (mobileMenuToggle && navLinks) {
    mobileMenuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        mobileMenuToggle.classList.toggle('active');
    });
}

// Search Functionality
const searchButton = document.querySelector('.search-button');
const searchOverlay = document.querySelector('.search-overlay');
const searchClose = document.querySelector('.search-close');
const searchInput = document.querySelector('#search-input');

if (searchButton && searchOverlay) {
    searchButton.addEventListener('click', () => {
        searchOverlay.style.display = 'flex';
        searchInput.focus();
    });

    searchClose.addEventListener('click', () => {
        searchOverlay.style.display = 'none';
    });

    searchOverlay.addEventListener('click', (e) => {
        if (e.target === searchOverlay) {
            searchOverlay.style.display = 'none';
        }
    });
}

// Form Validation
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = contactForm.querySelector('input[name="name"]');
        const email = contactForm.querySelector('input[name="email"]');
        const message = contactForm.querySelector('textarea[name="message"]');
        
        let isValid = true;
        
        // Name validation
        if (!name.value.trim()) {
            showError(name, 'Name is required');
            isValid = false;
        } else {
            removeError(name);
        }
        
        // Email validation
        if (!email.value.trim()) {
            showError(email, 'Email is required');
            isValid = false;
        } else if (!isValidEmail(email.value)) {
            showError(email, 'Please enter a valid email');
            isValid = false;
        } else {
            removeError(email);
        }
        
        // Message validation
        if (!message.value.trim()) {
            showError(message, 'Message is required');
            isValid = false;
        } else {
            removeError(message);
        }
        
        if (isValid) {
            // Here you would typically send the form data to a server
            alert('Thank you for your message! We will get back to you soon.');
            contactForm.reset();
        }
    });
}

function showError(input, message) {
    const formGroup = input.parentElement;
    const error = formGroup.querySelector('.error-message') || document.createElement('div');
    error.className = 'error-message';
    error.textContent = message;
    formGroup.appendChild(error);
    input.classList.add('error');
}

function removeError(input) {
    const formGroup = input.parentElement;
    const error = formGroup.querySelector('.error-message');
    if (error) {
        formGroup.removeChild(error);
    }
    input.classList.remove('error');
}

function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Social Share
const shareButton = document.querySelector('.share-button');
if (shareButton) {
    shareButton.addEventListener('click', () => {
        if (navigator.share) {
            navigator.share({
                title: 'Trio Tales: PSA',
                text: 'Check out this amazing family vlog!',
                url: window.location.href
            })
            .catch(error => console.log('Error sharing:', error));
        } else {
            // Fallback for browsers that don't support Web Share API
            const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`;
            window.open(shareUrl, '_blank');
        }
    });
}

// Parallax Scrolling
window.addEventListener('scroll', () => {
    const parallaxElements = document.querySelectorAll('.parallax');
    parallaxElements.forEach(element => {
        const speed = element.dataset.speed || 0.5;
        const yPos = -(window.pageYOffset * speed);
        element.style.transform = `translateY(${yPos}px)`;
    });
});

// Smooth Scroll for Navigation
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

// Ensure Join Our Family button opens in new tab
document.querySelectorAll('.cta-button').forEach(button => {
    if (button.href.includes('youtube.com')) {
        button.target = '_blank';
    }
}); 