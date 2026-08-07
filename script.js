/* =========================================================================
   1. LENIS SMOOTH SCROLL ARCHITECTURE
========================================================================= */
let lenis;
if (typeof Lenis !== 'undefined') {
    lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smooth: true
    });

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
}
/* =========================================================================
   DIRECT HERO ENTRANCE (NO LOADER)
========================================================================= */
document.addEventListener("DOMContentLoaded", () => {
    // Ensure body is visible immediately
    document.body.style.opacity = "1";
    document.body.style.overflowX = "hidden";
    
    executeHeroEntrance();
});

function executeHeroEntrance() {
    if (typeof gsap === 'undefined') return;

    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
    
    tl.to(".navbar", { y: 0, opacity: 1, duration: 1 })
      .from(".hello", { y: 30, opacity: 0, duration: 0.6 }, "-=0.5")
      .from(".hero-title h1 span", { y: 50, opacity: 0, stagger: 0.1, duration: 0.8 }, "-=0.4")
      .from(".lastname", { opacity: 0, letterSpacing: "25px", duration: 0.8 }, "-=0.6")
      .from(".hero-title h2", { y: 30, opacity: 0, duration: 0.6 }, "-=0.6")
      .from(".hero-description", { y: 20, opacity: 0, duration: 0.6 }, "-=0.5")
      .from(".hero-buttons a", { y: 20, opacity: 0, stagger: 0.15, duration: 0.6 }, "-=0.4")
      .from(".profile-orb", { scale: 0.5, opacity: 0, duration: 1, ease: "elastic.out(1, 0.75)" }, "-=0.8")
      .from(".floating-card", { scale: 0.8, opacity: 0, stagger: 0.2, duration: 0.8 }, "-=0.6");

    gsap.utils.toArray(".section-heading, .about-text, .skill-card, .project-card, .notice-card, .package-box").forEach(item => {
        gsap.from(item, {
            scrollTrigger: {
                trigger: item,
                start: "top 88%",
                toggleActions: "play none none none"
            },
            y: 50,
            opacity: 0,
            duration: 0.85,
            ease: "power3.out"
        });
    });
}
// Fail-safe Timer
setTimeout(() => {
    const loader = document.getElementById("introLoader");
    if (loader && !loader.classList.contains("hide")) {
        hideLoader();
        executeHeroEntrance();
    }
}, 4000);

function executeHeroEntrance() {
    if (typeof gsap === 'undefined') return;

    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
    
    tl.to(".navbar", { y: 0, opacity: 1, duration: 1 })
      .from(".hello", { y: 30, opacity: 0, duration: 0.6 }, "-=0.5")
      .from(".hero-title h1 span", { y: 50, opacity: 0, stagger: 0.1, duration: 0.8 }, "-=0.4")
      .from(".lastname", { opacity: 0, letterSpacing: "25px", duration: 0.8 }, "-=0.6")
      .from(".hero-title h2", { y: 30, opacity: 0, duration: 0.6 }, "-=0.6")
      .from(".hero-description", { y: 20, opacity: 0, duration: 0.6 }, "-=0.5")
      .from(".hero-buttons a", { y: 20, opacity: 0, stagger: 0.15, duration: 0.6 }, "-=0.4")
      .from(".profile-orb", { scale: 0.5, opacity: 0, duration: 1, ease: "elastic.out(1, 0.75)" }, "-=0.8")
      .from(".floating-card", { scale: 0.8, opacity: 0, stagger: 0.2, duration: 0.8 }, "-=0.6");

    gsap.utils.toArray(".section-heading, .about-text, .skill-card, .project-card, .notice-card, .package-box").forEach(item => {
        gsap.from(item, {
            scrollTrigger: {
                trigger: item,
                start: "top 88%",
                toggleActions: "play none none none"
            },
            y: 50,
            opacity: 0,
            duration: 0.85,
            ease: "power3.out"
        });
    });
}

/* =========================================================================
   3. CURSOR & 3D PARALLAX TILT MODULES
========================================================================= */
const orbContainer = document.querySelector(".profile-orb-container");
const cardOne = document.querySelector(".card-one");
const cardTwo = document.querySelector(".card-two");

