document.addEventListener('DOMContentLoaded', () => {

    // --- DOM Element Selectors ---
    const navbar = document.getElementById('navbar');
    const navLinksContainer = document.getElementById('navLinks');
    const menuBtn = document.getElementById('menuBtn');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]'); // Select sections with IDs
    const typedTextSpan = document.querySelector('.typed-text');
    const skillProgressBars = document.querySelectorAll('.skill-progress');
    const backToTopBtn = document.getElementById('backToTopBtn');
    const currentYearSpan = document.getElementById('currentYear');
    const contactForm = document.getElementById('contactForm'); // Assuming your form has id="contactForm"
    const menuIconSvg = document.querySelector('.lucide-menu-icon');
    const codeContainers = document.querySelectorAll('.code-container');

    // --- State Variables ---
    let isMenuOpen = false;

    // --- 1. Mobile Navigation Toggle ---
    if (menuBtn && menuIconSvg) {
        menuBtn.addEventListener('click', () => {
            isMenuOpen = !isMenuOpen;
            navLinksContainer.classList.toggle('active', isMenuOpen);
            menuBtn.classList.toggle('active', isMenuOpen);

            // Directly manipulate the SVG to change the icon
            if (isMenuOpen) {
                // Change to the 'x' icon (you'll need the SVG path for the 'x' icon)
                menuIconSvg.innerHTML = `
                    <line x1="18" y1="6" x2="6" y2="18"/>
                    <line x1="6" y1="6" x2="18" y2="18"/>
                `;
                // You might need to adjust other attributes like viewBox if necessary
            } else {
                // Change back to the 'menu' icon (using the path you currently have)
                menuIconSvg.innerHTML = `
                    <line x1="4" x2="20" y1="12" y2="12"/>
                    <line x1="4" x2="20" y1="6" y2="6"/>
                    <line x1="4" x2="20" y1="18" y2="18"/>
                `;
                // You might need to adjust other attributes like viewBox if necessary
            }

            menuBtn.setAttribute('aria-expanded', isMenuOpen);
        });
    }

    // Close menu when a link is clicked (optional)
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (isMenuOpen) {
                isMenuOpen = false;
                navLinksContainer.classList.remove('active');
                menuBtn.classList.remove('active');
                menuIconSvg.innerHTML = `
                    <line x1="4" x2="20" y1="12" y2="12"/>
                    <line x1="4" x2="20" y1="6" y2="6"/>
                    <line x1="4" x2="20" y1="18" y2="18"/>
                `;
                menuBtn.setAttribute('aria-expanded', 'false');
            }
        });
    });

    // --- 2. Sticky Navigation & Back to Top Button Visibility ---
    const scrollThreshold = 80; // Pixels to scroll before changing navbar/showing button
    window.addEventListener('scroll', () => {
        // Sticky Nav
        if (window.scrollY > scrollThreshold) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Back to Top Button
        if (window.scrollY > window.innerHeight * 0.5) { // Show after scrolling 50% of viewport height
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }

        // --- 3. Active Link Highlighting ---
        let currentSectionId = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - navbar.offsetHeight - 50; // Adjust offset for nav height + buffer
            const sectionBottom = sectionTop + section.offsetHeight;

            if (window.scrollY >= sectionTop && window.scrollY < sectionBottom) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
        // Ensure 'Home' is active when at the very top
         if (window.scrollY < sections[0].offsetTop - navbar.offsetHeight - 50) {
             navLinks.forEach(link => link.classList.remove('active'));
             const homeLink = document.querySelector('.nav-link[href="#home"]');
             if (homeLink) homeLink.classList.add('active');
         }
    });

    // --- 4. Simple Typing Effect ---
    if (typedTextSpan) {
        const originalText = typedTextSpan.textContent || "David da Costa"; // Fallback text
        const wordsToType = ["David da Costa", "a Game Developer", "an Unreal Engine Expert", "a Unity Enthusiast"];
        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        const typingSpeed = 50;
        const deletingSpeed = 30;
        const delayBetweenWords = 1000;

        function type() {
            const currentWord = wordsToType[wordIndex];
            let displayedText = '';

            if (isDeleting) {
                displayedText = currentWord.substring(0, charIndex - 1);
                charIndex--;
            } else {
                displayedText = currentWord.substring(0, charIndex + 1);
                charIndex++;
            }

            typedTextSpan.textContent = displayedText;
            typedTextSpan.setAttribute('aria-label', displayedText); // For accessibility

            let typeSpeed = isDeleting ? deletingSpeed : typingSpeed;

            if (!isDeleting && charIndex === currentWord.length) {
                typeSpeed = delayBetweenWords; // Pause at end of word
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % wordsToType.length; // Move to next word
                typeSpeed = typingSpeed * 1.5; // Pause before starting next word
            }

            setTimeout(type, typeSpeed);
        }
        // Start the typing effect after a short delay
        setTimeout(type, 500);
    }


    // --- 5. Skill Bar Animation (Intersection Observer) ---
    const skillObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target.querySelector('.skill-progress');
                if (progressBar) {
                    const targetWidth = progressBar.getAttribute('data-progress'); // Use data-progress="90%" in HTML
                    if (targetWidth) {
                        progressBar.style.width = targetWidth;
                    }
                    observer.unobserve(entry.target); // Animate only once
                }
            }
        });
    }, { threshold: 0.3 }); // Trigger when 30% of the item is visible

    document.querySelectorAll('.skill-item').forEach(item => {
        skillObserver.observe(item);
    });


    // --- 6. Back to Top Button Action ---
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // --- 7. Dynamic Footer Year ---
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // --- 8. Basic Contact Form Handling ---
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Prevent default form submission
    
            const name = contactForm.querySelector('#name');
            const email = contactForm.querySelector('#email');
            const message = contactForm.querySelector('#message');
            const submitBtn = contactForm.querySelector('.submit-btn');
            const originalBtnText = "Send Message";
            let isValid = true;
    
            if (!name || name.value.trim() === '') isValid = false;
            if (!email || !/^\S+@\S+\.\S+$/.test(email.value)) isValid = false;
            if (!message || message.value.trim() === '') isValid = false;
    
            if (isValid) {
                submitBtn.textContent = 'Sending...';
                submitBtn.disabled = true;
    
                const formData = new FormData(contactForm);
    
                fetch(contactForm.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json' // Request JSON response
                    }
                })
                .then(response => response.json())
                .then(data => {
                    submitBtn.textContent = 'Message Sent!';
                    submitBtn.style.backgroundColor = 'var(--success)';
                    submitBtn.style.color = 'var(--dark)';
                    contactForm.reset();
                    setTimeout(() => {
                        submitBtn.textContent = originalBtnText;
                        submitBtn.disabled = false;
                        submitBtn.style.backgroundColor = 'var(--primary)';
                        submitBtn.style.color = 'var(--light)';
                    }, 3000);
                    console.log('Formspree response:', data); // Optional: log the response
                })
                .catch(error => {
                    console.error('Error sending message:', error);
                    submitBtn.textContent = originalBtnText;
                    submitBtn.disabled = false;
                    alert('Failed to send message. Please try again later.');
                });
            } else {
                alert('Please fill in all required fields correctly.');
            }
        });
    }

    // --- 9. Code syntax highlighting ---
    hljs.highlightAll();

    // --- 10. Line numbering ---
    hljs.initLineNumbersOnLoad();
    


}); // End DOMContentLoaded