document.addEventListener("DOMContentLoaded", function() {
    // --- DOM Elements ---
    const mainText = document.querySelector(".hero-content h1");
    const subText = document.querySelector(".hero-content h2");
    const navbarLinks = document.querySelectorAll(".navbar-links a");
    const footerLinks = document.querySelectorAll(".footer-links a");
    const heroSection = document.querySelector("#home");
    const planetsSection = document.querySelector("#planets");
    const aboutSection = document.querySelector("#about");
    const contactSection = document.querySelector("#contact");
    const footer = document.querySelector("footer");
    const distanceBar = document.querySelector(".distance-bar");
    const distanceBarThumb = document.querySelector(".distance-bar-thumb");

    // --- Hero Section Fade-In and Slide-In Text Animation ---
    if (mainText) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    mainText.classList.add("fade-slide-in");
                }
            });
        }, { threshold: 0.5 });

        observer.observe(mainText);
    }

    if (subText) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    subText.classList.add("fade-in");
                }
            });
        }, { threshold: 0.5 });

        observer.observe(subText);
    }

    // --- Fixed Smooth Scroll for Navigation Links ---
    // Get all navbar and footer links
    const allNavLinks = document.querySelectorAll('.navbar-links a, .footer-links a');
    
    // Add click event listener to each link
    allNavLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Prevent default anchor behavior
            e.preventDefault();
            
            // Get the target section id from the href attribute
            const targetId = this.getAttribute('href');
            
            // Find the target section
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                // Calculate position with offset for navbar
                const offsetTop = targetSection.getBoundingClientRect().top + window.pageYOffset - 60;
                
                // Scroll to the target section smoothly
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- Hero Section Parallax Effect ---
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        if (heroSection) {
            heroSection.style.transform = `translateY(${scrollPosition * 0.1}px)`; // Parallax effect for hero section
        }
    });

    // --- Fade-In Animation for About Section ---
    if (aboutSection) {
        const aboutObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    aboutSection.classList.add("fade-in");
                }
            });
        }, { threshold: 0.5 });

        aboutObserver.observe(aboutSection);
    }

    // --- Fade-In Animation for Footer ---
    if (footer) {
        const footerObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    footer.classList.add("fade-in");
                }
            });
        }, { threshold: 0.5 });

        footerObserver.observe(footer);
    }
    
    // Log to verify script is running
    console.log("Navigation script loaded and running");
});
