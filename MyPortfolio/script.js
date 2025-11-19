document.addEventListener('DOMContentLoaded', function() {
    // Initialize the portfolio
    initPortfolio();
});

function initPortfolio() {
    // Smooth scrolling for navigation links
    setupSmoothScrolling();
    
    // Setup resume modal functionality
    setupResumeModal();
    
    // Setup scroll animations
    setupScrollAnimations();
    
    // Setup terminal animation
    setupTerminalAnimation();
    
    // Setup active navigation highlighting
    setupActiveNavigation();
    
    // Setup Back to Agenda functionality
    setupBackToAgenda();
    
    // Setup PDF detection
    setupPDFDetection();
}

function setupBackToAgenda() {
    const backLinks = document.querySelectorAll('.back-link, .back-agenda');
    
    backLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            let targetSection = '';
            const currentSection = this.closest('section').id;
            
            // Define navigation flow
            const navigationFlow = {
                'background': 'overview',
                'skills': 'background',
                'projects': 'skills',
                'certificates': 'projects',
                'contact': 'certificates'
            };
            
            targetSection = navigationFlow[currentSection] || 'overview';
            
            const targetElement = document.getElementById(targetSection);
            
            if (targetElement) {
                // Update active nav link
                updateActiveNavLink(targetSection);
                
                // Scroll to target
                window.scrollTo({
                    top: targetElement.offsetTop - 20,
                    behavior: 'smooth'
                });
            }
        });
    });
}

function updateActiveNavLink(sectionId) {
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
        }
    });
}

function setupSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            if (this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    // Close mobile menu if open
                    closeMobileMenu();
                    
                    // Update active nav link
                    updateActiveNavLink(targetId.substring(1));
                    
                    // Scroll to target
                    window.scrollTo({
                        top: targetElement.offsetTop - 20,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}

function setupResumeModal() {
    const resumeViewLink = document.getElementById('resumeView');
    const resumeDownloadLink = document.getElementById('resumeDownload');
    const modal = document.getElementById('resumeModal');
    const closeModal = document.querySelector('.close-modal');
    
    if (resumeViewLink && modal) {
        // Open modal when "View My Resume" is clicked
        resumeViewLink.addEventListener('click', function(e) {
            e.preventDefault();
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
            
            // Try to load PDF in iframe
            loadPDFInModal();
        });
    }
    
    // Track download clicks
    if (resumeDownloadLink) {
        resumeDownloadLink.addEventListener('click', function(e) {
            // You can add analytics tracking here
            console.log('Resume download initiated');
            // The download will proceed normally due to the download attribute
        });
    }
    
    // Close modal when X is clicked
    if (closeModal) {
        closeModal.addEventListener('click', function() {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
    }
    
    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
}

function setupPDFDetection() {
    // Check if PDF is supported and handle fallback
    const resumeIframe = document.getElementById('resumeIframe');
    const resumeImageFallback = document.getElementById('resumeImageFallback');
    
    if (resumeIframe) {
        resumeIframe.onload = function() {
            // Check if PDF loaded successfully
            try {
                const iframeDoc = resumeIframe.contentDocument || resumeIframe.contentWindow.document;
                // If we can access the document, PDF might be blocked by CORS
                if (iframeDoc.body.innerHTML.includes('PDF')) {
                    console.log('PDF loaded successfully');
                }
            } catch (e) {
                // CORS error - show fallback
                console.log('PDF cannot be displayed due to CORS, showing fallback');
                showImageFallback();
            }
        };
        
        resumeIframe.onerror = function() {
            console.log('Error loading PDF, showing fallback');
            showImageFallback();
        };
    }
    
    function showImageFallback() {
        if (resumeIframe && resumeImageFallback) {
            resumeIframe.style.display = 'none';
            resumeImageFallback.style.display = 'flex';
        }
    }
}

function loadPDFInModal() {
    const resumeIframe = document.getElementById('resumeIframe');
    const resumeImageFallback = document.getElementById('resumeImageFallback');
    
    if (resumeIframe) {
        // Reset display
        resumeIframe.style.display = 'block';
        if (resumeImageFallback) {
            resumeImageFallback.style.display = 'none';
        }
        
        // Force reload of PDF (in case it was cached with errors)
        const currentSrc = resumeIframe.src;
        resumeIframe.src = '';
        setTimeout(() => {
            resumeIframe.src = currentSrc;
        }, 100);
    }
}

function setupScrollAnimations() {
    // Add intersection observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe all sections for animation
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
    
    // Observe project items for staggered animation
    const projectItems = document.querySelectorAll('.project-section');
    projectItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-20px)';
        item.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(item);
    });
    
    // Observe gallery items for animation
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'scale(0.8)';
        item.style.transition = `opacity 0.4s ease ${index * 0.05}s, transform 0.4s ease ${index * 0.05}s`;
        observer.observe(item);
    });
}

