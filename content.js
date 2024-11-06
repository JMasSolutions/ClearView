// Function to extract site name from <meta property="og:site_name">
function getSiteName() {
    const metaTag = document.querySelector('meta[property="og:site_name"]');
    let siteName = metaTag ? metaTag.getAttribute("content") : null;

    if (!siteName) {
        const hostname = window.location.hostname;
        siteName = hostname.replace(/^www\./, '').split('.')[0];
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
        .then(response => {
            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.statusText}`);
            }
            return response.text();
        })
        .then(data => {
            if (!data) {
                throw new Error("Fetched data is empty or undefined.");
            }
            const siteName = getSiteName();
            console.log("Extracted Site Name:", siteName);

            const parsedData = parseCSV(data);
            const relevantData = extractData(siteName, parsedData);

            chrome.runtime.sendMessage({
                siteName,
                relevantData
            });
        })
        .catch(error => {
            console.error("Failed to fetch data:", error.message);
            chrome.runtime.sendMessage({
                siteName: getSiteName(),
                relevantData: null,
                error: "Failed to load data from AllSides."
            });
        });
}

// Parses CSV data 
function parseCSV(data) {
    const rows = data.trim().split('\n');
    const headers = rows[0].split(',').map(header => header.trim());

    // Check if headers contain necessary fields for validation
    if (!headers.includes("news_source")) {
        console.error("CSV data is missing 'news_source' header.");
        return [];
    }

    return rows.slice(1).reduce((result, row) => {
        const values = row.split(',');
        if (values.length === headers.length) {
            const entry = {};
            headers.forEach((header, index) => {
                entry[header] = values[index] ? values[index].trim() : "";
            });
            result.push(entry);
        }
        return result;
    }, []);
}

// Filters data based on the site name
function extractData(siteName, data) {
    return data.filter(entry => entry.news_source && entry.news_source.toLowerCase().includes(siteName.toLowerCase()));
}

// Run the functions
loadData();