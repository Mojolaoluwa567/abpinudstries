document.addEventListener("DOMContentLoaded", function () {
  gsap.registerPlugin(ScrollTrigger); // Ensure GSAP ScrollTrigger is available

  // === Loader and Redirect Animation ===
  if (window.location.pathname.includes("index.html")) {
    const loaderImage = document.getElementById("loader");
    const logoAnimation = document.getElementById("logo-animation");

    if (loaderImage && logoAnimation) {
      gsap
        .timeline()
        .to(loaderImage, { scale: 1.2, duration: 0.725, ease: "power3.out" })
        .to(logoAnimation, {
          scale: 0,
          opacity: 0,
          duration: 0.8,
          ease: "power3.in",
          onComplete: () => (window.location.href = "home.html"),
        });
    }
  }

  // === Page Transition Animation ===
  const pageWrapper = document.getElementById("pageWrapper");
  if (pageWrapper) {
    document.querySelectorAll("a:not(.no-page-transition)").forEach((link) => {
      link.addEventListener("click", function (e) {
        const href = link.getAttribute("href");
        if (!href || href.startsWith("http") || href.startsWith("#")) return;

        e.preventDefault();
        gsap.to(pageWrapper, {
          x: "-100vw",
          duration: 0.5,
          ease: "power4.inOut",
          onComplete: () => (window.location.href = href),
        });
      });
    });
  }

  // === Accordion (Choose Section) ===
  document.querySelectorAll(".choose-header").forEach((header) => {
    header.addEventListener("click", function () {
      const content = this.nextElementSibling;
      const icon = this.querySelector(".icon");

      document
        .querySelectorAll(".choose-content")
        .forEach((item) => item.classList.remove("active"));
      document
        .querySelectorAll(".choose-header")
        .forEach((hdr) => hdr.classList.remove("active"));
      document
        .querySelectorAll(".icon")
        .forEach((icn) => (icn.innerHTML = "&#43;"));

      if (!content.classList.contains("active")) {
        content.classList.add("active");
        this.classList.add("active");
        icon.innerHTML = "&#8722;";
      }
    });
  });

  // === Parallax Effect ===
  const scene = document.getElementById("scene");
  if (scene) new Parallax(scene);

  // === View More Expand Effect with Zoom Transition ===
  const viewMoreLink = document.getElementById("viewMoreLink");
  if (viewMoreLink) {
    viewMoreLink.addEventListener("click", (e) => {
      e.preventDefault();

      gsap.to("body", {
        scale: 1.2,
        opacity: 0,
        duration: 0.8,
        ease: "power2.inOut",
        onComplete: () => {
          window.location.href = viewMoreLink.href;
        },
      });
    });
  }

  // === Scroll Animations ===
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
          "<"
        );
    }
  };

  animateBlock(".featured", ".box", ".content");
  animateBlock(".featured2", ".box2", ".content2");

  // === Counter Animation ===
  const counters = document.querySelectorAll(".counter");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          counters.forEach((counter) => {
            let target = +counter.dataset.target;
            let count = 0;
            const stepTime = Math.max(20, 5500 / target);

            const updateCount = () => {
              count++;
              counter.innerText = `${count}+`;
              if (count < target) setTimeout(updateCount, stepTime);
              else counter.innerText = `${target}+`;
            };

            updateCount();
          });
          observer.disconnect();
        }
      });
    },
    { threshold: 0.5 }
  );

  const statsSection = document.querySelector(".abp-stats");
  if (statsSection) observer.observe(statsSection);
});
