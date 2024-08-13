document.addEventListener("DOMContentLoaded", function() {
    let images = document.querySelectorAll("#slideshow img");
    let currentIndex = 0;
    const footer = document.querySelector("footer");

    function showNextImage() {
        images[currentIndex].classList.remove("active");
        currentIndex = (currentIndex + 1) % images.length;
        images[currentIndex].classList.add("active");
    }

    setInterval(showNextImage, 3000); // Bytt bilde hvert 3. sekund

    function handleScroll() {
        const scrollPosition = window.scrollY + window.innerHeight;
        const mainSectionTop = document.querySelector("main").offsetTop;
        const documentHeight = document.documentElement.scrollHeight;
        const footerHeight = footer.offsetHeight;

        if (window.scrollY === 0) {
            // Vis fotnoten når du er på toppen av siden
            footer.classList.add("visible");
            footer.classList.remove("hidden");
        } else if (scrollPosition < mainSectionTop) {
            // Vis fotnoten når du er over hovedinnholdet
            footer.classList.add("visible");
            footer.classList.remove("hidden");
        } else if (scrollPosition > documentHeight - footerHeight) {
            // Vis fotnoten når du er nær bunnen av siden
            footer.classList.add("visible");
            footer.classList.remove("hidden");
        } else {
            // Skjul fotnoten når du er i <main> området
            footer.classList.add("hidden");
            footer.classList.remove("visible");
        }
    }

    // Kjør ved første last
    handleScroll();

    // Kjør ved scroll
    window.addEventListener("scroll", handleScroll);
});