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

    // Login Form Mouse Move Effect
    const loginContainer = document.querySelector('.auth-container');
    if (loginContainer) {
        loginContainer.addEventListener('mousemove', (e) => {
            const rect = loginContainer.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            loginContainer.style.setProperty('--mouse-x', `${x}px`);
            loginContainer.style.setProperty('--mouse-y', `${y}px`);
        });
    }
});