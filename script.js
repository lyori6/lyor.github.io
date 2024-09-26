document.addEventListener("DOMContentLoaded", () => {
    // Carousel Functionality
    let slideIndex = 0;
    let autoScrollInterval;
    const slides = document.querySelectorAll(".testimonial");
    const prevBtn = document.querySelector(".prev");
    const nextBtn = document.querySelector(".next");
    
    // Function to show slides
    function showSlides(n) {
        slideIndex = (n + slides.length) % slides.length; // Wrap around
        slides.forEach((slide, index) => {
            slide.classList.toggle("active", index === slideIndex);
        });
    }
    
    // Next/previous controls
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
    
    startAutoScroll();
    
    // Read more functionality for testimonials
    const testimonials = document.querySelectorAll(".testimonial");
    
    testimonials.forEach((testimonial) => {
        const textElement = testimonial.querySelector(".testimonial-text");
        const readMoreBtn = testimonial.querySelector(".read-more-btn");
        
        // Check if text exceeds max-height
        if (textElement.scrollHeight > textElement.clientHeight) {
            readMoreBtn.classList.add("visible");
        }
        
        readMoreBtn.addEventListener("click", () => {
            const isExpanded = textElement.classList.toggle("expanded");
            readMoreBtn.textContent = isExpanded ? "Read less" : "Read more";
            readMoreBtn.setAttribute("aria-expanded", isExpanded);
        });
    });
    
    // Accordion Functionality (Assuming it's needed elsewhere)
    const accordions = document.querySelectorAll(".accordion");
    
    accordions.forEach((accordion) => {
        const header = accordion.querySelector(".accordion-header");
        const content = accordion.querySelector(".accordion-content");
        const icon = accordion.querySelector(".accordion-icon");
    
        header.addEventListener("click", () => {
            // Close all other accordions
            accordions.forEach((acc) => {
                if (acc !== accordion) {
                    acc.classList.remove("open");
                    acc.querySelector(".accordion-content").style.display = "none";
                    acc.querySelector(".accordion-icon").style.transform = "rotate(0deg)";
                }
            });
    
            // Toggle the clicked accordion
            const isOpen = accordion.classList.toggle("open");
            content.style.display = isOpen ? "block" : "none";
            icon.style.transform = isOpen ? "rotate(180deg)" : "rotate(0deg)";
        });
    });
    
    // Button Hover Functionality for Disabled Buttons
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
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
    
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
    
    // Highlight active navigation link on scroll
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
    
    // Add animation to skills section (if you have one)
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