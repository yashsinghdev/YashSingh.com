// Get references to the elements
const chatBox = document.getElementById("chat-box");
const userInput = document.getElementById("user-input");
const sendButton = document.getElementById("send-button");

// Predefined question-answer pairs
const predefinedResponses = {
  hii: "Hi, how can I help you today?",
  hi: "Hello! How can I help you today?",
  hello: "Hi there! How can I help you today?",
  "how are you?": "I'm just a bot, but I'm doing well, thank you!",
  "what is your name?": "I'm an AI chatbot, you can call me Bot!",
  bye: "Goodbye! Have a great day!",
};

// Function to create and append a message to the chat box
function appendMessage(content, sender) {
  const message = document.createElement("div");
  message.classList.add("message", sender);
  message.innerText = content;
  chatBox.appendChild(message);
  chatBox.scrollTop = chatBox.scrollHeight;
}

// Function to get AI response from Llama API
async function getLlamaResponse(userMessage) {
  try {
    const response = await fetch("https://api.llama.com/v1/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer LA-81244c1dcb3a4f8b9b3186a12076509123715cc21a3441a897b2a239fb7a119f",
      },
      body: JSON.stringify({
        prompt: userMessage,
        max_tokens: 150,
      }),
    });

    const data = await response.json();
    return (
      data.response || "I'm not sure about that. Can you ask something else?"
    );
  } catch (error) {
    console.error("Error fetching Llama API response:", error);
    return "Oops! Something went wrong. Please try again later.";
  }
}

// Function to simulate AI response
async function getAIResponse(userMessage) {
  const message = userMessage.toLowerCase();

  if (predefinedResponses[message]) {
    appendMessage(predefinedResponses[message], "ai-message");
  } else {
    const aiResponse = await getLlamaResponse(userMessage);
    appendMessage(aiResponse, "ai-message");
  }
}

// Handle send button click
sendButton.addEventListener("click", async () => {
  const message = userInput.value.trim();
  if (message) {
    appendMessage(message, "user-message");
    userInput.value = "";
    await getAIResponse(message);
  }
});

// Handle enter key press
userInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    sendButton.click();
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
onScroll(); // Initial scroll effect
