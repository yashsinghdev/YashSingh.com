let themebtn = document.querySelector(".THEME");
let projlogo = document.querySelector(".heading");
let body = document.querySelector("body");
let currentmode = localStorage.getItem("theme") || "light"; // Get the saved theme from localStorage, default is 'light'

// Apply the theme from localStorage or default theme
switch (currentmode) {
  case "dark":
    body.classList.add("dark");
    projlogo.classList.add("white");
    projlogo.classList.remove("black");
    body.classList.remove("light", "blue", "green");
    body.style.backgroundColor = "#000000"; // Dark background color
    break;
  case "blue":
    body.classList.add("blue");
    projlogo.classList.add("white");
    projlogo.classList.remove("black");
    body.classList.remove("light", "dark", "green");
    body.style.backgroundColor = "hwb(200 16% 40%)"; // Blue background color
    break;
  case "green":
    body.classList.add("green");
    projlogo.classList.add("white");
    projlogo.classList.remove("black");
    body.classList.remove("light", "dark", "blue");
    body.style.backgroundColor = "#4caf50"; // Green background color
    break;
  default:
    body.classList.add("light");
    projlogo.classList.remove("white");
    projlogo.classList.add("black");
    body.classList.remove("dark", "blue", "green");
    body.style.backgroundColor = "#f4f4f4"; // Light background color
    break;
}

themebtn.addEventListener("click", () => {
  if (currentmode === "light") {
    currentmode = "dark";
    body.classList.add("dark");
    projlogo.classList.add("white");
    projlogo.classList.remove("black");
    body.classList.remove("light", "blue", "green");
    body.style.backgroundColor = "#000000"; // Dark background color
    localStorage.setItem("theme", "dark");
  } else if (currentmode === "dark") {
    currentmode = "blue";
    body.classList.add("blue");
    projlogo.classList.add("white");
    projlogo.classList.remove("black");
    body.classList.remove("light", "dark", "green");
    body.style.backgroundColor = "hwb(200 16% 40%)"; // Blue background color
    localStorage.setItem("theme", "blue");
  } else if (currentmode === "blue") {
    currentmode = "green";
    body.classList.add("green");
    projlogo.classList.add("white");
    projlogo.classList.remove("black");
    body.classList.remove("light", "dark", "blue");
    body.style.backgroundColor = "#4caf50"; // Green background color
    localStorage.setItem("theme", "green");
  } else if (currentmode === "green") {
    currentmode = "light";
    body.classList.add("light");
    projlogo.classList.remove("white");
    projlogo.classList.add("black");
    body.classList.remove("dark", "blue", "green");
    body.style.backgroundColor = "#f4f4f4"; // Light background color
    localStorage.setItem("theme", "light");
  }
});
