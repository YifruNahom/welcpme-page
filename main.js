// ============================================
// MOBILE NAVIGATION (Lines 1-50)
// Hamburger menu functionality
// Edit menu behavior as needed
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Close menu when clicking on a link
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!hamburger.contains(event.target) && !navMenu.contains(event.target)) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }
    
    // ============================================
    // PROJECTS FILTER (Lines 50-100)
    // Filter projects by category
    // Edit categories in HTML data-category attribute
    // ============================================
    
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectItems = document.querySelectorAll('.project-detail');
    
    if (filterButtons.length > 0 && projectItems.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                const filter = this.getAttribute('data-filter');
                
                // Update active button
                filterButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                
                // Filter projects
                projectItems.forEach(project => {
                    if (filter === 'all') {
                        project.style.display = 'block';
                        project.classList.add('fade-in');
                    } else {
                        const categories = project.getAttribute('data-category');
                        if (categories && categories.includes(filter)) {
                            project.style.display = 'block';
                            project.classList.add('fade-in');
                        } else {
                            project.style.display = 'none';
                        }
                    }
                });
            });
        });
    }
    
    // ============================================
    // SMOOTH SCROLLING (Lines 100-130)
    // Smooth scroll to anchor links
    // ============================================
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip if href is just "#"
            if (href === '#') {
                e.preventDefault();
                return;
            }
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ============================================
    // CONTACT FORM VALIDATION (Lines 130-180)
    // Basic form validation
    // For full functionality, connect to backend service
    // ============================================
    
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            // If using Formspree or similar, remove preventDefault
            // e.preventDefault();
            
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const subject = document.getElementById('subject').value.trim();
            const message = document.getElementById('message').value.trim();
            
            // Basic validation
            if (!name || !email || !subject || !message) {
                alert('Please fill in all required fields.');
                e.preventDefault();
                return false;
            }
            
            // Email validation
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(email)) {
                alert('Please enter a valid email address.');
                e.preventDefault();
                return false;
            }
            
            // If validation passes and you're not using a form service
            // Uncomment below and add your own submission logic
            /*
            e.preventDefault();
            console.log('Form submitted:', { name, email, subject, message });
            alert('Thank you for your message! I will get back to you soon.');
            contactForm.reset();
            */
        });
    }
    
    // ============================================
    // SCROLL ANIMATIONS (Lines 180-230)
    // Fade in elements on scroll
    // Add 'fade-in-on-scroll' class to elements
    // ============================================
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements with fade-in-on-scroll class
    document.querySelectorAll('.fade-in-on-scroll').forEach(el => {
        observer.observe(el);
    });
    
    // ============================================
    // ACTIVE NAVIGATION HIGHLIGHTING (Lines 230-260)
    // Highlights current page in navigation
    // ============================================
    
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage) {
            link.classList.add('active');
        }
    });
    
    // ============================================
    // HEADER SCROLL EFFECT (Lines 260-290)
    // Add shadow to header on scroll
    // ============================================
    
    const header = document.querySelector('.header');
    let lastScroll = 0;
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
        }
        
        lastScroll = currentScroll;
    });
    
    // ============================================
    // COPY TO CLIPBOARD (Lines 290-320)
    // Copy email to clipboard functionality
    // Add to any element with class 'copy-email'
    // ============================================
    
    document.querySelectorAll('.copy-email').forEach(element => {
        element.addEventListener('click', function(e) {
            e.preventDefault();
            const email = 'yifrunahom@gmail.com';
            
            navigator.clipboard.writeText(email).then(function() {
                // Show success message
                const originalText = element.textContent;
                element.textContent = 'Email copied!';
                
                setTimeout(function() {
                    element.textContent = originalText;
                }, 2000);
            }).catch(function(err) {
                console.error('Failed to copy email:', err);
                alert('Email: ' + email);
            });
        });
    });
});

// ============================================
// CONSOLE MESSAGE (Lines 320-330)
// Fun Easter egg for developers
// Edit message as you like
// ============================================

console.log('%c👋 Hello, fellow developer!', 'color: #0ea5a4; font-size: 20px; font-weight: bold;');
console.log('%cInterested in how this site was built?', 'color: #475569; font-size: 14px;');
console.log('%cCheck out the code on GitHub: https://github.com/YifruNahom', 'color: #0ea5a4; font-size: 14px;');