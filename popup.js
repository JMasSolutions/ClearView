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
            console.log("Site Name:", request.siteName);
        }
        if (request.error) {
            console.error("Error:", request.error);
            document.getElementById('relevantData').textContent = request.error;
            return;
        }
        if (request.relevantData) {
            console.log("Relevant Data Received:", request.relevantData);
            displayRelevantData(request.relevantData);
        }
    });
});

// Function to display relevant data in the popup
function displayRelevantData(data) {
    const container = document.getElementById('relevantData');
    container.innerHTML = '';

    if (data.length === 0) {
        container.textContent = "No relevant data found for this site.";
        return;
    }

    data.forEach(entry => {
        const entryElement = document.createElement('div');
        entryElement.textContent = `Source: ${entry.news_source}, Rating: ${entry.rating}, Type: ${entry.type}`;
        container.appendChild(entryElement);
    });
}