// Three.js Background
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

const canvas = document.getElementById("threejs-background");
const scene = new THREE.Scene();
const renderer = new THREE.WebGLRenderer({
  canvas,
  alpha: true,
  antialias: true,
});

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// Camera
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 5;

// Geometry
const geometry = new THREE.TorusGeometry(0.8, 0.3, 16, 100);
const material = new THREE.MeshBasicMaterial({
  color: 0x2563eb,
  wireframe: true,
});
const torus = new THREE.Mesh(geometry, material);
scene.add(torus);

// Animation
function animate() {
  requestAnimationFrame(animate);
  torus.rotation.x += 0.001;
  torus.rotation.y += 0.002;
  renderer.render(scene, camera);
}

animate();

// Resize
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// Main JavaScript
document.addEventListener("DOMContentLoaded", function () {
  // Loader
  const loader = document.getElementById("loader");
  const loaderProgress = document.getElementById("loader-progress");
  const loaderChars = document.querySelectorAll(".loader-char");

  // Animate loader characters
  loaderChars.forEach((char, index) => {
    setTimeout(() => {
      char.style.opacity = "1";
      char.style.transform = "translateY(0)";
    }, index * 100);
  });

  // Simulate loading progress
  let progress = 0;
  const progressInterval = setInterval(() => {
    progress += Math.random() * 10;
    if (progress >= 100) {
      progress = 100;
      clearInterval(progressInterval);
      setTimeout(() => {
        loader.style.opacity = "0";
        loader.style.visibility = "hidden";
      }, 500);
    }
    loaderProgress.style.width = `${progress}%`;
  }, 200);

  // Theme Toggle
  const themeSwitch = document.getElementById("theme-switch");
  themeSwitch.addEventListener("change", function () {
    document.body.classList.toggle("dark-theme");
    localStorage.setItem("theme", this.checked ? "dark" : "light");
  });

  // Check for saved theme preference
  if (localStorage.getItem("theme") === "dark") {
    themeSwitch.checked = true;
    document.body.classList.add("dark-theme");
  }

  // Mobile Menu
  const hamburger = document.getElementById("hamburger");
  const navMenu = document.getElementById("nav-menu");

  hamburger.addEventListener("click", function () {
    this.classList.toggle("active");
    navMenu.classList.toggle("active");
  });

  // Close menu when clicking on a link
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("active");
      navMenu.classList.remove("active");
    });
  });

  // Sticky Header
  const header = document.getElementById("header");
  window.addEventListener("scroll", function () {
    if (window.scrollY > 100) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });

  // Active Link on Scroll
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".nav-link");

  window.addEventListener("scroll", function () {
    let current = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;

      if (pageYOffset >= sectionTop - 300) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active link");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
      }
    });
  });

  // Typewriter Effect
  const typewriter = document.getElementById("typewriter");
  const professions = [
    "Full Stack Developer",
    "UI/UX Designer",
    "Tech Enthusiast",
    "Problem Solver",
  ];
  let i = 0;
  let j = 0;
  let currentProfession = "";
  let isDeleting = false;
  let isEnd = false;

  function typeWriter() {
    isEnd = false;
    typewriter.innerHTML = currentProfession.substring(0, j);

    if (!isDeleting && j === currentProfession.length) {
      isEnd = true;
      isDeleting = true;
      setTimeout(typeWriter, 2000);
      return;
    }

    if (isDeleting && j === 0) {
      isDeleting = false;
      i = (i + 1) % professions.length;
      currentProfession = professions[i];
      setTimeout(typeWriter, 500);
      return;
    }

    if (isDeleting) {
      j--;
      setTimeout(typeWriter, 100);
    } else {
      j++;
      setTimeout(typeWriter, 200);
    }
  }

  // Start the typewriter effect
  currentProfession = professions[i];
  setTimeout(typeWriter, 1000);

  // About Tabs
  const tabBtns = document.querySelectorAll(".tab-btn");
  const tabContents = document.querySelectorAll(".tab-content");

  tabBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const tabId = btn.getAttribute("data-tab");

      // Remove active class from all buttons and contents
      tabBtns.forEach((btn) => btn.classList.remove("active"));
      tabContents.forEach((content) => content.classList.remove("active"));

      // Add active class to clicked button and corresponding content
      btn.classList.add("active");
      document.getElementById(`${tabId}-tab`).classList.add("active");
    });
  });

  // Experience Counter
  const experienceBadge = document.querySelector(".experience-badge .years");
  const targetYears = 0;
  let currentYears = -1;
  const experienceInterval = setInterval(() => {
    currentYears++;
    experienceBadge.textContent = currentYears;
    if (currentYears >= targetYears) {
      clearInterval(experienceInterval);
    }
  }, 100);

  // Project Filter
  const filterBtns = document.querySelectorAll(".filter-btn");
  const projectCards = document.querySelectorAll(".project-card");

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      // Remove active class from all buttons
      filterBtns.forEach((btn) => btn.classList.remove("active"));
      // Add active class to clicked button
      btn.classList.add("active");

      const filter = btn.getAttribute("data-filter");

      projectCards.forEach((card) => {
        if (filter === "all" || card.getAttribute("data-category") === filter) {
          card.style.display = "block";
        } else {
          card.style.display = "none";
        }
      });
    });
  });

  // Testimonials Slider
  const testimonialSwiper = new Swiper(".testimonials-slider .swiper", {
    loop: true,
    spaceBetween: 30,
    centeredSlides: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    breakpoints: {
      768: {
        slidesPerView: 2,
      },
      1200: {
        slidesPerView: 3,
      },
    },
  });

  // Clients Slider
  const clientsSwiper = new Swiper(".clients-slider .swiper", {
    loop: true,
    spaceBetween: 30,
    slidesPerView: 2,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    breakpoints: {
      576: {
        slidesPerView: 3,
      },
      768: {
        slidesPerView: 4,
      },
      992: {
        slidesPerView: 5,
      },
      1200: {
        slidesPerView: 6,
      },
    },
  });

  // Skills Chart
  const skillsChart = new Chart(document.getElementById("skillsChart"), {
    type: "radar",
    data: {
      labels: [
        "Frontend",
        "Backend",
        "UI/UX",
        "Database",
        "DevOps",
        "Problem Solving",
      ],
      datasets: [
        {
          label: "Technical Skills",
          data: [90, 85, 80, 75, 70, 95],
          backgroundColor: "rgba(37, 99, 235, 0.2)",
          borderColor: "rgba(37, 99, 235, 1)",
          borderWidth: 2,
          pointBackgroundColor: "rgba(37, 99, 235, 1)",
          pointBorderColor: "#fff",
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "#fff",
          pointHoverBorderColor: "rgba(37, 99, 235, 1)",
        },
      ],
    },
    options: {
      scales: {
        r: {
          angleLines: {
            color: "rgba(0, 0, 0, 0.1)",
          },
          suggestedMin: 0,
          suggestedMax: 100,
          ticks: {
            stepSize: 20,
            backdropColor: "transparent",
          },
          grid: {
            color: "rgba(0, 0, 0, 0.1)",
          },
          pointLabels: {
            font: {
              size: 12,
              family: "var(--font-primary)",
            },
            color: "var(--text-color)",
          },
        },
      },
      plugins: {
        legend: {
          display: false,
        },
      },
      elements: {
        line: {
          tension: 0.1,
        },
      },
    },
  });

  // Back to Top Button
  const backToTop = document.getElementById("backToTop");
  window.addEventListener("scroll", () => {
    if (window.pageYOffset > 300) {
      backToTop.classList.add("active");
    } else {
      backToTop.classList.remove("active");
    }
  });

  // Smooth Scrolling for Anchor Links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute("href")).scrollIntoView({
        behavior: "smooth",
      });
    });
  });

  // Form Submission
  contactForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    const formData = new FormData(this);

    try {
      const response = await fetch("https://formspree.io/f/your-form-id", {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      if (response.ok) {
        alert("Thank you for your message! I will get back to you soon.");
        this.reset();
      } else {
        throw new Error("Form submission failed");
      }
    } catch (error) {
      alert(
        "There was a problem sending your message. Please try again later."
      );
    }
  });

  // Newsletter Form
  const newsletterForm = document.querySelector(".newsletter-form");
  newsletterForm.addEventListener("submit", function (e) {
    e.preventDefault();
    alert("Thank you for subscribing to my newsletter!");
    this.reset();
  });

  // Initialize AOS (Animate On Scroll)
  AOS.init({
    duration: 800,
    easing: "ease-in-out",
    once: true,
    offset: 100,
  });

  // Custom Cursor
  const cursorOuter = document.querySelector(".cursor-outer");
  const cursorInner = document.querySelector(".cursor-inner");
  let mouseX = 0,
    mouseY = 0;
  let outerX = 0,
    outerY = 0;
  let innerX = 0,
    innerY = 0;
  let isHovering = false;

  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  const animateCursor = () => {
    // Inner cursor (fast)
    innerX = lerp(innerX, mouseX, 0.15);
    innerY = lerp(innerY, mouseY, 0.15);
    cursorInner.style.transform = `translate3d(${innerX}px, ${innerY}px, 0)`;

    // Outer cursor (slow)
    outerX = lerp(outerX, mouseX, 0.1);
    outerY = lerp(outerY, mouseY, 0.1);
    cursorOuter.style.transform = `translate3d(${outerX}px, ${outerY}px, 0)`;

    requestAnimationFrame(animateCursor);
  };

  const lerp = (start, end, t) => {
    return start * (1 - t) + end * t;
  };

  // Check for hover states
  document
    .querySelectorAll("a, button, .project-card, .service-card, .tech-item")
    .forEach((el) => {
      el.addEventListener("mouseenter", () => {
        isHovering = true;
        cursorOuter.style.transform = `translate3d(${outerX}px, ${outerY}px, 0) scale(1.5)`;
        cursorOuter.style.backgroundColor = "rgba(37, 99, 235, 0.1)";
      });
      el.addEventListener("mouseleave", () => {
        isHovering = false;
        cursorOuter.style.transform = `translate3d(${outerX}px, ${outerY}px, 0) scale(1)`;
        cursorOuter.style.backgroundColor = "transparent";
      });
    });

  animateCursor();
});

// Active Link on Scroll
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-link");

window.addEventListener("scroll", function () {
  let current = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;

    // Adjust the offset (300) to change when the section becomes active
    if (pageYOffset >= sectionTop - 300) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
});
