// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            this.classList.toggle('active');
            
            // Create mobile nav if it doesn't exist
            if (!document.querySelector('.mobile-nav')) {
                const mobileNav = document.createElement('div');
                mobileNav.classList.add('mobile-nav');
                
                // Clone the nav links
                const navLinksClone = navLinks.cloneNode(true);
                mobileNav.appendChild(navLinksClone);
                
                // Add to the body
                document.body.appendChild(mobileNav);
                
                // Add styles for mobile nav
                mobileNav.style.position = 'fixed';
                mobileNav.style.top = '0';
                mobileNav.style.left = '0';
                mobileNav.style.width = '100%';
                mobileNav.style.height = '100vh';
                mobileNav.style.backgroundColor = 'var(--dark-bg)';
                mobileNav.style.zIndex = '99';
                mobileNav.style.display = 'flex';
                mobileNav.style.flexDirection = 'column';
                mobileNav.style.justifyContent = 'center';
                mobileNav.style.alignItems = 'center';
                mobileNav.style.transform = 'translateY(-100%)';
                mobileNav.style.transition = 'transform 0.3s ease';
                
                // Style the nav links in mobile nav
                const mobileNavLinks = mobileNav.querySelector('.nav-links');
                mobileNavLinks.style.display = 'flex';
                mobileNavLinks.style.flexDirection = 'column';
                mobileNavLinks.style.alignItems = 'center';
                
                // Style the list items
                const mobileNavItems = mobileNavLinks.querySelectorAll('li');
                mobileNavItems.forEach(item => {
                    item.style.margin = '1rem 0';
                });
                
                // Add click event to close mobile nav when a link is clicked
                mobileNavLinks.querySelectorAll('a').forEach(link => {
                    link.addEventListener('click', function() {
                        hamburger.classList.remove('active');
                        mobileNav.style.transform = 'translateY(-100%)';
                    });
                });
            }
            
            // Toggle mobile nav
            const mobileNav = document.querySelector('.mobile-nav');
            if (this.classList.contains('active')) {
                mobileNav.style.transform = 'translateY(0)';
            } else {
                mobileNav.style.transform = 'translateY(-100%)';
            }
        });
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Offset for fixed header
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Image Gallery Modal
    const galleryImages = document.querySelectorAll('.gallery img');
    
    // Create modal elements if they don't exist
    if (!document.querySelector('.modal')) {
        const modal = document.createElement('div');
        modal.classList.add('modal');
        
        const modalImg = document.createElement('img');
        modalImg.classList.add('modal-content');
        
        const closeBtn = document.createElement('span');
        closeBtn.classList.add('close');
        closeBtn.innerHTML = '&times;';
        
        modal.appendChild(closeBtn);
        modal.appendChild(modalImg);
        document.body.appendChild(modal);
        
        // Close modal when clicking the close button
        closeBtn.addEventListener('click', function() {
            modal.style.display = 'none';
        });
        
        // Close modal when clicking outside the image
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });
    }
    
    // Add click event to gallery images
    galleryImages.forEach(img => {
        img.addEventListener('click', function() {
            const modal = document.querySelector('.modal');
            const modalImg = document.querySelector('.modal-content');
            
            modal.style.display = 'block';
            modalImg.src = this.src;
        });
    });
    
    // Scroll Animations
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.experience-card, .volunteer-card, .certificate-card, .skill-card');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Set initial state for scroll animations
    const cards = document.querySelectorAll('.experience-card, .volunteer-card, .certificate-card, .skill-card');
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    // Run animations on scroll
    window.addEventListener('scroll', animateOnScroll);
    
    // Run once on page load
    animateOnScroll();
    
    // Hamburger animation
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            const spans = this.querySelectorAll('span');
            
            if (this.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 6px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(5px, -6px)';
            } else {
                spans.forEach(span => {
                    span.style.transform = 'none';
                    span.style.opacity = '1';
                });
            }
        });
    }
});
