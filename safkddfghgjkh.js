// Enhanced Mobile Menu Functionality
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileMenuClose = document.querySelector('.mobile-menu-close');
    const mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');
    
    // Toggle mobile menu
    mobileMenuBtn.addEventListener('click', function() {
        mobileMenu.classList.add('active');
        mobileMenuOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Add animation class
        mobileMenu.style.transform = 'translateX(-20px)';
        setTimeout(() => {
            mobileMenu.style.transform = 'translateX(0)';
        }, 50);
    });
    
    // Close mobile menu
    function closeMobileMenu() {
        mobileMenu.classList.remove('active');
        mobileMenuOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    mobileMenuClose.addEventListener('click', closeMobileMenu);
    mobileMenuOverlay.addEventListener('click', closeMobileMenu);
    
    // Add ripple effect to menu items
    document.querySelectorAll('.mobile-menu a').forEach(link => {
        link.addEventListener('click', function(e) {
            // Remove any existing ripples
            const existingRipples = this.querySelectorAll('.ripple-effect');
            existingRipples.forEach(ripple => ripple.remove());
            
            // Create ripple element
            const ripple = document.createElement('span');
            ripple.className = 'ripple-effect';
            
            // Set position
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            ripple.style.width = ripple.style.height = `${size}px`;
            ripple.style.left = `${e.clientX - rect.left - size/2}px`;
            ripple.style.top = `${e.clientY - rect.top - size/2}px`;
            
            // Add to DOM
            this.appendChild(ripple);
            
            // Remove after animation
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Header scroll effect
    const header = document.querySelector('.main-header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Initialize animations when elements are in viewport
    initAnimations();
    
    // Load featured products
    loadFeaturedProducts();
});

// Initialize animations
function initAnimations() {
    const animatedElements = document.querySelectorAll('.fade-in, .slide-up');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
            }
        });
    }, { threshold: 0.1 });
    
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

// Sample featured products loader
function loadFeaturedProducts() {
    const productsContainer = document.getElementById('featuredProducts');
    
    // Sample data - replace with Firebase data
    const sampleProducts = [
        {
            id: 1,
            name: 'Organic Coconut Oil',
            image: 'food.jpg',
            rating: 4,
            certified: true,
            category: 'Food'
        },
        {
            id: 2,
            name: 'Ayurvedic Soap',
            image: 'food.jpg',
            rating: 5,
            certified: true,
            category: 'Sanitary'
        },
        {
            id: 3,
            name: 'Pure Ceylon Tea',
            image: 'food.jpg',
            rating: 4,
            certified: true,
            category: 'Beverage'
        },
        {
            id: 4,
            name: 'Natural Honey',
            image: 'food.jpg',
            rating: 5,
            certified: true,
            category: 'Food'
        }
    ];
    
    sampleProducts.forEach(product => {
        productsContainer.innerHTML += `
            <div class="product-card">
                <img src="${product.image}" alt="${product.name}">
                <div class="card-body">
                    ${product.certified ? '<span class="badge">Certified</span>' : ''}
                    <h3>${product.name}</h3>
                    <div class="rating">${'★'.repeat(product.rating)}${'☆'.repeat(5 - product.rating)}</div>
                    <p class="category">${product.category}</p>
                    <a href="products.html?id=${product.id}" class="btn btn-outline">View Details</a>
                </div>
            </div>
        `;
    });
}