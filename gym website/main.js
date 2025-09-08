
        // Mobile Menu Toggle
        const mobileMenu = document.querySelector('.mobile-menu');
        const navLinks = document.querySelector('.nav-links');

        mobileMenu.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            mobileMenu.classList.toggle('active');
        });

        // Smooth Scrolling
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                    // Close mobile menu if open
                    navLinks.classList.remove('active');
                }
            });
        });

        // Scroll Animation
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);

        // Observe all fade-in elements
        document.querySelectorAll('.fade-in').forEach(el => {
            observer.observe(el);
        });

        // Navbar background on scroll
        window.addEventListener('scroll', () => {
            const nav = document.querySelector('nav');
            if (window.scrollY > 100) {
                nav.style.background = 'rgba(0, 0, 0, 0.95)';
            } else {
                nav.style.background = 'rgba(0, 0, 0, 0.9)';
            }
        });

        // Plan button interactions
        document.querySelectorAll('.plan-button').forEach(button => {
            button.addEventListener('click', function() {
                const planTitle = this.closest('.plan-card').querySelector('.plan-title').textContent;
                alert(`Thank you for choosing the ${planTitle} plan! Redirecting to registration...`);
            });
        });

        // Add loading animation
        window.addEventListener('load', () => {
            document.querySelector('.hero-content').classList.add('visible');
        });

        // Add pulse effect to CTA button
        const ctaButton = document.querySelector('.cta-button');
        setInterval(() => {
            ctaButton.style.boxShadow = '0 8px 25px rgba(255, 107, 53, 0.8)';
            setTimeout(() => {
                ctaButton.style.boxShadow = '0 4px 15px rgba(255, 107, 53, 0.3)';
            }, 1000);
        }, 3000);

        // Parallax effect for floating weights
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const weights = document.querySelectorAll('.weight');
            weights.forEach((weight, index) => {
                const speed = 0.2 + (index * 0.1);
                weight.style.transform = `translateY(${scrolled * speed}px) rotate(${scrolled * 0.1}deg)`;
            });
        });
    