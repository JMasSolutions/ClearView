// Function to extract site name from <meta property="og:site_name">
function getSiteName() {
    const metaTag = document.querySelector('meta[property="og:site_name"]');
    let siteName = metaTag ? metaTag.getAttribute("content") : null;

    // If site name is not found, extract from URL
    if (!siteName) {
        const hostname = window.location.hostname;
        siteName = hostname.replace(/^www\./, '').split('.')[0]; // Remove "www." and get base name
    }

    return siteName;
}

// Checks if the user is online
function isOnline() {
    return navigator.onLine;
}

// Loads data from AllSides API when online
function loadData() {
    if (isOnline()) {
        fetchData();
    } else {
        console.log("You are currently offline. Waiting for connection...");
        window.addEventListener('online', () => {
            console.log("Back online. Fetching data...");
            fetchData();
        });
    }
}

// Fetches data from AllSides and sends it to popup.js
function fetchData() {
    fetch('https://raw.githubusercontent.com/favstats/AllSideR/master/data/allsides_data.csv')
        .then(response => response.text())
        .then(data => {
            // Send site name and fetched data to popup.js
            chrome.runtime.sendMessage({
                siteName: getSiteName(),
                allSidesData: data
            });
        })
        .catch(error => {
            console.error("Failed to fetch data:", error);
        });
}

// Run the functions
loadData();