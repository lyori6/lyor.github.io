// script.js

// Carousel Functionality
let slideIndex = 0;
let autoScrollInterval;
const slides = document.getElementsByClassName("testimonial");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");

// Function to show slides
function showSlides(n) {
    if (n >= slides.length) { slideIndex = 0; }
    if (n < 0) { slideIndex = slides.length - 1; }
    for (let i = 0; i < slides.length; i++) {
        slides[i].classList.remove("active");
    }
    slides[slideIndex].classList.add("active");
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
const readMoreLinks = document.querySelectorAll(".read-more-link");

readMoreLinks.forEach((link, index) => {
    link.addEventListener("click", (e) => {
        e.preventDefault();
        const testimonial = link.closest('.testimonial');
        testimonial.classList.add("expanded");
        clearInterval(autoScrollInterval);
    });
});

// Accordion Functionality
const accordions = document.querySelectorAll(".accordion");

// Open the first accordion on load
if (accordions.length > 0) {
    const firstAccordion = accordions[0];
    firstAccordion.classList.add("open");
    const content = firstAccordion.querySelector(".accordion-content");
    const icon = firstAccordion.querySelector(".accordion-icon");
    content.style.display = "block";
    icon.style.transform = "rotate(180deg)";
}

accordions.forEach((accordion) => {
    const header = accordion.querySelector(".accordion-header");
    const content = accordion.querySelector(".accordion-content");
    const icon = accordion.querySelector(".accordion-icon");

    header.addEventListener("click", () => {
        accordion.classList.toggle("open");
        if (accordion.classList.contains("open")) {
            content.style.display = "block";
            icon.style.transform = "rotate(180deg)";
        } else {
            content.style.display = "none";
            icon.style.transform = "rotate(0deg)";
        }
    });
});