function setupTerminalAnimation() {
    const terminal = document.querySelector('.terminal-window');
    
    if (terminal) {
        // Add typing effect to terminal
        const commandElement = document.querySelector('.command');
        if (commandElement) {
            const commandText = 'cat portfolio.txt';
            let i = 0;
            
            commandElement.textContent = '';
            
            function typeWriter() {
                if (i < commandText.length) {
                    commandElement.textContent += commandText.charAt(i);
                    i++;
                    setTimeout(typeWriter, 100);
                }
            }
            
            // Start typing after a short delay
            setTimeout(typeWriter, 1000);
        }
        
        // Add blinking cursor effect
        const output = document.querySelector('.output');
        if (output) {
            const cursor = document.createElement('span');
            cursor.className = 'cursor';
            cursor.textContent = '|';
            cursor.style.animation = 'blink 1s infinite';
            output.appendChild(cursor);
        }
    }
}

function setupActiveNavigation() {
    // Update active navigation link based on scroll position
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    function updateActiveNav() {
        let currentSection = '';
        const scrollPos = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    }
    
    // Update on scroll
    window.addEventListener('scroll', updateActiveNav);
    
    // Initial update
    updateActiveNav();
}

function closeMobileMenu() {
    // If you add a mobile menu later, close it here
    const mobileMenu = document.querySelector('.mobile-menu');
    if (mobileMenu && mobileMenu.classList.contains('active')) {
        mobileMenu.classList.remove('active');
    }
}

// Add interactive effects for gallery items
document.addEventListener('DOMContentLoaded', function() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
            this.style.boxShadow = '0 10px 25px rgba(138, 43, 226, 0.4)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.style.boxShadow = 'none';
        });
        
        item.addEventListener('click', function() {
            // Add a temporary highlight effect
            this.style.backgroundColor = 'rgba(138, 43, 226, 0.2)';
            setTimeout(() => {
                this.style.backgroundColor = '';
            }, 300);
        });
    });
});

// Add loading animation completion
window.addEventListener('load', function() {
    const loadingBar = document.querySelector('.loading-progress');
    if (loadingBar) {
        setTimeout(() => {
            loadingBar.style.width = '100%';
            loadingBar.style.transition = 'width 1s ease';
        }, 500);
    }
});

// Add keyboard navigation
document.addEventListener('keydown', function(e) {
    // Navigate sections with arrow keys
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault();
        
        const sections = Array.from(document.querySelectorAll('.section'));
        const currentScroll = window.scrollY;
        let targetSection = null;
        
        if (e.key === 'ArrowDown') {
            // Find next section
            for (let section of sections) {
                if (section.offsetTop > currentScroll + 100) {
                    targetSection = section;
                    break;
                }
            }
        } else if (e.key === 'ArrowUp') {
            // Find previous section (reverse array)
            for (let i = sections.length - 1; i >= 0; i--) {
                if (sections[i].offsetTop < currentScroll - 100) {
                    targetSection = sections[i];
                    break;
                }
            }
        }
        
        if (targetSection) {
            window.scrollTo({
                top: targetSection.offsetTop - 20,
                behavior: 'smooth'
            });
        }
    }
});

console.log('Portfolio initialized successfully! 🚀');