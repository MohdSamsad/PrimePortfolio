// DOM Elements
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const mobileMenu = document.querySelector('.mobile-menu');
const primeNav = document.querySelector('.prime-nav');
const backToTopBtn = document.createElement('button');
backToTopBtn.className = 'back-to-top';
backToTopBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';

// Add back to top button to page
document.body.appendChild(backToTopBtn);

// Mobile Menu Toggle - FIXED
mobileMenuBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    mobileMenu.classList.toggle('active');
    const icon = mobileMenuBtn.querySelector('i');
    if (mobileMenu.classList.contains('active')) {
        icon.className = 'fas fa-times';
        document.body.style.overflow = 'hidden';
    } else {
        icon.className = 'fas fa-bars';
        document.body.style.overflow = '';
    }
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!mobileMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
        mobileMenu.classList.remove('active');
        const icon = mobileMenuBtn.querySelector('i');
        icon.className = 'fas fa-bars';
        document.body.style.overflow = '';
    }
});

// Close mobile menu when clicking a link
document.querySelectorAll('.mobile-menu a').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        const icon = mobileMenuBtn.querySelector('i');
        icon.className = 'fas fa-bars';
        document.body.style.overflow = '';
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        primeNav.classList.add('scrolled');
    } else {
        primeNav.classList.remove('scrolled');
    }
    
    // Show/hide back to top button
    if (window.scrollY > 300) {
        backToTopBtn.classList.add('visible');
    } else {
        backToTopBtn.classList.remove('visible');
    }
});

// Back to top functionality
backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Carousel functionality
const carousels = document.querySelectorAll('.skills-carousel');
const prevBtns = document.querySelectorAll('.carousel-btn.prev');
const nextBtns = document.querySelectorAll('.carousel-btn.next');

prevBtns.forEach((btn, index) => {
    btn.addEventListener('click', () => {
        carousels[index].scrollBy({ left: -250, behavior: 'smooth' });
    });
});

nextBtns.forEach((btn, index) => {
    btn.addEventListener('click', () => {
        carousels[index].scrollBy({ left: 250, behavior: 'smooth' });
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            e.preventDefault();
            
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
            
            // Update active nav link
            document.querySelectorAll('.nav-links li, .mobile-menu li').forEach(li => {
                li.classList.remove('active');
            });
            this.parentElement.classList.add('active');
        }
    });
});

// Form submission
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const name = this.querySelector('input[type="text"]').value;
        const email = this.querySelector('input[type="email"]').value;
        const subject = this.querySelectorAll('input[type="text"]')[1].value;
        const message = this.querySelector('textarea').value;
        
        // Simulate form submission
        const submitBtn = this.querySelector('.submit-btn');
        const originalText = submitBtn.innerHTML;
        const originalWidth = submitBtn.offsetWidth;
        
        submitBtn.style.width = originalWidth + 'px';
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            // In a real application, you would send this to a server
            alert(`Thank you for your message, ${name}! I will get back to you soon at ${email}.`);
            
            // Reset form
            this.reset();
            submitBtn.innerHTML = originalText;
            submitBtn.style.width = '';
            submitBtn.disabled = false;
        }, 1500);
    });
}

