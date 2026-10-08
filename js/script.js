// ICT251 Activity 3 - Tamara - Interactive Features
// Features: 1.Form validation, 2.Theme switch, 3.Mobile nav, 4.Expandable content

// --- 1. COMPULSORY: Contact Form Validation and Preview ---
const contactForm = document.getElementById('contact-form');
const formError = document.getElementById('form-error');
const formPreview = document.getElementById('form-preview');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault(); // Keep submission local - no reload

        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();

        // Clear previous errors
        if (formError) formError.textContent = '';
        if (formPreview) formPreview.textContent = '';

        // Validate name - reject whitespace-only
        if (name === '') {
            if (formError) formError.textContent = 'Name cannot be empty or spaces only.';
            return;
        }

        // Validate email format
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            if (formError) formError.textContent = 'Please enter a valid email address.';
            return;
        }

        // Validate message - reject whitespace-only
        if (message === '') {
            if (formError) formError.textContent = 'Message cannot be empty or spaces only.';
            return;
        }

        // Valid - show preview using textContent (safe)
        if (formPreview) {
            const previewTitle = document.createElement('h3');
            previewTitle.textContent = 'Browser demonstration only — no message is sent';
            
            const validatedMsg = document.createElement('p');
            validatedMsg.textContent = 'Data validated successfully!';

            const nameP = document.createElement('p');
            nameP.textContent = 'Name: ' + name;

            const emailP = document.createElement('p');
            emailP.textContent = 'Email: ' + email;

            const messageP = document.createElement('p');
            messageP.textContent = 'Message: ' + message;

            formPreview.appendChild(previewTitle);
            formPreview.appendChild(validatedMsg);
            formPreview.appendChild(nameP);
            formPreview.appendChild(emailP);
            formPreview.appendChild(messageP);
        }

        contactForm.reset();
    });
}

// --- 2. THEME SWITCH: Light/Dark Mode ---
function toggleTheme() {
    document.body.classList.toggle('dark-mode');
    // Optional: save preference
    const isDark = document.body.classList.contains('dark-mode');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
}

// Load saved theme
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    document.body.classList.add('dark-mode');
}

// Add event to theme button if exists
const themeBtn = document.getElementById('theme-toggle');
if (themeBtn) {
    themeBtn.addEventListener('click', toggleTheme);
}

// --- 3. MOBILE NAVIGATION: Open/Close menu on small screens ---
function toggleMenu() {
    const nav = document.querySelector('nav');
    if (nav) {
        nav.classList.toggle('open');
    }
}

const menuBtn = document.getElementById('menu-toggle');
if (menuBtn) {
    menuBtn.addEventListener('click', toggleMenu);
}

// --- 4. EXPANDABLE CONTENT: Show/Hide project details ---
function toggleDetails(id) {
    const details = document.getElementById(id);
    if (details) {
        if (details.style.display === 'none' || details.style.display === '') {
            details.style.display = 'block';
        } else {
            details.style.display = 'none';
        }
    }
}

// Optional: Study Hours Calculator (extra feature for safety)
function calculateHours() {
    const hoursPerDay = document.getElementById('hours-per-day');
    const daysPerWeek = document.getElementById('days-per-week');
    const result = document.getElementById('calc-result');

    if (!hoursPerDay || !daysPerWeek || !result) return;

    const hours = parseFloat(hoursPerDay.value);
    const days = parseInt(daysPerWeek.value);

    if (isNaN(hours) || hours <= 0 || hours === '') {
        result.textContent = 'Please enter valid positive hours.';
        return;
    }
    if (isNaN(days) || days < 1 || days > 7) {
        result.textContent = 'Days must be between 1 and 7.';
        return;
    }

    const total = hours * days;
    result.textContent = 'Total weekly hours: ' + total + ' hours';
}
