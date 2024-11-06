document.addEventListener('DOMContentLoaded', function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.scripting.executeScript(
            {
                target: { tabId: tabs[0].id },
                files: ['content.js']
            }
        );
    });

    // Listen for the message from content.js
    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
        if (request.siteName) {
            document.getElementById('siteName').textContent = request.siteName;
        }
        if (request.allSidesData) {
            console.log("AllSides Data:", request.allSidesData); // For testing purposes
            // You can parse and display data here if needed
        }
    });
});