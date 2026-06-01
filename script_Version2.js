// ===========================
// Portfolio Website Script
// ===========================

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
    setupScrollAnimations();
});

// Initialize Theme
function initializeTheme() {
    const savedTheme = localStorage.getItem(THEME_KEY) || 'light';
    applyTheme(savedTheme);
}

// Apply Theme
function applyTheme(theme) {
    const body = document.body;

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

    // Apply animations to project cards and skill tags
    document.querySelectorAll('.project-card, .skill-tag').forEach((element) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(element);
    });
}

// ===========================
// Local Storage Management
// ===========================

// Get all saved preferences
function getSavedPreferences() {
    return {
        theme: localStorage.getItem(THEME_KEY) || 'light',
        language: localStorage.getItem(LANGUAGE_KEY) || 'en'
    };
}

// Clear all saved preferences
function clearSavedPreferences() {
    localStorage.removeItem(THEME_KEY);
    localStorage.removeItem(LANGUAGE_KEY);
    console.log('Preferences cleared');
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

// ===========================
// Console Info (for developers)
// ===========================

console.log('✨ Portfolio Website Loaded');
console.log('💡 Keyboard Shortcuts:');
console.log('   Alt + T → Toggle theme');
console.log('   Alt + L → Toggle language');
console.log('📊 Saved Preferences:', getSavedPreferences());