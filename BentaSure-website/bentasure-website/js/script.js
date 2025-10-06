// Single Page Application Navigation
document.addEventListener('DOMContentLoaded', function() {
    // Show home section by default
    showSection('home');
    
    // Navigation click handlers
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetSection = this.getAttribute('href').substring(1);
            showSection(targetSection);
            updateActiveNav(this);
        });
    });
    
    // Handle Explore Features button
    document.querySelector('.explore-features')?.addEventListener('click', function(e) {
        e.preventDefault();
        showSection('features');
        updateActiveNav(document.querySelector('a[href="#features"]'));
    });
    
    // Handle browser back/forward buttons
    window.addEventListener('popstate', function(e) {
        const section = window.location.hash.substring(1) || 'home';
        showSection(section);
        updateActiveNav(document.querySelector(`a[href="#${section}"]`));
    });
});

function showSection(sectionId) {
    // Hide all sections
    document.querySelectorAll('.page-section').forEach(section => {
        section.classList.remove('active');
    });
    
    // Show target section
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
        
        // Update URL without page reload
        history.pushState(null, null, `#${sectionId}`);
        
        // Scroll to top of page
        window.scrollTo(0, 0);
    }
}

function updateActiveNav(activeLink) {
    // Remove active class from all nav links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    
    // Add active class to clicked link
    activeLink.classList.add('active');
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar background change on scroll
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.custom-navbar');
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Initialize first load
if (window.location.hash) {
    const section = window.location.hash.substring(1);
    showSection(section);
    updateActiveNav(document.querySelector(`a[href="#${section}"]`));
}
