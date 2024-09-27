document.addEventListener('DOMContentLoaded', () => {
    // Hamburger Menu Functionality
    const menuIcon = document.querySelector('.menu-icon');
    const navLinks = document.querySelector('.nav-links');
    const nav = document.querySelector('nav'); // Reference to nav for additional classes if needed

    if (menuIcon && navLinks) {
        const toggleMenu = () => {
            const isActive = navLinks.classList.toggle('active');
            menuIcon.classList.toggle('open');
            menuIcon.setAttribute('aria-expanded', isActive);
            nav.classList.toggle('menu-open', isActive); // Optional: Toggle class on nav for additional styles
            document.body.classList.toggle('no-scroll', isActive); // Prevent body scroll when menu is open
        };

        menuIcon.addEventListener('click', toggleMenu);

        menuIcon.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleMenu();
            }
        });

        // Close the menu when a navigation link is clicked
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (navLinks.classList.contains('active')) {
                    toggleMenu();
                }
            });
        });
    } else {
        console.warn("Menu icon or navigation links not found.");
    }

    // Carousel Functionality
    let slideIndex = 0;
    let autoScrollInterval;
    const slides = document.querySelectorAll(".testimonial");
    const prevBtn = document.querySelector(".prev");
    const nextBtn = document.querySelector(".next");

    if (slides.length === 0) {
        console.warn("No slides found for the carousel.");
    }

    // Function to show slides
    function showSlides(n) {
        slideIndex = (n + slides.length) % slides.length; // Wrap around
        slides.forEach((slide, index) => {
            slide.classList.toggle("active", index === slideIndex);
        });
    }

    // Next/previous controls
    if (prevBtn && nextBtn) {
        nextBtn.addEventListener("click", () => {
            slideIndex++;
            showSlides(slideIndex);
            resetAutoScroll();
        });

        prevBtn.addEventListener("click", () => {
            slideIndex--;
            showSlides(slideIndex);
            resetAutoScroll();
        });
    } else {
        console.warn("Previous or Next buttons not found for the carousel.");
    }

    // Auto-scroll every 5 seconds
    function startAutoScroll() {
        autoScrollInterval = setInterval(() => {
            slideIndex++;
            showSlides(slideIndex);
        }, 5000);
    }

    function resetAutoScroll() {
        clearInterval(autoScrollInterval);
        startAutoScroll();
    }

    if (slides.length > 0) {
        showSlides(slideIndex);
        startAutoScroll();

        // Pause auto-scroll on hover and resume on mouse leave
        const carousel = document.querySelector('.testimonial-carousel');
        if (carousel) {
            carousel.addEventListener('mouseenter', () => {
                clearInterval(autoScrollInterval);
            });

            carousel.addEventListener('mouseleave', () => {
                startAutoScroll();
            });
        }
    }

    // Read More Functionality for Testimonials
    const testimonials = document.querySelectorAll(".testimonial");

    testimonials.forEach((testimonial) => {
        const textElement = testimonial.querySelector(".testimonial-text");
        const readMoreLink = testimonial.querySelector(".read-more-link");

        if (textElement && readMoreLink) {
            const fullText = textElement.textContent.trim();
            const words = fullText.split(/\s+/);
            const wordLimit = 50; // Adjust as needed

            if (words.length > wordLimit) {
                const truncatedText = words.slice(0, wordLimit).join(' ') + '... ';
                textElement.textContent = truncatedText;
                readMoreLink.style.display = 'inline'; // Ensure the link is visible

                readMoreLink.addEventListener('click', (e) => {
                    e.preventDefault();
                    const isExpanded = testimonial.classList.toggle('expanded');
                    textElement.textContent = isExpanded ? fullText + ' ' : truncatedText;
                    readMoreLink.textContent = isExpanded ? 'Read less' : 'Read more';
                });
            } else {
                readMoreLink.style.display = 'none'; // Hide the link if text is short
            }
        } else {
            console.warn("Missing .testimonial-text or .read-more-link in a testimonial.");
        }
    });

    // Accordion Functionality
    accordions.forEach((accordion) => {
    const header = accordion.querySelector(".accordion-header");

    header.addEventListener("click", () => {
        const isOpen = accordion.classList.toggle("open");

        // Disable hover when open
        if (isOpen) {
            header.classList.add('no-hover');
        } else {
            header.classList.remove('no-hover');
        }

        // Close other accordions
        accordions.forEach((acc) => {
            if (acc !== accordion && acc.classList.contains('open')) {
                acc.classList.remove("open");
                const otherHeader = acc.querySelector(".accordion-header");
                otherHeader.classList.remove('no-hover');
            }
        });
    });
});

    // Smooth Scrolling for Navigation Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            // Prevent default if it's not a disabled link
            if (!this.classList.contains('disabled-btn')) {
                e.preventDefault();

                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Highlight Active Navigation Link on Scroll
    window.addEventListener('scroll', () => {
        let current = '';
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-links a');

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= sectionTop - 70) { // Adjusted offset for better accuracy
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    });
});
