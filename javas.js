// ============================================
// Portfolio Script — Aditya Verma (Purple + osu! cursor)
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    initCustomCursor();
    initNavbar();
    initMobileMenu();
    initTypewriter();
    initParticles();
    initScrollReveal();
    initSmoothScroll();
    initMatrixRain();
    initGithubProjects();
    initAnimeAnimations();
    initCardTilt();
});

// --------------------------------------------------
// 1. MINIMAL RING CURSOR (smooth follow + dot)
// --------------------------------------------------
function initCustomCursor() {
    const ring = document.querySelector('.cursor');
    const dot  = document.querySelector('.cursor-dot');
    if (!ring || !dot) return;

    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
        ring.style.display = 'none';
        dot.style.display = 'none';
        document.body.style.cursor = 'auto';
        return;
    }

    let mx = window.innerWidth / 2, my = window.innerHeight / 2;
    let rx = mx, ry = my;

    document.addEventListener('mousemove', (e) => {
        mx = e.clientX; my = e.clientY;
        dot.style.transform = `translate(${mx}px, ${my}px) translate(-50%, -50%)`;
    });

    function loop() {
        rx += (mx - rx) * 0.18;
        ry += (my - ry) * 0.18;
        ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`;
        requestAnimationFrame(loop);
    }
    loop();

    document.querySelectorAll('a, button, .skill-tag, .glass-card, .project-card, .contact-link, .btn').forEach(el => {
        el.addEventListener('mouseenter', () => ring.classList.add('is-hover'));
        el.addEventListener('mouseleave', () => ring.classList.remove('is-hover'));
    });
}

// --------------------------------------------------
// 2. NAVBAR
// --------------------------------------------------
function initNavbar() {
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-link');

    if (!navbar) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        const sections = document.querySelectorAll('section[id]');
        let currentSection = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    });
}

// --------------------------------------------------
// 3. MOBILE MENU
// --------------------------------------------------
function initMobileMenu() {
    const toggle = document.querySelector('.mobile-toggle');
    const navLinks = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-links .nav-link');

    if (!toggle || !navLinks) return;

    toggle.addEventListener('click', () => {
        toggle.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    links.forEach(link => {
        link.addEventListener('click', () => {
            toggle.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    document.addEventListener('click', (e) => {
        if (!toggle.contains(e.target) && !navLinks.contains(e.target)) {
            toggle.classList.remove('active');
            navLinks.classList.remove('active');
        }
    });
}

// --------------------------------------------------
// 4. TYPEWRITER
// --------------------------------------------------
function initTypewriter() {
    const nameEl = document.getElementById('typewriter-name');
    const taglineEl = document.getElementById('typewriter-tagline');

    if (!nameEl || !taglineEl) return;

    const nameText = '⚡ Aditya Verma ⚡';
    const taglineText = 'Linux • Systems • Game Dev • AI (Learning)';

    function typeWriter(element, text, speed, callback) {
        let i = 0;
        element.textContent = '';

        function type() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, speed);
            } else if (callback) {
                setTimeout(callback, 400);
            }
        }

        type();
    }

    setTimeout(() => {
        typeWriter(nameEl, nameText, 60, () => {
            typeWriter(taglineEl, taglineText, 40);
        });
    }, 600);
}

// --------------------------------------------------
// 5. PARTICLE BACKGROUND
// --------------------------------------------------
function initParticles() {
    const canvas = document.getElementById('particleCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let particles = [];
    let animationId;

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    const particleCount = Math.min(50, Math.floor(window.innerWidth / 30));

    class Particle {
        constructor() {
            this.reset();
        }

        reset() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 1.5 + 0.5;
            this.speedX = (Math.random() - 0.5) * 0.3;
            this.speedY = (Math.random() - 0.5) * 0.3;
            this.opacity = Math.random() * 0.4 + 0.1;
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            if (this.x < 0) this.x = canvas.width;
            if (this.x > canvas.width) this.x = 0;
            if (this.y < 0) this.y = canvas.height;
            if (this.y > canvas.height) this.y = 0;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(168, 85, 247, ${this.opacity})`;
            ctx.fill();
        }
    }

    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }

    function drawConnections() {
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 150) {
                    const opacity = (1 - distance / 150) * 0.08;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = `rgba(168, 85, 247, ${opacity})`;
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            }
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });

        drawConnections();
        animationId = requestAnimationFrame(animate);
    }

    animate();

    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            cancelAnimationFrame(animationId);
        } else {
            animate();
        }
    });
}

