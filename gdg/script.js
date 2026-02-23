document.addEventListener('DOMContentLoaded', () => {
    console.log('Page loaded successfully!');

    // Add basic form submission handling
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Form submitted successfully!');
        });
    });
});