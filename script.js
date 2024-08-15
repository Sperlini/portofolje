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

document.addEventListener("DOMContentLoaded", function() {
    const slideshow = document.querySelector('.slideshow');
    const slides = document.querySelectorAll('.slide');
    
    const totalSlides = slides.length;
    const visibleSlides = 20; // Number of visible slides at a time
    const slideWidth = 100 / visibleSlides; // Percentage width for each slide
    
    // Clone the first 4 slides and append them to the end of the slideshow
    for (let i = 0; i < visibleSlides; i++) {
        slideshow.appendChild(slides[i].cloneNode(true));
    }

    // Set the width of the slideshow container
    slideshow.style.width = `${(totalSlides + visibleSlides) * slideWidth}%`;

    let index = 0;
    setInterval(() => {
        index++;
        slideshow.style.transition = 'transform 0.5s ease-in-out';
        slideshow.style.transform = `translateX(-${index * slideWidth}%)`;
        
        // Reset the position to create the infinite loop effect
        if (index >= totalSlides) {
            setTimeout(() => {
                slideshow.style.transition = 'none';
                slideshow.style.transform = 'translateX(0)';
                index = 0;
            }, 900);
        }
    }, 3000); // Adjust the interval as needed
});

const boxes = document.querySelectorAll('.box');
    window.addEventListener('scroll', function() {
        let currentColorClass = '';

        boxes.forEach(box => {
            const boxTop = box.getBoundingClientRect().top;
            const boxBottom = box.getBoundingClientRect().bottom;
            const windowHeight = window.innerHeight;
            
            if (boxTop < windowHeight && boxBottom >= 0) {
                currentColorClass = box.classList.contains('color1') ? 'color1' :
                                    box.classList.contains('color2') ? 'color2' :
                                    box.classList.contains('color3') ? 'color3' :
                                    box.classList.contains('color4') ? 'color4' : '';
                return; // Exit loop early if any box is in view
            }
        });

        document.body.className = ''; // Remove any existing color class
        if (currentColorClass) {
            document.body.classList.add(currentColorClass); // Add the new color class
        }
    });