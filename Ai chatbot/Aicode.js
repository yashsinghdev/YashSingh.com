document.addEventListener("DOMContentLoaded", function () {
  const chatBox = document.getElementById("chat-box");
  const userInput = document.getElementById("user-input");
  const sendBtn = document.getElementById("send-btn");
  const suggestionBtns = document.querySelectorAll(".suggestion-btn");
  const clearChatBtn = document.querySelector(".chat-action-btn:first-child");
  const exportChatBtn = document.querySelector(".chat-action-btn:last-child");

  // Initialize chat
  addMessage(
    "ai",
    "Hello! I'm YASHNET AI, your advanced AI assistant. How can I help you today?"
  );

  // Event listeners
  sendBtn.addEventListener("click", sendMessage);
  userInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") sendMessage();
  });

  suggestionBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      userInput.value = this.textContent;
      userInput.focus();
    });
  });

  clearChatBtn.addEventListener("click", clearChat);
  exportChatBtn.addEventListener("click", exportChat);

  async function sendMessage() {
    const message = userInput.value.trim();
    if (!message) return;

    addMessage("user", message);
    userInput.value = "";

    const typingIndicator = addTypingIndicator();

    try {
      const response = await getAIResponse(message);
      chatBox.removeChild(typingIndicator);
      addMessage("ai", response);
    } catch (error) {
      chatBox.removeChild(typingIndicator);
      addMessage(
        "ai",
        "Sorry, I encountered an error. Please try again later."
      );
      console.error("API Error:", error);
    }
  }

  async function getAIResponse(userMessage) {
    // यहां आपको अपना असली API KEY डालना होगा
    const apiKey = "Bearer 2d1518e96fce4d138893a06491d26ae8";

    const response = await fetch(
      "https://api.aimlapi.com/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: apiKey,
        },
        body: JSON.stringify({
          model: "google/gemma-3n-e4b-it", // या कोई दूसरा मॉडल
          messages: [
            {
              role: "user",
              content: userMessage,
            },
          ],
          temperature: 0.7,
          max_tokens: 500,
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json();
    return data.choices[0].message.content;
  }

  // Helper functions
  function addMessage(sender, text) {
    const messageDiv = document.createElement("div");
    messageDiv.className = `message ${sender}-message`;

    messageDiv.innerHTML = `
      <div class="message-header">
        <div class="message-avatar">
          <img src="${
            sender === "ai"
              ? "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=50&q=80"
              : "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=50&q=80"
          }" 
            alt="${sender === "ai" ? "AI Avatar" : "User Avatar"}">
        </div>
        <div class="message-sender">${
          sender === "ai" ? "YASHNET AI" : "You"
        }</div>
        <div class="message-time">Just now</div>
      </div>
      <div class="message-content">${text}</div>
    `;

    chatBox.appendChild(messageDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
  }

  function addTypingIndicator() {
    const typingDiv = document.createElement("div");
    typingDiv.className = "message ai-message typing-indicator";
    typingDiv.innerHTML = `
      <div class="message-header">
        <div class="message-avatar">
          <img src="https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=50&q=80" alt="AI Avatar">
        </div>
        <div class="message-sender">YASHNET AI</div>
      </div>
      <div class="typing-content">
        <span></span>
        <span></span>
        <span></span>
      </div>
    `;

    chatBox.appendChild(typingDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
    return typingDiv;
  }

  function clearChat() {
    if (confirm("Are you sure you want to clear the chat?")) {
      chatBox.innerHTML = "";
      addMessage("ai", "Hello! I'm YASHNET AI. How can I help you?");
    }
  }

  function exportChat() {
    const chatText = Array.from(chatBox.querySelectorAll(".message-content"))
      .map((el) => {
        const sender = el.closest(".message").classList.contains("ai-message")
          ? "AI"
          : "You";
        return `${sender}: ${el.textContent}`;
      })
      .join("\n\n");

    const blob = new Blob([chatText], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "YASHNET-AI-Chat.txt";
    a.click();
    URL.revokeObjectURL(url);
  }
});
