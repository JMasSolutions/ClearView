// Data Strucutre
// 
// "news_source":
// "rating": 
// "rating_num": 
// "type": 
// "agree": 
// "disagree": 
// "perc_agree": 
// "confidence_level": 

const all_side_data = []

function load_data() {
    if (is_online()) {
        fetchData();
    } else {
        console.log("You are currently offline. Waiting for connection...");
        window.addEventListener('online', () => {
            console.log("Back online. Fetching data...");
            fetchData();
        });
    }
}

function fetchData() {
    fetch('https://raw.githubusercontent.com/favstats/AllSideR/master/data/allsides_data.csv')
        .then(response => response.text())
        .then(data => {
            all_side_data = data
            console.log(data);
        })
        .catch(error => {
            console.error("Failed to fetch data:", error);
        });
}

function is_online() {
    return navigator.onLine;
}

document.addEventListener('DOMContentLoaded', function() {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      chrome.scripting.executeScript(
        {
          target: { tabId: tabs[0].id },
          files: ['content.js']
        },
        (results) => {
          if (results && results[0] && results[0].result) {
            document.getElementById('siteName').textContent = results[0].result;
          } else {
            document.getElementById('siteName').textContent = "Site name not found";
          }
        }
      );
    });
  });