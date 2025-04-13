document.addEventListener('DOMContentLoaded', () => {

    // --- DOM Element Selectors ---
    const navbar = document.getElementById('navbar');
    const navLinksContainer = document.getElementById('navLinks');
    const menuBtn = document.getElementById('menuBtn');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]'); // Select sections with IDs
    const typedTextSpan = document.querySelector('.typed-text');
    const backToTopBtn = document.getElementById('backToTopBtn');
    const currentYearSpan = document.getElementById('currentYear');
    const menuIconSvg = document.querySelector('.lucide-menu-icon');

    let isMenuOpen = false;

    // --- 1. Mobile Navigation Toggle ---
    if (menuBtn && menuIconSvg) {
        menuBtn.addEventListener('click', () => {
            isMenuOpen = !isMenuOpen;
            navLinksContainer.classList.toggle('active', isMenuOpen);
            menuBtn.classList.toggle('active', isMenuOpen);

            if (isMenuOpen) {
                menuIconSvg.innerHTML = `
                    <line x1="18" y1="6" x2="6" y2="18"/>
                    <line x1="6" y1="6" x2="18" y2="18"/>
                `;
            } else {
                menuIconSvg.innerHTML = `
                    <line x1="4" x2="20" y1="12" y2="12"/>
                    <line x1="4" x2="20" y1="6" y2="6"/>
                    <line x1="4" x2="20" y1="18" y2="18"/>
                `;
            }

            menuBtn.setAttribute('aria-expanded', isMenuOpen);
        });
    }

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
        if (window.scrollY > scrollThreshold) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

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
            typedTextSpan.setAttribute('aria-label', displayedText);

            let typeSpeed = isDeleting ? deletingSpeed : typingSpeed;

            if (!isDeleting && charIndex === currentWord.length) {
                typeSpeed = delayBetweenWords;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % wordsToType.length;
                typeSpeed = typingSpeed * 1.5;
            }

            setTimeout(type, typeSpeed);
        }
        setTimeout(type, 500);
    }


    // --- 5. Skill Bar Animation (Intersection Observer) ---
    const skillObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target.querySelector('.skill-progress');
                if (progressBar) {
                    const targetWidth = progressBar.getAttribute('data-progress');
                    if (targetWidth) {
                        progressBar.style.width = targetWidth;
                    }
                    observer.unobserve(entry.target);
                }
            }
        });
    }, { threshold: 0.3 });

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


    // --- 8. Code syntax highlighting ---
    hljs.highlightAll();

    // --- 9. Line numbering ---
    hljs.initLineNumbersOnLoad();
});