/**
 * Leaderboard Page JavaScript
 * Handles sorting, filtering, and animations
 */

document.addEventListener('DOMContentLoaded', () => {
    initializeLeaderboardPage();
});

function initializeLeaderboardPage() {
    const leaderboardTable = document.querySelector('.leaderboard-table table');
    const trackFilter = document.getElementById('trackFilter');
    
    if (!leaderboardTable) return;
    
    // Make table headers sortable
    const tableHeaders = leaderboardTable.querySelectorAll('th[data-sort]');
    
    tableHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const sortBy = header.dataset.sort;
            const sortDirection = header.classList.contains('sort-asc') ? 'desc' : 'asc';
            
            // Remove sort classes from all headers
            tableHeaders.forEach(h => {
                h.classList.remove('sort-asc', 'sort-desc');
            });
            
            // Add sort class to clicked header
            header.classList.add(`sort-${sortDirection}`);
            
            // Sort the table
            sortTable(leaderboardTable, sortBy, sortDirection);
        });
    });
    
    // Filter by track
    if (trackFilter) {
        trackFilter.addEventListener('change', () => {
            const selectedTrack = trackFilter.value;
            const rows = leaderboardTable.querySelectorAll('tbody tr');
            
            rows.forEach(row => {
                const trackCell = row.querySelector('td[data-track]');
                if (!trackCell) return;
                
                const rowTrack = trackCell.dataset.track;
                
                if (selectedTrack === 'all' || rowTrack === selectedTrack) {
                    row.style.display = '';
                } else {
                    row.style.display = 'none';
                }
            });
            
            // Update rankings after filtering
            updateRankings();
        });
    }
    
    // Sort table function
    function sortTable(table, sortBy, direction) {
        const tbody = table.querySelector('tbody');
        const rows = Array.from(tbody.querySelectorAll('tr'));
        
        // Sort rows
        rows.sort((a, b) => {
            const aValue = a.querySelector(`td[data-${sortBy}]`).dataset[sortBy];
            const bValue = b.querySelector(`td[data-${sortBy}]`).dataset[sortBy];
            
            if (sortBy === 'rank' || sortBy === 'score') {
                // Numeric sort
                return direction === 'asc' 
                    ? parseInt(aValue) - parseInt(bValue)
                    : parseInt(bValue) - parseInt(aValue);
            } else {
                // String sort
                return direction === 'asc'
                    ? aValue.localeCompare(bValue)
                    : bValue.localeCompare(aValue);
            }
        });
        
        // Remove existing rows
        rows.forEach(row => row.remove());
        
        // Add sorted rows
        rows.forEach(row => tbody.appendChild(row));
        
        // Update rankings
        updateRankings();
    }
    
    // Update rankings after sorting or filtering
    function updateRankings() {
        const visibleRows = Array.from(leaderboardTable.querySelectorAll('tbody tr'))
            .filter(row => row.style.display !== 'none');
        
        visibleRows.forEach((row, index) => {
            const rankCell = row.querySelector('.rank');
            if (rankCell) {
                rankCell.textContent = index + 1;
                
                // Clear existing rank classes
                rankCell.classList.remove('rank-1', 'rank-2', 'rank-3');
                
                // Add rank class for top 3
                if (index < 3) {
                    rankCell.classList.add(`rank-${index + 1}`);
                }
            }
        });
    }
} 