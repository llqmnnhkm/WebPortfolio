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

// ======= TIP CARDS FUNCTIONALITY =======
document.addEventListener('DOMContentLoaded', function() {
    try {
        const tipCards = document.querySelectorAll('.tip-card');
        
        // Add touch support detection
        const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
        
        if (tipCards.length) {
            // Add appropriate classes for touch devices
            if (isTouchDevice) {
                document.documentElement.classList.add('touch-device');
                tipCards.forEach(card => {
                    // Add click handler for touch devices
                    card.addEventListener('click', function() {
                        this.classList.toggle('flipped');
                    });
                });
            }
            
            console.log(`${tipCards.length} tip cards initialized successfully`);
        } else {
            console.warn('No tip cards found on the page');
        }
    } catch (error) {
        console.error('Error initializing tip cards:', error);
    }
    
    // Update animation to include tip cards
    try {
        const addAnimationToTipCards = function() {
            const tipCards = document.querySelectorAll('.tip-card');
            if (tipCards.length) {
                tipCards.forEach((card, index) => {
                    card.classList.add('animate-on-scroll');
                    card.style.transitionDelay = `${index * 0.1}s`;
                });
                console.log('Animation added to tip cards');
            }
        };
        
        addAnimationToTipCards();
    } catch (error) {
        console.error('Error adding animations to tip cards:', error);
    }
});

// ======= SCROLLING ANIMATIONS =======
document.addEventListener('DOMContentLoaded', function() {
    try {
        // Add animation classes to elements
        const addAnimationClasses = function() {
            try {
                // Add animation to lifestyle cards
                const lifestyleCards = document.querySelectorAll('.lifestyle-card');
                if (lifestyleCards.length) {
                    lifestyleCards.forEach((card, index) => {
                        card.classList.add('animate-on-scroll');
                        card.style.transitionDelay = `${index * 0.1}s`;
                    });
                }
                
                // Add animation to social posts
                const socialPosts = document.querySelectorAll('.social-post');
                if (socialPosts.length) {
                    socialPosts.forEach((post, index) => {
                        post.classList.add('animate-on-scroll');
                        post.style.transitionDelay = `${index * 0.1}s`;
                    });
                }
                
                // Add animation to section headers
                const sectionHeaders = document.querySelectorAll('.section-header');
                if (sectionHeaders.length) {
                    sectionHeaders.forEach(header => {
                        header.classList.add('animate-on-scroll');
                    });
                }
                
                // Add animation to featured work section
                const featuredWork = document.querySelector('.featured-travel');
                if (featuredWork) {
                    featuredWork.classList.add('animate-on-scroll');
                }

                // Add animation to poll container
                const pollContainer = document.querySelector('.poll-container');
                if (pollContainer) {
                    pollContainer.classList.add('animate-on-scroll');
                }
                
                // Add animation to banner content
                const bannerContent = document.querySelector('.banner-content');
                if (bannerContent) {
                    bannerContent.classList.add('animate-on-scroll');
                }
                
                console.log('Animation classes added successfully');
            } catch (error) {
                console.error('Error adding animation classes:', error);
            }
        };
        
        // Check if IntersectionObserver is supported
        if ('IntersectionObserver' in window) {
            // Elements to animate on scroll
            const elementsToAnimate = document.querySelectorAll('.animate-on-scroll');
            
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
                document.querySelectorAll('.lifestyle-card, .social-post, .section-header, .featured-travel, .poll-container')
                    .forEach(el => el.style.opacity = 1);
            }
        } else {
            // Fallback for browsers that don't support IntersectionObserver
            console.warn('IntersectionObserver not supported');
            document.querySelectorAll('.lifestyle-card, .social-post, .section-header, .featured-travel, .poll-container')
                .forEach(el => el.style.opacity = 1);
        }
    } catch (error) {
        console.error('Error setting up scroll animations:', error);
        // Fallback: make everything visible
        document.querySelectorAll('.lifestyle-card, .social-post, .section-header, .featured-travel, .poll-container')
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