// Dark Mode Toggle
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
}

if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark-mode');
}

// Scroll Progress Bar
window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    document.querySelector('.scroll-progress').style.width = scrollPercent + '%';
});

// Animated Counters
function animateCounters() {
    const counters = document.querySelectorAll('.counter');
    const observerOptions = { threshold: 0.5 };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = +counter.getAttribute('data-target');
                let current = 0;
                const increment = target / 50;

                const updateCounter = () => {
                    current += increment;
                    if (current < target) {
                        counter.textContent = Math.ceil(current);
                        setTimeout(updateCounter, 30);
                    } else {
                        counter.textContent = target + '+';
                    }
                };

                updateCounter();
                observer.unobserve(counter);
            }
        });
    }, observerOptions);

    counters.forEach(counter => observer.observe(counter));
}

// Lead Form Modal
function openLeadForm() {
    document.getElementById('leadFormModal').style.display = 'block';
}

function closeLeadForm() {
    document.getElementById('leadFormModal').style.display = 'none';
}

window.onclick = function(event) {
    const modal = document.getElementById('leadFormModal');
    if (event.target == modal) {
        modal.style.display = 'none';
    }
}

// Lead Form Submission
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('leadForm');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('leadName').value;
            const phone = document.getElementById('leadPhone').value;
            const course = document.getElementById('leadCourse').value;

            const leads = JSON.parse(localStorage.getItem('leads') || '[]');
            leads.push({ name, phone, course, date: new Date() });
            localStorage.setItem('leads', JSON.stringify(leads));

            const message = `Hi! My name is ${name}. I'm interested in ${course}. My phone: ${phone}`;
            window.open(`https://api.whatsapp.com/send?phone=919068185259&text=${encodeURIComponent(message)}`);

            alert('Thank you! Our team will contact you soon.');
            closeLeadForm();
        });
    }

    animateCounters();
});

// Schedule Demo
function scheduleDemo() {
    alert('Demo class booking feature. WhatsApp us to book now.');
    window.open('https://api.whatsapp.com/send?phone=919068185259&text=Hi! I want to book a free demo class');
}

// WhatsApp Integration
function openWhatsApp() {
    window.open('https://api.whatsapp.com/send?phone=919068185259&text=Hi! I want to know more about Gupta Classes', '_blank');
}

// Contact Form Submission
document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const inputs = contactForm.querySelectorAll('input, textarea');
            const data = {};
            inputs.forEach(input => {
                data[input.placeholder] = input.value;
            });

            const contacts = JSON.parse(localStorage.getItem('contacts') || '[]');
            contacts.push({ ...data, date: new Date() });
            localStorage.setItem('contacts', JSON.stringify(contacts));

            alert('Thank you for reaching out! We will reply soon.');
            contactForm.reset();
        });
    }
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// Mobile Hamburger Menu
function toggleMenu() {
    const navMenu = document.querySelector('.nav-menu');
    navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
}

// Handle Contact Submit
function handleContactSubmit(event) {
    event.preventDefault();
    alert('Thank you for contacting us! We will reply soon.');
    event.target.reset();
}

// Handle Lead Submit
function handleLeadSubmit(event) {
    event.preventDefault();
    alert('Thank you for registering! Check WhatsApp for your demo class link.');
    closeLeadForm();
}
