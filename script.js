// Initialize the chart.js canvas with pie chart
const ctx = document.getElementById('mentalHealthChart').getContext('2d');
const mentalHealthChart = new Chart(ctx, {
    type: 'pie',
    data: {
        labels: ['1990', '2001', '2010', '2020', '2025'],
        datasets: [{
            data: [350, 450, 450, 1000, 1200],
            backgroundColor: ['#ff9999', '#66b3ff', '#99ff99', '#ffcc99', '#ffb3e6'],
            borderColor: ['#ff6666', '#3399ff', '#66cc66', '#ff9966', '#ff80b3'],
            borderWidth: 1
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            tooltip: {
                callbacks: {
                    label: function(tooltipItem) {
                        return tooltipItem.label + ': ' + tooltipItem.raw + ' million';
                    }
                }
            }
        }
    }
});

// Add event listeners to chart segments to show details
const segments = document.querySelectorAll('#mentalHealthChart');
segments.forEach(segment => {
    segment.addEventListener('click', function(event) {
        let year = event.target._chartData.labels[event.target._index];
        showDetails(year);
    });
});

function showDetails(year) {
    const modal = document.getElementById("modal");
    const modalTitle = document.getElementById("modalTitle");
    const modalText = document.getElementById("modalText");

    if (year === "1990") {
        modalTitle.textContent = "Year 1990";
        modalText.textContent = "In 1990, approximately 350 million people worldwide were affected by mental health disorders, including depression, anxiety, and schizophrenia. Mental health was highly stigmatized, and access to care was extremely limited, especially in low-income countries...";
    } else if (year === "2001") {
        modalTitle.textContent = "Year 2001";
        modalText.textContent = "By 2001, the number of people affected by mental health disorders had risen to 450 million. Advances in psychiatry and increased public awareness led to improved diagnosis rates, though stigma and financial constraints still prevented many from receiving treatment...";
    } else if (year === "2010") {
        modalTitle.textContent = "Year 2010";
        modalText.textContent = "In 2010, mental health remained a major global challenge, with around 450 million people affected. The rise of digital mental health tools, such as online therapy platforms and mental wellness apps, provided new ways for people to access support...";
    } else if (year === "2020") {
        modalTitle.textContent = "Year 2020";
        modalText.textContent = "By 2020, the global number of individuals affected by mental health disorders exceeded 1 billion, marking a dramatic increase. The COVID-19 pandemic had a profound impact on mental health worldwide...";
    } else if (year === "2025") {
        modalTitle.textContent = "Year 2025";
        modalText.textContent = "As of 2025, an estimated 1.2 billion people worldwide are living with mental health disorders. The long-term effects of the pandemic, economic stressors, social pressures, and increased awareness have contributed to this figure...";
    }

    modal.style.display = "block";
}

// Close modal when clicking on the close button
document.getElementById("closeModal").addEventListener('click', function() {
    document.getElementById("modal").style.display = "none";
});





