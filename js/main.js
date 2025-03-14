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
        
        // Show loading state
        const submitBtn = form.querySelector('button[type="submit"]');
        submitBtn.disabled = true;
        submitBtn.textContent = 'Submitting...';

        try {
            const formData = new FormData(form);
            // Add form submission logic here
            
            // Show success message
            showSuccessModal();
            
            // Reset form
            form.reset();
            
            // Reset team members (except first member)
            const teamMembers = document.getElementById('teamMembers');
            const additionalMembers = teamMembers.querySelectorAll('.team-member:not(:first-child)');
            additionalMembers.forEach(member => member.remove());
            memberCount = 1;

        } catch (error) {
            showErrorModal();
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Submit Registration';
        }
    });
}

// Success Modal
function showSuccessModal() {
    const modalHtml = `
        <div class="modal" id="successModal">
            <div class="modal-content success">
                <div class="modal-header">
                    <i class="fas fa-check-circle"></i>
                    <h2>Registration Successful!</h2>
                </div>
                <div class="modal-body">
                    <p>Thank you for registering your team! You will receive a confirmation email shortly.</p>
                    <p>Please check your inbox (and spam folder) for further instructions.</p>
                </div>
                <div class="modal-footer">
                    <button onclick="closeModal()" class="primary-button">Close</button>
                </div>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHtml);
}

// Error Modal
function showErrorModal() {
    const modalHtml = `
        <div class="modal" id="errorModal">
            <div class="modal-content error">
                <div class="modal-header">
                    <i class="fas fa-exclamation-circle"></i>
                    <h2>Registration Error</h2>
                </div>
                <div class="modal-body">
                    <p>There was an error processing your registration.</p>
                    <p>Please try again or contact support if the problem persists.</p>
                </div>
                <div class="modal-footer">
                    <button onclick="closeModal()" class="primary-button">Close</button>
                </div>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHtml);
}

// Close Modal
function closeModal() {
    const modal = document.querySelector('.modal');
    if (modal) {
        modal.remove();
    }
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
