// ===========================
// Scroll Animations (全分頁完美防呆版)
// ===========================

function setupScrollAnimations() {
    console.log('👀 Initializing Scroll Animations observer...');
    
    const observerOptions = {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px'
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // 🎯 同時抓取所有可能出現在不同分頁的動畫元素
    const animatedElements = document.querySelectorAll('.reveal-item, .project-card, .skill-tag');
    
    // 🛑【核心防呆】：如果這個分頁沒有任何需要動畫的元素，直接優雅退場，不讓瀏覽器報錯！
    if (animatedElements.length === 0) {
        console.log('ℹ️ No animation elements found on this page. Skipping observer.');
        return; 
    }

    console.log(`📌 Found ${animatedElements.length} elements to animate on this page.`);

    animatedElements.forEach((element) => {
        element.classList.add('reveal-init');
        observer.observe(element);
    });

    console.log('✅ Scroll animations setup complete');
}
