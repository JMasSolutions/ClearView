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