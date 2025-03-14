document.addEventListener('DOMContentLoaded', () => {
    // Initialize all components
    initializeNavigation();
    
    // Handle form submissions
    const registrationForm = document.getElementById('registrationForm');
    if (registrationForm) {
        initializeRegistrationForm();
    }

    // Initialize resource filtering if on references page
    const resourceCategories = document.querySelector('.resource-categories');
    if (resourceCategories) {
        initializeResourceFiltering();
    }
});

function initializeRegistrationForm() {
    const form = document.getElementById('registrationForm');
    const addMemberBtn = document.getElementById('addMember');
    let memberCount = 1;

    addMemberBtn.addEventListener('click', () => {
        memberCount++;
        const memberHtml = `
            <div class="team-member">
                <h3>Team Member ${memberCount}</h3>
                <div class="form-group">
                    <label>Full Name *</label>
                    <input type="text" name="member${memberCount}Name" required>
                </div>
                <div class="form-group">
                    <label>Email *</label>
                    <input type="email" name="member${memberCount}Email" required>
                </div>
            </div>
        `;
        document.getElementById('teamMembers').insertAdjacentHTML('beforeend', memberHtml);
    });

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        // Add form submission logic here
    });
}

function initializeResourceFiltering() {
    const categoryBtns = document.querySelectorAll('.category-btn');
    const resources = document.querySelectorAll('.resource-card');

    categoryBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const category = btn.dataset.category;
            
            categoryBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            resources.forEach(resource => {
                if (category === 'all' || resource.dataset.category === category) {
                    resource.style.display = 'block';
                } else {
                    resource.style.display = 'none';
                }
            });
        });
    });
}
