// Newsletter Form Handler
document.addEventListener('DOMContentLoaded', function() {
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value.trim();
            
            if (email && email.includes('@')) {
                // Simulate successful subscription
                emailInput.value = '';
                alert('Thank you for subscribing to our newsletter! You\'ll receive sweet updates soon.');
            } else {
                alert('Please enter a valid email address.');
            }
        });
    }

    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // Add active class to current page navigation
    const currentPath = window.location.pathname;
    const currentPage = currentPath.split('/').pop();
    
    if (currentPage === 'index.html' || currentPage === '') {
        // Home page
        document.querySelector('nav a[href="index.html"]').classList.add('active');
    } else if (currentPage.includes('posts/')) {
        // Blog post page
        document.querySelector('nav a[href="index.html"]').classList.add('active');
    }
});

// Utility function to format dates
function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}

// Add active class styling for current navigation item
document.addEventListener('DOMContentLoaded', function() {
    const currentLocation = window.location.pathname;
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href && currentLocation.includes(href)) {
            link.classList.add('active');
        }
    });
});

// Add hover effects for better user experience
document.addEventListener('DOMContentLoaded', function() {
    // Add hover effect for post cards
    const postCards = document.querySelectorAll('.post-card');
    postCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Add hover effect for category cards
    const categoryCards = document.querySelectorAll('.category-card');
    categoryCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
});

// Lazy loading for images (performance optimization)
document.addEventListener('DOMContentLoaded', function() {
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver(function(entries, observer) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(function(img) {
            imageObserver.observe(img);
        });
    }
});

// Scroll to top button functionality
document.addEventListener('DOMContentLoaded', function() {
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.innerHTML = '↑';
    scrollToTopBtn.className = 'scroll-to-top';
    scrollToTopBtn.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        background: #ff6b6b;
        color: white;
        border: none;
        border-radius: 50%;
        font-size: 24px;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: 0 4px 12px rgba(0,0,0,0.2);
    `;
    
    document.body.appendChild(scrollToTopBtn);
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.style.opacity = '1';
            scrollToTopBtn.style.visibility = 'visible';
        } else {
            scrollToTopBtn.style.opacity = '0';
            scrollToTopBtn.style.visibility = 'hidden';
        }
    });
    
    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});

// Accessibility improvements
document.addEventListener('DOMContentLoaded', function() {
    // Add ARIA labels for better accessibility
    const nav = document.querySelector('nav');
    if (nav) {
        nav.setAttribute('aria-label', 'Main navigation');
    }
    
    // Add skip link for screen readers
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.textContent = 'Skip to main content';
    skipLink.className = 'skip-link';
    skipLink.style.cssText = `
        position: absolute;
        left: -9999px;
        top: auto;
        width: 1px;
        height: 1px;
        overflow: hidden;
        z-index: -999;
        background: #ff6b6b;
        color: white;
        padding: 10px;
        text-decoration: none;
        border-radius: 5px;
    `;
    
    skipLink.addEventListener('focus', function() {
        this.style.left = '10px';
        this.style.top = '10px';
        this.style.zIndex = '9999';
    });
    
    skipLink.addEventListener('blur', function() {
        this.style.left = '-9999px';
        this.style.top = 'auto';
        this.style.zIndex = '-999';
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);
    
    // Add main content wrapper
    const mainContent = document.createElement('main');
    mainContent.id = 'main-content';
    mainContent.setAttribute('role', 'main');
    
    // Move all content except header and footer into main
    const header = document.querySelector('header');
    const footer = document.querySelector('footer');
    const bodyChildren = Array.from(document.body.children);
    
    bodyChildren.forEach(child => {
        if (child !== header && child !== footer && child !== skipLink) {
            mainContent.appendChild(child);
        }
    });
    
    document.body.appendChild(mainContent);
});