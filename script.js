document.addEventListener("DOMContentLoaded", () => {
    
    // 1. Пасхалка в консоли
    console.log('%cПривет, коллега! 👋', 'color: #FF6B00; font-size: 20px; font-weight: bold;');
    console.log('Если ты это читаешь, значит, ты тоже разработчик.');

    // 2. Проверка IntersectionObserver
    if (!('IntersectionObserver' in window)) {
        document.querySelectorAll('.fade-in-section').forEach(el => el.classList.add('is-visible'));
        document.querySelectorAll('.scroll-reveal').forEach(el => el.classList.add('active'));
        document.querySelectorAll('.progress-bar-fill').forEach(bar => {
            bar.style.width = bar.getAttribute('data-width');
        });
        return;
    }

    // 3. Анимация появления секций при скролле
    const fadeSections = document.querySelectorAll('.fade-in-section');
    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                fadeObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    fadeSections.forEach(section => fadeObserver.observe(section));

    // 4. Анимация прогресс-баров
    const skillBars = document.querySelectorAll('.progress-bar-fill');
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                bar.style.width = bar.getAttribute('data-width');
                skillObserver.unobserve(bar);
            }
        });
    }, { threshold: 0.5 });

    skillBars.forEach(bar => skillObserver.observe(bar));

    // 5. Параллакс эффект для фона
    const parallaxBg = document.getElementById('parallax-bg');
    let ticking = false;

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                const scrolled = window.pageYOffset;
                parallaxBg.style.transform = `translateY(${scrolled * 0.3}px)`;
                ticking = false;
            });
            ticking = true;
        }
    });

    // 6. Магнитные кнопки (только для устройств с мышью)
    if (window.matchMedia("(hover: hover)").matches) {
        const magneticBtns = document.querySelectorAll('.magnetic-btn');
        
        magneticBtns.forEach(btn => {
            btn.addEventListener('mousemove', (e) => {
                const rect = btn.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                
                btn.style.transform = `translate(${x / 4}px, ${y / 4}px)`;
            });

            btn.addEventListener('mouseleave', () => {
                btn.style.transform = 'translate(0, 0)';
            });
        });
    }

    // 7. Плавный скролл для якорных ссылок
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if(targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

});