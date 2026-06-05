// ===========================
// Portfolio Website Script
// ===========================

const THEME_KEY = 'portfolio-theme';
const LANGUAGE_KEY = 'portfolio-language';

// 確保頁面完全載入後才初始化功能
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Checking all systems...');
    initializeTheme();
    initializeLanguage();
    setupEventListeners();
    updateActiveNavLink();
    
    // 【新增】在網頁初始化時，自動去跟 GitHub 要數據
    getGitHubStats();
    
    console.log('✅ All systems stable. Ready to explore!');
});

// ===========================
// Theme Management (深色模式)
// ===========================

function initializeTheme() {
    const savedTheme = localStorage.getItem(THEME_KEY) || 'light';
    applyTheme(savedTheme);
}

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

function updateThemeIcon(icon) {
    const themeIcon = document.querySelector('.theme-icon');
    if (themeIcon) {
        themeIcon.textContent = icon;
    }
}

function toggleTheme() {
    const currentTheme = localStorage.getItem(THEME_KEY) || 'light';
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    applyTheme(newTheme);
}

// ===========================
// Language Management (中英文切換)
// ===========================

function initializeLanguage() {
    const savedLanguage = localStorage.getItem(LANGUAGE_KEY) || 'en';
    setLanguage(savedLanguage);
}

function setLanguage(lang) {
    const validLanguages = ['en', 'zh'];
    if (!validLanguages.includes(lang)) {
        lang = 'en';
    }
    localStorage.setItem(LANGUAGE_KEY, lang);
    updatePageLanguage(lang);
    updateLanguageButton(lang);
}

function updatePageLanguage(lang) {
    // 準確抓取所有含有翻譯屬性的標籤
    const translatableElements = document.querySelectorAll('[data-en][data-zh]');
    
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
}

function updateLanguageButton(lang) {
    const langText = document.querySelector('.lang-text');
    if (langText) {
        langText.textContent = lang === 'en' ? '中文' : 'English';
    }
}

function toggleLanguage() {
    const currentLanguage = localStorage.getItem(LANGUAGE_KEY) || 'en';
    const newLanguage = currentLanguage === 'en' ? 'zh' : 'en';
    setLanguage(newLanguage);
}

// ===========================
// Event Listeners Setup
// ===========================

function setupEventListeners() {
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        themeToggle.onclick = () => toggleTheme();
    }

    const languageToggle = document.getElementById('languageToggle');
    if (languageToggle) {
        languageToggle.onclick = () => toggleLanguage();
    }
}

// ===========================
// Navigation Active Link
// ===========================

function updateActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        }
    });
}

// ==========================================================================\
// 🚀 【新增】動態抓取 GitHub 個人資料狀態（資工炫技 API）
// ==========================================================================\
async function getGitHubStats() {
    const username = "054660-108319-oss";
    const url = `https://api.github.com/users/${username}`;

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("API request failed");
        
        const data = await response.json();
        const statsContainer = document.querySelector('.github-stats');
        
        if (statsContainer) {
            const repos = data.public_repos;
            
            // 將最新的真實數據直接灌進雙語屬性中！
            statsContainer.setAttribute('data-en', `🐙 GitHub Stats: ${repos} public repositories`);
            statsContainer.setAttribute('data-zh', `🐙 GitHub 狀態：擁有 ${repos} 個公開專案`);
            
            // 根據當前本地儲存的語言設定，決定顯示文字
            const currentLang = localStorage.getItem(LANGUAGE_KEY) || 'en';
            statsContainer.textContent = currentLang === 'en' ? `🐙 GitHub Stats: ${repos} public repositories` : `🐙 GitHub 狀態：擁有 ${repos} 個公開專案`;
        }
    } catch (error) {
        console.error("GitHub API Error:", error);
        const statsContainer = document.querySelector('.github-stats');
        if (statsContainer) {
            statsContainer.setAttribute('data-en', `🐙 GitHub: @054660-108319-oss`);
            statsContainer.setAttribute('data-zh', `🐙 GitHub: @054660-108319-oss`);
            statsContainer.textContent = `🐙 GitHub: @054660-108319-oss`;
        }
    }
}

// ===========================
// Keyboard Shortcuts (Alt+T / Alt+L)
// ===========================

document.addEventListener('keydown', (e) => {
    if (e.altKey && e.key.toLowerCase() === 't') {
        toggleTheme();
    }
    if (e.altKey && e.key.toLowerCase() === 'l') {
        toggleLanguage();
    }
});