// --------------------------------------------------
// 6. SCROLL REVEAL
// --------------------------------------------------
function initScrollReveal() {
    const revealElements = document.querySelectorAll(
        '.about-card, .stack-category, .project-card, .philosophy-block, .focus-content, .contact-link, .timeline-item, .opensource-card'
    );

    revealElements.forEach(el => el.classList.add('reveal'));

    function checkReveal() {
        const windowHeight = window.innerHeight;
        const revealPoint = 100;

        revealElements.forEach(el => {
            const rect = el.getBoundingClientRect();
            const inView = rect.top < windowHeight - revealPoint && rect.bottom > revealPoint;
            if (inView) {
                el.classList.add('visible');
            } else {
                el.classList.remove('visible');
            }
        });
    }

    checkReveal();
    window.addEventListener('scroll', checkReveal);
}

// --------------------------------------------------
// 7. SMOOTH SCROLL
// --------------------------------------------------
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                const navHeight = document.querySelector('.navbar')?.offsetHeight || 70;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// --------------------------------------------------
// 8. EASTER EGG (press 't')
// --------------------------------------------------
document.addEventListener('keydown', (e) => {
    if (e.key === 't' && !e.ctrlKey && !e.metaKey && document.activeElement === document.body) {
        const heroTerminal = document.querySelector('.hero-terminal');
        if (heroTerminal) {
            heroTerminal.style.boxShadow = '0 0 40px rgba(168, 85, 247, 0.4), 0 8px 32px rgba(0, 0, 0, 0.4)';
            setTimeout(() => {
                heroTerminal.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.4), 0 0 60px rgba(168, 85, 247, 0.05)';
            }, 600);
        }
    }
});

console.log('%c🐧 Welcome to Aditya Verma\'s Portfolio %c| %cArch Linux + Hyprland = ❤️',
    'color: #a855f7; font-size: 16px; font-weight: bold;',
    'color: #a0a0b8;',
    'color: #c084fc;');
console.log('%cTry pressing "t" for a little surprise!', 'color: #6a6a80; font-style: italic;');

