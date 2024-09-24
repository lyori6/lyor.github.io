let slideIndex = 0;
showSlides(slideIndex);

function showSlides(n) {
    let slides = document.getElementsByClassName("testimonial");
    if (n >= slides.length) { slideIndex = 0; }
    if (n < 0) { slideIndex = slides.length - 1; }
    for (let i = 0; i < slides.length; i++) {
        slides[i].classList.remove("active");
    }
    slides[slideIndex].classList.add("active");
}

// Next/previous controls
document.querySelector(".next").addEventListener("click", () => {
    slideIndex++;
    showSlides(slideIndex);
});

document.querySelector(".prev").addEventListener("click", () => {
    slideIndex--;
    showSlides(slideIndex);
});

// Auto-scroll every 5 seconds
setInterval(() => {
    slideIndex++;
    showSlides(slideIndex);
}, 5000);
