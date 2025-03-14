/**
 * Registration Page JavaScript
 * Handles form validation, submission, and team member management
 */

document.addEventListener('DOMContentLoaded', () => {
    initializeRegistrationPage();
});

function initializeRegistrationPage() {
    const registrationForm = document.getElementById('registrationForm');
    
    if (!registrationForm) return;
    
    const addMemberBtn = document.getElementById('addMember');
    const teamMembersContainer = document.getElementById('teamMembers');
    let memberCount = 1;
    
    // Add team member
    if (addMemberBtn && teamMembersContainer) {
        addMemberBtn.addEventListener('click', () => {
            memberCount++;
            
            const memberHtml = `
                <div class="team-member" id="member${memberCount}">
                    <h3>Team Member ${memberCount} <button type="button" class="remove-member" data-member="${memberCount}"><i class="fas fa-times"></i></button></h3>
                    <div class="form-group">
                        <label for="member${memberCount}Name">Full Name *</label>
                        <input type="text" id="member${memberCount}Name" name="member${memberCount}Name" required>
                    </div>
                    <div class="form-group">
                        <label for="member${memberCount}Email">Email *</label>
                        <input type="email" id="member${memberCount}Email" name="member${memberCount}Email" required>
                    </div>
                    <div class="form-group">
                        <label for="member${memberCount}Role">Role</label>
                        <input type="text" id="member${memberCount}Role" name="member${memberCount}Role">
                    </div>
                </div>
            `;
            
            teamMembersContainer.insertAdjacentHTML('beforeend', memberHtml);
            
            // Add event listener to the new remove button
            const newRemoveBtn = document.querySelector(`.remove-member[data-member="${memberCount}"]`);
            newRemoveBtn.addEventListener('click', removeMember);
        });
    }
    
    // Remove team member
    function removeMember() {
        const memberId = this.dataset.member;
        const memberElement = document.getElementById(`member${memberId}`);
        
        if (memberElement) {
            // Add fade-out animation
            memberElement.classList.add('fade-out');
            
            // Remove after animation completes
            setTimeout(() => {
                memberElement.remove();
            }, 300);
        }
    }
    
    // Add event listeners to existing remove buttons
    document.querySelectorAll('.remove-member').forEach(btn => {
        btn.addEventListener('click', removeMember);
    });
    
    // Form validation
    registrationForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Basic validation
        const requiredFields = registrationForm.querySelectorAll('[required]');
        let isValid = true;
        
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                isValid = false;
                field.classList.add('error');
                
                // Add error message if not already present
                const errorMessage = field.parentElement.querySelector('.error-message');
                if (!errorMessage) {
                    const message = document.createElement('div');
                    message.className = 'error-message';
                    message.textContent = 'This field is required';
                    field.parentElement.appendChild(message);
                }
            } else {
                field.classList.remove('error');
                const errorMessage = field.parentElement.querySelector('.error-message');
                if (errorMessage) {
                    errorMessage.remove();
                }
            }
        });
        
        // Email validation
        const emailFields = registrationForm.querySelectorAll('input[type="email"]');
        emailFields.forEach(field => {
            if (field.value.trim() && !isValidEmail(field.value)) {
                isValid = false;
                field.classList.add('error');
                
                // Add error message if not already present
                const errorMessage = field.parentElement.querySelector('.error-message');
                if (!errorMessage) {
                    const message = document.createElement('div');
                    message.className = 'error-message';
                    message.textContent = 'Please enter a valid email address';
                    field.parentElement.appendChild(message);
                }
            }
        });
        
        if (!isValid) {
            // Scroll to first error
            const firstError = registrationForm.querySelector('.error');
            if (firstError) {
                firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
            return;
        }
        
        // Show loading state
        const submitBtn = registrationForm.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.textContent;
        submitBtn.disabled = true;
        submitBtn.classList.add('btn-loading');
        
        try {
            // Simulate form submission (replace with actual API call)
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            // Show success message
            showSuccessModal(
                `<p>Your team has been successfully registered!</p>
                <p>You will receive a confirmation email shortly with further instructions.</p>`,
                'Registration Complete',
                () => {
                    // Reset form after closing modal
                    registrationForm.reset();
                    
                    // Remove additional team members
                    const additionalMembers = document.querySelectorAll('.team-member:not(#member1)');
                    additionalMembers.forEach(member => member.remove());
                    
                    // Reset member count
                    memberCount = 1;
                }
            );
        } catch (error) {
            // Show error message
            showErrorModal(
                `<p>There was an error processing your registration.</p>
                <p>Please try again or contact support if the problem persists.</p>`,
                'Registration Error'
            );
        } finally {
            // Reset button state
            submitBtn.disabled = false;
            submitBtn.classList.remove('btn-loading');
            submitBtn.textContent = originalBtnText;
        }
    });
    
    // Helper function to validate email
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
} 