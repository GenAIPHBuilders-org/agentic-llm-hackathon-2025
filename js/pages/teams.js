/**
 * Teams Page JavaScript
 * Handles team filtering, search, and pagination
 */

document.addEventListener('DOMContentLoaded', () => {
    initializeTeamsPage();
});

function initializeTeamsPage() {
    // Search functionality
    const searchInput = document.getElementById('teamSearch');
    const teamCards = document.querySelectorAll('.team-card');
    
    if (searchInput) {
        searchInput.addEventListener('input', () => {
            const searchTerm = searchInput.value.toLowerCase().trim();
            
            teamCards.forEach(card => {
                const teamName = card.querySelector('.team-name').textContent.toLowerCase();
                const teamDescription = card.querySelector('.team-description').textContent.toLowerCase();
                
                if (teamName.includes(searchTerm) || teamDescription.includes(searchTerm)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }
    
    // Track filtering
    const trackFilter = document.getElementById('trackFilter');
    
    if (trackFilter) {
        trackFilter.addEventListener('change', () => {
            const selectedTrack = trackFilter.value;
            
            teamCards.forEach(card => {
                const teamTrack = card.querySelector('.team-track').textContent;
                
                if (selectedTrack === 'all' || teamTrack.includes(selectedTrack)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }
    
    // Pagination
    const pageNumbers = document.querySelectorAll('.page-number');
    const prevButton = document.querySelector('.prev-page');
    const nextButton = document.querySelector('.next-page');
    const itemsPerPage = 6;
    let currentPage = 1;
    
    function showPage(pageNum) {
        const startIndex = (pageNum - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        
        teamCards.forEach((card, index) => {
            if (index >= startIndex && index < endIndex) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
        
        // Update active page number
        pageNumbers.forEach(num => {
            num.classList.remove('active');
            if (parseInt(num.textContent) === pageNum) {
                num.classList.add('active');
            }
        });
        
        // Update current page
        currentPage = pageNum;
        
        // Disable/enable prev/next buttons
        if (prevButton) {
            prevButton.disabled = currentPage === 1;
        }
        
        if (nextButton) {
            nextButton.disabled = currentPage === pageNumbers.length;
        }
    }
    
    // Initialize pagination
    if (pageNumbers.length > 0) {
        // Set up page number clicks
        pageNumbers.forEach(num => {
            num.addEventListener('click', () => {
                showPage(parseInt(num.textContent));
            });
        });
        
        // Set up prev/next buttons
        if (prevButton) {
            prevButton.addEventListener('click', () => {
                if (currentPage > 1) {
                    showPage(currentPage - 1);
                }
            });
        }
        
        if (nextButton) {
            nextButton.addEventListener('click', () => {
                if (currentPage < pageNumbers.length) {
                    showPage(currentPage + 1);
                }
            });
        }
        
        // Show first page initially
        showPage(1);
    }
}
