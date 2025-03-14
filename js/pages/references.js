/**
 * References Page JavaScript
 * Handles resource filtering and category selection
 */

document.addEventListener('DOMContentLoaded', () => {
    initializeReferencesPage();
});

function initializeReferencesPage() {
    const categoryButtons = document.querySelectorAll('.category-btn');
    const resourceCards = document.querySelectorAll('.resource-card');
    
    if (categoryButtons.length > 0) {
        categoryButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remove active class from all buttons
                categoryButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                button.classList.add('active');
                
                const category = button.dataset.category;
                
                // Filter resources
                resourceCards.forEach(card => {
                    if (category === 'all' || card.dataset.category === category) {
                        card.style.display = 'block';
                        
                        // Add animation class
                        card.classList.add('fade-in');
                        setTimeout(() => {
                            card.classList.remove('fade-in');
                        }, 500);
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }
    
    // Initialize search functionality
    const searchInput = document.getElementById('resourceSearch');
    
    if (searchInput) {
        searchInput.addEventListener('input', () => {
            const searchTerm = searchInput.value.toLowerCase().trim();
            
            // If search term is empty, reset to current category filter
            if (searchTerm === '') {
                const activeCategory = document.querySelector('.category-btn.active').dataset.category;
                
                resourceCards.forEach(card => {
                    if (activeCategory === 'all' || card.dataset.category === activeCategory) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                });
                
                return;
            }
            
            // Filter by search term
            resourceCards.forEach(card => {
                const title = card.querySelector('h3').textContent.toLowerCase();
                const description = card.querySelector('p').textContent.toLowerCase();
                
                if (title.includes(searchTerm) || description.includes(searchTerm)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }
} 