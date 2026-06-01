// ===========================
// Portfolio Website Script
// ===========================

const THEME_KEY = 'portfolio-theme';
const LANGUAGE_KEY = 'portfolio-language';

// Initialize everything on page load
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Page loaded, initializing...');
    initializeTheme();
    initializeLanguage();
    setupEventListeners();
    setupScrollAnimations();
    updateActiveNavLink();
    console.log('✅ Initialization complete');
});

// ===========================
// Theme Management
// ===========================

function initializeTheme() {
    const savedTheme = localStorage.getItem(THEME_KEY) || 'light';
    console.log('📦 Loaded theme from storage:', savedTheme);
    applyTheme(savedTheme);
}

function applyTheme(theme) {
    const body = document.body;
    console.log('🎨 Applying theme:', theme);

    if (theme === 'dark') {
        body.classList.add('dark-theme');
        localStorage.setItem(THEME_KEY, 'dark');
        updateThemeIcon('☀️');
        console.log('✨ Dark theme applied');
    } else {
        body.classList.remove('dark-theme');
        localStorage.setItem(THEME_KEY, 'light');
        updateThemeIcon('🌙');
        console.log('✨ Light theme applied');
    }
}

function updateThemeIcon(icon) {
    const themeIcon = document.querySelector('.theme-icon');
    if (themeIcon) {
        themeIcon.textContent = icon;
        console.log('🔄 Theme icon updated:', icon);
    }
}

function toggleTheme() {
    const currentTheme = localStorage.getItem(THEME_KEY) || 'light';
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    console.log('🔀 Toggling theme from', currentTheme, 'to', newTheme);
    applyTheme(newTheme);
}

// ===========================
// Language Management
// ===========================

function initializeLanguage() {
    const savedLanguage = localStorage.getItem(LANGUAGE_KEY) || 'en';
    console.log('📦 Loaded language from storage:', savedLanguage);
    setLanguage(savedLanguage);
}

function setLanguage(lang) {
    const validLanguages = ['en', 'zh'];
    if (!validLanguages.includes(lang)) {
        lang = 'en';
    }

    console.log('🌍 Setting language to:', lang);
    localStorage.setItem(LANGUAGE_KEY, lang);
    updatePageLanguage(lang);
    updateLanguageButton(lang);
}

function updatePageLanguage(lang) {
    const translatableElements = document.querySelectorAll('[data-en][data-zh]');
    console.log('📝 Found', translatableElements.length, 'translatable elements');

    translatableElements.forEach((element) => {
        const content = lang === 'en' ? element.getAttribute('data-en') : element.getAttribute('data-zh');
        
        if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
            element.placeholder = content;
        } else if (element.tagName === 'LABEL') {
            element.textContent = content;
        } else if (element.tagName === 'BUTTON' && !element.classList.contains('theme-toggle')) {
            element.textContent = content;
        } else if (element.tagName === 'A' && !element.classList.contains('project-link')) {
            element.textContent = content;
        } else {
            element.textContent = content;
        }
    });

    document.documentElement.lang = lang;
    console.log('✅ Language updated to:', lang);
}

function updateLanguageButton(lang) {
    const langText = document.querySelector('.lang-text');
    if (langText) {
        langText.textContent = lang === 'en' ? '中文' : 'English';
        console.log('🔤 Language button updated');
    }
}

function toggleLanguage() {
    const currentLanguage = localStorage.getItem(LANGUAGE_KEY) || 'en';
    const newLanguage = currentLanguage === 'en' ? 'zh' : 'en';
    console.log('🔀 Toggling language from', currentLanguage, 'to', newLanguage);
    setLanguage(newLanguage);
}

// ===========================
// Event Listeners Setup
// ===========================

function setupEventListeners() {
    // Theme Toggle Button
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            console.log('👆 Theme button clicked');
            toggleTheme();
        });
        console.log('✅ Theme toggle listener attached');
    } else {
        console.warn('⚠️ Theme toggle button not found');
    }

    // Language Toggle Button
    const languageToggle = document.getElementById('languageToggle');
    if (languageToggle) {
        languageToggle.addEventListener('click', () => {
            console.log('👆 Language button clicked');
            toggleLanguage();
        });
        console.log('✅ Language toggle listener attached');
    } else {
        console.warn('⚠️ Language toggle button not found');
    }
}

// ===========================
// Navigation Active Link
// ===========================

function updateActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    console.log('📄 Current page:', currentPage);
    
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
            console.log('✅ Active link set:', href);
        }
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

    const animatedElements = document.querySelectorAll('.project-card, .skill-tag');
    animatedElements.forEach((element) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(element);
    });

    console.log('✅ Scroll animations setup complete');
}

// ===========================
// Local Storage Management
// ===========================

function getSavedPreferences() {
    return {
        theme: localStorage.getItem(THEME_KEY) || 'light',
        language: localStorage.getItem(LANGUAGE_KEY) || 'en'
    };
}

// ===========================
// Keyboard Shortcuts
// ===========================

document.addEventListener('keydown', (e) => {
    if (e.altKey && e.key === 't') {
        console.log('⌨️ Keyboard shortcut: Alt+T');
        toggleTheme();
    }
    if (e.altKey && e.key === 'l') {
        console.log('⌨️ Keyboard shortcut: Alt+L');
        toggleLanguage();
    }
});

// ===========================
// Console Info
// ===========================

console.log('%c✨ Portfolio Website Loaded', 'color: #007bff; font-size: 16px; font-weight: bold;');
console.log('%c💡 Keyboard Shortcuts:', 'color: #28a745; font-weight: bold;');
console.log('%c   Alt + T → Toggle theme', 'color: #6c757d;');
console.log('%c   Alt + L → Toggle language', 'color: #6c757d;');
console.log('%c📊 Saved Preferences:', 'color: #ffc107; font-weight: bold;');
console.log(getSavedPreferences());