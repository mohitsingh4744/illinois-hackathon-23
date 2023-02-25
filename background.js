// Add a listener to the onInstalled event
chrome.runtime.onInstalled.addListener(() => {
    // Add the 'https://www.youtube.com/*' permission to the extension
    chrome.permissions.request({ origins: ['https://www.youtube.com/*'] }, granted => {
      if (granted) {
        console.log('Permission granted!');
      } else {
        console.log('Permission denied!');
      }
    });
  });
  
  // Add a listener to the onMessage event
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message === 'getVideoUrl') {
      // Get the current tab
      chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
        // Send a message to the content script to get the video URL
        chrome.tabs.sendMessage(tabs[0].id, { action: 'getVideoUrl' }, videoUrl => {
          // Send the video URL back to the popup
          sendResponse(videoUrl);
        });
      });
  
      // Return true to indicate that the sendResponse function will be called asynchronously
      return true;
    }
  });
  