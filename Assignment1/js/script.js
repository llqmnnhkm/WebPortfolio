document.addEventListener('DOMContentLoaded', function() {
    // --- Navigation Toggle Function ---
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');

    if (burger) {
        burger.addEventListener('click', () => {
            // Toggle Nav
            nav.classList.toggle('nav-active');
            
            // Animate Links
            navLinks.forEach((link, index) => {
                if (link.style.animation) {
                    link.style.animation = '';
                } else {
                    link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
                }
            });
            
            // Burger Animation
            burger.classList.toggle('toggle');
        });
    }

    // --- Social Media Tab Switching ---
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    if (tabBtns.length > 0) {
        tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const tabId = btn.getAttribute('data-tab');
                
                // Remove active class from all buttons and contents
                tabBtns.forEach(b => b.classList.remove('active'));
                tabContents.forEach(c => c.classList.remove('active'));
                
                // Add active class to clicked button and corresponding content
                btn.classList.add('active');
                document.getElementById(`${tabId}-feed`).classList.add('active');
            });
        });
    }

    // --- Gallery Category Filtering ---
    const categoryBtns = document.querySelectorAll('.category-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    if (categoryBtns.length > 0) {
        categoryBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const category = btn.getAttribute('data-category');
                
                // Remove active class from all buttons
                categoryBtns.forEach(b => b.classList.remove('active'));
                
                // Add active class to clicked button
                btn.classList.add('active');
                
                // Filter gallery items
                galleryItems.forEach(item => {
                    if (category === 'all' || item.getAttribute('data-category') === category) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
    }

    // --- Poll Form Submission ---
    const pollForm = document.querySelector('.poll-form');
    
    if (pollForm) {
        pollForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get selected option
            const selectedOption = document.querySelector('input[name="poll"]:checked');
            
            if (selectedOption) {
                // In a real implementation, this would send data to a server
                // For demo purposes, we'll just show an alert
                alert('Thank you for voting! Your choice has been recorded.');
            } else {
                alert('Please select an option before voting.');
            }
        });
    }

    // --- Comment Form Submission ---
    const commentForm = document.querySelector('.comment-form');
    
    if (commentForm) {
        commentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const commentText = commentForm.querySelector('textarea').value;
            
            if (commentText.trim() !== '') {
                // In a real implementation, this would send data to a server
                // For demo purposes, we'll just show an alert
                alert('Thank you for your comment! It will be reviewed and posted soon.');
                commentForm.querySelector('textarea').value = '';
            } else {
                alert('Please enter a comment before submitting.');
            }
        });
    }

    // --- Color Palette Generator Demo ---
    const generatePaletteBtn = document.getElementById('generate-palette');
    
    if (generatePaletteBtn) {
        generatePaletteBtn.addEventListener('click', function() {
            const colorSwatches = document.querySelectorAll('.color-swatch');
            
            colorSwatches.forEach(swatch => {
                // Generate random color
                const randomColor = getRandomColor();
                swatch.style.backgroundColor = randomColor;
            });
        });
    }

    // --- Function to generate random color ---
    function getRandomColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    // --- Smooth Scrolling for Anchor Links ---
    const scrollLinks = document.querySelectorAll('a[href^="#"]');
    
    scrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href !== '#') {
                e.preventDefault();
                const targetElement = document.querySelector(href);
                
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 70,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // --- Skill Bar Animation on Scroll ---
    const skillBars = document.querySelectorAll('.skill-level');
    
    if (skillBars.length > 0) {
        // Initial check on page load
        animateSkillBars();
        
        // Check on scroll
        window.addEventListener('scroll', animateSkillBars);
    }
    
    function animateSkillBars() {
        skillBars.forEach(bar => {
            const barPosition = bar.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (barPosition < screenPosition) {
                // Get the width from inline style
                const width = bar.style.width;
                
                // Reset width to 0 and then animate to the original width
                bar.style.width = '0';
                setTimeout(() => {
                    bar.style.transition = 'width 1s ease-in-out';
                    bar.style.width = width;
                }, 100);
                
                // Remove this bar from the animation check
                skillBars.forEach((item, index) => {
                    if (item === bar) {
                        skillBars.splice(index, 1);
                    }
                });
            }
        });
    }
    
    // --- Enhanced Lightbox for Videos ---
    // Initialize lightbox if it exists (gallery page)
    if (typeof lightbox !== 'undefined') {
        lightbox.option({
            'resizeDuration': 200,
            'wrapAround': true,
            'disableScrolling': true
        });
        
        // Custom handler for video links
        document.querySelectorAll('[data-lightbox="video"]').forEach(function(element) {
            element.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Create video modal
                const videoUrl = this.getAttribute('href');
                const videoTitle = this.getAttribute('data-title');
                const modal = document.createElement('div');
                modal.className = 'video-modal';
                
                // Create embed frame
                modal.innerHTML = `
                    <div class="video-modal-content">
                        <h3>${videoTitle}</h3>
                        <div class="video-container">
                            <iframe width="100%" height="100%" src="${videoUrl}" 
                                    frameborder="0" allowfullscreen></iframe>
                        </div>
                        <button class="close-video">Close</button>
                    </div>
                `;
                
                // Add to page and setup close button
                document.body.appendChild(modal);
                modal.querySelector('.close-video').addEventListener('click', function() {
                    document.body.removeChild(modal);
                });
                
                // Close modal when clicking outside content
                modal.addEventListener('click', function(event) {
                    if (event.target === modal) {
                        document.body.removeChild(modal);
                    }
                });
                
                // Close modal with escape key
                document.addEventListener('keydown', function(event) {
                    if (event.key === 'Escape' && document.querySelector('.video-modal')) {
                        document.body.removeChild(modal);
                    }
                });
            });
        });
    }

    // --- Gallery Image Hover Animation ---
    const galleryOverlays = document.querySelectorAll('.gallery-overlay');
    
    if (galleryOverlays.length > 0) {
        galleryOverlays.forEach(overlay => {
            const parent = overlay.parentElement.parentElement;
            
            parent.addEventListener('mouseenter', () => {
                overlay.style.opacity = '1';
                overlay.style.transform = 'translateY(0)';
            });
            
            parent.addEventListener('mouseleave', () => {
                overlay.style.opacity = '0';
                overlay.style.transform = 'translateY(20px)';
            });
        });
    }
});