// --------------------------------------------------
// 9. MATRIX RAIN — slow, calm, cursor-pushable, zoom-stable
// --------------------------------------------------
function initMatrixRain() {
    const canvas = document.getElementById('matrixCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const fontSize = 18;
    let columns, drops, speeds, brights, vY;
    const chars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノабвгдеёжзキ01100110ABCDEFGHJKLMNPQRSTUVWXYZ#$%&*+-/<>?'.split('');

    let mouseX = -9999, mouseY = -9999;
    const INFLUENCE = 140;
    const PUSH_FORCE = 6;
    const BASE_SPEED = 0.08;
    const FRICTION = 0.92;

    // Use the *visual* viewport so zoom level doesn't change column count.
    const getVW = () => (window.visualViewport ? window.visualViewport.width  : window.innerWidth);
    const getVH = () => (window.visualViewport ? window.visualViewport.height : window.innerHeight);

    function resize() {
        const w = getVW();
        const h = getVH();
        canvas.width = w;
        canvas.height = h;
        canvas.style.width = w + 'px';
        canvas.style.height = h + 'px';
        columns = Math.floor(w / fontSize);
        drops   = new Array(columns).fill(0).map(() => Math.random() * (h / fontSize));
        speeds  = new Array(columns).fill(0).map(() => BASE_SPEED * (0.6 + Math.random() * 0.8));
        brights = new Array(columns).fill(0);
        vY      = new Array(columns).fill(0);
    }
    resize();
    window.addEventListener('resize', resize);
    if (window.visualViewport) {
        window.visualViewport.addEventListener('resize', resize);
        window.visualViewport.addEventListener('scroll', resize);
    }

    window.addEventListener('mousemove', (e) => { mouseX = e.clientX; mouseY = e.clientY; });
    window.addEventListener('mouseleave', () => { mouseX = -9999; mouseY = -9999; });

    function draw() {
        ctx.fillStyle = 'rgba(10, 10, 15, 0.10)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.font = `${fontSize}px "Fira Code", monospace`;

        for (let i = 0; i < columns; i++) {
            const x = i * fontSize;
            const y = drops[i] * fontSize;

            const dx = x - mouseX;
            const dy = y - mouseY;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const near = dist < INFLUENCE;

            const text = chars[Math.floor(Math.random() * chars.length)];

            if (near) {
                const intensity = 1 - dist / INFLUENCE;
                ctx.fillStyle = `rgba(255, 255, 255, ${0.7 + 0.3 * intensity})`;
                ctx.shadowColor = '#c084fc';
                ctx.shadowBlur = 12 * intensity;
                brights[i] = Math.max(brights[i], intensity);
                vY[i] += PUSH_FORCE * intensity;
            } else if (brights[i] > 0.01) {
                ctx.fillStyle = `rgba(216, 180, 254, ${0.45 + brights[i] * 0.5})`;
                ctx.shadowBlur = 0;
                brights[i] *= 0.96;
            } else {
                ctx.fillStyle = 'rgba(168, 85, 247, 0.55)';
                ctx.shadowBlur = 0;
            }

            ctx.fillText(text, x, y);

            drops[i] += speeds[i] + vY[i];
            vY[i] *= FRICTION;

            if (y > canvas.height && Math.random() > 0.985) {
                drops[i] = 0;
                speeds[i] = BASE_SPEED * (0.6 + Math.random() * 0.8);
            }
        }

        requestAnimationFrame(draw);
    }
    draw();
}

// --------------------------------------------------
// 10. ANIME.JS — entrance & scroll animations
// --------------------------------------------------
function initAnimeAnimations() {
    if (typeof anime === 'undefined') return;

    // Hero terminal slides in from the LEFT with rotation
    const terminal = document.querySelector('.hero-terminal');
    if (terminal) {
        terminal.style.opacity = '0';
        anime({
            targets: terminal,
            translateX: [-500, 0],
            rotate: [-12, 0],
            opacity: [0, 1],
            scale: [0.85, 1],
            easing: 'easeOutElastic(1, 0.6)',
            duration: 1800,
            delay: 200,
        });
    }

    // Hero buttons pop in
    anime({
        targets: '.hero-actions .btn',
        translateY: [40, 0],
        opacity: [0, 1],
        scale: [0.8, 1],
        delay: anime.stagger(120, { start: 1200 }),
        easing: 'easeOutBack',
        duration: 800,
    });

    // Navbar drops in
    anime({
        targets: '.navbar',
        translateY: [-80, 0],
        opacity: [0, 1],
        easing: 'easeOutQuad',
        duration: 700,
    });

    // Split section titles into letters for a splash-in effect
    document.querySelectorAll('.section-title').forEach(title => {
        const hash = title.querySelector('.title-hash');
        const rest = title.textContent.replace('#', '').trim();
        title.innerHTML = '';
        if (hash) title.appendChild(hash);
        title.appendChild(document.createTextNode(' '));
        rest.split('').forEach(ch => {
            const s = document.createElement('span');
            s.textContent = ch === ' ' ? '\u00A0' : ch;
            s.style.display = 'inline-block';
            s.style.opacity = '0';
            s.classList.add('title-letter');
            title.appendChild(s);
        });
    });

    const animated = new WeakSet();
    const io = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting || animated.has(entry.target)) return;
            animated.add(entry.target);
            const el = entry.target;

            if (el.classList.contains('section-title')) {
                anime({
                    targets: el.querySelectorAll('.title-letter'),
                    translateY: [30, 0],
                    opacity: [0, 1],
                    rotateZ: [10, 0],
                    delay: anime.stagger(35),
                    easing: 'easeOutExpo',
                    duration: 700,
                });
            } else if (el.classList.contains('about-card') || el.classList.contains('opensource-card')) {
                anime({
                    targets: el,
                    translateY: [60, 0],
                    rotateX: [-25, 0],
                    opacity: [0, 1],
                    easing: 'easeOutBack',
                    duration: 900,
                });
            } else if (el.classList.contains('project-card')) {
                anime({
                    targets: el,
                    translateY: [50, 0],
                    scale: [0.85, 1],
                    opacity: [0, 1],
                    easing: 'spring(1, 80, 10, 0)',
                });
            } else if (el.classList.contains('stack-category')) {
                anime({
                    targets: el,
                    translateX: [-50, 0],
                    opacity: [0, 1],
                    easing: 'easeOutQuint',
                    duration: 800,
                });
                anime({
                    targets: el.querySelectorAll('.skill-tag'),
                    scale: [0, 1],
                    opacity: [0, 1],
                    delay: anime.stagger(40, { start: 200 }),
                    easing: 'easeOutBack',
                    duration: 500,
                });
            } else if (el.classList.contains('timeline-item')) {
                anime({
                    targets: el,
                    translateX: [-80, 0],
                    opacity: [0, 1],
                    easing: 'easeOutExpo',
                    duration: 900,
                });
            } else if (el.classList.contains('contact-link')) {
                anime({
                    targets: el,
                    translateY: [40, 0],
                    opacity: [0, 1],
                    easing: 'easeOutBack',
                    duration: 700,
                });
            } else if (el.classList.contains('philosophy-block') || el.classList.contains('focus-content')) {
                anime({
                    targets: el,
                    scale: [0.9, 1],
                    opacity: [0, 1],
                    easing: 'easeOutElastic(1, 0.7)',
                    duration: 1200,
                });
            }
        });
    }, { threshold: 0.15 });

    document.querySelectorAll(
        '.section-title, .about-card, .opensource-card, .project-card, .stack-category, .timeline-item, .contact-link, .philosophy-block, .focus-content'
    ).forEach(el => {
        if (!el.classList.contains('section-title')) el.style.opacity = '0';
        io.observe(el);
    });
}

