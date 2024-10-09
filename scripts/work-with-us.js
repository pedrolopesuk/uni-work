document.getElementById('jobApplicationForm').addEventListener('submit', function (e) {
    e.preventDefault();

    // Fetch form values
    const fullName = document.getElementById('fullName').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const position = document.getElementById('position').value;
    const experience = document.getElementById('experience').value;
    const linkedin = document.getElementById('linkedin').value;
    const errorDiv = document.getElementById('error');

    // Validate fields
    if (!fullName || !email || !phone || !position || !experience) {
        errorDiv.textContent = 'Please fill out all required fields.';
        return;
    }

    // Clear error message
    errorDiv.textContent = '';

    // Simulate form submission (AJAX or API call would go here)(not sure if ill implement :/)
    alert('Application submitted successfully!\nThank you, ' + fullName + '.');

    // Clear form
    document.getElementById('jobApplicationForm').reset();

    // Show "Return to About Page" button
    document.getElementById('returnButton').style.display = 'block';
});

function returnToAbout() {
    window.location.href = 'about.html';
}
