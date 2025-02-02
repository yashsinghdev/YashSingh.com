function sendMessage() {
  let userInput = document.getElementById("user-input").value;
  if (userInput.trim() === "") return;

  let chatBox = document.getElementById("chat-box");

  let userMessage = document.createElement("p");
  userMessage.textContent = userInput;
  userMessage.classList.add("user");
  chatBox.appendChild(userMessage);

  document.getElementById("user-input").value = "";

  setTimeout(() => {
    let botMessage = document.createElement("p");
    botMessage.textContent = getBotResponse(userInput);
    chatBox.appendChild(botMessage);

    chatBox.scrollTop = chatBox.scrollHeight;
  }, 500);
}

function handleKeyPress(event) {
  if (event.key === "Enter") {
    sendMessage();
  }
}

function getBotResponse(input) {
  let responses = {
    hii: "Hii,how can i help you",
    hello: "Hi there! How can I help you?",
    "how are you": "I'm just a bot, but I'm doing great!",
    bye: "Goodbye! Have a nice day.",
    "who are you": "I am your AI chatbot assistant!",
    "what is your name":
      "My name is TrustBuddy, My Developer name is YASH SINGH",
  };
  return (
    responses[input.toLowerCase()] || "I'm not sure how to respond to that."
  );
}
