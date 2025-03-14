document.addEventListener('DOMContentLoaded', () => {
    const registrationForm = document.getElementById('registrationForm');

    registrationForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(registrationForm);
        const teamData = Object.fromEntries(formData);

        try {
            // Show loading state
            document.querySelector('.submit-button').disabled = true;
            document.querySelector('.submit-button').textContent = 'Submitting...';

            // Send registration data to server
            const response = await fetch('/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(teamData)
            });

            if (response.ok) {
                // Show success message
                showModal('Registration Successful!', 
                    `Thank you for registering your team! 
                    A confirmation email has been sent to ${teamData.teamEmail}.
                    Please check your inbox (and spam folder) for further instructions.`);
                
                // Reset form
                registrationForm.reset();
            } else {
                throw new Error('Registration failed');
            }
        } catch (error) {
            showModal('Registration Error', 
                'There was an error processing your registration. Please try again.');
        } finally {
            document.querySelector('.submit-button').disabled = false;
            document.querySelector('.submit-button').textContent = 'Submit Registration';
        }
    });
});

// Success/Error Modal
function showModal(title, message) {
    const modal = document.createElement('div');
    modal.className = 'registration-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <h3>${title}</h3>
            <p>${message}</p>
            <button onclick="this.parentElement.parentElement.remove()">Close</button>
        </div>
    `;
    document.body.appendChild(modal);
} 