/* ══════════════════════════════════════════
   ABP Industries — script.js
   Shared across all pages
══════════════════════════════════════════ */

document.addEventListener("DOMContentLoaded", function () {
  /* ── AOS ── */
  if (typeof AOS !== "undefined") {
    AOS.init({ once: true, duration: 700, offset: 60 });
  }

  /* ── Sticky header ── */
  const header = document.getElementById("mainHeader");
  if (header) {
    window.addEventListener("scroll", () =>
      header.classList.toggle("scrolled", window.scrollY > 60),
    );
  }

  /* ── Mobile menu ── */
  const navToggle = document.getElementById("navToggle");
  const navClose = document.getElementById("navClose");
  const mobileMenu = document.getElementById("mobileMenu");

  function openMenu() {
    mobileMenu.classList.add("open");
    navToggle.setAttribute("aria-expanded", "true");
    mobileMenu.setAttribute("aria-hidden", "false");
    document.body.classList.add("menu-open");
  }
  function closeMenu() {
    mobileMenu.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
    mobileMenu.setAttribute("aria-hidden", "true");
    document.body.classList.remove("menu-open");
  }

  if (navToggle) navToggle.addEventListener("click", openMenu);
  if (navClose) navClose.addEventListener("click", closeMenu);
  if (mobileMenu) {
    mobileMenu
      .querySelectorAll("a")
      .forEach((a) => a.addEventListener("click", closeMenu));
  }
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMenu();
  });

  /* ── Accordion (Why Choose Us — home page) ── */
  document.querySelectorAll(".choose-header").forEach((hdr) => {
    hdr.addEventListener("click", function () {
      const content = this.nextElementSibling;
      const icon = this.querySelector(".icon");
      const isOpen = content.classList.contains("active");
      document
        .querySelectorAll(".choose-content")
        .forEach((c) => c.classList.remove("active"));
      document
        .querySelectorAll(".choose-header")
        .forEach((h) => h.classList.remove("active"));
      document
        .querySelectorAll(".icon")
        .forEach((i) => (i.innerHTML = "&#43;"));
      if (!isOpen) {
        content.classList.add("active");
        this.classList.add("active");
        icon.innerHTML = "&#8722;";
      }
    });
  });

  /* ── Parallax (home hero) ── */
  const scene = document.getElementById("scene");
  if (scene && typeof Parallax !== "undefined") new Parallax(scene);

  /* ── GSAP scroll animations (home featured products) ── */
  if (typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
    const animateBlock = (trigger, box, content) => {
      if (document.querySelector(trigger)) {
        gsap
          .timeline({
            scrollTrigger: {
              trigger,
              start: "top 80%",
              end: "bottom 20%",
              scrub: 1,
            },
          })
          .from(box, { x: -100, opacity: 0, duration: 1, ease: "power3.out" })
          .from(
            content,
            { x: 100, opacity: 0, duration: 1, ease: "power3.out" },
            "<",
          );
      }
    };
    animateBlock(".featured", ".box", ".content");
    animateBlock(".featured2", ".box2", ".content2");
  }

  /* ── Counter animation (home stats) ── */
  const counters = document.querySelectorAll(".counter");
  if (counters.length) {
    const statsObs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            counters.forEach((counter) => {
              const target = +counter.dataset.target;
              const stepTime = Math.max(20, 5500 / target);
              let count = 0;
              const tick = () => {
                count++;
                counter.innerText = count + "+";
                if (count < target) setTimeout(tick, stepTime);
                else counter.innerText = target + "+";
              };
              tick();
            });
            statsObs.disconnect();
          }
        });
      },
      { threshold: 0.5 },
    );
    const statsSection = document.querySelector(".abp-stats");
    if (statsSection) statsObs.observe(statsSection);
  }

  /* ── Page fade transition ── */
  document
    .querySelectorAll(
      'a:not([href^="#"]):not([href^="mailto"]):not([href^="tel"]):not([href^="https"]):not([data-bs-toggle])',
    )
    .forEach((link) => {
      link.addEventListener("click", (e) => {
        const href = link.getAttribute("href");
        if (!href) return;
        e.preventDefault();
        document.body.style.opacity = "0";
        document.body.style.transition = "opacity 0.3s ease";
        setTimeout(() => (window.location.href = href), 300);
      });
    });

  /* Fade in on page load */
  document.body.style.opacity = "0";
  document.body.style.transition = "opacity 0.4s ease";
  requestAnimationFrame(() => {
    document.body.style.opacity = "1";
  });
});
