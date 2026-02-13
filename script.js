// --- General Effects ---

// Navbar Scroll Effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.padding = '0.5rem 2rem';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.8)';
        navbar.style.padding = '1rem 2rem';
    }
});

// Bubble reveal function
function revealReason(bubble) {
    bubble.classList.add('clicked');
}

// Parallax effect for floating heart
document.addEventListener('mousemove', (e) => {
    const heart = document.querySelector('.floating-heart');
    if (heart) {
        const x = (e.clientX / window.innerWidth - 0.5) * 20;
        const y = (e.clientY / window.innerHeight - 0.5) * 20;
        heart.style.transform = `translateX(${x}px) translateY(${y}px)`;
    }
});

// Create floating particles
function createParticle() {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    particle.style.left = Math.random() * 100 + 'vw';
    particle.style.animationDelay = Math.random() * 4 + 's';
    particle.style.animationDuration = (Math.random() * 3 + 3) + 's';
    document.body.appendChild(particle);

    setTimeout(() => {
        particle.remove();
    }, 7000);
}

setInterval(createParticle, 500);

// Smooth scroll reveal animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.timeline-item, .polaroid, .quote-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(50px)';
    el.style.transition = 'all 0.6s ease';
    observer.observe(el);
});

// Add 3D tilt effect to polaroids
document.querySelectorAll('.polaroid').forEach(polaroid => {
    polaroid.addEventListener('mousemove', (e) => {
        const rect = polaroid.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;

        polaroid.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.1)`;
    });

    polaroid.addEventListener('mouseleave', () => {
        polaroid.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
    });
});

// --- Phase 2 Features ---

// Relationship Timer (Since Jan 3, 2021)
function updateCountdown() {
    const startDate = new Date("January 3, 2021 00:00:00");
    const now = new Date();

    const diff = now - startDate;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    document.getElementById('days').innerText = days;
    document.getElementById('hours').innerText = hours;
    document.getElementById('minutes').innerText = minutes;
    document.getElementById('seconds').innerText = seconds;
}

setInterval(updateCountdown, 1000);
updateCountdown();

// Quotes Carousel
let quoteIndex = 0;
const quotes = document.querySelectorAll('.quote-card');

function showNextQuote() {
    quotes[quoteIndex].classList.remove('active');
    quoteIndex = (quoteIndex + 1) % quotes.length;
    quotes[quoteIndex].classList.add('active');
}

setInterval(showNextQuote, 5000);

// Message Board (Simulation)
function postMessage(event) {
    event.preventDefault();
    const name = document.getElementById('visitorName').value;
    const msg = document.getElementById('visitorMsg').value;
    const display = document.getElementById('messageDisplay');

    if (name && msg) {
        const post = document.createElement('div');
        post.classList.add('message-post');
        post.innerHTML = `<strong>${name}:</strong> ${msg}`;

        display.prepend(post); // Add to top

        // Clear inputs
        document.getElementById('visitorName').value = '';
        document.getElementById('visitorMsg').value = '';

        // Check for special nicknames
        if (name.toLowerCase() === 'bura' || name.toLowerCase() === 'alu') {
            createConfetti();
        }
    }
}

// Audio Player
function toggleMusic() {
    const audio = document.getElementById('bgMusic');
    const btn = document.querySelector('.audio-control');
    const icon = btn.querySelector('i');

    if (audio.paused) {
        audio.play().catch(e => console.log("Audio play failed (user interaction needed first):", e));
        btn.classList.add('playing');
        icon.classList.remove('fa-music');
        icon.classList.add('fa-pause');
    } else {
        audio.pause();
        btn.classList.remove('playing');
        icon.classList.add('fa-music');
        icon.classList.remove('fa-pause');
    }
}

// --- Fun Zone Logic (Preserved) ---

// Love Meter Logic
function calculateLove() {
    const meterFill = document.querySelector('.meter-fill');
    const resultText = document.querySelector('.love-result');
    const btn = document.getElementById('loveCalcBtn');

    // Reset
    meterFill.style.width = '0%';
    resultText.textContent = '';
    btn.disabled = true;

    // Animate to 100%
    setTimeout(() => {
        meterFill.style.width = '100%';
        meterFill.textContent = '100%';
    }, 100);

    setTimeout(() => {
        const messages = [
            "100% - Soulmates Forever! ❤️",
            "Calculated: Perfect Match! 💑",
            "Infinite Love Detected! ♾️"
        ];
        const randomMsg = messages[Math.floor(Math.random() * messages.length)];
        resultText.innerHTML = `<h3>${randomMsg}</h3>`;
        resultText.style.opacity = 1;
        btn.disabled = false;
        // Trigger the full heart blast animation
        startCrazyConfetti();

        // Show Win Modal
        setTimeout(() => {
            const modal = document.getElementById('winModal');
            document.getElementById('modalTitle').innerText = "100% Love! ❤️";
            document.getElementById('modalText').innerText = "We are Soulmates Forever! No calculation needed! 😘";
            modal.style.display = 'flex';
        }, 1000);
    }, 2200);
}

// Memory Match Game
// Memory Match Game
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.memory-card');
    console.log(`Found ${cards.length} memory cards.`);

    let hasFlippedCard = false;
    let lockBoard = false;
    let firstCard, secondCard;

    function flipCard() {
        if (lockBoard) return;
        if (this === firstCard) return;

        console.log('Flipping card:', this.dataset.framework);
        this.classList.add('flip');

        if (!hasFlippedCard) {
            hasFlippedCard = true;
            firstCard = this;
            return;
        }

        secondCard = this;
        checkForMatch();
    }

    function checkForMatch() {
        let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
        console.log('Match check:', isMatch);
        isMatch ? disableCards() : unflipCards();
    }

    let matchCount = 0;
    const totalPairs = 4;

    function disableCards() {
        firstCard.removeEventListener('click', flipCard);
        secondCard.removeEventListener('click', flipCard);

        matchCount++;
        if (matchCount === totalPairs) {
            setTimeout(celebrateWin, 500);
        }

        resetBoard();
    }

    function unflipCards() {
        lockBoard = true;
        setTimeout(() => {
            firstCard.classList.remove('flip');
            secondCard.classList.remove('flip');
            resetBoard();
        }, 1500);
    }

    function resetBoard() {
        [hasFlippedCard, lockBoard] = [false, false];
        [firstCard, secondCard] = [null, null];
    }

    function celebrateWin() {
        // 1. Crazy Animation (Intense Confetti)
        startCrazyConfetti();

        // 2. Show Modal after slight delay
        setTimeout(() => {
            const modal = document.getElementById('winModal');
            document.getElementById('modalTitle').innerText = "I Love You Buri! ❤️";
            document.getElementById('modalText').innerText = "You matched them all! Just like we match perfectly! 😘";
            modal.style.display = 'flex';
        }, 1000);
    }

    (function shuffle() {
        cards.forEach(card => {
            let randomPos = Math.floor(Math.random() * 12);
            card.style.order = randomPos;
        });
    })();

    cards.forEach(card => card.addEventListener('click', flipCard));
});

// Win Modal Close Logic
function closeModal() {
    document.getElementById('winModal').style.display = 'none';
}

// Intense Confetti
// "Combine and Blast" Sequence
function startCrazyConfetti() {
    // 1. Initial Rain (3 seconds)
    let duration = 3000;
    let end = Date.now() + duration;

    (function frame() {
        // Spawn multiple hearts per frame for density
        for (let i = 0; i < 5; i++) {
            createConfetti();
        }
        if (Date.now() < end) {
            requestAnimationFrame(frame);
        }
    }());

    // 2. Combine (Big Heart appears)
    setTimeout(() => {
        showBigHeart();
    }, 2500);

    // 3. Blast
    setTimeout(() => {
        explodeBigHeart();
    }, 4500);
}

// Falling Hearts Effect
function createConfetti() {
    const heart = document.createElement('div');
    heart.innerText = '❤️';
    heart.style.position = 'fixed';
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.top = '-20px';
    heart.style.fontSize = Math.random() * 20 + 20 + 'px'; // Random size
    heart.style.zIndex = '10000';
    heart.style.animation = `fall ${Math.random() * 3 + 2}s linear forwards`;

    document.body.appendChild(heart);

    setTimeout(() => {
        heart.remove();
    }, 5000);
}

function showBigHeart() {
    let bigHeart = document.getElementById('bigHeart');
    if (!bigHeart) {
        bigHeart = document.createElement('div');
        bigHeart.id = 'bigHeart';
        bigHeart.innerText = '💖';
        document.body.appendChild(bigHeart);
    }
    bigHeart.style.display = 'block';
    bigHeart.classList.add('growing');
}

function explodeBigHeart() {
    const bigHeart = document.getElementById('bigHeart');
    if (bigHeart) {
        bigHeart.style.display = 'none';
        bigHeart.classList.remove('growing');
    }

    // Explosion Particles
    for (let i = 0; i < 100; i++) {
        createBlastParticle();
    }
}

function createBlastParticle() {
    const particle = document.createElement('div');
    particle.innerText = '❤️';
    particle.className = 'blast-particle';

    // Start at center
    const startX = window.innerWidth / 2;
    const startY = window.innerHeight / 2;

    particle.style.left = startX + 'px';
    particle.style.top = startY + 'px';

    // Random direction
    const angle = Math.random() * Math.PI * 2;
    const velocity = Math.random() * 200 + 100; // Distance to travel

    const tx = Math.cos(angle) * velocity + (Math.random() * 100 - 50);
    const ty = Math.sin(angle) * velocity + (Math.random() * 100 - 50);

    // Set CSS var for animation
    particle.style.setProperty('--tx', `${tx}vw`);
    particle.style.setProperty('--ty', `${ty}vh`);

    document.body.appendChild(particle);

    setTimeout(() => {
        particle.remove();
    }, 2000); // 2s duration
}

function createConfettiBurst() {
    for (let i = 0; i < 15; i++) {
        createConfetti();
    }
}

// Dynamic styles for confetti
const style = document.createElement('style');
style.innerHTML = `
    @keyframes fall {
        to { transform: translateY(100vh) rotate(360deg); }
    }
`;
document.head.appendChild(style);

// Audio Player
function toggleMusic() {
    const audio = document.getElementById('bgMusic');
    const btn = document.querySelector('.audio-control');
    const icon = btn.querySelector('i');

    if (audio.paused) {
        audio.play().catch(e => console.log("Audio play failed (user interaction needed first):", e));
        btn.classList.add('playing');
        icon.classList.remove('fa-music');
        icon.classList.add('fa-pause');
    } else {
        audio.pause();
        btn.classList.remove('playing');
        icon.classList.add('fa-music');
        icon.classList.remove('fa-pause');
    }
}

// Autoplay Music on Interaction
// Autoplay Music on Interaction/Load
function tryPlayMusic() {
    const audio = document.getElementById('bgMusic');
    if (audio && audio.paused) {
        audio.play().catch(e => console.log("Autoplay blocked (waiting for interaction):", e));
        // Update button state if it worked
        if (!audio.paused) {
            const btn = document.querySelector('.audio-control');
            const icon = btn.querySelector('i');
            btn.classList.add('playing');
            icon.classList.remove('fa-multimedia'); // Assuming previous icon class
            icon.classList.remove('fa-music');
            icon.classList.add('fa-pause');
        }
    }
}

document.addEventListener('DOMContentLoaded', tryPlayMusic);
document.body.addEventListener('click', tryPlayMusic, { once: true });
document.body.addEventListener('touchstart', tryPlayMusic, { once: true });
document.body.addEventListener('keydown', tryPlayMusic, { once: true });


// --- Butterfly Effect ---
function createButterfly() {
    const butterfly = document.createElement('div');
    butterfly.classList.add('butterfly');
    butterfly.innerHTML = '🦋';

    // Random Start Position
    const startY = Math.random() * window.innerHeight;
    butterfly.style.left = '-50px';
    butterfly.style.top = `${startY}px`;

    // Random properties
    const duration = Math.random() * 5 + 10; // 10-15s
    const size = Math.random() * 20 + 20; // 20-40px

    butterfly.style.fontSize = `${size}px`;
    butterfly.style.transition = `left ${duration}s linear, top ${duration}s ease-in-out`;

    document.body.appendChild(butterfly);

    // Animate across screen
    setTimeout(() => {
        butterfly.style.left = '110vw';
        butterfly.style.top = `${Math.random() * window.innerHeight}px`;
    }, 100);

    // Remove after done
    setTimeout(() => {
        butterfly.remove();
    }, duration * 1000);
}

// Spawn a butterfly every few seconds


