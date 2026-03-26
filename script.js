document.addEventListener('DOMContentLoaded', () => {
    const tasbeehBtn = document.getElementById('tasbeeh-btn');
    const countDisplay = document.getElementById('tasbeeh-count');
    
    // Initialize count from localStorage or 0
    let count = parseInt(localStorage.getItem('tasbeehCount')) || 0;
    
    // Display the initial count
    countDisplay.textContent = count;

    tasbeehBtn.addEventListener('click', () => {
        count++;
        localStorage.setItem('tasbeehCount', count);
        countDisplay.textContent = count;
        
        // Add subtle animation on click
        countDisplay.classList.remove('click-animation');
        // Trigger reflow to restart CSS animation
        void countDisplay.offsetWidth; 
        countDisplay.classList.add('click-animation');
        
        // Provide haptic feedback if available on mobile
        if (window.navigator && window.navigator.vibrate) {
            window.navigator.vibrate(50);
        }
    });

    // Reveal animations on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
                // Optional: unobserve after animating to only animate once
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.memory-card, .prayer-item').forEach((el, index) => {
        el.style.opacity = 0;
        el.style.transform = 'translateY(30px)';
        el.style.transition = `opacity 0.6s ease-out ${index * 0.1}s, transform 0.6s ease-out ${index * 0.1}s`;
        observer.observe(el);
    });
});
