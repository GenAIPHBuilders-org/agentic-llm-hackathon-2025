/**
 * Timeline Page JavaScript
 * Handles timeline animations and interactions
 */

document.addEventListener('DOMContentLoaded', () => {
    initializeTimelinePage();
});

function initializeTimelinePage() {
    // Animate timeline items on scroll
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    
    timelineItems.forEach(item => {
        observer.observe(item);
    });
    
    // Add click event to expand timeline items
    timelineItems.forEach(item => {
        item.addEventListener('click', () => {
            // Toggle expanded class
            item.classList.toggle('expanded');
            
            // Close other expanded items
            timelineItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('expanded')) {
                    otherItem.classList.remove('expanded');
                }
            });
        });
    });
}
