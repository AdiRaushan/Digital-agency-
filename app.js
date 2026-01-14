
gsap.registerPlugin(ScrollTrigger);

// Mobile navigation
const navToggle = document.getElementById("navToggle");
const mobileNav = document.getElementById("mobileNav");
const mobileLinks = document.querySelectorAll(".mobile-nav-links a");

if (navToggle && mobileNav) {
  const toggleMobileNav = (forceState) => {
    const isOpen =
      typeof forceState === "boolean"
        ? forceState
        : !mobileNav.classList.contains("active");
    navToggle.setAttribute("aria-expanded", isOpen.toString());
    mobileNav.classList.toggle("active", isOpen);
    document.body.style.overflow = isOpen ? "hidden" : "";
  };

  navToggle.addEventListener("click", () => toggleMobileNav());
  mobileLinks.forEach((link) =>
    link.addEventListener("click", () => toggleMobileNav(false))
  );
}

// Project showcase hover interaction
const projectChips = document.querySelectorAll(".project-chip");
const projectPreview = document.getElementById("projectPreview");
const projectName = document.getElementById("projectName");
const projectTagline = document.getElementById("projectTagline");
const projectMetric = document.getElementById("projectMetric");

if (
  projectChips.length &&
  projectPreview &&
  projectName &&
  projectTagline &&
  projectMetric
) {
  const activateProject = (chip) => {
    projectChips.forEach((item) => {
      item.classList.remove("active");
      item.setAttribute("aria-pressed", "false");
    });

    chip.classList.add("active");
    chip.setAttribute("aria-pressed", "true");

    const image = chip.getAttribute("data-image");
    const name = chip.getAttribute("data-name");
    const tagline = chip.getAttribute("data-tagline");
    const metric = chip.getAttribute("data-metric");

    if (image) {
      projectPreview.style.backgroundImage = `url('${image}')`;
    }
    if (name) projectName.textContent = name;
    if (tagline) projectTagline.textContent = tagline;
    if (metric) projectMetric.textContent = metric;
  };

  projectChips.forEach((chip) => {
    ["mouseenter", "focus", "click", "touchstart"].forEach((event) => {
      chip.addEventListener(event, () => activateProject(chip));
    });
  });

  activateProject(projectChips[0]);
}

// Progress Bar
const progressBar = document.getElementById("progressBar");
window.addEventListener("scroll", () => {
  const windowHeight =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;
  const scrolled = (window.scrollY / windowHeight) * 100;
  progressBar.style.width = scrolled + "%";
});

// 3D Background Animation
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
const renderer = new THREE.WebGLRenderer({
  alpha: true,
  antialias: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);
document
  .getElementById("canvas-container")
  .appendChild(renderer.domElement);

// Create floating geometric shapes
const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
const material = new THREE.MeshNormalMaterial({
  wireframe: true,
  opacity: 0.3,
  transparent: true,
});
const torus = new THREE.Mesh(geometry, material);
scene.add(torus);

camera.position.z = 30;

function animate() {
  requestAnimationFrame(animate);
  torus.rotation.x += 0.001;
  torus.rotation.y += 0.002;
  renderer.render(scene, camera);
}
animate();

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// GSAP Animations
gsap.from(".hero h1", {
  opacity: 0,
  y: 50,
  duration: 1,
  ease: "power3.out",
});
gsap.from(".hero p", {
  opacity: 0,
  y: 30,
  duration: 1,
  delay: 0.2,
  ease: "power3.out",
});
gsap.from(".hero .flex", {
  opacity: 0,
  y: 30,
  duration: 1,
  delay: 0.4,
  ease: "power3.out",
});

// Scroll Animations
gsap.utils.toArray(".hover-lift").forEach((element) => {
  gsap.from(element, {
    scrollTrigger: {
      trigger: element,
      start: "top 80%",
      toggleActions: "play none none reverse",
    },
    opacity: 0,
    y: 50,
    duration: 0.8,
  });
});

// Header Scroll Effect
const header = document.getElementById("header");
let lastScroll = 0;

window.addEventListener("scroll", () => {
  const currentScroll = window.scrollY;

  if (currentScroll > 100) {
    header.style.padding = "12px 0";
    header.style.boxShadow = "0 4px 20px rgba(0,0,0,0.08)";
  } else {
    header.style.padding = "16px 0";
    header.style.boxShadow = "none";
  }

  lastScroll = currentScroll;
});

// FAQ Accordion
document.querySelectorAll(".faq-question").forEach((question) => {
  question.addEventListener("click", () => {
    const item = question.parentElement;
    const answer = item.querySelector(".faq-answer");
    const icon = question.querySelector("svg");
    const isOpen = !answer.classList.contains("hidden");

    // Close all
    document
      .querySelectorAll(".faq-answer")
      .forEach((a) => a.classList.add("hidden"));
    document
      .querySelectorAll(".faq-question svg")
      .forEach((i) => (i.style.transform = "rotate(0deg)"));

    // Open clicked if was closed
    if (!isOpen) {
      answer.classList.remove("hidden");
      icon.style.transform = "rotate(180deg)";
    }
  });
});

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Form Submission
document
  .getElementById("contactForm")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    const button = this.querySelector('button[type="submit"]');
    const originalText = button.textContent;

    button.textContent = "✓ Message Sent!";
    button.classList.add("opacity-75");

    setTimeout(() => {
      button.textContent = originalText;
      button.classList.remove("opacity-75");
      this.reset();
    }, 3000);
  });

// Parallax Effect for Stats
gsap.to(".floating", {
  y: -20,
  scrollTrigger: {
    trigger: ".floating",
    start: "top bottom",
    end: "bottom top",
    scrub: 1,
  },
});