document.addEventListener("mousemove", (e) => {
    if (typeof gsap === 'undefined') return;
    
    const x = (e.clientX / window.innerWidth - 0.5) * 30;
    const y = (e.clientY / window.innerHeight - 0.5) * 30;

    if (orbContainer && window.innerWidth > 968) {
        gsap.to(orbContainer, { 
            rotationY: x * 1.2, 
            rotationX: -y * 1.2, 
            duration: 0.8, 
            ease: "power2.out" 
        });
        gsap.to(cardOne, { x: x * 0.7, y: y * 0.7, duration: 1 });
        gsap.to(cardTwo, { x: -x * 0.6, y: -y * 0.6, duration: 1 });
    }
});

const projectCards = document.querySelectorAll(".project-card");
projectCards.forEach(card => {
    card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        card.style.setProperty("--mouse-x", `${x}px`);
        card.style.setProperty("--mouse-y", `${y}px`);

        if (window.innerWidth > 968) {
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = ((y - centerY) / centerY) * -10;
            const rotateY = ((x - centerX) / centerX) * 10;

            card.style.transform = `translateY(-12px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        }
    });

    card.addEventListener("mouseleave", () => {
        card.style.transform = "translateY(0px) rotateX(0deg) rotateY(0deg)";
    });
});

/* =========================================================================
   4. INTERACTIVE ACTIONS (NAVBAR & AJAX FORM)
========================================================================= */
const navbar = document.querySelector(".navbar");
const menuBtn = document.getElementById("menuBtn");
const navLinks = document.querySelector(".nav-links");

window.addEventListener("scroll", () => {
    if (navbar) {
        if (window.scrollY > 50) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    }
    
    let currentSectionId = "";
    document.querySelectorAll("main, section").forEach(section => {
        const sectionTop = section.offsetTop - 180;
        if (window.scrollY >= sectionTop) {
            currentSectionId = section.getAttribute("id");
        }
    });

    document.querySelectorAll(".nav-links a").forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${currentSectionId}`) {
            link.classList.add("active");
        }
    });
});

if (menuBtn && navLinks) {
    menuBtn.addEventListener("click", () => {
        navLinks.classList.toggle("show");
    });

    document.querySelectorAll(".nav-links a").forEach(link => {
        link.addEventListener("click", () => {
            navLinks.classList.remove("show");
        });
    });
}

// Form Submission with AJAX
document.addEventListener("DOMContentLoaded", () => {
    const contactForm = document.querySelector(".contact-form");
    
    if (contactForm) {
        contactForm.addEventListener("submit", async (e) => {
            e.preventDefault();
            
            const submitBtn = contactForm.querySelector(".send-btn");
            const originalText = submitBtn.innerHTML;
            
            submitBtn.innerHTML = "Transmitting... ⏳";
            submitBtn.style.pointerEvents = "none";
            submitBtn.style.background = "#151518";

            const data = new FormData(contactForm);
            
            try {
                const response = await fetch(contactForm.action, {
                    method: contactForm.method,
                    body: data,
                    headers: { 'Accept': 'application/json' }
                });
                
                if (response.ok) {
                    submitBtn.innerHTML = "Message Transmitted Successfully! ✓";
                    submitBtn.style.background = "#ff0033";
                    submitBtn.style.color = "#fff";
                    submitBtn.style.boxShadow = "0 0 30px rgba(255, 0, 51, 0.5)";
                    contactForm.reset();
                    
                    setTimeout(() => {
                        submitBtn.innerHTML = originalText;
                        submitBtn.style.pointerEvents = "all";
                        submitBtn.style.background = "linear-gradient(90deg, #ff0033, #aa0022)";
                        submitBtn.style.boxShadow = "none";
                    }, 4000);
                } else {
                    throw new Error('Submission failed');
                }
            } catch (error) {
                submitBtn.innerHTML = "Transmission Failed. Retry ⚠";
                submitBtn.style.background = "#555";
                submitBtn.style.color = "#fff";
                submitBtn.style.pointerEvents = "all";
            }
        });
    }
});