/* 
  Mallu's Corner - Next-Gen Redesign 2024
  Full Menu Integration & Premium Interactivity
*/

document.addEventListener('DOMContentLoaded', () => {
    // ===== MENU DATA =====
    const menuData = {
        chicken: [
            { name: "Chicken Biriyani", price: "$18.99", desc: "Authentic Kerala style dum biriyani with aromatic spices. (Family pack $65.00)" },
            { name: "Chicken Curry (with bone)", price: "$18.50", desc: "Traditional Kerala style chicken curry with coconut milk and spices." },
            { name: "Chicken Roast", price: "$18.50", desc: "Slow-cooked chicken with roasted coconut and Kerala spices." },
            { name: "Chicken Stew", price: "$18.50", desc: "Mild and creamy chicken curry with potatoes and carrots." },
            { name: "Butter Chicken", price: "$18.99", desc: "Creamy tomato-based gravy with tender chicken pieces." },
            { name: "Chicken 65", price: "$15.00", desc: "Spicy, deep-fried chicken bites – a South Indian favorite." }
        ],
        beef: [
            { name: "Kerala Beef Roast", price: "$19.99", desc: "Slow-cooked beef with coconut slices and hand-ground spices." },
            { name: "Beef Fry (Ularthiyathu)", price: "$19.99", desc: "Traditional dry beef fry with curry leaves and black pepper." },
            { name: "Beef Curry", price: "$19.50", desc: "Tender beef pieces in a rich, spicy gravy." },
            { name: "Beef Stew", price: "$19.50", desc: "Hearty beef stew with vegetables in a mild coconut milk base." }
        ],
        veg: [
            { name: "Paneer Butter Masala", price: "$17.50", desc: "Cottage cheese in a rich and creamy tomato gravy." },
            { name: "Dal Tadka", price: "$15.00", desc: "Yellow lentils tempered with cumin, garlic, and chilies." },
            { name: "Mix Vegetable Curry", price: "$16.50", desc: "Assorted vegetables cooked in a coconut-based Kerala gravy." },
            { name: "Gobi Manchurian", price: "$15.50", desc: "Indo-Chinese style crispy cauliflower in spicy sauce." },
            { name: "Veg Kurma", price: "$16.50", desc: "Mildly spiced vegetable curry with coconut and cashew paste." }
        ],
        seafood: [
            { name: "Fish Curry (Kerala Style)", price: "$20.50", desc: "Traditional spicy fish curry with gambooge (kudampuli)." },
            { name: "Fish Pollichathu", price: "$22.50", desc: "Fish marinated in spices, wrapped in banana leaf and grilled." },
            { name: "Prawn Curry", price: "$21.50", desc: "Fresh prawns cooked in a creamy coconut milk gravy." },
            { name: "Prawn Roast", price: "$21.50", desc: "Spicy prawn roast with onions, tomatoes, and Kerala spices." }
        ],
        pork: [
            { name: "Kerala Pork Roast", price: "$19.50", desc: "Slow-cooked pork with traditional spices and coconut bits." },
            { name: "Chilli Pork (Malayali Style)", price: "$18.99", desc: "Spicy and tangy pork – our signature fusion dish." },
            { name: "Pork Fry", price: "$19.50", desc: "Dry pork fry with loads of curry leaves and pepper." }
        ],
        rice: [
            { name: "Egg Biriyani", price: "$16.50", desc: "Fragrant rice cooked with boiled eggs and aromatic spices." },
            { name: "Veg Biriyani", price: "$15.99", desc: "Seasonal vegetables dum-cooked with basmati rice." },
            { name: "Ghee Rice", price: "$10.00", desc: "Aromatic basmati rice cooked with ghee and whole spices." },
            { name: "Egg Fried Rice", price: "$15.50", desc: "Indo-Chinese style fried rice with eggs and veggies." },
            { name: "Chicken Fried Rice", price: "$16.99", desc: "Classic fried rice with chicken, eggs, and spring onions." }
        ],
        bread: [
            { name: "Kerala Parotta (2 pcs)", price: "$6.00", desc: "Flaky, multi-layered flatbread – a Kerala specialty." },
            { name: "Appam (2 pcs)", price: "$5.00", desc: "Lacy, fermented rice and coconut milk pancakes." },
            { name: "Chapati (2 pcs)", price: "$5.00", desc: "Soft whole wheat flatbreads." },
            { name: "Egg Parotta", price: "$8.50", desc: "Parotta stuffed or topped with spiced egg." }
        ],
        combos: [
            { name: "Single Combo (Chicken)", price: "$22.00", desc: "Chicken Curry + 2 Parotta/Appam + Side Salad." },
            { name: "Single Combo (Beef)", price: "$23.00", desc: "Beef Roast + 2 Parotta/Appam + Side Salad." },
            { name: "Family Pack (Biriyani)", price: "$65.00", desc: "Full Chicken Biriyani (serves 4-5) + Raitha + Pickle." }
        ],
        specials: [
            { name: "Kappa & Fish Curry", price: "$19.99", desc: "Boiled cassava (tapioca) served with spicy Kerala fish curry." },
            { name: "Kizhi Parotta (Chicken)", price: "$21.00", desc: "Parotta and chicken curry tied in banana leaf and steamed." },
            { name: "Kizhi Parotta (Beef)", price: "$22.00", desc: "Parotta and beef roast tied in banana leaf and steamed." }
        ]
    };

    // ===== MENU RENDERING =====
    const menuDisplay = document.getElementById('menu-display');
    const menuTabs = document.querySelectorAll('.menu-tab');

    function renderMenu(category) {
        if (!menuDisplay) return;
        
        menuDisplay.innerHTML = '';
        const items = menuData[category] || [];
        
        items.forEach((item, index) => {
            const card = document.createElement('div');
            card.className = 'menu-card-v2 reveal';
            card.style.transitionDelay = `${index * 0.05}s`;
            
            card.innerHTML = `
                <div class="card-header-v2">
                    <h4>${item.name}</h4>
                    <span class="price-v2">${item.price}</span>
                </div>
                <p>${item.desc}</p>
            `;
            menuDisplay.appendChild(card);
            
            // Re-trigger observer for new elements
            setTimeout(() => card.classList.add('active'), 50);
        });
    }

    menuTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            menuTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            renderMenu(tab.dataset.category);
        });
    });

    // Initial render
    renderMenu('chicken');

    // ===== SCROLL EFFECTS =====
    const header = document.getElementById('header');
    const reveals = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1 });

    reveals.forEach(el => revealObserver.observe(el));

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // ===== BACK TO TOP =====
    const btt = document.getElementById('back-to-top');
    if (btt) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                btt.style.display = 'flex';
                setTimeout(() => btt.style.opacity = '1', 10);
            } else {
                btt.style.opacity = '0';
                setTimeout(() => btt.style.display = 'none', 300);
            }
        });

        btt.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // ===== MOBILE MENU =====
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenu && navLinks) {
        mobileMenu.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });

        // Close menu on link click
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
            });
        });
    }
});
