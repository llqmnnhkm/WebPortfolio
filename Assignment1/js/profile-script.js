// ======= DARK/LIGHT MODE TOGGLE =======
document.addEventListener('DOMContentLoaded', function() {
    try {
        // Add the dark mode toggle to the navbar
        const navLinks = document.querySelector('.nav-links');
        if (navLinks) {
            const themeToggle = document.createElement('li');
            themeToggle.innerHTML = '<button id="theme-toggle" aria-label="Toggle dark mode"><i class="fas fa-moon"></i></button>';
            navLinks.appendChild(themeToggle);

            // Initialize theme based on localStorage or default to light
            const currentTheme = localStorage.getItem('theme') || 'light';
            if (currentTheme === 'dark') {
                document.body.classList.add('dark-mode');
                const toggleBtn = document.getElementById('theme-toggle');
                if (toggleBtn) {
                    toggleBtn.innerHTML = '<i class="fas fa-sun"></i>';
                }
            }

            // Theme toggle functionality
            const toggleBtn = document.getElementById('theme-toggle');
            if (toggleBtn) {
                toggleBtn.addEventListener('click', function() {
                    document.body.classList.toggle('dark-mode');
                    
                    const isDarkMode = document.body.classList.contains('dark-mode');
                    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
                    
                    // Change icon based on current mode
                    this.innerHTML = isDarkMode ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
                });
            }
        } else {
            console.error('Navigation links not found');
        }
    } catch (error) {
        console.error('Error in dark mode setup:', error);
    }
});

// ======= SCROLLING ANIMATIONS =======
document.addEventListener('DOMContentLoaded', function() {
    try {
        // Add animation classes to elements
        const addAnimationClasses = function() {
            try {
                // Hero section animation
                const heroText = document.querySelector('.hero-text');
                if (heroText) {
                    heroText.classList.add('animate-on-scroll');
                }
                
                // About section animation
                const aboutContainer = document.querySelector('.about-container');
                if (aboutContainer) {
                    aboutContainer.classList.add('animate-on-scroll');
                }
                
                // Experience cards animation
                const experienceCards = document.querySelectorAll('.experience-card');
                if (experienceCards.length) {
                    experienceCards.forEach((card, index) => {
                        card.classList.add('animate-on-scroll');
                        card.style.transitionDelay = `${index * 0.1}s`;
                    });
                }
                
                // Skills section animation
                const skillsContent = document.querySelector('.skills-content');
                if (skillsContent) {
                    skillsContent.classList.add('animate-on-scroll');
                }
                
                // Skill items staggered animation
                const skillItems = document.querySelectorAll('.skill-item');
                if (skillItems.length) {
                    skillItems.forEach((item, index) => {
                        item.classList.add('animate-on-scroll');
                        item.style.transitionDelay = `${(index * 0.1) + 0.2}s`;
                    });
                }
                
                // Recommendation cards animation
                const recommendationCards = document.querySelectorAll('.recommendation-card');
                if (recommendationCards.length) {
                    recommendationCards.forEach((card, index) => {
                        card.classList.add('animate-on-scroll');
                        card.style.transitionDelay = `${index * 0.15}s`;
                    });
                }
                
                console.log('Animation classes added successfully');
            } catch (error) {
                console.error('Error adding animation classes:', error);
            }
        };
        
        // Check if IntersectionObserver is supported
        if ('IntersectionObserver' in window) {
            // Intersection Observer for scroll animations
            const observerOptions = {
                root: null,
                rootMargin: '0px',
                threshold: 0.2
            };
            
            const observer = new IntersectionObserver(function(entries, observer) {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animated');
                        // Stop observing after animation is triggered
                        observer.unobserve(entry.target);
                    }
                });
            }, observerOptions);
            
            // Add animation classes first
            addAnimationClasses();
            
            // Then observe all elements with animate-on-scroll class
            const animatedElements = document.querySelectorAll('.animate-on-scroll');
            if (animatedElements.length) {
                animatedElements.forEach(element => {
                    observer.observe(element);
                });
                console.log(`Observing ${animatedElements.length} elements for animation`);
            } else {
                console.warn('No elements found with animate-on-scroll class');
                // Fallback: just make everything visible without animations
                document.querySelectorAll('.hero-text, .about-container, .experience-card, .skills-content, .skill-item, .recommendation-card')
                    .forEach(el => el.style.opacity = 1);
            }
        } else {
            // Fallback for browsers that don't support IntersectionObserver
            console.warn('IntersectionObserver not supported');
            document.querySelectorAll('.hero-text, .about-container, .experience-card, .skills-content, .skill-item, .recommendation-card')
                .forEach(el => el.style.opacity = 1);
        }
    } catch (error) {
        console.error('Error setting up scroll animations:', error);
        // Fallback: make everything visible
        document.querySelectorAll('.hero-text, .about-container, .experience-card, .skills-content, .skill-item, .recommendation-card')
            .forEach(el => el.style.opacity = 1);
    }
});

// Mobile navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    try {
        const burger = document.querySelector('.burger');
        const nav = document.querySelector('.nav-links');
        
        if (burger && nav) {
            burger.addEventListener('click', function() {
                nav.classList.toggle('nav-active');
                burger.classList.toggle('toggle');
            });
        } else {
            console.error('Mobile navigation elements not found');
        }
    } catch (error) {
        console.error('Error setting up mobile navigation:', error);
    }
    
    // Manually trigger animations for elements that are already in view
    setTimeout(function() {
        try {
            const animatedElements = document.querySelectorAll('.animate-on-scroll');
            if (animatedElements.length) {
                animatedElements.forEach(el => {
                    const rect = el.getBoundingClientRect();
                    if (rect.top < window.innerHeight && rect.bottom > 0) {
                        el.classList.add('animated');
                    }
                });
            }
        } catch (error) {
            console.error('Error triggering initial animations:', error);
        }
    }, 500);
});