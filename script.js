// ===========================
// Scroll Animations (終極完美修復版)
// ===========================

function setupScrollAnimations() {
    console.log('👀 Initializing Scroll Animations observer...');
    
    if (!window.IntersectionObserver) {
        console.log('ℹ️ Browser does not support IntersectionObserver. Skipping.');
        return;
    }

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -20px 0px'
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                console.log('✨ Element revealed:', entry.target.className);
                // 歸位：變回不透明、移回原位
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // 🎯 抓取所有頁面中需要動畫的元素
    const animatedElements = document.querySelectorAll('.reveal-item, .project-card, .skill-tag');
    
    // 🛑 安全檢查：如果這頁真的沒有任何動畫元素，直接結束，完全不影響其他功能
    if (animatedElements.length === 0) {
        console.log('ℹ️ No animation elements found on this page.');
        return; 
    }

    console.log(`📌 Found ${animatedElements.length} elements to animate.`);

    // 🚀 初始化：先讓它們隱形並往下移一點點
    animatedElements.forEach((element) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(element);
    });

    console.log('✅ Scroll animations setup complete');
}
