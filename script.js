document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Navbar Scroll Effect ---
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // --- 2. Mobile Menu Toggle ---
    const mobileBtn = document.getElementById('mobile-btn');
    const mobileNav = document.getElementById('mobile-nav');
    const mobileLinks = document.querySelectorAll('.mobile-link, .mobile-btn-link');

    mobileBtn.addEventListener('click', () => {
        mobileNav.classList.toggle('active');
        // Transform hamburger icon
        const spans = mobileBtn.querySelectorAll('span');
        if (mobileNav.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.transform = 'rotate(-45deg) translate(5px, -5px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.transform = 'none';
        }
    });

    // Close mobile menu when a link is clicked
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileNav.classList.remove('active');
            const spans = mobileBtn.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.transform = 'none';
        });
    });

    // --- 3. Scroll Animations (Intersection Observer) ---
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target); // Stop observing once it's visible
            }
        });
    }, observerOptions);

    // Elements to animate
    const animateElements = document.querySelectorAll('.fade-up, .slide-left, .slide-right');
    animateElements.forEach(el => observer.observe(el));

    // --- 4. Hero Image Load Animation ---
    setTimeout(() => {
        document.querySelector('.hero').classList.add('loaded');
    }, 100);

    // --- 5. Form Submission Mock ---
    const bookForm = document.getElementById('quick-book-form');
    if (bookForm) {
        bookForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = bookForm.querySelector('button[type="submit"]');
            const originalText = btn.textContent;
            
            // Loading state
            btn.textContent = 'Sending...';
            btn.style.opacity = '0.8';
            
            // Mock API call delay
            setTimeout(() => {
                btn.textContent = 'Request Sent!';
                btn.style.backgroundColor = '#8A9A86'; // Sage Green
                btn.style.borderColor = '#8A9A86';
                
                // Reset form
                bookForm.reset();
                
                // Revert button after 3 seconds
                setTimeout(() => {
                    btn.textContent = originalText;
                    btn.style.backgroundColor = '';
                    btn.style.borderColor = '';
                    btn.style.opacity = '1';
                }, 3000);
            }, 1500);
        });
    }

    // --- 6. Smooth Scrolling for anchor links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
  
                window.scrollTo({
                     top: offsetPosition,
                     behavior: "smooth"
                });
            }
        });
    });

    // --- 7. FAQ Accordion ---
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const btn = item.querySelector('.faq-question');
        btn.addEventListener('click', () => {
            const isOpen = item.classList.contains('open');
            // Close all
            faqItems.forEach(i => i.classList.remove('open'));
            // Open clicked if it was closed
            if (!isOpen) item.classList.add('open');
        });
    });

});
