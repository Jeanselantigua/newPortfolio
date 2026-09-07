const sidebar = document.getElementById("sidebar");
const menuBtn = document.getElementById("menuBtn");
const backdrop = document.getElementById("navBackdrop");

function setMenu(open) {
  sidebar.classList.toggle("is-open", open);
  menuBtn.setAttribute("aria-expanded", String(open));
  menuBtn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  backdrop.hidden = !open;
  document.body.style.overflow = open ? "hidden" : "";
}

menuBtn.addEventListener("click", () => {
  setMenu(!sidebar.classList.contains("is-open"));
});

backdrop.addEventListener("click", () => setMenu(false));

sidebar.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => setMenu(false));
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") setMenu(false);
});

const navLinks = [...sidebar.querySelectorAll(".sidebar-nav a")];
const sections = navLinks
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navLinks.forEach((link) => {
        link.classList.toggle("is-active", link.getAttribute("href") === `#${entry.target.id}`);
      });
    });
  },
  { rootMargin: "-35% 0px -50% 0px", threshold: 0.01 }
);

sections.forEach((section) => sectionObserver.observe(section));

const animated = document.querySelectorAll("[data-animate]");
if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  animated.forEach((el) => el.classList.add("visible"));
} else {
  const reveal = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("visible");
        reveal.unobserve(entry.target);
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -32px 0px" }
  );
  animated.forEach((el) => reveal.observe(el));
}
