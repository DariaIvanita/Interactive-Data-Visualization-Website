document.addEventListener("DOMContentLoaded", function () {
    const ctx = document.getElementById("mentalHealthChart").getContext("2d");

    const years = ["1990", "2001", "2010", "2020", "2025"];
    const affectedPopulation = [350, 450, 450, 1000, 1200]; // in millions

    const chart = new Chart(ctx, {
        type: "bar",
        data: {
            labels: years,
            datasets: [{
                label: "People Affected by Mental Health Disorders (millions)",
                data: affectedPopulation,
                backgroundColor: ["#ff6384", "#36a2eb", "#ffce56", "#4bc0c0", "#9966ff"],
                borderColor: "#333",
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            onClick: function (event, elements) {
                if (elements.length > 0) {
                    const year = years[elements[0].index];
                    window.location.href = `details.html?year=${year}`;
                }
            }
        }
    });
});



