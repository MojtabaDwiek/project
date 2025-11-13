// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            }
        });
    });
    
    // Hero section scroll animation
    const heroSection = document.querySelector('.hero');
    const hereWord = document.querySelector('.here-word');
    
    // Function to handle scroll animation for "HERE" word
    function handleScrollAnimation() {
        const scrollPosition = window.scrollY;
        const heroHeight = heroSection.offsetHeight;
        
        // Only animate within the hero section
        if (scrollPosition < heroHeight) {
            // Calculate progress (0 to 1) based on scroll position
            const progress = Math.min(scrollPosition / (heroHeight * 0.5), 1);
            
            // Apply transformations based on scroll progress
            const translateY = progress * 100; // Move down
            const scale = 1 + progress * 0.5; // Scale up
            
            hereWord.style.transform = `translateY(${translateY}px) scale(${scale})`;
        } else {
            // Reset when scrolled past hero section
            hereWord.style.transform = 'translateY(0) scale(1)';
        }
    }
    
    // Section animations on scroll
    const animatedElements = document.querySelectorAll('.animate-from-left, .animate-from-right, .animate-from-top, .animate-from-bottom');
    
    function checkElementsInView() {
        const windowHeight = window.innerHeight;
        const windowTop = window.scrollY;
        const windowBottom = windowTop + windowHeight;
        
        animatedElements.forEach(element => {
            const elementTop = element.offsetTop;
            const elementBottom = elementTop + element.offsetHeight;
            
            // Check if element is in viewport
            if (elementBottom >= windowTop && elementTop <= windowBottom) {
                element.classList.add('active');
                element.classList.remove('inactive');
            } else {
                // Only add inactive class if it was previously active
                if (element.classList.contains('active')) {
                    element.classList.add('inactive');
                    element.classList.remove('active');
                }
            }
        });
    }
    
    // Header background on scroll
    function handleHeaderScroll() {
        const header = document.querySelector('.header');
        if (window.scrollY > 50) {
            header.style.background = 'rgba(15, 23, 42, 0.95)';
            header.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.background = 'rgba(15, 23, 42, 0.9)';
            header.style.boxShadow = 'none';
        }
        
        // Update active nav link based on scroll position
        updateActiveNavLink();
    }
    
    // Update active navigation link based on scroll position
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-link');
        
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSection = sectionId;
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    }
    
    // Form submissions
    const newsletterForm = document.querySelector('.newsletter-form');
    const contactForm = document.querySelector('.contact-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            alert(`Thank you for subscribing with ${email}! You'll receive our insights soon.`);
            this.reset();
        });
    }
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for your message! We will get back to you soon.');
            this.reset();
        });
    }
    
    // Initialize animations
    function initAnimations() {
        // Initial check for elements in view
        checkElementsInView();
    }
    
    // Event listeners
    window.addEventListener('scroll', function() {
        handleScrollAnimation();
        checkElementsInView();
        handleHeaderScroll();
    });
    
    // Initialize
    initAnimations();
    
    // Add loading animation
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
        
        // Trigger initial animations after page load
        setTimeout(() => {
            checkElementsInView();
        }, 500);
    });
});

// Enhanced animations for futuristic background
function initFuturisticAnimations() {
    const bgElements = document.querySelectorAll('.bg-element');
    const maskedImages = document.querySelectorAll('.masked-image');
    const techElements = document.querySelectorAll('.tech-element');
    const streams = document.querySelectorAll('.stream');
    
    function checkFuturisticElementsInView() {
        const windowHeight = window.innerHeight;
        const windowTop = window.scrollY;
        const windowBottom = windowTop + windowHeight;
        
        // Background elements
        bgElements.forEach((element, index) => {
            const elementTop = element.offsetTop;
            const elementBottom = elementTop + element.offsetHeight;
            
            if (elementBottom >= windowTop && elementTop <= windowBottom) {
                setTimeout(() => {
                    element.classList.add('active');
                }, index * 200);
            } else {
                element.classList.remove('active');
            }
        });
        
        // Masked images
        maskedImages.forEach((image, index) => {
            const imageTop = image.offsetTop;
            const imageBottom = imageTop + image.offsetHeight;
            
            if (imageBottom >= windowTop && imageTop <= windowBottom) {
                setTimeout(() => {
                    image.classList.add('active');
                }, index * 300);
            } else {
                image.classList.remove('active');
            }
        });
        
        // Tech elements
        techElements.forEach((tech, index) => {
            const techTop = tech.offsetTop;
            const techBottom = techTop + tech.offsetHeight;
            
            if (techBottom >= windowTop && techTop <= windowBottom) {
                setTimeout(() => {
                    tech.style.opacity = '1';
                }, index * 150);
            } else {
                tech.style.opacity = '0.5';
            }
        });
        
        // Data streams
        streams.forEach((stream, index) => {
            const streamTop = stream.offsetTop;
            const streamBottom = streamTop + stream.offsetHeight;
            
            if (streamBottom >= windowTop && streamTop <= windowBottom) {
                setTimeout(() => {
                    stream.classList.add('active');
                }, index * 100);
            } else {
                stream.classList.remove('active');
            }
        });
    }
    
    // Initial check
    checkFuturisticElementsInView();
    
    // Add scroll event listener
    window.addEventListener('scroll', checkFuturisticElementsInView);
}

// Update the DOMContentLoaded event listener
document.addEventListener('DOMContentLoaded', function() {
    // ... existing code ...
    
    // Initialize futuristic animations
    initFuturisticAnimations();
    
    // ... rest of existing code ...
});