// Loading Animation
document.addEventListener('DOMContentLoaded', () => {
    const loader = document.querySelector('.loader');
    setTimeout(() => {
        loader.classList.add('fade-out');
    }, 1000);
});

// Dark/Light Mode Toggle
function toggleTheme() {
    const body = document.body;
    const currentTheme = body.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
}

// Set initial theme
document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.body.setAttribute('data-theme', savedTheme);
});

// Intersection Observer for animations
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.card-hover').forEach(el => observer.observe(el));

// Rankings functionality
document.addEventListener('DOMContentLoaded', () => {
    // Filter buttons
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            // Add filtering logic here
        });
    });

    // Search functionality
    const searchInput = document.querySelector('.search-bar input');
    searchInput?.addEventListener('input', (e) => {
        // Add search logic here
    });
});

// Registration Form Handling
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('registrationForm');
    const addMemberBtn = document.getElementById('addMember');
    let memberCount = 1;

    // Add team member
    addMemberBtn?.addEventListener('click', () => {
        if (memberCount < 4) { // Max 4 members including leader
            memberCount++;
            const memberHTML = `
                <div class="team-member">
                    <h4>Team Member ${memberCount}</h4>
                    <div class="input-group">
                        <label>Full Name *</label>
                        <input type="text" name="member_name[]" required>
                    </div>
                    <div class="input-group">
                        <label>GitHub Username *</label>
                        <input type="text" name="github_username[]" required>
                    </div>
                    <div class="input-group">
                        <label>Discord Username *</label>
                        <input type="text" name="discord_username[]" required placeholder="username#0000">
                    </div>
                    <div class="input-group">
                        <label>Email *</label>
                        <input type="email" name="email[]" required>
                    </div>
                    <button type="button" class="remove-member secondary-button">
                        <i class="fas fa-trash"></i> Remove Member
                    </button>
                </div>
            `;
            document.getElementById('teamMembers').insertAdjacentHTML('beforeend', memberHTML);
        } else {
            alert('Maximum team size is 4 members');
        }
    });

    // Remove team member
    document.getElementById('teamMembers').addEventListener('click', (e) => {
        if (e.target.classList.contains('remove-member')) {
            e.target.closest('.team-member').remove();
            memberCount--;
        }
    });

    // Form submission
    form?.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Collect form data
        const formData = new FormData(form);
        const data = {
            teamName: formData.get('teamName'),
            track: formData.get('trackSelect'),
            members: [],
            projectDescription: formData.get('projectDescription'),
            githubRepo: formData.get('githubRepo')
        };

        // Collect member data
        const names = formData.getAll('member_name[]');
        const githubUsernames = formData.getAll('github_username[]');
        const discordUsernames = formData.getAll('discord_username[]');
        const emails = formData.getAll('email[]');

        for (let i = 0; i < names.length; i++) {
            data.members.push({
                name: names[i],
                github: githubUsernames[i],
                discord: discordUsernames[i],
                email: emails[i]
            });
        }

        try {
            // Here you would typically send the data to your backend
            console.log('Registration data:', data);
            alert('Registration submitted successfully!');
            form.reset();
        } catch (error) {
            console.error('Error submitting registration:', error);
            alert('Error submitting registration. Please try again.');
        }
    });
});