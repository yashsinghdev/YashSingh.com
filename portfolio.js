// ========== LOADER ANIMATION ==========
const loader = document.getElementById("loader");
const loaderProgress = document.getElementById("loader-progress");

// Simulate loading progress
let progress = 0;
const interval = setInterval(() => {
  progress += Math.random() * 10;
  if (progress >= 100) {
    progress = 100;
    clearInterval(interval);
    setTimeout(() => {
      loader.classList.add("hidden");
    }, 500);
  }
  loaderProgress.style.width = `${progress}%`;
}, 100);

// ========== TYPEWRITER EFFECT ==========
const texts = [
  "Full Stack Developer.",
  "Front End Developer.",
  "Back End Developer.",
  "Problem Solver.",
  "Creative Thinker.",
];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
const speed = 100;
const delayBetween = 1000;

function typeEffect() {
  const typewriter = document.getElementById("typewriter");
  const currentText = texts[textIndex];

  if (!isDeleting && charIndex < currentText.length) {
    typewriter.textContent = currentText.substring(0, charIndex + 1);
    charIndex++;
    setTimeout(typeEffect, speed);
  } else if (isDeleting && charIndex > 0) {
    typewriter.textContent = currentText.substring(0, charIndex - 1);
    charIndex--;
    setTimeout(typeEffect, speed / 2);
  } else {
    isDeleting = !isDeleting;
    if (!isDeleting) {
      textIndex = (textIndex + 1) % texts.length;
    }
    setTimeout(typeEffect, isDeleting ? delayBetween : speed);
  }
}

// ========== SCROLL ANIMATIONS ==========
const scrollElements = document.querySelectorAll(".scroll-animate");

const elementInView = (el, dividend = 1) => {
  const elementTop = el.getBoundingClientRect().top;
  return (
    elementTop <=
    (window.innerHeight || document.documentElement.clientHeight) / dividend
  );
};

const displayScrollElement = (element) => {
  element.classList.add("visible");
};

const handleScrollAnimation = () => {
  scrollElements.forEach((el) => {
    if (elementInView(el, 1.25)) {
      displayScrollElement(el);
    }
  });
};

// ========== HEADER SCROLL EFFECT ==========
const header = document.getElementById("header");

window.addEventListener("scroll", () => {
  if (window.scrollY > 100) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }

  // Back to top button
  if (window.scrollY > 300) {
    document.getElementById("backToTop").classList.add("active");
  } else {
    document.getElementById("backToTop").classList.remove("active");
  }
});

// ========== SMOOTH SCROLLING ==========
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const targetId = this.getAttribute("href");
    if (targetId === "#") return;

    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 80,
        behavior: "smooth",
      });
    }
  });
});

// ========== MOBILE MENU TOGGLE ==========
const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("nav-menu");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
});

// Close menu when clicking on a link
document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
  });
});

// ========== PROJECT FILTERING ==========
const filterButtons = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    // Remove active class from all buttons
    filterButtons.forEach((btn) => btn.classList.remove("active"));
    // Add active class to clicked button
    button.classList.add("active");

    const filterValue = button.getAttribute("data-filter");

    projectCards.forEach((card) => {
      if (
        filterValue === "all" ||
        card.getAttribute("data-category") === filterValue
      ) {
        card.style.display = "block";
        setTimeout(() => {
          card.classList.add("visible");
        }, 50);
      } else {
        card.style.display = "none";
        card.classList.remove("visible");
      }
    });
  });
});

// ========== FORM SUBMISSION ==========
const contactForm = document.getElementById("contactForm");

contactForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // Get form values
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const subject = document.getElementById("subject").value;
  const message = document.getElementById("message").value;

  // Here you would typically send the form data to a server
  console.log({ name, email, subject, message });

  // Show success message
  alert("Thank you for your message! I will get back to you soon.");
  contactForm.reset();
});

// ========== SKILLS ANIMATION ==========
const skills = document.querySelectorAll(".skill");

function animateSkills() {
  skills.forEach((skill) => {
    if (elementInView(skill, 1.5)) {
      const progressBar = skill.querySelector(".skill-progress");
      const percent = skill.querySelector(".skill-percent").textContent;
      progressBar.style.width = percent;
    }
  });
}

// ========== INITIALIZE ==========
document.addEventListener("DOMContentLoaded", () => {
  // Start typewriter effect
  setTimeout(typeEffect, 1000);

  // Initial scroll animation check
  handleScrollAnimation();
  animateSkills();

  // Add active class to current section in nav
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".nav-link");

  window.addEventListener("scroll", () => {
    let current = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;

      if (pageYOffset >= sectionTop - 200) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
      }
    });

    // Animate skills when in view
    animateSkills();
  });
});

window.addEventListener("scroll", () => {
  handleScrollAnimation();
  animateSkills();
});

// ========== PARTICLE EFFECT ==========
// This would be a more complex implementation using Canvas or a library
// For simplicity, we'll just add a placeholder comment here
// In a production site, you might use something like particles.js
