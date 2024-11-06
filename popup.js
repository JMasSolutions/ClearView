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

// Function to display all relevant data for the news source in the popup
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
        const ratingNum = entry.rating_num || "N/A";
        const type = entry.type || "N/A";
        const agree = entry.agree || "N/A";
        const disagree = entry.disagree || "N/A";
        const percAgree = entry.perc_agree ? (entry.perc_agree * 100).toFixed(1) + "%" : "N/A";
        const url = entry.url || "#";
        const confidenceLevel = entry.confidence_level || "N/A";

        // Create a Bootstrap card for each entry with shadow and rounded corners
        const entryElement = document.createElement('div');
        entryElement.className = "card mb-3 shadow-sm rounded";
        entryElement.innerHTML = `
            <div class="card-body rounded">
                <h5 class="card-title">${source} <span class="badge badge-secondary">${type}</span></h5>
                <p class="card-text mb-1">
                    <strong>Rating:</strong> ${rating} (${ratingNum})<br>
                    <strong>Agree:</strong> ${agree}, <strong>Disagree:</strong> ${disagree}<br>
                    <strong>Percentage Agree:</strong> ${percAgree}<br>
                    <strong>Confidence Level Of Bias:</strong> ${confidenceLevel}
                </p>

                <a href="${url}" target="_blank" class="card-link">AllSides Profile</a>
            </div>
        `;

        container.appendChild(entryElement);
    });
}