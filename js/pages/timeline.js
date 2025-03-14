/**
 * Timeline Page JavaScript
 * Handles timeline animations and interactions
 */

document.addEventListener('DOMContentLoaded', function() {
    // Highlight current timeline event based on date
    highlightCurrentEvent();
    
    // Add animation to timeline items
    animateTimelineItems();
    
    // Add click event to timeline rows for more details
    addTimelineRowEvents();
    
    // Mobile navigation toggle
    setupMobileNavigation();
});

/**
 * Highlights the current or upcoming event in the timeline
 */
function highlightCurrentEvent() {
    const today = new Date();
    const timelineRows = document.querySelectorAll('.timeline-table tbody tr');
    let foundCurrent = false;
    
    timelineRows.forEach(row => {
        const dateCell = row.querySelector('td:first-child');
        const eventDate = new Date(dateCell.textContent);
        
        // Reset classes
        row.classList.remove('past-event', 'current-event', 'future-event');
        
        // Compare dates
        if (eventDate < today) {
            row.classList.add('past-event');
        } else if (!foundCurrent) {
            row.classList.add('current-event');
            foundCurrent = true;
            
            // Scroll to current event (with a slight delay to ensure DOM is ready)
            setTimeout(() => {
                row.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 500);
        } else {
            row.classList.add('future-event');
        }
    });
}

/**
 * Adds staggered animation to timeline items
 */
function animateTimelineItems() {
    const timelineRows = document.querySelectorAll('.timeline-table tbody tr');
    
    timelineRows.forEach((row, index) => {
        // Add animation class with delay based on index
        setTimeout(() => {
            row.classList.add('animate-in');
        }, 100 * index);
    });
}

/**
 * Adds click events to timeline rows for expanded information
 */
function addTimelineRowEvents() {
    const timelineRows = document.querySelectorAll('.timeline-table tbody tr');
    
    timelineRows.forEach(row => {
        row.addEventListener('click', function() {
            // Get event name from the second cell
            const eventName = this.querySelector('td:nth-child(2)').textContent;
            
            // Check if details panel already exists
            let detailsPanel = document.querySelector('.event-details');
            if (!detailsPanel) {
                // Create details panel if it doesn't exist
                detailsPanel = document.createElement('div');
                detailsPanel.className = 'event-details';
                document.querySelector('.timeline-section .container').appendChild(detailsPanel);
            }
            
            // Get event details based on event name
            const eventDetails = getEventDetails(eventName);
            
            // Update details panel content
            detailsPanel.innerHTML = `
                <div class="details-header">
                    <h3>${eventName}</h3>
                    <button class="close-btn">&times;</button>
                </div>
                <div class="details-content">
                    <p class="details-date">${this.querySelector('td:first-child').textContent}</p>
                    <p>${eventDetails.description}</p>
                    ${eventDetails.additionalInfo ? `<div class="additional-info">${eventDetails.additionalInfo}</div>` : ''}
                </div>
            `;
            
            // Show the panel
            detailsPanel.classList.add('active');
            
            // Add close button event
            detailsPanel.querySelector('.close-btn').addEventListener('click', function(e) {
                e.stopPropagation();
                detailsPanel.classList.remove('active');
            });
        });
    });
}

/**
 * Returns details for a specific event
 */
function getEventDetails(eventName) {
    const details = {
        "Begin Hackathon - Registration Opens": {
            description: "Official start of the Gen AI Builders PH program. Team registration opens for all interested participants.",
            additionalInfo: "<a href='./register.html' class='btn'>Register Now</a>"
        },
        "Registration Deadline": {
            description: "Last day to register your team for the program. Make sure to complete your application before this date."
        },
        "Kick-off Event": {
            description: "Official kick-off event for all registered teams. Introduction to the program, mentors, and resources."
        },
        "Session 1: Agents Workshop": {
            description: "First technical workshop focusing on building AI agents and their applications."
        },
        "Session 2: Fine-tuning Workshop": {
            description: "Workshop on fine-tuning large language models for specific applications and use cases."
        },
        "Session 3: Multi-agentic Workshop": {
            description: "Advanced workshop on building multi-agent systems and collaborative AI architectures."
        },
        "Pitch Deck Submission": {
            description: "Deadline for teams to submit their project pitch decks for initial evaluation."
        },
        "Stage II Selection": {
            description: "Announcement of teams advancing to Stage II of the program based on pitch deck evaluations."
        },
        "Resource Access Deadline": {
            description: "Last day for teams to request and access additional resources for their projects."
        },
        "Demo Submission": {
            description: "Final deadline for teams to submit their project demonstrations and documentation."
        },
        "Demo Day & Finals": {
            description: "Final event where teams present their projects to judges and the community. Winners will be announced.",
            additionalInfo: "<div class='event-highlight'>🏆 Grand finale of the Gen AI Builders PH program!</div>"
        }
    };
    
    // Return details for the event or a default if not found
    return details[eventName] || {
        description: "More details about this event will be announced soon.",
        additionalInfo: ""
    };
}

/**
 * Sets up mobile navigation toggle
 */
function setupMobileNavigation() {
    const mobileMenuButton = document.querySelector('.mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuButton) {
        mobileMenuButton.addEventListener('click', function() {
            navLinks.classList.toggle('active');
        });
    }
}
