// Smooth Scroll for Navigation
document.addEventListener('DOMContentLoaded', function() {
    // Add smooth scroll behavior
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // RSVP Form Handling
    const rsvpForm = document.getElementById('rsvpForm');
    if (rsvpForm) {
        rsvpForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const attendance = document.getElementById('attendance').value;
            const guests = document.getElementById('guests').value;
            const message = document.getElementById('message').value;

            // Create a beautiful confirmation message
            const confirmationMsg = `Thank you, ${name}! ❤️\n\n` +
                `We've received your RSVP. ` +
                (attendance === 'yes' 
                    ? `We're so excited to celebrate with you!` 
                    : `We'll miss you on our special day.`) +
                `\n\nA confirmation email will be sent to ${email}.`;

            alert(confirmationMsg);

            // Reset form
            rsvpForm.reset();

            // In a real implementation, you would send this data to a server
            console.log('RSVP Data:', {
                name,
                email,
                attendance,
                guests,
                message,
                timestamp: new Date().toISOString()
            });
        });
    }

    // Add animation on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all sections for animation
    document.querySelectorAll('section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(section);
    });

    // Create floating hearts animation
    function createFloatingHeart() {
        const heart = document.createElement('div');
        heart.innerHTML = '♥';
        heart.style.position = 'fixed';
        heart.style.fontSize = Math.random() * 20 + 10 + 'px';
        heart.style.color = `rgba(255, ${Math.random() * 100 + 100}, ${Math.random() * 100 + 150}, 0.6)`;
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.top = '100vh';
        heart.style.pointerEvents = 'none';
        heart.style.zIndex = '1';
        heart.style.animation = `floatUp ${Math.random() * 3 + 4}s linear`;
        
        document.body.appendChild(heart);

        // Remove heart after animation
        setTimeout(() => {
            heart.remove();
        }, 7000);
    }

    // Add floating hearts periodically
    setInterval(createFloatingHeart, 3000);

    // Add CSS for floating hearts animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes floatUp {
            0% {
                transform: translateY(0) rotate(0deg);
                opacity: 0;
            }
            10% {
                opacity: 0.6;
            }
            90% {
                opacity: 0.6;
            }
            100% {
                transform: translateY(-100vh) rotate(360deg);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);

    // Add parallax effect to hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero-content');
        if (hero) {
            hero.style.transform = `translateY(${scrolled * 0.5}px)`;
            hero.style.opacity = 1 - (scrolled / 700);
        }
    });

    // Countdown timer (optional feature)
    function updateCountdown() {
        const weddingDate = new Date('2024-06-15T16:00:00').getTime();
        const now = new Date().getTime();
        const distance = weddingDate - now;

        if (distance > 0) {
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            // You can add a countdown display element if desired
            console.log(`Countdown: ${days}d ${hours}h ${minutes}m ${seconds}s`);
        }
    }

    // Update countdown every second
    setInterval(updateCountdown, 1000);
});
