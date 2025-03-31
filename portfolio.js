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
  "Full Stack Developer.",
  "Front End Developer.",
  "Back End Developer.",
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

// projects
// add filter option in projects.html
const filterButtons = document.querySelectorAll(".filter-button");
const projectCards = document.querySelectorAll(".project-card");
const allProjects = Array.from(projectCards);
const allProjectsContainer = document.querySelector(".all-projects");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filterValue = button.getAttribute("data-filter");

    // Remove active class from all buttons and add to the clicked button
    filterButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");

    // Show all projects if "all" is clicked
    if (filterValue === "all") {
      allProjects.forEach((card) => (card.style.display = "block"));
    } else {
      allProjects.forEach((card) => {
        if (card.classList.contains(filterValue)) {
          card.style.display = "block";
        } else {
          card.style.display = "none";
        }
      });
    }
  });
});
// Show all projects by default
allProjects.forEach((card) => (card.style.display = "block"));
// Add event listener to each project card
projectCards.forEach((card) => {
  card.addEventListener("click", () => {
    const projectName = card.querySelector("h3").textContent;
    const projectDescription = card.querySelector("p").textContent;
    const projectImage = card.querySelector("img").src;

    // Create a modal to display the project details
    const modal = document.createElement("div");
    modal.classList.add("modal");

    // Create modal content
    const modalContent = document.createElement("div");
    modalContent.classList.add("modal-content");

    // Add close button
    const closeButton = document.createElement("span");
    closeButton.classList.add("close");
    closeButton.innerHTML = "&times;";
    closeButton.onclick = () => {
      modal.style.display = "none";
      document.body.removeChild(modal);
    };

    // Add project details to modal
    const title = document.createElement("h2");
    title.textContent = projectName;

    const description = document.createElement("p");
    description.textContent = projectDescription;

    const image = document.createElement("img");
    image.src = projectImage;
    image.alt = projectName;
    image.classList.add("modal-image");
    image.style.width = "100%"; // Set width to 100% of modal content
    image.style.height = "auto"; // Maintain aspect ratio
    image.style.maxHeight = "400px"; // Limit height to 400px
    image.style.objectFit = "contain"; // Ensure the image fits well within the modal
    image.style.marginBottom = "20px"; // Add margin below the image
    image.style.borderRadius = "10px"; // Add border radius for aesthetics

    // Append elements to modal content
    modalContent.appendChild(closeButton);
    modalContent.appendChild(title);
    modalContent.appendChild(image);
    modalContent.appendChild(description);

    // Append modal content to modal
    modal.appendChild(modalContent);

    // Append modal to body
    document.body.appendChild(modal);

    // Display the modal
    modal.style.display = "block";
  });
});
//tongle of filter buttion
function toggleMenu() {
  const menu = document.getElementById("filterMenu");
  if (menu.style.display === "block") {
    menu.style.display = "none";
  } else {
    menu.style.display = "block";
  }
}
function filterProjects(category) {
  const projects = document.querySelectorAll(".project-card");
  projects.forEach((project) => {
    if (category === "all" || project.dataset.category === category) {
      project.style.display = "block";
    } else {
      project.style.display = "none";
    }
  });
}
