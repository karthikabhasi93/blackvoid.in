document.addEventListener("DOMContentLoaded", () => {
  const runAnimations = () => {
    document.body.classList.remove("no-js");

    if (window.gsap && window.ScrollTrigger) {
      gsap.registerPlugin(ScrollTrigger);
      gsap.utils.toArray(".reveal").forEach(el => {
        gsap.to(el, {
          opacity: 1, y: 0, duration: .85, ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 88%", once: true }
        });
      });

      const heroTitle = document.querySelector(".hero-title");
      if (heroTitle) gsap.fromTo(heroTitle, {y: 35, opacity: 0}, {y: 0, opacity: 1, duration: 1.15, delay: .12, ease: "power4.out"});

      const orb = document.querySelector(".hero-orb");
      if (orb) gsap.to(orb, {y: 45, x: -20, rotation: 6, duration: 7, repeat: -1, yoyo: true, ease: "sine.inOut"});
    } else {
      document.querySelectorAll(".reveal").forEach(el => { el.style.opacity = 1; el.style.transform = "none"; });
    }

    document.querySelectorAll(".project-card, .service-card, .product-card, .team-card").forEach(card => {
      card.addEventListener("mousemove", e => {
        const r = card.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - .5;
        const y = (e.clientY - r.top) / r.height - .5;
        card.style.transform = `perspective(900px) rotateX(${y * -2}deg) rotateY(${x * 2}deg) translateY(-5px)`;
      });
      card.addEventListener("mouseleave", () => card.style.transform = "");
    });
  };

  // Components are fetched asynchronously; wait briefly for their markup before animation setup.
  setTimeout(runAnimations, 80);
});
