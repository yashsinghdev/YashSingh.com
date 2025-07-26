let isExtensionActive = false;

// Listen for extension state changes
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === "toggleExtension") {
    isExtensionActive = request.isActive;
  }
});

// Check initial state
chrome.storage.local.get(['isActive'], function(data) {
  isExtensionActive = data.isActive || false;
});

// Handle text selection
document.addEventListener('mouseup', function(event) {
  if (!isExtensionActive) return;
  
  const selectedText = window.getSelection().toString().trim();
  if (selectedText.length === 0) return;
  
  // Get current URL
  const url = window.location.href;
  
  // Get current timestamp
  const timestamp = new Date().toISOString();
  
  // Send the selected text to background script
  chrome.runtime.sendMessage({
    action: "newNote",
    text: selectedText,
    timestamp: timestamp,
    url: url
  });
  
  // Clear selection
  window.getSelection().removeAllRanges();
});