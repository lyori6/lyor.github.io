// script.js

// Carousel Functionality
let slideIndex = 0;
let autoScrollInterval;
const slides = document.getElementsByClassName("testimonial");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");

// Initialize the first slide
showSlides(slideIndex);

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
        const testimonial = slides[index];
        testimonial.classList.add("expanded");
        clearInterval(autoScrollInterval);
    });
});

// Accordion Functionality
const accordions = document.querySelectorAll(".accordion");

accordions.forEach((accordion) => {
    const header = accordion.querySelector(".accordion-header");
    const content = accordion.querySelector(".accordion-content");
    const icon = accordion.querySelector(".fas");

    header.addEventListener("click", () => {
        accordion.classList.toggle("open");
        if (accordion.classList.contains("open")) {
            content.style.display = "block";
        } else {
            content.style.display = "none";
        }
    });
});
