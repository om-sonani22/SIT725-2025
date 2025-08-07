// File Path: Week4/public/contact.js

document.addEventListener('DOMContentLoaded', function() {
    // Select the form and the contacts list
    const contactForm = document.getElementById('contact-form');
    const contactsList = document.getElementById('contacts-list');

    // Function to fetch and display contacts
    function fetchAndDisplayContacts() {
        fetch('/api/contacts')
            .then(response => response.json())
            .then(contacts => {
                contactsList.innerHTML = '<li class="collection-header"><h4>Recent Submissions</h4></li>';
                if (contacts.length === 0) {
                    contactsList.innerHTML += '<li class="collection-item">No contacts submitted yet.</li>';
                } else {
                    contacts.forEach(contact => {
                        const contactItem = document.createElement('li');
                        contactItem.classList.add('collection-item');
                        contactItem.innerHTML = `
                            <div>
                                <strong>Name:</strong> ${contact.name}<br>
                                <strong>Email:</strong> ${contact.email}<br>
                                <strong>Message:</strong> ${contact.message}<br>
                                <span class="grey-text">Submitted on: ${new Date(contact.timestamp).toLocaleString()}</span>
                            </div>
                        `;
                        contactsList.appendChild(contactItem);
                    });
                }
            })
            .catch(error => {
                console.error('Error fetching contacts:', error);
                contactsList.innerHTML = '<li class="collection-item">Failed to load contacts.</li>';
            });
    }

    // Add event listener for form submission
    contactForm.addEventListener('submit', function(event) {
        // Prevent the default form submission behavior
        event.preventDefault();

        // Get form data directly from the input fields by ID
        const contactData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            message: document.getElementById('message').value
        };
        
        // Use fetch to send the form data to the server API
        fetch('/api/contacts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(contactData),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            // Check for a success message from the server
            if (data && data.message) {
                M.toast({html: data.message});
            } else {
                M.toast({html: 'Contact submitted successfully!'});
            }
            contactForm.reset(); // Clear the form fields
            fetchAndDisplayContacts(); // Refresh the list of contacts
        })
        .catch((error) => {
            console.error('Error:', error);
            M.toast({html: 'Failed to submit contact. Please try again.'}); // Materialize toast for error message
        });
    });

    // Initial call to fetch and display contacts when the page loads
    fetchAndDisplayContacts();
});
