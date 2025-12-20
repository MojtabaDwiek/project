// =========================
// FULL UPDATED MAIN SCRIPT
// WITH AI ORB + SECTION DIVIDER ANIMATION
// =========================

document.addEventListener("DOMContentLoaded", () => {

    /* ------------------------------------------- */
    /*        IMAGE LOADING OPTIMIZATIONS          */
    /* ------------------------------------------- */
    const lazyImages = document.querySelectorAll('img:not([loading])');
    lazyImages.forEach((img) => {
        if (img.classList.contains("nav-logo-img")) return;
        if (img.closest(".hero-ai") || img.closest(".talent-hero") || img.closest(".insights-hero")) return;
        img.setAttribute("loading", "lazy");
        img.setAttribute("decoding", "async");
    });

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
            document.body.classList.toggle("nav-open", navMenu.classList.contains("active"));
        });
    }

    navLinks.forEach((link) => {
        link.addEventListener("click", () => {
            if (navMenu.classList.contains("active")) {
                navMenu.classList.remove("active");
                navToggle?.classList.remove("active");
                document.body.classList.remove("nav-open");
            }
        });
    });

    /* ------------------------------------------- */
    /*                AI ORB HERO                  */
    /* ------------------------------------------- */

    const hero = document.querySelector(".hero-ai, .talent-hero");
    const heroScroll = document.querySelector(".hero-scroll");

    const orb = document.querySelector(".ai-orb-container");
    const canvas = document.getElementById("aiParticles");
    const ctx = canvas ? canvas.getContext("2d") : null;

    if (canvas && ctx && orb) {
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
        const MAX_PARTICLES = 60;
        const PARTICLE_COLOR = "rgba(240,76,35,0.92)"; // branded quarter-circle accent
        const MIN_PARTICLE_SIZE = 5;
        const SIZE_VARIATION = 5;

        function createParticles() {
            for (let i = 0; i < MAX_PARTICLES; i++) {
                particles.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    size: Math.random() * SIZE_VARIATION + MIN_PARTICLE_SIZE,
                    speedX: Math.random() * 0.4 - 0.2,
                    speedY: Math.random() * 0.4 - 0.2,
                    rotation: Math.random() * Math.PI * 2,
                    rotationSpeed: (Math.random() - 0.5) * 0.004,
                });
            }
        }
        createParticles();

        function drawQuarterShape(particle) {
            ctx.save();
            ctx.translate(particle.x, particle.y);
            ctx.rotate(particle.rotation);
            ctx.fillStyle = PARTICLE_COLOR;
            ctx.beginPath();
            const size = particle.size;
            const offset = size / 2;
            ctx.moveTo(-offset, -offset);
            ctx.lineTo(offset, -offset);
            ctx.arc(-offset, -offset, size, 0, Math.PI / 2);
            ctx.closePath();
            ctx.fill();
            ctx.restore();
        }

        function drawParticles() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particles.forEach((p) => {
                drawQuarterShape(p);

                p.x += p.speedX;
                p.y += p.speedY;
                p.rotation += p.rotationSpeed;
                p.speedX += (Math.random() - 0.5) * 0.002;
                p.speedY += (Math.random() - 0.5) * 0.002;
                p.speedX = Math.max(Math.min(p.speedX, 0.25), -0.25);
                p.speedY = Math.max(Math.min(p.speedY, 0.25), -0.25);

                const dx = p.x - orbX;
                const dy = p.y - orbY;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < 90) {
                    p.x += dx * 0.02;
                    p.y += dy * 0.02;
                }

                const margin = p.size * 2;
                if (p.x < -margin) p.x = canvas.width + margin;
                if (p.x > canvas.width + margin) p.x = -margin;
                if (p.y < -margin) p.y = canvas.height + margin;
                if (p.y > canvas.height + margin) p.y = -margin;
            });

            requestAnimationFrame(drawParticles);
        }
        drawParticles();
    }

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

    /* Header blur after leaving hero */
    const header = document.querySelector(".header");
    if (hero && header) {
        const headerObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        header.classList.remove("header-glass");
                    } else {
                        header.classList.add("header-glass");
                    }
                });
            },
            { threshold: 0.15 }
        );
        headerObserver.observe(hero);
    } else if (header) {
        header.classList.add("header-glass");
    }

    /* ------------------------------------------- */
    /*       SECTION ENTRANCE ANIMATIONS           */
    /* ------------------------------------------- */

    const animatedElements = document.querySelectorAll(
        ".animate-from-left, .animate-from-right, .animate-from-top, .animate-from-bottom"
    );

    function seedAdvancedAnimations() {
        // Assign subtle per-element variation so repeated blocks feel alive
        animatedElements.forEach((el, index) => {
            const distance = 0.85 + Math.random() * 0.45;
            const tilt = (Math.random() * 2 - 1).toFixed(2);
            const lift = (Math.random() * 18 - 9).toFixed(1);
            const overshoot = 1.02 + Math.random() * 0.06;
            const scaleFrom = 0.9 + Math.random() * 0.08;
            const inlineDelay = parseFloat(el.style.animationDelay) || 0;
            const delay = Math.min(index * 0.04 + Math.random() * 0.18 + inlineDelay, 1).toFixed(2);
            const tiltX = (Math.random() * 12 - 6).toFixed(2);
            const tiltY = (Math.random() * 10 - 5).toFixed(2);
            const depth = (Math.random() * 60 + 35).toFixed(1);
            const spinDir = Math.random() > 0.5 ? 1 : -1;
            const midScale = (1.03 + Math.random() * 0.07).toFixed(3);

            el.style.setProperty("--anim-distance", distance);
            el.style.setProperty("--anim-tilt", `${tilt}deg`);
            el.style.setProperty("--anim-tilt-x", `${tiltX}deg`);
            el.style.setProperty("--anim-tilt-y", `${tiltY}deg`);
            el.style.setProperty("--anim-lift", `${lift}px`);
            el.style.setProperty("--anim-delay", `${delay}s`);
            el.style.setProperty("--anim-overshoot", overshoot.toFixed(3));
            el.style.setProperty("--anim-scale-from", scaleFrom.toFixed(3));
            el.style.setProperty("--anim-depth", `${depth}px`);
            el.style.setProperty("--anim-spin-dir", spinDir);
            el.style.setProperty("--anim-mid-scale", midScale);
        });
    }
    seedAdvancedAnimations();

    function checkElementsInView() {
        const winTop = window.scrollY;
        const winBottom = winTop + window.innerHeight;

        animatedElements.forEach((el) => {
            const top = el.offsetTop;
            const bottom = top + el.offsetHeight;

            // Keep elements always visible (animations disabled)
            el.classList.add("active");
            el.classList.remove("inactive");
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
            header.style.background = "transparent";
            header.style.boxShadow = "none";
        } else {
            header.style.background = "transparent";
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
            const target = link.hash || link.getAttribute("href");
            link.classList.toggle("active", target === `#${current}`);
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
            const formData = new FormData(contactForm);
            const name = (formData.get("name") || "").toString().trim();
            const email = (formData.get("email") || "").toString().trim();
            const subjectValue = (formData.get("subject") || "").toString().trim();
            const message = (formData.get("message") || "").toString().trim();
            const subjectSelect = contactForm.querySelector("select[name='subject']");
            const subjectText = subjectSelect?.options?.[subjectSelect.selectedIndex]?.text || subjectValue;
            const mailSubject =
                subjectText && subjectText !== "Subject"
                    ? `Contact: ${subjectText}`
                    : "Contact Form Message";
            const bodyLines = [
                `Name: ${name || "-"}`,
                `Email: ${email || "-"}`,
                `Subject: ${subjectText || subjectValue || "-"}`,
                "",
                "Message:",
                message || "-",
            ];
            const mailtoLink = `mailto:Info@worktales.com?subject=${encodeURIComponent(
                mailSubject
            )}&body=${encodeURIComponent(bodyLines.join("\n"))}`;
            window.location.href = mailtoLink;
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

    function initServiceToggles() {
        const serviceLines = document.querySelectorAll(".service-line");
        if (!serviceLines.length) return;

        let hasInteractiveLine = false;

        const adjustOpenBodies = () => {
            document.querySelectorAll(".service-line.open .service-line-body").forEach((body) => {
                body.style.maxHeight = `${body.scrollHeight}px`;
            });
        };

        serviceLines.forEach((line) => {
            const toggle = line.querySelector(".service-toggle");
            const body = line.querySelector(".service-line-body");
            if (!toggle || !body) return;

            hasInteractiveLine = true;
            const label = toggle.querySelector(".toggle-label");

            body.classList.add("collapsible");
            body.style.maxHeight = "0px";
            body.setAttribute("aria-hidden", "true");
            toggle.setAttribute("aria-expanded", "false");

            toggle.addEventListener("click", () => {
                const isOpen = line.classList.toggle("open");
                toggle.setAttribute("aria-expanded", isOpen);

                if (isOpen) {
                    body.style.maxHeight = `${body.scrollHeight}px`;
                    body.setAttribute("aria-hidden", "false");
                    if (label) label.textContent = "Read less";
                } else {
                    body.style.maxHeight = "0px";
                    body.setAttribute("aria-hidden", "true");
                    if (label) label.textContent = "Read more";
                }
            });
        });

        if (hasInteractiveLine) {
            window.addEventListener("resize", adjustOpenBodies);
        }
    }

    initServiceToggles();

    /* ------------------------------------------- */
    /*     MOBILE SERVICE FEATURE ACCORDIONS       */
    /* ------------------------------------------- */

    function initFeatureAccordions() {
        const blocks = document.querySelectorAll(".service-features");
        if (!blocks.length) return;

        const mql = window.matchMedia("(max-width: 768px)");

        const setupBlock = (block, isMobile) => {
            const toggle = block.querySelector(".features-toggle");
            const list = block.querySelector(".feature-list");
            if (!toggle || !list) return;

            const applyState = (open) => {
                toggle.setAttribute("aria-expanded", open);
                list.classList.toggle("is-open", open);
                list.style.maxHeight = open ? `${list.scrollHeight}px` : "0px";
                list.setAttribute("aria-hidden", open ? "false" : "true");
            };

            toggle.onclick = null;

            if (isMobile) {
                applyState(false);
                toggle.onclick = () => {
                    const isOpen = list.classList.contains("is-open");
                    applyState(!isOpen);
                };
            } else {
                list.style.maxHeight = "none";
                applyState(true);
            }
        };

        const initAll = (isMobile) => blocks.forEach((b) => setupBlock(b, isMobile));

        initAll(mql.matches);
        mql.addEventListener("change", (e) => initAll(e.matches));
        window.addEventListener("resize", () => {
            blocks.forEach((block) => {
                const list = block.querySelector(".feature-list");
                if (list && list.classList.contains("is-open")) {
                    list.style.maxHeight = `${list.scrollHeight}px`;
                }
            });
        });
    }

    initFeatureAccordions();

    /* ------------------------------------------- */
    /*         WHY LEBANON HEX HOVER (JS)          */
    /* ------------------------------------------- */

    function initWhyHexHover() {
        const hexes = document.querySelectorAll(".why-hex");
        if (!hexes.length) return;

        const scene = document.querySelector(".why-hex-scene");
        const hideTimers = new WeakMap();
        const prefersTap = window.matchMedia("(pointer: coarse)").matches || window.innerWidth <= 900;

        const clearHexes = () => {
            hexes.forEach((node) => {
                const tooltipEl = node.querySelector(".hex-tooltip");
                const timer = hideTimers.get(node);
                if (timer) {
                    clearTimeout(timer);
                    hideTimers.delete(node);
                }
                node.classList.remove("is-active");
                if (tooltipEl) tooltipEl.classList.remove("is-visible");
            });
            if (scene) scene.classList.remove("modal-active");
        };

        hexes.forEach((hex) => {
            const tooltip = hex.querySelector(".hex-tooltip");
            const label = hex.querySelector(".why-hex-label");
            const side = hex.dataset.side;

            // Ensure tooltip is on the correct side if not already set
            if (tooltip && !tooltip.classList.contains("hex-tooltip-left") && !tooltip.classList.contains("hex-tooltip-right")) {
                const isRight = side === "right";
                tooltip.classList.add(isRight ? "hex-tooltip-right" : "hex-tooltip-left");
            }

            if (prefersTap) {
                hex.addEventListener("click", (event) => {
                    const isActive = hex.classList.contains("is-active");
                    clearHexes();
                    if (!isActive) {
                        if (tooltip && label) {
                            tooltip.dataset.title = label.textContent.trim();
                        }
                        hex.classList.add("is-active");
                        if (tooltip) tooltip.classList.add("is-visible");
                        if (scene) scene.classList.add("modal-active");
                    }
                    event.stopPropagation();
                });
                return;
            }

            const activate = () => {
                const timer = hideTimers.get(hex);
                if (timer) {
                    clearTimeout(timer);
                    hideTimers.delete(hex);
                }
                hex.classList.add("is-active");
                if (tooltip) tooltip.classList.add("is-visible");
            };

            const deactivate = () => {
                const timer = setTimeout(() => {
                    hex.classList.remove("is-active");
                    if (tooltip) {
                        tooltip.classList.remove("is-visible");
                    }
                    hideTimers.delete(hex);
                }, 120);
                hideTimers.set(hex, timer);
            };

            hex.addEventListener("mouseenter", activate);
            hex.addEventListener("mouseleave", deactivate);
            hex.addEventListener("focus", activate);
            hex.addEventListener("blur", deactivate);
        });

        if (prefersTap) {
            document.addEventListener("click", (event) => {
                if (![...hexes].some((hex) => hex.contains(event.target))) {
                    clearHexes();
                }
            });
        }
    }

    initWhyHexHover();

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
