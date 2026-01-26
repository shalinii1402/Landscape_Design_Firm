document.addEventListener('DOMContentLoaded', () => {
    // Reusable Header & Footer Components
    const injectComponents = () => {
        const headerHTML = `
            <div class="container nav-wrapper">
                <nav>
                    <a href="index.html" class="logo">
                        <i class="fas fa-leaf"></i>
                        <span>GreenScape</span>
                    </a>
                    <ul class="nav-links">
                        <li><a href="index.html" data-page="index.html">Home 1</a></li>
                        <li><a href="home-premium.html" data-page="home-premium.html">Home 2</a></li>
                        <li><a href="about.html" data-page="about.html">About Us</a></li>
                        <li><a href="portfolio.html" data-page="portfolio.html">Portfolio</a></li>
                        <li><a href="consultation.html" data-page="consultation.html">Consultation</a></li>
                        <li><a href="contact.html" data-page="contact.html">Contact</a></li>
                        <li class="mobile-auth-item"><a href="login.html" class="mobile-auth-link">Login</a></li>
                        <li class="mobile-auth-item"><a href="signup.html" class="mobile-auth-link">Sign Up</a></li>
                    </ul>
                    <div class="nav-actions">
                        <button class="theme-toggle">🌙</button>
                        <a href="login.html" class="btn btn-outline" style="padding: 8px 15px; font-size: 0.9rem;">Login</a>
                        <a href="signup.html" class="btn btn-primary" style="padding: 8px 15px; font-size: 0.9rem;">Sign Up</a>
                    </div>
                    <div class="hamburger">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </nav>
            </div>
        `;

        const footerHTML = `
            <div class="container">
                <div class="footer-grid">
                    <div class="fade-in">
                        <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 20px;">
                            <i class="fas fa-leaf" style="font-size: 1.5rem; color: var(--accent);"></i>
                            <span style="font-family: 'Poppins', sans-serif; font-size: 1.5rem; font-weight: 700; color: var(--white);">GreenScape</span>
                        </div>
                        <p style="color: rgba(255, 255, 255, 0.8);">Expert landscape design and planning for the modern home. Bringing nature to your doorstep.</p>
                        <div class="social-icons">
                            <a href="#"><i class="fab fa-facebook"></i></a>
                            <a href="#"><i class="fab fa-instagram"></i></a>
                            <a href="#"><i class="fab fa-twitter"></i></a>
                            <a href="#"><i class="fab fa-pinterest"></i></a>
                        </div>
                    </div>
                    <div class="footer-links fade-in">
                        <h4>Quick Links</h4>
                        <ul>
                            <li><a href="index.html">Home 1</a></li>
                            <li><a href="home-premium.html">Home 2</a></li>
                            <li><a href="portfolio.html">Portfolio</a></li>
                            <li><a href="about.html">About Us</a></li>
                        </ul>
                    </div>
                    <div class="footer-links fade-in">
                        <h4>Services</h4>
                        <ul>
                            <li><a href="#">Garden Design</a></li>
                            <li><a href="#">Hardscaping</a></li>
                            <li><a href="#">Landscaping</a></li>
                            <li><a href="#">Maintenance</a></li>
                        </ul>
                    </div>
                    <div class="footer-links fade-in">
                        <h4>Contact Us</h4>
                        <ul>
                            <li><i class="fas fa-map-marker-alt"></i> 123 Green Lane, Eco City</li>
                            <li><i class="fas fa-phone"></i> +1 234 567 890</li>
                            <li><i class="fas fa-envelope"></i> hello@greenscape.com</li>
                        </ul>
                    </div>
                </div>
                <div class="footer-bottom">
                    <p>&copy; 2026 GreenScape Landscape Design. All Rights Reserved.</p>
                </div>
            </div>
        `;

        const headerPlaceholder = document.getElementById('header-placeholder') || document.querySelector('header');
        const footerPlaceholder = document.getElementById('footer-placeholder') || document.querySelector('footer');

        if (headerPlaceholder) headerPlaceholder.innerHTML = headerHTML;
        if (footerPlaceholder) footerPlaceholder.innerHTML = footerHTML;

        // Set Active Nav Link
        const currentPath = window.location.pathname.split('/').pop() || 'index.html';
        const isAuthPage = currentPath === 'login.html' || currentPath === 'signup.html';

        // Inject Back to Top button as fixed element
        if (!isAuthPage && !document.querySelector('.back-to-top-btn')) {
            const backToTopBtn = document.createElement('a');
            backToTopBtn.href = '#';
            backToTopBtn.className = 'back-to-top-btn';
            backToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
            document.body.appendChild(backToTopBtn);
        }

        const navItems = document.querySelectorAll('.nav-links a');
        navItems.forEach(item => {
            if (item.getAttribute('data-page') === currentPath) {
                item.classList.add('active');
            }
        });
    };

    injectComponents();

    // Sticky Header
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }
    });

    // Mobile Menu
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('toggle');
        });
    }

    // Theme Toggle
    const themeBtn = document.querySelector('.theme-toggle');
    const currentTheme = localStorage.getItem('theme') || 'light';

    document.documentElement.setAttribute('data-theme', currentTheme);
    if (themeBtn) {
        themeBtn.innerHTML = currentTheme === 'dark' ? '☀️' : '🌙';

        themeBtn.addEventListener('click', () => {
            let theme = document.documentElement.getAttribute('data-theme');
            let newTheme = theme === 'light' ? 'dark' : 'light';

            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            themeBtn.innerHTML = newTheme === 'dark' ? '☀️' : '🌙';
        });
    }

    // Back to Top functionality
    const backToTop = document.querySelector('.back-to-top-btn');
    if (backToTop) {
        backToTop.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        // Show/hide button based on scroll position
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        });
    }

    // Scroll Animations (Intersection Observer)
    const appearOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const appearOnScroll = new IntersectionObserver((entries, appearOnScroll) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('appear');
            appearOnScroll.unobserve(entry.target);
        });
    }, appearOptions);

    const faders = document.querySelectorAll('.fade-in');
    faders.forEach(fader => {
        appearOnScroll.observe(fader);
    });

    // Portfolio Modals
    const modal = document.getElementById('projectModal');
    const projectCards = document.querySelectorAll('.project-card');
    const closeModal = document.querySelector('.close-modal');

    if (projectCards && modal) {
        projectCards.forEach(card => {
            card.addEventListener('click', () => {
                const title = card.querySelector('h3').innerText;
                const desc = card.querySelector('p').innerText;
                const imgSrc = card.querySelector('img').src;

                modal.querySelector('.modal-title').innerText = title;
                modal.querySelector('.modal-desc').innerText = desc;
                modal.querySelector('.modal-img').src = imgSrc;

                modal.style.display = 'flex';
                document.body.style.overflow = 'hidden';
            });
        });

        if (closeModal) {
            closeModal.addEventListener('click', () => {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            });
        }

        window.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    }

    // Portfolio Filtering
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    if (filterBtns) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const filter = btn.getAttribute('data-filter');

                portfolioItems.forEach(item => {
                    if (filter === 'all' || item.getAttribute('data-category') === filter) {
                        item.style.display = 'block';
                        setTimeout(() => item.style.opacity = '1', 10);
                    } else {
                        item.style.opacity = '0';
                        setTimeout(() => item.style.display = 'none', 300);
                    }
                });
            });
        });
    }

    // Form Validation (Consultation & Contact)
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            let isValid = true;
            const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');

            inputs.forEach(input => {
                const errorSpan = input.nextElementSibling;
                if (!input.value.trim()) {
                    isValid = false;
                    input.classList.add('error');
                    if (errorSpan && errorSpan.classList.contains('error-msg')) {
                        errorSpan.innerText = 'This field is required';
                    }
                } else {
                    input.classList.remove('error');
                    if (errorSpan && errorSpan.classList.contains('error-msg')) {
                        errorSpan.innerText = '';
                    }
                }
            });

            if (isValid) {
                const successMsg = document.createElement('div');
                successMsg.className = 'success-message';
                successMsg.innerText = 'Thank you! Your request has been sent.';
                form.appendChild(successMsg);
                form.reset();
                setTimeout(() => successMsg.remove(), 5000);
            }
        });
    });

    // Password Visibility Toggle
    const passwordToggles = document.querySelectorAll('.password-toggle');
    passwordToggles.forEach(toggle => {
        toggle.addEventListener('click', () => {
            const targetId = toggle.getAttribute('data-target');
            const input = document.getElementById(targetId) || toggle.previousElementSibling;
            const icon = toggle.querySelector('i');

            if (input.type === 'password') {
                input.type = 'text';
                icon.classList.remove('fa-eye');
                icon.classList.add('fa-eye-slash');
            } else {
                input.type = 'password';
                icon.classList.remove('fa-eye-slash');
                icon.classList.add('fa-eye');
            }
        });
    });
});
