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
    const visibleSlides = 30; // Number of visible slides at a time
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
            }, 700);
        }
    }, 3000); // Adjust the interval as needed
});

const boxes = document.querySelectorAll('.box ,.nyligpro-container, porto');
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

    document.addEventListener("DOMContentLoaded", () => {
        // Create an intersection observer instance
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Add class to h1 when section is visible
                    entry.target.querySelector('h1').classList.add('visible');
                    /*entry.target.querySelector('p').classList.add('visible'); */
                }
            });
        }, {
            threshold: 0.1 // Adjust this to determine when the element should become visible
        });
    
        // Observe each section within main
        document.querySelectorAll('main section').forEach(section => {
            observer.observe(section);
        });
    });

    document.addEventListener("DOMContentLoaded", function() {
        const elements = document.querySelectorAll('.fagfelt h1, .fagfelt h2, .fagfelt h3');
    
        let animationFrameId;
    
        function updateAnimations() {
            elements.forEach(element => {
                const rect = element.getBoundingClientRect();
                const elementTop = rect.top + window.scrollY;
                const scrollPosition = window.scrollY + window.innerHeight;
                const elementHeight = rect.height;
    
                if (scrollPosition > elementTop && scrollPosition < elementTop + elementHeight) {
                    const scrollFraction = (scrollPosition - elementTop) / elementHeight;
                    element.style.opacity = scrollFraction; // Fade in/out based on scroll position
                    element.style.transform = `translateY(${(1 - scrollFraction) * 50}px)`; // Move element based on scroll position
                }
            });
    
            // Continue to request animation frame for smooth updates
            animationFrameId = requestAnimationFrame(updateAnimations);
        }
    
        function onScroll() {
            // Cancel the previous animation frame to avoid redundant calls
            if (animationFrameId) {
                cancelAnimationFrame(animationFrameId);
            }
            // Request a new animation frame
            animationFrameId = requestAnimationFrame(updateAnimations);
        }
    
        // Update animations on scroll and resize
        window.addEventListener('scroll', onScroll);
        window.addEventListener('resize', onScroll);
    
        // Initial update
        updateAnimations();
    });

    document.addEventListener("DOMContentLoaded", () => {
        // Helper function to get URL parameter
        function getURLParameter(name) {
            return new URLSearchParams(window.location.search).get(name);
        }
    
        // Get filter from URL parameter or default to 'all'
        let activeFilter = getURLParameter('filter') || 'all';
    
        // Set the active filter button
        document.querySelectorAll('.portfolio-filter button').forEach(button => {
            const filter = button.getAttribute('data-filter');
    
            if (filter === activeFilter) {
                button.classList.add('active');
            } else {
                button.classList.remove('active');
            }
    
            button.addEventListener('click', () => {
                const newFilter = button.getAttribute('data-filter');
    
                if (newFilter === activeFilter) {
                    // If the active button is clicked again, reset to show all
                    activeFilter = 'all';
                    history.pushState(null, '', 'portfolio.html'); // Reset URL
                    document.querySelectorAll('.portfolio-filter button').forEach(btn => btn.classList.remove('active'));
                    document.querySelectorAll('.portfolio-item').forEach(item => item.style.display = 'block');
                } else {
                    // Otherwise, filter as usual
                    activeFilter = newFilter;
                    history.pushState(null, '', `portfolio.html?filter=${newFilter}`);
                    document.querySelectorAll('.portfolio-filter button').forEach(btn => btn.classList.remove('active'));
                    button.classList.add('active');
                    document.querySelectorAll('.portfolio-item').forEach(item => {
                        if (newFilter === 'all' || item.getAttribute('data-category') === newFilter) {
                            item.style.display = 'block';
                        } else {
                            item.style.display = 'none';
                        }
                    });
                }
            });
        });
    
        // Apply initial filter
        document.querySelectorAll('.portfolio-item').forEach(item => {
            if (activeFilter === 'all' || item.getAttribute('data-category') === activeFilter) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    
        // Project details functionality
        document.querySelectorAll('.portfolio-item').forEach(item => {
            item.addEventListener('click', () => {
                const details = item.querySelector('.project-details');
                const overlay = document.createElement('div');
                overlay.classList.add('overlay', 'visible');
                document.body.appendChild(overlay);
    
                details.classList.add('visible');
    
                overlay.addEventListener('click', () => {
                    details.classList.remove('visible');
                    document.body.removeChild(overlay);
                });
            });
        });
    });