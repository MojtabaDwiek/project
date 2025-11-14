// =========================
// FULL UPDATED MAIN SCRIPT
// WITH AI ORB + SECTION DIVIDER ANIMATION
// =========================

document.addEventListener("DOMContentLoaded", () => {

    /* ------------------------------------------- */
    /*                 NAVIGATION                  */
    /* ------------------------------------------- */

    const navToggle = document.querySelector(".nav-toggle");
    const navMenu = document.querySelector(".nav-menu");
    const navLinks = document.querySelectorAll(".nav-link");

    if (navToggle) {
        navToggle.addEventListener("click", () => {
            navMenu.classList.toggle("active");
            navToggle.classList.toggle("active");
        });
    }

    navLinks.forEach((link) => {
        link.addEventListener("click", () => {
            if (navMenu.classList.contains("active")) {
                navMenu.classList.remove("active");
                navToggle.classList.remove("active");
            }
        });
    });

    /* ------------------------------------------- */
    /*                AI ORB HERO                  */
    /* ------------------------------------------- */

    const hero = document.querySelector(".hero-ai");
    const heroScroll = document.querySelector(".hero-scroll");

    const orb = document.querySelector(".ai-orb-container");
    const canvas = document.getElementById("aiParticles");
    const ctx = canvas.getContext("2d");

    let orbX = window.innerWidth / 2;
    let orbY = window.innerHeight / 2;
    let targetX = orbX;
    let targetY = orbY;

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    document.addEventListener("mousemove", (e) => {
        targetX = e.clientX;
        targetY = e.clientY;
    });

    let idle = 0;

    function animateOrb() {
        idle += 0.01;

        orbX += (targetX - orbX) * 0.12;
        orbY += (targetY - orbY) * 0.12;

        if (Math.abs(targetX - orbX) < 0.5 && Math.abs(targetY - orbY) < 0.5) {
            orbX += Math.sin(idle) * 0.5;
            orbY += Math.cos(idle * 0.7) * 0.5;
        }

        orb.style.transform = `translate(${orbX - 90}px, ${orbY - 90}px)`;
        requestAnimationFrame(animateOrb);
    }
    animateOrb();

    /* ---------------- PARTICLE FIELD ---------------- */

    const particles = [];
    const MAX_PARTICLES = 120;

    function createParticles() {
        for (let i = 0; i < MAX_PARTICLES; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                size: Math.random() * 2 + 1,
                speedX: Math.random() * 0.4 - 0.2,
                speedY: Math.random() * 0.4 - 0.2,
            });
        }
    }
    createParticles();

    function drawParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach((p) => {
            ctx.fillStyle = "rgba(96,165,250,0.85)";
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fill();

            p.x += p.speedX;
            p.y += p.speedY;

            const dx = p.x - orbX;
            const dy = p.y - orbY;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < 150) {
                p.x += dx * 0.03;
                p.y += dy * 0.03;
            }

            if (p.x < 0 || p.x > canvas.width || p.y < 0 || p.y > canvas.height) {
                p.x = Math.random() * canvas.width;
                p.y = Math.random() * canvas.height;
            }
        });

        requestAnimationFrame(drawParticles);
    }
    drawParticles();

    /* Scroll reveal for hero */
    if (hero) {
        const heroObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => entry.isIntersecting && hero.classList.add("active"));
            },
            { threshold: 0.45 }
        );
        heroObserver.observe(hero);
    }

    /* ------------------------------------------- */
    /*       SECTION ENTRANCE ANIMATIONS           */
    /* ------------------------------------------- */

    const animatedElements = document.querySelectorAll(
        ".animate-from-left, .animate-from-right, .animate-from-top, .animate-from-bottom"
    );

    function checkElementsInView() {
        const winTop = window.scrollY;
        const winBottom = winTop + window.innerHeight;

        animatedElements.forEach((el) => {
            const top = el.offsetTop;
            const bottom = top + el.offsetHeight;

            if (bottom >= winTop && top <= winBottom) {
                el.classList.add("active");
                el.classList.remove("inactive");
            } else if (el.classList.contains("active")) {
                el.classList.add("inactive");
                el.classList.remove("active");
            }
        });
    }

    /* ------------------------------------------- */
    /*      🔥 SECTION DIVIDER SCROLL ANIMATION     */
    /* ------------------------------------------- */

    const dividers = document.querySelectorAll(".section-divider");

    function animateDividers() {
        const winTop = window.scrollY;
        const winBottom = winTop + window.innerHeight;

        dividers.forEach((divider) => {
            const top = divider.offsetTop - 100;
            const bottom = top + divider.offsetHeight + 200;

            if (bottom >= winTop && top <= winBottom) {
                divider.classList.add("active-divider");
            } else {
                divider.classList.remove("active-divider");
            }
        });
    }

    /* ------------------------------------------- */
    /*          HEADER + ACTIVE NAV LINK           */
    /* ------------------------------------------- */

    function handleHeaderScroll() {
        const header = document.querySelector(".header");

        if (window.scrollY > 50) {
            header.style.background = "rgba(15, 23, 42, 0.95)";
            header.style.boxShadow = "0 5px 20px rgba(0, 0, 0, 0.15)";
        } else {
            header.style.background = "rgba(15, 23, 42, 0.9)";
            header.style.boxShadow = "none";
        }

        updateActiveNavLink();
    }

    function updateActiveNavLink() {
        const sections = document.querySelectorAll("section[id]");
        let current = "";

        sections.forEach((section) => {
            const top = section.offsetTop - 170;
            const height = section.offsetHeight;

            if (window.scrollY >= top && window.scrollY < top + height) {
                current = section.id;
            }
        });

        navLinks.forEach((link) => {
            link.classList.toggle("active", link.getAttribute("href") === `#${current}`);
        });
    }

    /* ------------------------------------------- */
    /*               FORM HANDLING                */
    /* ------------------------------------------- */

    const newsletterForm = document.querySelector(".newsletter-form");
    const contactForm = document.querySelector(".contact-form");

    if (newsletterForm) {
        newsletterForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const email = newsletterForm.querySelector("input[type='email']").value;
            alert(`Thank you for subscribing with ${email}!`);
            newsletterForm.reset();
        });
    }

    if (contactForm) {
        contactForm.addEventListener("submit", (e) => {
            e.preventDefault();
            alert("Thank you! We will get back to you shortly.");
            contactForm.reset();
        });
    }

    /* ------------------------------------------- */
    /*     FUTURISTIC BACKGROUND SECTION EFFECTS    */
    /* ------------------------------------------- */

    function initFuturisticAnimations() {
        const bgElements = document.querySelectorAll(".bg-element");
        const maskedImages = document.querySelectorAll(".masked-image");
        const techElements = document.querySelectorAll(".tech-element");
        const streams = document.querySelectorAll(".stream");

        function checkFuturisticElementsInView() {
            const winTop = window.scrollY;
            const winBottom = winTop + window.innerHeight;

            [...bgElements].forEach((el, i) => {
                const top = el.offsetTop;
                const bottom = top + el.offsetHeight;

                if (bottom >= winTop && top <= winBottom) {
                    setTimeout(() => el.classList.add("active"), i * 200);
                } else el.classList.remove("active");
            });

           [...maskedImages].forEach((el, i) => {
    const rect = el.getBoundingClientRect();
    const elementTop = rect.top;
    const elementBottom = rect.bottom;

    const vh = window.innerHeight;

    // Best reveal middle band:
    const appearTop = vh * 0.30;   // 30%
    const appearBottom = vh * 0.70; // 70%

    // Safe visibility zone:
    const hideTop = vh * 0.15;     // 15%
    const hideBottom = vh * 0.85;  // 85%

    /* --- APPEAR: enters the middle zone --- */
    if (elementTop < appearBottom && elementBottom > appearTop) {
        setTimeout(() => el.classList.add("active"), i * 300);
    }

    /* --- DISAPPEAR: leaves the safe zone --- */
    if (elementBottom < hideTop || elementTop > hideBottom) {
        el.classList.remove("active");
    }
});



            techElements.forEach((el) => {
                const top = el.offsetTop;
                const bottom = top + el.offsetHeight;

                el.style.opacity = bottom >= winTop && top <= winBottom ? 1 : 0.5;
            });

            streams.forEach((el, i) => {
                const top = el.offsetTop;
                const bottom = top + el.offsetHeight;

                if (bottom >= winTop && top <= winBottom) {
                    setTimeout(() => el.classList.add("active"), i * 120);
                } else el.classList.remove("active");
            });
        }

        checkFuturisticElementsInView();
        window.addEventListener("scroll", checkFuturisticElementsInView);
    }

    initFuturisticAnimations();

    /* ------------------------------------------- */
    /*                INITIALIZE ALL               */
    /* ------------------------------------------- */

    function initAnimations() {
        checkElementsInView();
        handleHeaderScroll();
        animateDividers();
    }

    initAnimations();

    window.addEventListener("scroll", () => {
        checkElementsInView();
        handleHeaderScroll();
        animateDividers();
    });

    window.addEventListener("load", () => {
        document.body.classList.add("loaded");
        setTimeout(() => {
            checkElementsInView();
            animateDividers();
        }, 400);
    });
});