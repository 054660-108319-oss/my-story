// ===========================
// Portfolio Website Script
// ===========================

// Language Configuration
const translations = {
    en: {
        'home': 'Home',
        'about': 'About',
        'projects': 'Projects',
        'contact': 'Contact'
    },
    zh: {
        'home': '首頁',
        'about': '關於',
        'projects': '項目',
        'contact': '聯絡'
    }
};

// ===========================
// Theme Management
// ===========================

const THEME_KEY = 'portfolio-theme';
const LANGUAGE_KEY = 'portfolio-language';

// Initialize theme and language on page load
document.addEventListener('DOMContentLoaded', () => {
    initializeTheme();
    initializeLanguage();
    setupEventListeners();
    setupFormHandling();
});

// Initialize Theme
function initializeTheme() {
    const savedTheme = localStorage.getItem(THEME_KEY) || 'light';
    applyTheme(savedTheme);
}

// Apply Theme
function applyTheme(theme) {
    const htmlElement = document.documentElement;
    const body = document.body;
    const themeToggle = document.getElementById('themeToggle');

    if (theme === 'dark') {
        body.classList.add('dark-theme');
        localStorage.setItem(THEME_KEY, 'dark');
        updateThemeIcon('☀️');
    } else {
        body.classList.remove('dark-theme');
        localStorage.setItem(THEME_KEY, 'light');
        updateThemeIcon('🌙');
    }
}

// Update Theme Icon
function updateThemeIcon(icon) {
    const themeIcon = document.querySelector('.theme-icon');
    if (themeIcon) {
        themeIcon.textContent = icon;
    }
}

// Toggle Theme
function toggleTheme() {
    const currentTheme = localStorage.getItem(THEME_KEY) || 'light';
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    applyTheme(newTheme);
}

// ===========================
// Language Management
// ===========================

// Initialize Language
function initializeLanguage() {
    const savedLanguage = localStorage.getItem(LANGUAGE_KEY) || 'en';
    setLanguage(savedLanguage);
}

// Set Language
function setLanguage(lang) {
    const validLanguages = ['en', 'zh'];
    if (!validLanguages.includes(lang)) {
        lang = 'en';
    }

    localStorage.setItem(LANGUAGE_KEY, lang);
    updatePageLanguage(lang);
    updateLanguageButton(lang);
}

// Update Page Language
function updatePageLanguage(lang) {
    // Get all elements with data-en and data-zh attributes
    const translatableElements = document.querySelectorAll('[data-en][data-zh]');

    translatableElements.forEach((element) => {
        const content = lang === 'en' ? element.getAttribute('data-en') : element.getAttribute('data-zh');
        
        // Handle different element types
        if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
            element.placeholder = content;
        } else if (element.tagName === 'LABEL') {
            element.textContent = content;
        } else if (element.tagName === 'BUTTON' && !element.classList.contains('theme-toggle')) {
            element.textContent = content;
        } else {
            element.textContent = content;
        }
    });

    // Update HTML lang attribute
    document.documentElement.lang = lang;
}

// Update Language Button
function updateLanguageButton(lang) {
    const langText = document.querySelector('.lang-text');
    if (langText) {
        langText.textContent = lang === 'en' ? '中文' : 'English';
    }
}

// Toggle Language
function toggleLanguage() {
    const currentLanguage = localStorage.getItem(LANGUAGE_KEY) || 'en';
    const newLanguage = currentLanguage === 'en' ? 'zh' : 'en';
    setLanguage(newLanguage);
}

// ===========================
// Event Listeners Setup
// ===========================

function setupEventListeners() {
    // Theme Toggle Button
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }

    // Language Toggle Button
    const languageToggle = document.getElementById('languageToggle');
    if (languageToggle) {
        languageToggle.addEventListener('click', toggleLanguage);
    }

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#' && document.querySelector(href)) {
                e.preventDefault();
                document.querySelector(href).scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}

// ===========================
// Form Handling
// ===========================

function setupFormHandling() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmit);
    }
}

function handleFormSubmit(e) {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    // Basic validation
    if (!name || !email || !message) {
        showNotification('Please fill in all fields', 'error');
        return;
    }

    // Email validation
    if (!isValidEmail(email)) {
        showNotification('Please enter a valid email', 'error');
        return;
    }

    // Simulate form submission
    const currentLanguage = localStorage.getItem(LANGUAGE_KEY) || 'en';
    const successMessage = currentLanguage === 'en' 
        ? 'Thank you for your message! I will get back to you soon.' 
        : '感謝您的訊息！我會盡快回覆您。';

    showNotification(successMessage, 'success');

    // Reset form
    document.getElementById('contactForm').reset();

    // In a real application, you would send this data to a server
    console.log('Form Data:', { name, email, message });
}

// Email Validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Show Notification
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;

    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        background-color: ${type === 'success' ? '#28a745' : type === 'error' ? '#dc3545' : '#17a2b8'};
        color: white;
        border-radius: 6px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
        z-index: 9999;
        animation: slideIn 0.3s ease;
        max-width: 400px;
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// ===========================
// Animations
// ===========================

const styleSheet = document.createElement('style');
styleSheet.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(styleSheet);

// ===========================
// Scroll Animations
// ===========================

function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    document.querySelectorAll('.project-card, .skill-tag').forEach((element) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(element);
    });
}

document.addEventListener('DOMContentLoaded', setupScrollAnimations);

// ===========================
// Local Storage Management
// ===========================

function getSavedPreferences() {
    return {
        theme: localStorage.getItem(THEME_KEY) || 'light',
        language: localStorage.getItem(LANGUAGE_KEY) || 'en'
    };
}

function clearSavedPreferences() {
    localStorage.removeItem(THEME_KEY);
    localStorage.removeItem(LANGUAGE_KEY);
}

// ===========================
// Keyboard Shortcuts
// ===========================

document.addEventListener('keydown', (e) => {
    // Alt + T to toggle theme
    if (e.altKey && e.key === 't') {
        toggleTheme();
    }
    // Alt + L to toggle language
    if (e.altKey && e.key === 'l') {
        toggleLanguage();
    }
});

console.log('Portfolio Website Loaded');
console.log('Keyboard Shortcuts: Alt+T (toggle theme), Alt+L (toggle language)');