// Toggle FAQ questions
document.querySelectorAll(".question-header").forEach((header) => {
  header.addEventListener("click", () => {
    const question = header.parentElement;
    question.classList.toggle("active");
  });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
    });
  });
});
