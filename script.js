// ===========================
// Scroll Animations (完美安全版)
// ===========================

function setupScrollAnimations() {
    console.log('👀 Initializing Scroll Animations observer...');
    
    // 🎯 這裡加上極限防呆：檢查瀏覽器是否支援 IntersectionObserver
    if (!window.IntersectionObserver) {
        console.log('ℹ️ Browser does not support IntersectionObserver. Skipping.');
        return;
    }

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

    // 抓取頁面上的動畫元素
    const animatedElements = document.querySelectorAll('.reveal-item, .project-card, .skill-tag');
    
    // 🛑 修正這裡：如果這頁沒有動畫元素，就「直接結束這個函數」，不會影響到其他功能！
    if (animatedElements.length === 0) {
        console.log('ℹ️ No animation elements found on this page.');
        return; 
    }

    console.log(`📌 Found ${animatedElements.length} elements to animate.`);

    animatedElements.forEach((element) => {
        element.classList.add('reveal-init');
        observer.observe(element);
    });

    console.log('✅ Scroll animations setup complete');
}
