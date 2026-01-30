// Add this to your existing JavaScript, or replace it:
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.getElementById('hamburger-menu');
    const menu = document.getElementById('main-menu');
    
    // Create overlay
    const overlay = document.createElement('div');
    overlay.className = 'overlay';
    document.body.appendChild(overlay);
    
    // Toggle menu function
    function toggleMenu() {
        hamburger.classList.toggle('active');
        menu.classList.toggle('active');
        overlay.classList.toggle('active');
        document.body.style.overflow = menu.classList.contains('active') ? 'hidden' : '';
    }
    
    // Toggle menu on hamburger click
    hamburger.addEventListener('click', toggleMenu);
    
    // Close menu on overlay click
    overlay.addEventListener('click', toggleMenu);
    
    // Close menu when clicking on ANY link in the menu
    const menuLinks = document.querySelectorAll('.menu a');
    menuLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            if (window.innerWidth <= 768) {
                // Optional: if it's a special button, you might want different behavior
                if (this.classList.contains('report-litter') || 
                    this.classList.contains('barangay-login')) {
                    // Special buttons - close menu immediately
                    toggleMenu();
                } else {
                    // Regular links - close menu with slight delay for visual feedback
                    setTimeout(() => toggleMenu(), 300);
                }
            }
        });
    });
    
    // Close menu on ESC key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && menu.classList.contains('active')) {
            toggleMenu();
        }
    });
    
    // Close menu when resizing to desktop
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768 && menu.classList.contains('active')) {
            toggleMenu();
        }
    });
});