document.addEventListener('DOMContentLoaded', () => {
    const teamsGrid = document.querySelector('.teams-grid');
    const searchInput = document.getElementById('teamSearch');
    const trackFilter = document.getElementById('trackFilter');
    const pageSize = 9; // Teams per page
    let currentPage = 1;
    let teams = []; // Will store all teams

    // Fetch teams data
    async function fetchTeams() {
        try {
            // Simulate API call (replace with actual API endpoint)
            const response = await fetch('api/teams');
            teams = await response.json();
            renderTeams();
        } catch (error) {
            console.error('Error fetching teams:', error);
            teamsGrid.innerHTML = '<p class="error-message">Failed to load teams. Please try again later.</p>';
        }
    }

    // Render teams with pagination
    function renderTeams(filteredTeams = teams) {
        const start = (currentPage - 1) * pageSize;
        const end = start + pageSize;
        const paginatedTeams = filteredTeams.slice(start, end);

        teamsGrid.innerHTML = paginatedTeams.map(team => `
            <div class="team-card" data-track="${team.track}">
                <div class="team-header">
                    <h3>${team.name}</h3>
                    <span class="track-badge">${team.track}</span>
                </div>
                <p class="team-description">${team.description}</p>
                <div class="team-members">
                    <h4>Team Members</h4>
                    <ul>
                        ${team.members.map(member => `
                            <li>${member.name} - ${member.role}</li>
                        `).join('')}
                    </ul>
                </div>
                <div class="team-footer">
                    <button class="view-details" data-team-id="${team.id}">
                        View Details
                    </button>
                </div>
            </div>
        `).join('');

        updatePagination(filteredTeams.length);
        attachTeamCardListeners();
    }

    // Search and filter functionality
    function filterTeams() {
        const searchTerm = searchInput.value.toLowerCase();
        const selectedTrack = trackFilter.value;

        const filtered = teams.filter(team => {
            const matchesSearch = team.name.toLowerCase().includes(searchTerm) ||
                                team.description.toLowerCase().includes(searchTerm);
            const matchesTrack = !selectedTrack || team.track === selectedTrack;
            return matchesSearch && matchesTrack;
        });

        currentPage = 1; // Reset to first page when filtering
        renderTeams(filtered);
    }

    // Update pagination controls
    function updatePagination(totalTeams) {
        const totalPages = Math.ceil(totalTeams / pageSize);
        const pagination = document.querySelector('.pagination');
        const pageNumbers = document.querySelector('.page-numbers');

        pageNumbers.innerHTML = '';
        for (let i = 1; i <= totalPages; i++) {
            const pageBtn = document.createElement('button');
            pageBtn.textContent = i;
            pageBtn.classList.toggle('active', i === currentPage);
            pageBtn.addEventListener('click', () => {
                currentPage = i;
                renderTeams();
            });
            pageNumbers.appendChild(pageBtn);
        }

        // Update prev/next buttons
        document.querySelector('.prev-page').disabled = currentPage === 1;
        document.querySelector('.next-page').disabled = currentPage === totalPages;
    }

    // Event listeners
    searchInput.addEventListener('input', filterTeams);
    trackFilter.addEventListener('change', filterTeams);

    document.querySelector('.prev-page').addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            renderTeams();
        }
    });

    document.querySelector('.next-page').addEventListener('click', () => {
        const totalPages = Math.ceil(teams.length / pageSize);
        if (currentPage < totalPages) {
            currentPage++;
            renderTeams();
        }
    });

    // Initialize
    fetchTeams();
}); 