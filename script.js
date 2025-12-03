// Mobile Menu Toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const mobileMenu = document.querySelector('.mobile-menu');
const primeNav = document.querySelector('.prime-nav');

mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
    mobileMenuBtn.innerHTML = mobileMenu.classList.contains('active') 
        ? '<i class="fas fa-times"></i>' 
        : '<i class="fas fa-bars"></i>';
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!mobileMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
        mobileMenu.classList.remove('active');
        mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    }
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        primeNav.classList.add('scrolled');
    } else {
        primeNav.classList.remove('scrolled');
    }
});

// Carousel functionality
const carousels = document.querySelectorAll('.skills-carousel');
const prevBtns = document.querySelectorAll('.carousel-btn.prev');
const nextBtns = document.querySelectorAll('.carousel-btn.next');

prevBtns.forEach((btn, index) => {
    btn.addEventListener('click', () => {
        carousels[index].scrollBy({ left: -300, behavior: 'smooth' });
    });
});

nextBtns.forEach((btn, index) => {
    btn.addEventListener('click', () => {
        carousels[index].scrollBy({ left: 300, behavior: 'smooth' });
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            // Close mobile menu if open
            mobileMenu.classList.remove('active');
            mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
            
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
            
            // Update active nav link
            document.querySelectorAll('.nav-links a, .mobile-menu a').forEach(link => {
                link.parentElement.classList.remove('active');
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
        const formData = new FormData(this);
        const name = this.querySelector('input[type="text"]').value;
        const email = this.querySelector('input[type="email"]').value;
        const message = this.querySelector('textarea').value;
        
        // Simulate form submission
        const submitBtn = this.querySelector('.submit-btn');
        const originalText = submitBtn.innerHTML;
        
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            // In a real application, you would send this to a server
            alert(`Thank you for your message, ${name}! I will get back to you soon at ${email}.`);
            
            // Reset form
            this.reset();
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }, 1500);
    });
}

// Play button functionality
const playBtn = document.querySelector('.play-btn');
if (playBtn) {
    playBtn.addEventListener('click', () => {
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
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Add styles for modal
        const style = document.createElement('style');
        style.textContent = `
            .video-modal {
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(0, 0, 0, 0.9);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 10000;
            }
            .modal-content {
                background: var(--prime-dark-blue);
                padding: 2rem;
                border-radius: 10px;
                max-width: 800px;
                width: 90%;
                position: relative;
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
            }
            .placeholder-video {
                background: var(--prime-gray);
                height: 400px;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                border-radius: 8px;
            }
            .placeholder-video i {
                font-size: 4rem;
                color: var(--prime-blue);
                margin-bottom: 1rem;
            }
            .placeholder-video h3 {
                margin-bottom: 0.5rem;
            }
            .placeholder-video p {
                color: #ccc;
            }
        `;
        document.head.appendChild(style);
        
        // Close modal functionality
        modal.querySelector('.close-modal').addEventListener('click', () => {
            document.body.removeChild(modal);
            document.head.removeChild(style);
        });
        
        // Close modal on outside click
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                document.body.removeChild(modal);
                document.head.removeChild(style);
            }
        });
    });
}

// Add to Watchlist functionality
const addBtn = document.querySelector('.add-btn');
if (addBtn) {
    addBtn.addEventListener('click', () => {
        const originalText = addBtn.innerHTML;
        addBtn.innerHTML = '<i class="fas fa-check"></i> Added to Watchlist';
        addBtn.style.background = 'var(--prime-green)';
        addBtn.style.color = 'white';
        addBtn.style.borderColor = 'var(--prime-green)';
        
        setTimeout(() => {
            addBtn.innerHTML = originalText;
            addBtn.style.background = '';
            addBtn.style.color = '';
            addBtn.style.borderColor = '';
        }, 2000);
    });
}

// Search functionality
const searchInput = document.querySelector('.search-box input');
if (searchInput) {
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        if (searchTerm.length > 2) {
            // In a real application, you would filter content here
            console.log(`Searching for: ${searchTerm}`);
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
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            
            // Animate skill cards
            if (entry.target.classList.contains('skill-card')) {
                const progress = entry.target.querySelector('.progress');
                if (progress) {
                    const width = progress.style.width;
                    progress.style.width = '0';
                    setTimeout(() => {
                        progress.style.width = width;
                    }, 300);
                }
            }
            
            // Animate experience cards sequentially
            if (entry.target.classList.contains('experience-card')) {
                const cards = document.querySelectorAll('.experience-card');
                cards.forEach((card, index) => {
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, index * 100);
                });
            }
        }
    });
}, observerOptions);

// Observe elements
document.addEventListener('DOMContentLoaded', () => {
    // Set initial styles for animation
    document.querySelectorAll('.skill-card, .experience-card, .cert-card, .project-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.5s, transform 0.5s';
        observer.observe(el);
    });
    
    // Update copyright year
    const yearElement = document.querySelector('.copyright p');
    if (yearElement && yearElement.textContent.includes('2024')) {
        const currentYear = new Date().getFullYear();
        yearElement.innerHTML = yearElement.innerHTML.replace('2024', currentYear);
    }
    
    // Set current year in hero
    const heroYear = document.querySelector('.hero-meta .year');
    if (heroYear) {
        const startYear = 2009;
        const currentYear = new Date().getFullYear();
        const experience = currentYear - startYear;
        heroYear.textContent = `${experience}+ Years Experience`;
    }
});

// Profile image upload simulation (for demonstration)
const profileImg = document.getElementById('profile-img');
if (profileImg) {
    profileImg.addEventListener('click', () => {
        // In a real application, this would trigger a file upload
        const newSrc = prompt('Enter new profile image URL (optional):');
        if (newSrc && newSrc.trim() !== '') {
            profileImg.src = newSrc;
            // Also update the hero image
            document.querySelector('.profile-image img').src = newSrc;
        }
    });
}
