// Get references to the elements
const chatBox = document.getElementById("chat-box");
const userInput = document.getElementById("user-input");
const sendButton = document.getElementById("send-button");

// Predefined question-answer pairs
const predefinedResponses = {
  hello: "Hi there! How can I help you today?",
  "how are you?": "I'm just a bot, but I'm doing well, thank you!",
  "what is your name?": "I'm an AI chatbot, you can call me Bot!",
  bye: "Goodbye! Have a great day!",
  // Add more questions and responses as needed
};

// Function to create and append a message to the chat box
function appendMessage(content, sender) {
  const message = document.createElement("div");
  message.classList.add("message");
  message.classList.add(sender); // Add class based on sender (user or AI)
  message.innerText = content;
  chatBox.appendChild(message);
  chatBox.scrollTop = chatBox.scrollHeight; // Scroll to the bottom
}

// Function to simulate AI response based on predefined answers
function getAIResponse(userMessage) {
  // Convert the user message to lowercase for case-insensitive matching
  const message = userMessage.toLowerCase();

  // Check if the message has a predefined response
  if (predefinedResponses[message]) {
    appendMessage(predefinedResponses[message], "ai-message");
  } else {
    // Default response if no match is found
    appendMessage(
      "AI: I'm not sure about that. Can you ask something else?",
      "ai-message"
    );
  }
}

// Handle send button click
sendButton.addEventListener("click", () => {
  const message = userInput.value.trim();
  if (message) {
    appendMessage(message, "user-message"); // Display user message
    userInput.value = ""; // Clear the input field
    getAIResponse(message); // Get AI's response
  }
});

// Handle enter key press
userInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    sendButton.click(); // Trigger the click event when Enter is pressed
  }
});

// Scroll to the chat section when the "Start Chatting" button is clicked
function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId);
  section.scrollIntoView({ behavior: "smooth" });
}

// Apply fade-in effect on scroll
const animatedSections = document.querySelectorAll(".animated-section");

function onScroll() {
  animatedSections.forEach((section) => {
    const rect = section.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.8) {
      section.classList.add("fade-in-up");
    }
  });
}

window.addEventListener("scroll", onScroll);

// Initial scroll effect for sections in view on page load
onScroll();