// Animate counter numbers
const animateCounter = (element, target) => {
  let current = 0;
  const increment = target / 50;
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      element.textContent = target + "+";
      clearInterval(timer);
    } else {
      element.textContent = Math.floor(current) + "+";
    }
  }, 30);
};

// Trigger counter animation on scroll
ScrollTrigger.create({
  trigger: ".stats-bar",
  start: "top 80%",
  once: true,
  onEnter: () => {
    document.querySelectorAll(".counter").forEach((counter) => {
      const target = parseInt(counter.getAttribute("data-target"));
      if (target) animateCounter(counter, target);
    });
  },
});

// Animate section badges
gsap.utils.toArray(".section-badge").forEach((badge) => {
  gsap.from(badge, {
    scrollTrigger: {
      trigger: badge,
      start: "top 85%",
    },
    opacity: 0,
    scale: 0.8,
    duration: 0.5,
  });
});

// Pricing cards stagger animation
gsap.from(".pricing-grid > div", {
  scrollTrigger: {
    trigger: ".pricing-grid",
    start: "top 80%",
  },
  opacity: 0,
  y: 60,
  stagger: 0.2,
  duration: 0.8,
  ease: "power3.out",
});

// Testimonial cards animation
gsap.from(".testimonials .hover-lift", {
  scrollTrigger: {
    trigger: ".testimonials",
    start: "top 80%",
  },
  opacity: 0,
  scale: 0.9,
  stagger: 0.15,
  duration: 0.7,
  ease: "back.out(1.2)",
});

// Services grid animation
gsap.from(".services-grid > div", {
  scrollTrigger: {
    trigger: ".services-grid",
    start: "top 80%",
  },
  opacity: 0,
  y: 40,
  stagger: 0.1,
  duration: 0.6,
});

// Process timeline animation
gsap.utils.toArray(".process .relative > div").forEach((step, i) => {
  gsap.from(step, {
    scrollTrigger: {
      trigger: step,
      start: "top 85%",
    },
    opacity: 0,
    x: i % 2 === 0 ? -50 : 50,
    duration: 0.8,
    ease: "power2.out",
  });
});

// Dashboard preview animation
gsap.from(".glassmorphism", {
  scrollTrigger: {
    trigger: ".glassmorphism",
    start: "top 75%",
  },
  opacity: 0,
  scale: 0.95,
  duration: 1,
  ease: "power3.out",
});

// Trusted logos hover effect
document.querySelectorAll(".trusted-logo").forEach((logo) => {
  logo.addEventListener("mouseenter", () => {
    gsap.to(logo, { scale: 1.1, duration: 0.3 });
  });
  logo.addEventListener("mouseleave", () => {
    gsap.to(logo, { scale: 1, duration: 0.3 });
  });
});

// Add parallax to dot patterns
gsap.utils.toArray(".dot-pattern").forEach((pattern) => {
  gsap.to(pattern, {
    backgroundPosition: "0% 50px",
    ease: "none",
    scrollTrigger: {
      trigger: pattern,
      start: "top bottom",
      end: "bottom top",
      scrub: 1,
    },
  });
});

// Animate feature icons on hover
document.querySelectorAll(".feature-icon").forEach((icon) => {
  icon.addEventListener("mouseenter", () => {
    gsap.to(icon, {
      rotation: 360,
      scale: 1.1,
      duration: 0.6,
      ease: "back.out(1.7)",
    });
  });
  icon.addEventListener("mouseleave", () => {
    gsap.to(icon, {
      rotation: 0,
      scale: 1,
      duration: 0.3,
    });
  });
});

// Reveal animations for text content
gsap.utils.toArray("h2, h3").forEach((heading) => {
  gsap.from(heading, {
    scrollTrigger: {
      trigger: heading,
      start: "top 85%",
    },
    opacity: 0,
    y: 30,
    duration: 0.7,
  });
});

// Add mouse move parallax effect to hero
const hero = document.querySelector(".hero");
hero.addEventListener("mousemove", (e) => {
  const x = (e.clientX / window.innerWidth - 0.5) * 20;
  const y = (e.clientY / window.innerHeight - 0.5) * 20;

  gsap.to(".hero-shape", {
    x: x,
    y: y,
    duration: 1,
    ease: "power2.out",
  });
});

// Intersection Observer for fade-in animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, observerOptions);

// Observe all animated elements
document
  .querySelectorAll(".hover-lift, .service-card, .testimonial-card")
  .forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(20px)";
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(el);
  });

// Add ripple effect to buttons
document
  .querySelectorAll(
    'a[class*="bg-gradient"], button[class*="bg-gradient"]'
  )
  .forEach((button) => {
    button.addEventListener("click", function (e) {
      const ripple = document.createElement("span");
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;

      ripple.style.cssText = `
position: absolute;
width: ${size}px;
height: ${size}px;
border-radius: 50%;
background: rgba(255, 255, 255, 0.5);
left: ${x}px;
top: ${y}px;
transform: scale(0);
animation: ripple 0.6s ease-out;
pointer-events: none;
`;

      this.style.position = "relative";
      this.style.overflow = "hidden";
      this.appendChild(ripple);

      setTimeout(() => ripple.remove(), 600);
    });
  });

// Add ripple animation
const style = document.createElement("style");
style.textContent = `
@keyframes ripple {
to {
transform: scale(4);
opacity: 0;
}
}
`;
document.head.appendChild(style);

// Console welcome message
console.log(
  "%c🚀 WebResolv",
  "font-size: 20px; font-weight: bold; color: #14b8a6;"
);
console.log(
  "%cTurn Your Idea Into Reality!",
  "font-size: 14px; color: #06b6d4;"
);