// Play button functionality
const playBtn = document.querySelector('.play-btn');
if (playBtn) {
    playBtn.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Create modal for video/content
        const modal = document.createElement('div');
        modal.className = 'video-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <button class="close-modal"><i class="fas fa-times"></i></button>
                <div class="video-container">
                    <div class="placeholder-video">
                        <i class="fas fa-play-circle"></i>
                        <h3>Database Architecture Overview</h3>
                        <p>A preview of my database architecture expertise</p>
                        <p style="margin-top: 20px; color: #ccc; font-size: 0.9rem;">This would be a video presentation in a real implementation</p>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        document.body.style.overflow = 'hidden';
        
        // Add styles for modal
        const style = document.createElement('style');
        style.textContent = `
            .video-modal {
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(0, 0, 0, 0.95);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 10000;
                padding: 20px;
            }
            .modal-content {
                background: var(--prime-dark-blue);
                padding: 2rem;
                border-radius: 10px;
                max-width: 800px;
                width: 100%;
                position: relative;
                border: 1px solid var(--prime-blue);
            }
            .close-modal {
                position: absolute;
                top: 15px;
                right: 15px;
                background: none;
                border: none;
                color: white;
                font-size: 1.5rem;
                cursor: pointer;
                z-index: 10001;
                padding: 5px;
            }
            .placeholder-video {
                background: var(--prime-gray);
                height: 300px;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                border-radius: 8px;
                padding: 2rem;
                text-align: center;
            }
            .placeholder-video i {
                font-size: 4rem;
                color: var(--prime-blue);
                margin-bottom: 1rem;
            }
            .placeholder-video h3 {
                margin-bottom: 0.5rem;
                color: var(--prime-white);
            }
            .placeholder-video p {
                color: #ccc;
                max-width: 400px;
            }
            @media (max-width: 768px) {
                .modal-content {
                    padding: 1.5rem;
                }
                .placeholder-video {
                    height: 250px;
                    padding: 1rem;
                }
                .placeholder-video i {
                    font-size: 3rem;
                }
            }
        `;
        document.head.appendChild(style);
        
        // Close modal functionality
        const closeModal = modal.querySelector('.close-modal');
        closeModal.addEventListener('click', () => {
            document.body.removeChild(modal);
            document.head.removeChild(style);
            document.body.style.overflow = '';
        });
        
        // Close modal on outside click
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                document.body.removeChild(modal);
                document.head.removeChild(style);
                document.body.style.overflow = '';
            }
        });
        
        // Close modal on ESC key
        document.addEventListener('keydown', function closeOnEsc(e) {
            if (e.key === 'Escape') {
                document.body.removeChild(modal);
                document.head.removeChild(style);
                document.body.style.overflow = '';
                document.removeEventListener('keydown', closeOnEsc);
            }
        });
    });
}

// Add to Watchlist functionality
const addBtn = document.querySelector('.add-btn');
if (addBtn) {
    addBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const originalText = addBtn.innerHTML;
        const originalBg = addBtn.style.background;
        const originalColor = addBtn.style.color;
        const originalBorder = addBtn.style.borderColor;
        
        addBtn.innerHTML = '<i class="fas fa-check"></i> Added to Watchlist';
        addBtn.style.background = 'var(--prime-green)';
        addBtn.style.color = 'white';
        addBtn.style.borderColor = 'var(--prime-green)';
        
        setTimeout(() => {
            addBtn.innerHTML = originalText;
            addBtn.style.background = originalBg;
            addBtn.style.color = originalColor;
            addBtn.style.borderColor = originalBorder;
        }, 2000);
    });
}

// More Details button functionality
const moreBtn = document.querySelector('.more-btn');
if (moreBtn) {
    moreBtn.addEventListener('click', (e) => {
        e.preventDefault();
        // Scroll to about section or show more info
        document.querySelector('#skills').scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    });
}

// Search functionality
const searchInput = document.querySelector('.search-box input');
if (searchInput) {
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase().trim();
        if (searchTerm.length > 2) {
            // Search through content
            const searchableElements = document.querySelectorAll('h1, h2, h3, h4, p, .skill-card h3, .exp-content h3, .cert-card h3');
            let found = false;
            
            searchableElements.forEach(el => {
                const text = el.textContent.toLowerCase();
                if (text.includes(searchTerm)) {
                    el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    el.style.backgroundColor = 'rgba(0, 168, 225, 0.2)';
                    el.style.padding = '5px';
                    el.style.borderRadius = '3px';
                    setTimeout(() => {
                        el.style.backgroundColor = '';
                        el.style.padding = '';
                    }, 2000);
                    found = true;
                }
            });
            
            if (!found) {
                console.log('No results found for:', searchTerm);
            }
        }
    });
}

// Initialize animations on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            
            if (entry.target.classList.contains('skill-card') || 
                entry.target.classList.contains('experience-card') || 
                entry.target.classList.contains('cert-card') || 
                entry.target.classList.contains('project-card')) {
                entry.target.classList.add('slide-up');
            }
            
            // Animate skill progress bars
            if (entry.target.classList.contains('skill-card')) {
                const progress = entry.target.querySelector('.progress');
                if (progress) {
                    const width = progress.style.width;
                    progress.style.width = '0';
                    setTimeout(() => {
                        progress.style.width = width;
                        progress.style.transition = 'width 1.5s ease-in-out';
                    }, 300);
                }
            }
        }
    });
}, observerOptions);

