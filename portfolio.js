// Loader Animation
window.addEventListener("load", function () {
  const loader = document.getElementById("loader");
  const progressBar = document.getElementById("loader-progress");
  const loaderChars = document.querySelectorAll(".loader-char");

  // Animate progress bar
  let width = 0;
  const interval = setInterval(function () {
    if (width >= 100) {
      clearInterval(interval);
      // Animate characters
      loaderChars.forEach((char, index) => {
        setTimeout(() => {
          char.style.opacity = "1";
          char.style.transform = "translateY(0)";
        }, index * 100);
      });
      // Hide loader
      setTimeout(() => {
        loader.style.opacity = "0";
        loader.style.visibility = "hidden";
      }, 1000);
    } else {
      width++;
      progressBar.style.width = width + "%";
    }
  }, 20);
});

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

// Mobile Menu Toggle
const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("nav-menu");

hamburger.addEventListener("click", function () {
  this.classList.toggle("active");
  navMenu.classList.toggle("active");
});

// Close mobile menu when clicking a link
document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", function () {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
  });
});

// Typewriter Effect
const typewriter = document.getElementById("typewriter");
const phrases = [
  "Full Stack Developer",
  "UI/UX Designer",
  "Problem Solver",
  "Tech Enthusiast",
];
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
let isEnd = false;

function typeWriter() {
  const currentPhrase = phrases[phraseIndex];

  if (isDeleting) {
    typewriter.textContent = currentPhrase.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typewriter.textContent = currentPhrase.substring(0, charIndex + 1);
    charIndex++;
  }

  if (!isDeleting && charIndex === currentPhrase.length) {
    isEnd = true;
    isDeleting = true;
    setTimeout(typeWriter, 2000);
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    phraseIndex = (phraseIndex + 1) % phrases.length;
    setTimeout(typeWriter, 500);
  } else {
    const speed = isDeleting ? 100 : 150;
    setTimeout(typeWriter, speed);
  }
}

// Start typewriter effect
setTimeout(typeWriter, 1000);

// Smooth Scrolling for Anchor Links
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

// Active Link Highlighting
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-link");

window.addEventListener("scroll", function () {
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
});

// Tab Functionality
const tabBtns = document.querySelectorAll(".tab-btn");
const tabContents = document.querySelectorAll(".tab-content");

tabBtns.forEach((btn) => {
  btn.addEventListener("click", function () {
    const tabId = this.getAttribute("data-tab");

    tabBtns.forEach((btn) => btn.classList.remove("active"));
    this.classList.add("active");

    tabContents.forEach((content) => {
      content.classList.remove("active");
      if (content.id === `${tabId}-tab`) {
        content.classList.add("active");
      }
    });
  });
});

// Project Filtering
const filterBtns = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");

filterBtns.forEach((btn) => {
  btn.addEventListener("click", function () {
    const filter = this.getAttribute("data-filter");

    filterBtns.forEach((btn) => btn.classList.remove("active"));
    this.classList.add("active");

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
const testimonialSwiper = new Swiper(".testimonials-slider", {
  loop: true,
  grabCursor: true,
  spaceBetween: 30,
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
    1024: {
      slidesPerView: 3,
    },
  },
});

// Clients Slider
const clientsSwiper = new Swiper(".clients-slider", {
  loop: true,
  grabCursor: true,
  slidesPerView: 2,
  spaceBetween: 20,
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },
  breakpoints: {
    640: {
      slidesPerView: 3,
    },
    768: {
      slidesPerView: 4,
    },
    1024: {
      slidesPerView: 5,
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
      "Database",
      "UI/UX",
      "Problem Solving",
      "Teamwork",
    ],
    datasets: [
      {
        label: "Technical Skills",
        data: [90, 85, 80, 75, 95, 85],
        backgroundColor: "rgba(58, 134, 255, 0.2)",
        borderColor: "rgba(58, 134, 255, 1)",
        borderWidth: 2,
        pointBackgroundColor: "rgba(58, 134, 255, 1)",
        pointRadius: 4,
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
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  },
});

// Animate Counting Numbers
const animateCounters = () => {
  const counters = document.querySelectorAll(".achievement-count");
  const speed = 200;

  counters.forEach((counter) => {
    const target = +counter.getAttribute("data-count");
    const count = +counter.innerText;
    const increment = target / speed;

    if (count < target) {
      counter.innerText = Math.ceil(count + increment);
      setTimeout(animateCounters, 1);
    } else {
      counter.innerText = target.toLocaleString();
    }
  });
};

// Scroll Animation
const scrollAnimateElements = document.querySelectorAll(".scroll-animate");

const checkScroll = () => {
  scrollAnimateElements.forEach((element) => {
    const elementTop = element.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (elementTop < windowHeight - 100) {
      element.classList.add("animate");
    }
  });
};

window.addEventListener("scroll", checkScroll);
window.addEventListener("load", checkScroll);

// Back to Top Button
const backToTopBtn = document.getElementById("backToTop");

window.addEventListener("scroll", function () {
  if (window.pageYOffset > 300) {
    backToTopBtn.classList.add("active");
  } else {
    backToTopBtn.classList.remove("active");
  }
});

// Contact Form Submission
const contactForm = document.getElementById("contactForm");

contactForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const formData = new FormData(this);
  const submitBtn = this.querySelector('button[type="submit"]');

  submitBtn.disabled = true;
  submitBtn.innerHTML =
    '<span>Sending...</span> <i class="fas fa-spinner fa-spin"></i>';

  // Simulate form submission
  setTimeout(() => {
    submitBtn.innerHTML =
      '<span>Message Sent!</span> <i class="fas fa-check"></i>';
    this.reset();

    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.innerHTML =
        '<span>Send Message</span> <i class="fas fa-paper-plane"></i>';
    }, 3000);
  }, 2000);
});

// Custom Cursor
const cursorOuter = document.querySelector(".cursor-outer");
const cursorInner = document.querySelector(".cursor-inner");
const links = document.querySelectorAll(
  "a, button, .project-card, .service-card, .blog-card"
);

document.addEventListener("mousemove", function (e) {
  cursorOuter.style.transform = `translate3d(calc(${e.clientX}px - 50%), calc(${e.clientY}px - 50%), 0)`;
  cursorInner.style.transform = `translate3d(calc(${e.clientX}px - 50%), calc(${e.clientY}px - 50%), 0)`;
});

links.forEach((link) => {
  link.addEventListener("mouseenter", () => {
    cursorOuter.classList.add("hover");
    cursorInner.classList.add("hover");
  });

  link.addEventListener("mouseleave", () => {
    cursorOuter.classList.remove("hover");
    cursorInner.classList.remove("hover");
  });
});

// Initialize animations after page load
window.addEventListener("load", function () {
  animateCounters();
});
