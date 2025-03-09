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
const texts = [
  "Full Stack Developer",
  "Front End Developer",
  "Back End Developer",
];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
const speed = 100; // Typing speed
const delayBetween = 1000; // Delay after full word

function typeEffect() {
  const typewriter = document.getElementById("typewriter");
  const currentText = texts[textIndex];
  let displayedText = currentText.substring(0, charIndex);
  typewriter.textContent = displayedText;

  if (!isDeleting && charIndex < currentText.length) {
    charIndex++;
    setTimeout(typeEffect, speed);
  } else if (isDeleting && charIndex > 0) {
    charIndex--;
    setTimeout(typeEffect, speed / 2);
  } else {
    isDeleting = !isDeleting;
    if (!isDeleting) {
      textIndex = (textIndex + 1) % texts.length;
    }
    setTimeout(typeEffect, delayBetween);
  }
}

// Start typing effect after page loads
document.addEventListener("DOMContentLoaded", typeEffect);
