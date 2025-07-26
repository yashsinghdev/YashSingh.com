// Background script (mostly for manifest v3 requirements)
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === "newNote") {
    // Just pass it along to the popup
    chrome.runtime.sendMessage(request);
  }
});