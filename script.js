const canvas = document.getElementById('rain-canvas');
const ctx = canvas.getContext('2d');
const card = document.querySelector('.card');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];
const numParticles = 1000;
const particleSpeed = 2;

// Initialize particles
for (let i = 0; i < numParticles; i++) {
    particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        speedX: 0,
        speedY: Math.random() * particleSpeed,
        size: Math.random() * 1.5 + 1,
    });
}

// Update particles
function updateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.speedX;
        p.y += p.speedY;
        if (p.y > canvas.height) {
            p.y = -p.size;
            p.x = Math.random() * canvas.width;
        }
        if (p.x > canvas.width || p.x < 0) {
            p.x = Math.random() * canvas.width;
            p.y = -p.size;
        }
        ctx.fillStyle = 'white';
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
    }
    requestAnimationFrame(updateParticles);
}

// Adjust particle speed based on mouse movement
document.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const centerX = canvas.width / 2;
    const speedFactor = 1.0; // Increase this value for more drastic direction changes
    for (let i = 0; particles.length; i++) {
        const p = particles[i];
        p.speedX = (mouseX - centerX) * speedFactor / canvas.width;
    }
});

// Transform card based on mouse movement
card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const cardX = rect.left + rect.width / 2;
    const cardY = rect.top + rect.height / 2;
    const maxRotate = 20;
    
    const deltaX = (e.clientX - cardX) / rect.width;
    const deltaY = (e.clientY - cardY) / rect.height;
    
    const rotateY = deltaX * maxRotate;
    const rotateX = -deltaY * maxRotate;
    
    card.style.transform = `rotateY(${rotateY}deg) rotateX(${rotateX}deg)`;
});

// Reset card transformation on mouse leave
card.addEventListener('mouseleave', () => {
    card.style.transform = `rotateY(0deg) rotateX(0deg)`;
});

updateParticles();
