document.addEventListener("DOMContentLoaded", () => {
    // **1. Navigation Menu Toggle**
const menuIcon = document.querySelector('.menu-icon');
const navLinks = document.querySelector('.nav-links');

if (menuIcon && navLinks) {
    menuIcon.addEventListener('click', () => {
        const isActive = navLinks.classList.toggle('active'); // Toggle visibility
        menuIcon.setAttribute('aria-expanded', isActive);
    });

    // Optional: Allow toggling via Enter key for accessibility
    menuIcon.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            const isActive = navLinks.classList.toggle('active');
            menuIcon.setAttribute('aria-expanded', isActive);
        }
    });
} else {
    console.warn("Menu icon or navigation links not found.");
}

    // **2. Carousel Functionality**
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
    }

    // **3. Read More Functionality for Testimonials**
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

    // **4. Accordion Functionality**
    const accordions = document.querySelectorAll(".accordion");
    
    accordions.forEach((accordion) => {
        const header = accordion.querySelector(".accordion-header");
        const content = accordion.querySelector(".accordion-content");
        const icon = accordion.querySelector(".accordion-icon");

        if (header && content && icon) {
            header.addEventListener("click", () => {
                // Close all other accordions
                accordions.forEach((acc) => {
                    if (acc !== accordion) {
                        acc.classList.remove("open");
                    }
                });

                // Toggle the clicked accordion
                accordion.classList.toggle("open");
            });
        } else {
            console.warn("Accordion elements missing in one of the accordions.");
        }
    });

    // **5. Button Hover Functionality for Disabled Buttons**
    const disabledButtons = document.querySelectorAll(".disabled-btn, .debtcat-project-button, .ecocart-project-button");
    
    disabledButtons.forEach((button) => {
        const originalText = button.textContent; // Use textContent to get the button's current text
    
        button.addEventListener("mouseenter", () => {
            button.textContent = "COMING SOON!";
        });
    
        button.addEventListener("mouseleave", () => {
            button.textContent = originalText;
        });
    });

    // **6. Smooth Scrolling for Navigation Links**
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // **7. Highlight Active Navigation Link on Scroll**
    window.addEventListener('scroll', () => {
        let current = '';
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-links a');

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= sectionTop - 60) {
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

    // **8. Skills Section Animation (Optional)**
    const skillBars = document.querySelectorAll('.skill-bar');
    window.addEventListener('scroll', () => {
        skillBars.forEach(bar => {
            const barTop = bar.getBoundingClientRect().top;
            if (barTop < window.innerHeight) {
                bar.classList.add('animate');
            }
        });
    });
});