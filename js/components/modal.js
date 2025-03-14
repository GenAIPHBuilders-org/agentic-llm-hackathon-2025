/**
 * Modal Component
 * Handles creation, display, and dismissal of modal dialogs
 */

// Create and show a modal
function showModal(options) {
    // Default options
    const defaults = {
        type: 'info', // info, success, error, warning
        title: 'Information',
        message: '',
        confirmText: 'OK',
        cancelText: 'Cancel',
        showCancel: false,
        onConfirm: null,
        onCancel: null,
        onClose: null,
        autoClose: 0 // 0 means no auto close
    };

    // Merge options with defaults
    const settings = { ...defaults, ...options };

    // Create modal HTML
    let iconClass = '';
    switch (settings.type) {
        case 'success':
            iconClass = 'fa-check-circle';
            break;
        case 'error':
            iconClass = 'fa-exclamation-circle';
            break;
        case 'warning':
            iconClass = 'fa-exclamation-triangle';
            break;
        default:
            iconClass = 'fa-info-circle';
    }

    const modalHTML = `
        <div class="modal" id="appModal">
            <div class="modal-content ${settings.type}">
                <div class="modal-header">
                    <i class="fas ${iconClass}"></i>
                    <h2>${settings.title}</h2>
                </div>
                <div class="modal-body">
                    ${settings.message}
                </div>
                <div class="modal-footer">
                    ${settings.showCancel ? `<button id="modalCancel" class="btn btn-ghost">${settings.cancelText}</button>` : ''}
                    <button id="modalConfirm" class="btn btn-primary">${settings.confirmText}</button>
                </div>
            </div>
        </div>
    `;

    // Add modal to the DOM
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    // Get modal element
    const modal = document.getElementById('appModal');
    
    // Add active class after a small delay to trigger animation
    setTimeout(() => {
        modal.classList.add('active');
    }, 10);

    // Handle confirm button
    const confirmBtn = document.getElementById('modalConfirm');
    confirmBtn.addEventListener('click', () => {
        closeModal();
        if (typeof settings.onConfirm === 'function') {
            settings.onConfirm();
        }
    });

    // Handle cancel button if shown
    if (settings.showCancel) {
        const cancelBtn = document.getElementById('modalCancel');
        cancelBtn.addEventListener('click', () => {
            closeModal();
            if (typeof settings.onCancel === 'function') {
                settings.onCancel();
            }
        });
    }

    // Close when clicking outside the modal content
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
            if (typeof settings.onClose === 'function') {
                settings.onClose();
            }
        }
    });

    // Auto close if specified
    if (settings.autoClose > 0) {
        setTimeout(() => {
            closeModal();
        }, settings.autoClose);
    }

    // Handle escape key
    const handleEscape = (e) => {
        if (e.key === 'Escape') {
            closeModal();
            if (typeof settings.onClose === 'function') {
                settings.onClose();
            }
        }
    };
    
    document.addEventListener('keydown', handleEscape);

    // Function to close the modal
    function closeModal() {
        modal.classList.remove('active');
        setTimeout(() => {
            modal.remove();
            document.removeEventListener('keydown', handleEscape);
        }, 300); // Match the CSS transition duration
    }

    // Return the close function for external use
    return closeModal;
}

// Convenience methods
function showSuccessModal(message, title = 'Success', onConfirm = null) {
    return showModal({
        type: 'success',
        title,
        message,
        onConfirm
    });
}

function showErrorModal(message, title = 'Error', onConfirm = null) {
    return showModal({
        type: 'error',
        title,
        message,
        onConfirm
    });
}

function showConfirmModal(message, onConfirm, onCancel = null, title = 'Confirm') {
    return showModal({
        type: 'warning',
        title,
        message,
        showCancel: true,
        onConfirm,
        onCancel
    });
}