// --------------------------------------------------
// 11. GITHUB PROJECTS — auto-pull from public repos
// --------------------------------------------------
async function initGithubProjects() {
    const grid = document.getElementById('projects-grid');
    if (!grid) return;
    const USER = 'jack02134x';

    const langColor = {
        Python: '#3572A5', JavaScript: '#f1e05a', TypeScript: '#3178c6',
        C: '#555555', 'C++': '#f34b7d', Java: '#b07219', Shell: '#89e051',
        GDScript: '#355570', HTML: '#e34c26', CSS: '#563d7c', Lua: '#000080',
        Rust: '#dea584', Go: '#00ADD8'
    };

    try {
        const res = await fetch(`https://api.github.com/users/${USER}/repos?per_page=100&sort=updated`);
        if (!res.ok) throw new Error('GitHub API failed: ' + res.status);
        let repos = await res.json();
        repos = repos
            .filter(r => !r.fork && !r.archived)
            .sort((a, b) => (b.stargazers_count - a.stargazers_count) || (new Date(b.pushed_at) - new Date(a.pushed_at)))
            .slice(0, 9);

        if (!repos.length) {
            grid.innerHTML = `<p class="projects-loading">No public repos yet. Check back soon!</p>`;
            return;
        }

        grid.innerHTML = repos.map((r, i) => {
            const idx = String(i + 1).padStart(2, '0');
            const desc = r.description || 'No description provided. Drop by the repo to see what it does.';
            const lang = r.language ? `<span><i style="display:inline-block;width:10px;height:10px;border-radius:50%;background:${langColor[r.language] || '#a855f7'}"></i>${r.language}</span>` : '';
            const stars = r.stargazers_count ? `<span>★ ${r.stargazers_count}</span>` : '';
            const forks = r.forks_count ? `<span>⑂ ${r.forks_count}</span>` : '';
            const topics = (r.topics || []).slice(0, 4).map(t => `<span>${t}</span>`).join('');
            return `
                <article class="project-card glass-card">
                    <div class="project-number">${idx}</div>
                    <h3>${r.name}</h3>
                    <div class="project-meta">${lang}${stars}${forks}</div>
                    <p>${desc}</p>
                    ${topics ? `<div class="project-tags">${topics}</div>` : ''}
                    <a class="project-link" href="${r.html_url}" target="_blank" rel="noopener noreferrer">view repo →</a>
                </article>`;
        }).join('');

        // re-run reveal + tilt for new cards
        if (typeof anime !== 'undefined') {
            anime({
                targets: grid.querySelectorAll('.project-card'),
                translateY: [40, 0],
                opacity: [0, 1],
                scale: [0.92, 1],
                delay: anime.stagger(80),
                easing: 'easeOutBack',
                duration: 700,
            });
        }
        initCardTilt();
    } catch (err) {
        console.error(err);
        grid.innerHTML = `<p class="projects-loading">Couldn't reach GitHub right now. <a href="https://github.com/${USER}" target="_blank" style="color:#c084fc">Visit profile →</a></p>`;
    }
}

// --------------------------------------------------
// 12. CARD 3D TILT on hover
// --------------------------------------------------
function initCardTilt() {
    document.querySelectorAll('.project-card').forEach(card => {
        if (card.dataset.tilt) return;
        card.dataset.tilt = '1';
        card.addEventListener('mousemove', (e) => {
            const r = card.getBoundingClientRect();
            const x = (e.clientX - r.left) / r.width - 0.5;
            const y = (e.clientY - r.top) / r.height - 0.5;
            card.style.transform = `perspective(900px) rotateX(${-y * 8}deg) rotateY(${x * 8}deg) translateY(-4px)`;
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });
}
