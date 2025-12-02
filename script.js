let csvData = [];

// Load CSV when page opens
fetch("data.csv")
    .then(response => response.text())
    .then(text => {
        csvData = text.split("\n").map(row => row.split(","));
    });

function searchID() {
    document.getElementById("error").textContent = "";
    document.getElementById("result").innerHTML = "";

    const searchValue = document.getElementById("searchBox").value.trim();

    if (!searchValue) {
        document.getElementById("error").textContent = "Please enter an ID number";
        return;
    }

    // Column B → index 1
    const matches = csvData.filter(row => row[1] && row[1].trim() === searchValue);

    if (matches.length === 0) {
        document.getElementById("error").textContent = "No registration found";
        return;
    }

    // Build table
    let table = "<table><tr>";

    // Header row from first row of CSV
    csvData[0].forEach(col => { table += `<th>${col}</th>`; });
    table += "</tr>";

    // Matching rows
    matches.forEach(row => {
        table += "<tr>";
        row.forEach(col => {
            table += `<td>${col}</td>`;
        });
        table += "</tr>";
    });

    table += "</table>";

    document.getElementById("result").innerHTML = table;
}
