document.addEventListener('DOMContentLoaded', () => {

    /* --- 0. Boot Animation (Advanced - Restored) --- */
    const preloader = document.getElementById('preloader');
    if (preloader) {
        // Check if animation has already played this session
        if (sessionStorage.getItem('gdgBootShown')) {
            preloader.style.display = 'none';
            preloader.remove(); // Remove from DOM entirely
        } else {
            const iconScene = document.getElementById('icon-scene');
            const loadingText = document.getElementById('loading-text');

            // Symbols to cycle
            const symbols = ['{ ... }', '< / >', '( _ )', '$ _', '#!'];
            // Messages to cycle
            const messages = ['System Check...', 'Loading Assets...', 'Compiling Modules...', 'Connecting to GDG...'];

            // Cycle Icons
            let symbolIndex = 0;
            const iconInterval = setInterval(() => {
                symbolIndex = (symbolIndex + 1) % symbols.length;
                if (iconScene) {
                    // Update content
                    iconScene.innerHTML = `<span class="code-symbol">${symbols[symbolIndex]}</span>`;

                    // Re-trigger glitch animation
                    const el = iconScene.querySelector('.code-symbol');
                    if (el) {
                        el.style.animation = 'none';
                        el.offsetHeight; /* trigger reflow */
                        el.style.animation = 'glitch 0.4s infinite alternate';
                    }
                }
            }, 800);

            // Cycle Text
            let textIndex = 0;
            const textInterval = setInterval(() => {
                textIndex = (textIndex + 1) % messages.length;
                if (loadingText) {
                    loadingText.innerText = messages[textIndex];
                }
            }, 900);

            // End Loading Sequence
            setTimeout(() => {
                clearInterval(iconInterval);
                clearInterval(textInterval);

                // Final Success State
                if (iconScene) iconScene.innerHTML = `<span class="code-symbol" style="color: #4ade80; text-shadow: 0 0 15px #4ade80;">OK</span>`;
                if (loadingText) loadingText.innerText = 'System Ready.';

                // Mark as shown for this session
                sessionStorage.setItem('gdgBootShown', 'true');

                // Fade out
                setTimeout(() => {
                    preloader.classList.add('fade-out');
                    setTimeout(() => preloader.remove(), 800);
                }, 800);
            }, 2000);
        }
    }

    /* --- 1. Toast Notification System --- */
    const toastContainer = document.createElement('div');
    toastContainer.className = 'toast-container';
    document.body.appendChild(toastContainer);

    window.showToast = function (message, type = 'success') {
        const toast = document.createElement('div');
        toast.classList.add('toast', type);

        const icon = type === 'success' ? '✅' : '⚠️';

        toast.innerHTML = `
            <span class="toast-icon">${icon}</span>
            <span class="toast-message">${message}</span>
        `;

        toastContainer.appendChild(toast);

        // Trigger animation (next frame)
        requestAnimationFrame(() => {
            toast.classList.add('show');
        });

        // Auto remove after 3s
        setTimeout(() => {
            toast.classList.remove('show');
            // Wait for CSS transition to finish before removing from DOM
            setTimeout(() => {
                toast.remove();
            }, 300);
        }, 3000);
    };

    /* --- 3. Premium Auth Interaction (3D Tilt & Glow) --- */
    const authContainers = document.querySelectorAll('.auth-container');
    authContainers.forEach(container => {

        // Spotlight Effect (Internal Glow)
        container.addEventListener('mousemove', (e) => {
            const rect = container.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            // Update CSS variables for border glow
            container.style.setProperty('--mouse-x', `${x}px`);
            container.style.setProperty('--mouse-y', `${y}px`);

            /* --- 3D Tilt Logic --- */
            // Calculate rotation based on cursor position relative to center
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            // Limit rotation to max 10 degrees
            const rotateX = ((y - centerY) / centerY) * -5;
            const rotateY = ((x - centerX) / centerX) * 5;

            // Apply transform 
            // Perspective gives depth
            container.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });

        // Reset on mouse leave
        container.addEventListener('mouseleave', () => {
            container.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
            // Optional: reset glow to center or fade out
            container.style.setProperty('--mouse-x', '50%');
            container.style.setProperty('--mouse-y', '50%');
        });
    });
});

/* --- 2. Form Handling --- */
const forms = document.querySelectorAll('form');
forms.forEach(form => {
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const btn = form.querySelector('button[type="submit"]');
        const originalText = btn ? btn.innerText : 'Submit';

        if (btn) {
            btn.innerText = 'Processing...';
            btn.disabled = true;
            btn.style.opacity = '0.7';
        }

        // Simulate server request
        setTimeout(() => {
            showToast('Action completed successfully!', 'success');
            if (btn) {
                btn.innerText = originalText;
                btn.disabled = false;
                btn.style.opacity = '1';
            }
            form.reset();
        }, 1000);
    });
});

/* --- 3. Auth Follower Effect --- */
const authContainers = document.querySelectorAll('.auth-container');
authContainers.forEach(container => {
    container.addEventListener('mousemove', (e) => {
        const rect = container.getBoundingClientRect();
        // Calculate mouse position relative to container
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        container.style.setProperty('--mouse-x', `${x}px`);
        container.style.setProperty('--mouse-y', `${y}px`);
    });
});


/* --- 4. Scroll Reveal Animations --- */
// Run when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const observerOptions = {
        root: null, // viewport
        rootMargin: '0px',
        threshold: 0.1 // Trigger when 10% visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Animate only once
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.feature-card, .event-card');
    animatedElements.forEach(el => observer.observe(el));
});
