document.addEventListener('DOMContentLoaded', () => {
    const loader = document.getElementById('loader');
    const menuToggle = document.getElementById('menuToggle');
    const orbitItems = document.getElementById('orbitItems');
    let isMenuOpen = false;

    setTimeout(() => {
        if (loader) {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.style.display = 'none';
                document.body.style.overflow = 'auto';
            }, 800);
        }
    }, 2800);

    if (menuToggle && orbitItems) {
        menuToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            isMenuOpen = !isMenuOpen;
            orbitItems.classList.toggle('active');
            
            const label = menuToggle.querySelector('.menu-label');
            if (label) {
                label.innerText = isMenuOpen ? '✕' : 'ЦУП';
            }
        });
    }

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            if (orbitItems && orbitItems.classList.contains('active')) {
                orbitItems.classList.remove('active');
                isMenuOpen = false;
                const label = menuToggle?.querySelector('.menu-label');
                if (label) label.innerText = 'ЦУП';
            }
            
            const targetId = this.getAttribute('href');
            if (targetId && targetId !== '#') {
                const target = document.querySelector(targetId);
                if (target) {
                    target.scrollIntoView({ 
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    document.addEventListener('click', (e) => {
        if (isMenuOpen && menuToggle && !menuToggle.contains(e.target) && !orbitItems?.contains(e.target)) {
            orbitItems.classList.remove('active');
            isMenuOpen = false;
            const label = menuToggle.querySelector('.menu-label');
            if (label) label.innerText = 'ЦУП';
        }
    });

    const loginBtn = document.getElementById('loginBtn');
    const registerBtn = document.getElementById('registerBtn');
    
    if (loginBtn) {
        loginBtn.addEventListener('click', () => {
            alert('🔐 Функция входа в разработке. Скоро вы сможете присоединиться к космическому сообществу!');
        });
    }
    
    if (registerBtn) {
        registerBtn.addEventListener('click', () => {
            alert('🚀 Регистрация откроет доступ к персональному треку космической карьеры. Следите за обновлениями!');
        });
    }

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.card, .glass-card, .timeline-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(25px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    document.body.style.overflow = 'hidden';
    setTimeout(() => {
        if (loader && loader.style.display === 'none') {
            document.body.style.overflow = 'auto';
        }
    }, 3000);
});