// Observe elements on page load
document.addEventListener('DOMContentLoaded', () => {
    // Observe animated elements
    document.querySelectorAll('.skill-card, .experience-card, .cert-card, .project-card, .pub-content, .contact-info').forEach(el => {
        observer.observe(el);
    });
    
    // Set initial styles for animation
    document.querySelectorAll('.skill-card, .experience-card, .cert-card, .project-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
    });
    
    // Update copyright year
    const yearElements = document.querySelectorAll('.copyright p, .footer-bottom p');
    yearElements.forEach(el => {
        if (el.textContent.includes('2024')) {
            const currentYear = new Date().getFullYear();
            el.innerHTML = el.innerHTML.replace('2024', currentYear);
        }
    });
    
    // Set current year in hero
    const heroYear = document.querySelector('.hero-meta .year');
    if (heroYear) {
        const startYear = 2009;
        const currentYear = new Date().getFullYear();
        const experience = currentYear - startYear;
        heroYear.textContent = `${experience}+ Years Experience`;
    }
    
    // Profile image hover effect
    const profileImg = document.getElementById('profile-img');
    if (profileImg) {
        profileImg.addEventListener('mouseenter', () => {
            profileImg.style.transform = 'scale(1.1)';
            profileImg.style.transition = 'transform 0.3s';
        });
        
        profileImg.addEventListener('mouseleave', () => {
            profileImg.style.transform = 'scale(1)';
        });
    }
    
    // Initialize carousel buttons visibility
    updateCarouselButtons();
});

// Update carousel button visibility based on scroll
function updateCarouselButtons() {
    carousels.forEach((carousel, index) => {
        const prevBtn = prevBtns[index];
        const nextBtn = nextBtns[index];
        
        carousel.addEventListener('scroll', () => {
            const isAtStart = carousel.scrollLeft === 0;
            const isAtEnd = carousel.scrollLeft + carousel.clientWidth >= carousel.scrollWidth - 1;
            
            prevBtn.style.opacity = isAtStart ? '0.3' : '0.8';
            prevBtn.style.pointerEvents = isAtStart ? 'none' : 'auto';
            
            nextBtn.style.opacity = isAtEnd ? '0.3' : '0.8';
            nextBtn.style.pointerEvents = isAtEnd ? 'none' : 'auto';
        });
    });
}

// Handle window resize
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        // Close mobile menu on large screens
        if (window.innerWidth > 768) {
            mobileMenu.classList.remove('active');
            const icon = mobileMenuBtn.querySelector('i');
            icon.className = 'fas fa-bars';
            document.body.style.overflow = '';
        }
        
        // Update carousel button positions
        updateCarouselButtons();
    }, 250);
});

// Add keyboard navigation
document.addEventListener('keydown', (e) => {
    // Close modal on ESC
    if (e.key === 'Escape') {
        const modal = document.querySelector('.video-modal');
        if (modal) {
            document.body.removeChild(modal);
            document.body.style.overflow = '';
        }
        
        // Close mobile menu
        if (mobileMenu.classList.contains('active')) {
            mobileMenu.classList.remove('active');
            const icon = mobileMenuBtn.querySelector('i');
            icon.className = 'fas fa-bars';
            document.body.style.overflow = '';
        }
    }
    
    // Navigate carousels with arrow keys
    if (e.key === 'ArrowLeft') {
        prevBtns.forEach(btn => btn.click());
    }
    if (e.key === 'ArrowRight') {
        nextBtns.forEach(btn => btn.click());
    }
});

// Add touch support for carousels on mobile
carousels.forEach(carousel => {
    let startX;
    let scrollLeft;
    let isDown = false;
    
    carousel.addEventListener('touchstart', (e) => {
        isDown = true;
        startX = e.touches[0].pageX - carousel.offsetLeft;
        scrollLeft = carousel.scrollLeft;
    });
    
    carousel.addEventListener('touchmove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.touches[0].pageX - carousel.offsetLeft;
        const walk = (x - startX) * 2;
        carousel.scrollLeft = scrollLeft - walk;
    });
    
    carousel.addEventListener('touchend', () => {
        isDown = false;
    });
});

// Initialize with animations
setTimeout(() => {
    document.querySelector('.hero-content').classList.add('fade-in');
    document.querySelector('.hero-sidebar').classList.add('fade-in');
}, 300);
