document.addEventListener('DOMContentLoaded', () => {
    // ===== MENU DATA FROM ORIGINAL WEBSITE =====
    const menuData = {
        chicken: [
            { name: "Chicken curry", price: "$17.99" },
            { name: "Kadai chicken", price: "$17.99" },
            { name: "Butter chicken", price: "$17.99" },
            { name: "Chicken roast", price: "$17.99" },
            { name: "Chilli chicken", price: "$17.99" },
            { name: "Chicken 65", price: "$18.99" },
            { name: "Chicken kondattom", price: "$18.99" },
            { name: "Chicken manjurian", price: "$17.99" },
            { name: "Ginger chicken", price: "$17.99" },
            { name: "Garlic chicken", price: "$17.99" },
            { name: "Chicken lollipop", price: "$19.99" }
        ],
        beef: [
            { name: "Beef roast", price: "$19.99" },
            { name: "Beef curry", price: "$19.99" },
            { name: "Beef kondattom", price: "$20.99" },
            { name: "Chilli beef", price: "$19.99" },
            { name: "Beef dry fry", price: "$21.99" }
        ],
        veg: [
            { name: "Gobi 65", price: "$15.00" },
            { name: "Chilli Gobi", price: "$16.00" },
            { name: "Chilli Paneer", price: "$16.00" },
            { name: "Gobi manjurian", price: "$16.00" },
            { name: "Paneer butter masala", price: "$16.00" }
        ],
        seafood: [
            { name: "Fish curry", price: "$18.99" },
            { name: "Crab roast", price: "$18.00" },
            { name: "Chilli prawns", price: "$19.00" },
            { name: "Prawns masala", price: "$18.00" }
        ],
        pork: [
            { name: "Chilli pork", price: "$18.99" }
        ],
        rice: [
            { name: "Chicken Biriyani", price: "$18.99" },
            { name: "Beef Biriyani", price: "$19.99" },
            { name: "Mutton Biriyani", price: "$19.99" },
            { name: "Fish biriyani", price: "$20.99" },
            { name: "Vegetable biriyani", price: "$16.00" },
            { name: "Chicken fried rice", price: "$17.99" },
            { name: "Egg fried rice", price: "$16.99" },
            { name: "Veg fried rice", price: "$15.99" }
        ],
        bread: [
            { name: "Kearla Poratta", price: "$3.50" },
            { name: "Appam", price: "$2.00" },
            { name: "Idiyappam", price: "$2.00" }
        ],
        family: [
            { name: "Chicken fried rice", price: "$60.00" },
            { name: "Chicken biriyani", price: "$60.00" },
            { name: "Beef biriyani", price: "$80.00" },
            { name: "Kappa biriyani", price: "$80.00" }
        ],
        combos: [
            { name: "Porotta & beef roast", price: "$20.99" },
            { name: "Porotta & chicken curry", price: "$19.99" },
            { name: "Porotta, Rice & Butter chicken", price: "$19.99" },
            { name: "Porotta & chilli chicken", price: "$19.99" },
            { name: "Fried rice & chilli chicken", price: "$19.99" },
            { name: "Kappa & fish curry", price: "$21.99" }
        ],
        specials: [
            { name: "Duck pepper roast", price: "$19.99" },
            { name: "Kothu poratta", price: "$21.99" },
            { name: "Kizhi poratta", price: "$22.99" },
            { name: "Kappa biriyani", price: "$19.99" },
            { name: "Kappa botti", price: "$19.99" },
            { name: "Fish pollichathu", price: "" },
            { name: "Pothichoru", price: "$20.00" }
        ],
        drinks: [
            { name: "Tea", price: "$4.00" },
            { name: "Coffee", price: "$4.00" },
            { name: "Mint Tea", price: "$3.00" }
        ]
    };

    // ===== MENU RENDERING =====
    const menuGrid = document.getElementById('menu-grid');
    const tabBtns = document.querySelectorAll('.tab-btn');
    const mobileSelect = document.getElementById('mobile-menu-select');

    function renderMenu(category) {
        if (!menuGrid) return;
        
        menuGrid.innerHTML = '';
        const items = menuData[category] || [];
        
        items.forEach((item, index) => {
            const el = document.createElement('div');
            el.className = 'reveal bg-bg-main p-6 rounded-2xl shadow-[0_4px_15px_rgba(0,0,0,0.04)] flex justify-between items-center border border-gold/20 relative overflow-hidden transition-all duration-300 z-10 hover:-translate-y-1.5 hover:shadow-[0_8px_25px_rgba(30,74,48,0.1)] hover:border-gold group before:absolute before:top-0 before:left-0 before:h-full before:w-1 before:bg-gold before:transition-all before:duration-300 before:-z-10 group-hover:before:w-full group-hover:before:opacity-[0.05]';
            el.style.transitionDelay = `${index * 0.05}s`;
            
            const priceHtml = item.price ? `<span class="font-bold text-bg-main bg-primary font-body text-[1.1rem] py-2 px-4 rounded-lg shadow-sm">${item.price}</span>` : '';
            
            el.innerHTML = `
                <div>
                    <h4 class="font-heading font-semibold text-xl tracking-[0.5px] mb-1 text-primary">${item.name}</h4>
                </div>
                ${priceHtml}
            `;
            menuGrid.appendChild(el);
            
            // Re-trigger reveal animation
            setTimeout(() => el.classList.add('active'), 50);
        });
    }

    // Handle Desktop Tabs
    tabBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            // Update active state for tabs
            tabBtns.forEach(t => t.classList.remove('active'));
            const targetBtn = e.target;
            targetBtn.classList.add('active');
            
            const category = targetBtn.dataset.category;
            
            // Sync mobile select
            if (mobileSelect) {
                mobileSelect.value = category;
            }
            
            renderMenu(category);
        });
    });

    // Handle Mobile Select
    if (mobileSelect) {
        mobileSelect.addEventListener('change', (e) => {
            const category = e.target.value;
            
            // Sync desktop tabs
            tabBtns.forEach(t => {
                t.classList.remove('active');
                if (t.dataset.category === category) {
                    t.classList.add('active');
                }
            });
            
            renderMenu(category);
        });
    }

    // Initial render
    renderMenu('chicken');

    // ===== MOBILE MENU TOGGLE =====
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const navLinks = document.getElementById('nav-links');
    
    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });

        // Close menu when clicking a link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
            });
        });
    }

    // ===== NAVBAR SCROLL EFFECT =====
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 4px 12px rgba(30, 74, 48, 0.15)';
        } else {
            navbar.style.boxShadow = 'var(--shadow-sm)';
        }
    });

    // ===== REVEAL ANIMATIONS ON SCROLL =====
    const revealElements = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.15 });

    revealElements.forEach(el => revealObserver.observe(el));

    // ===== BACK TO TOP BUTTON =====
    const backToTopBtn = document.getElementById('back-to-top');
    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 400) {
                backToTopBtn.classList.add('show');
            } else {
                backToTopBtn.classList.remove('show');
            }
        });

        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
});
