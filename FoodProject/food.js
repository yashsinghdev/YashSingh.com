// Preloader
window.addEventListener("load", function () {
  const preloader = document.querySelector(".preloader");
  preloader.classList.add("fade-out");
  setTimeout(() => {
    preloader.style.display = "none";
  }, 800);
});

// Header Scroll Effect
window.addEventListener("scroll", function () {
  const header = document.querySelector("header");
  header.classList.toggle("scrolled", window.scrollY > 50);
});

// Mobile Menu Toggle
const hamburger = document.querySelector(".hamburger");
const mobileMenu = document.querySelector(".mobile-menu");
const overlay = document.querySelector(".overlay");

hamburger.addEventListener("click", function () {
  this.classList.toggle("active");
  mobileMenu.classList.toggle("active");
  overlay.classList.toggle("active");
});

// Close mobile menu when clicking on a link
const mobileLinks = document.querySelectorAll(".mobile-menu .navigation a");
mobileLinks.forEach((link) => {
  link.addEventListener("click", function () {
    hamburger.classList.remove("active");
    mobileMenu.classList.remove("active");
    overlay.classList.remove("active");
  });
});

// Cart Toggle
const cartIcon = document.querySelector(".cart-icon");
const cartSidebar = document.querySelector(".cart-sidebar");
const closeCart = document.querySelector(".close-cart");

cartIcon.addEventListener("click", function () {
  cartSidebar.classList.add("active");
  overlay.classList.add("active");
});

closeCart.addEventListener("click", function () {
  cartSidebar.classList.remove("active");
  overlay.classList.remove("active");
});

overlay.addEventListener("click", function () {
  cartSidebar.classList.remove("active");
  mobileMenu.classList.remove("active");
  hamburger.classList.remove("active");
  this.classList.remove("active");
});

// Back to Top Button
const backToTop = document.querySelector(".back-to-top");
window.addEventListener("scroll", function () {
  backToTop.classList.toggle("active", window.scrollY > 300);
});

backToTop.addEventListener("click", function () {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// Add to Cart Functionality
const addToCartButtons = document.querySelectorAll(".add-to-cart");
const cartCount = document.querySelector(".cart-count");
let count = 0;

addToCartButtons.forEach((button) => {
  button.addEventListener("click", function () {
    count++;
    cartCount.textContent = count;

    // Animation effect
    cartIcon.classList.add("animate");
    setTimeout(() => {
      cartIcon.classList.remove("animate");
    }, 500);

    // Here you would normally add the item to the cart
    // For this demo, we're just incrementing the counter
  });
});

// Simple animation for dish cards when they come into view
const dishCards = document.querySelectorAll(".dish-card");
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = 1;
        entry.target.style.transform = "translateY(0)";
      }
    });
  },
  { threshold: 0.1 }
);

dishCards.forEach((card) => {
  card.style.opacity = 0;
  card.style.transform = "translateY(50px)";
  card.style.transition = "opacity 0.6s ease, transform 0.6s ease";
  observer.observe(card);
});

// Video Play Button
const playBtn = document.querySelector(".play-btn");
playBtn.addEventListener("click", function () {
  // In a real implementation, this would open a video modal
  alert("Video presentation would play here!");
});
