/**
 * Teams Page JavaScript
 * Handles team filtering, search, and pagination
 */

document.addEventListener('DOMContentLoaded', function() {
    // Animation for page elements
    const animateElements = document.querySelectorAll('.animate');
    
    function checkIfInView() {
        animateElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('visible');
            }
        });
    }
    
    // Run on initial load
    checkIfInView();
    
    // Run on scroll
    window.addEventListener('scroll', checkIfInView);
    
    // Search functionality (for future implementation)
    const searchInput = document.getElementById('teamSearch');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            // This will be implemented when teams are added
            console.log('Search for:', this.value);
        });
    }
    
    // Filter functionality (for future implementation)
    const trackFilter = document.getElementById('trackFilter');
    if (trackFilter) {
        trackFilter.addEventListener('change', function() {
            // This will be implemented when teams are added
            console.log('Filter by track:', this.value);
        });
    }
});
