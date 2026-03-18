/* 
  Mallu's Corner - Redesign 2024
  Modern Interactivity with Intersection Observer
*/

document.addEventListener('DOMContentLoaded', () => {
    const header = document.getElementById('header');
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    const navLinkItems = document.querySelectorAll('.nav-links a');

    // ===== 1. STICKY HEADER =====
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.scrollY;
        
        if (currentScroll > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        lastScroll = currentScroll;

        // Active link highlighting
        let current = '';
        const sections = document.querySelectorAll('section[id]');
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (window.scrollY >= sectionTop - 150) {
                current = section.getAttribute('id');
            }
        });

        navLinkItems.forEach(a => {
            a.classList.remove('active');
            const href = a.getAttribute('href');
            if (href && href.includes(current) && current !== '') {
                a.classList.add('active');
            }
        });
    }, { passive: true });

    // ===== 2. MOBILE MENU =====
    // Create overlay element
    const overlay = document.createElement('div');
    overlay.className = 'nav-overlay';
    document.body.appendChild(overlay);

    function openMenu() {
        navLinks.classList.add('active');
        overlay.classList.add('active');
        mobileMenu.classList.add('open');
        document.body.style.overflow = 'hidden';
        
        const spans = mobileMenu.querySelectorAll('span');
        spans[0].style.transform = 'rotate(45deg) translate(6px, 6px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(7px, -7px)';
    }

    function closeMenu() {
        navLinks.classList.remove('active');
        overlay.classList.remove('active');
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
        
        const spans = mobileMenu.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }

    mobileMenu.addEventListener('click', () => {
        if (navLinks.classList.contains('active')) {
            closeMenu();
        } else {
            openMenu();
        }
    });

    overlay.addEventListener('click', closeMenu);

    // ===== 3. SMOOTH SCROLL & CLOSE MENU =====
    navLinkItems.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const targetSection = document.querySelector(href);
                
                if (targetSection) {
                    const offset = 80;
                    const top = targetSection.offsetTop - offset;
                    window.scrollTo({
                        top: top,
                        behavior: 'smooth'
                    });
                }

                closeMenu();
            }
        });
    });

    // ===== 4. SCROLL REVEAL ANIMATIONS =====
    const revealElements = document.querySelectorAll(
        '.service-card, .gallery-item, .menu-item-card, .about-content, .about-image, .contact-info, .contact-form-container, .info-card'
    );

    // Add the reveal class to elements
    revealElements.forEach(el => el.classList.add('reveal'));

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // ===== 5. STAGGER ANIMATION FOR GRID ITEMS =====
    const gridSections = document.querySelectorAll('.services-grid, .gallery-grid, .menu-grid');
    
    gridSections.forEach(grid => {
        const gridObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const children = entry.target.children;
                    Array.from(children).forEach((child, index) => {
                        child.style.transitionDelay = `${index * 0.12}s`;
                    });
                    gridObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        gridObserver.observe(grid);
    });

    // ===== 6. PARALLAX EFFECT ON HERO =====
    const hero = document.querySelector('.hero');
    if (hero && window.matchMedia('(min-width: 769px)').matches) {
        window.addEventListener('scroll', () => {
            const scrolled = window.scrollY;
            if (scrolled < window.innerHeight) {
                hero.style.backgroundPositionY = `${scrolled * 0.4}px`;
            }
        }, { passive: true });
    }

    // ===== 7. FORM ENHANCEMENT =====
    const form = document.querySelector('.modern-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = form.querySelector('button[type="submit"]');
            const originalText = btn.textContent;
            
            btn.textContent = 'Sending...';
            btn.style.opacity = '0.7';
            btn.disabled = true;

            // Simulate sending (replace with actual form handling)
            setTimeout(() => {
                btn.textContent = '✓ Message Sent!';
                btn.style.opacity = '1';
                btn.style.background = 'linear-gradient(135deg, #2e7d32, #4caf50)';
                
                form.reset();
                
                setTimeout(() => {
                    btn.textContent = originalText;
                    btn.style.background = '';
                    btn.disabled = false;
                }, 3000);
            }, 1500);
        });
    }

    // ===== 8. GALLERY HOVER TOUCH SUPPORT =====
    if ('ontouchstart' in window) {
        const galleryItems = document.querySelectorAll('.gallery-item');
        galleryItems.forEach(item => {
            item.addEventListener('touchstart', () => {
                galleryItems.forEach(i => i.classList.remove('touched'));
                item.classList.add('touched');
            }, { passive: true });
        });
    }
});
