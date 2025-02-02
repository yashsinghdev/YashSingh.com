document.addEventListener("DOMContentLoaded", () => {
  const scrollElements = document.querySelectorAll(".scroll-animate");

  // Intersection Observer for scroll animation (unchanged)
  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  scrollElements.forEach((el) => observer.observe(el));

  // Smooth scrolling for internal navigation links (except "Projects" link)
  document.querySelectorAll("header nav a").forEach((link) => {
    link.addEventListener("click", function (e) {
      const targetHref = this.getAttribute("href");

      // If the link is to the Projects page, do NOT prevent default behavior (normal navigation)
      if (targetHref === "Projects/Project2.html") {
        return; // Allow normal navigation to the Projects page
      }

      // For other links, apply smooth scrolling
      if (targetHref.startsWith("#")) {
        // Only smooth scroll for internal anchors
        e.preventDefault(); // Prevent default behavior for smooth scrolling
        const targetId = this.getAttribute("href");
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: "smooth" });
        }
      }
    });
  });

  // Button Scroll (unchanged)
  document.querySelector(".btn").addEventListener("click", (e) => {
    e.preventDefault();
    document.querySelector("footer").scrollIntoView({ behavior: "smooth" });
  });
});
