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
        container.innerHTML = '<p class="text-muted">No relevant data found for this site.</p>';
        return;
    }

    data.forEach(entry => {
        const source = entry.news_source || "Unknown Source";
        const rating = entry.rating || "N/A";
        const type = entry.type || "N/A";
        const ratingNum = entry.rating_num || "N/A";
        const url = entry.url || "#";
        const confidenceLevel = entry.confidence_level || "N/A";

        const editorialReview = entry.editorial_review && entry.editorial_review != "0"
            ? `<a href="${url}" target="_blank" class="card-link">Editorial Review</a>`
            : "";

        // Create a Bootstrap card for each entry
        const entryElement = document.createElement('div');
        entryElement.className = "card mb-2";
        entryElement.innerHTML = `
            <div class="card-body">
                <h5 class="card-title">${source} <span class="badge badge-secondary">${type}</span></h5>
                <p class="card-text mb-1">
                    <strong>Rating:</strong> ${rating} (${ratingNum})<br>
                    <strong>Confidence:</strong> ${confidenceLevel}
                </p>
                ${editorialReview}
            </div>
        `;

        container.appendChild(entryElement);
    });
}