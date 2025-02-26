// Get context for the charts
const ctx = document.getElementById('mentalHealthChart').getContext('2d');
const pieCtx = document.getElementById('pieChart').getContext('2d');

// Initial data for the bar chart
const data = {
    labels: ['1990', '2001', '2010', '2020', '2025'], // Time periods
    datasets: [
        {
            label: 'Male',
            data: [15, 18, 22, 25, 30],
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1,
            hidden: false
        },
        {
            label: 'Female',
            data: [20, 25, 30, 35, 40],
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1,
            hidden: false
        },
        {
            label: 'Non-binary',
            data: [5, 7, 8, 12, 15],
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
            hidden: false
        }
    ]
};

// Bar chart configuration
const mentalHealthChart = new Chart(ctx, {
    type: 'bar',
    data: data,
    options: {
        onClick: (event, elements) => {
            if (elements.length > 0) {
                const chartElement = elements[0];
                const year = mentalHealthChart.data.labels[chartElement.index];
                // Redirect to the details page with the year parameter
                window.location.href = `details.html?year=${year}`;
            }
        },
        tooltips: {
            callbacks: {
                label: (tooltipItem) => {
                    const datasetLabel = tooltipItem.dataset.label;
                    const value = tooltipItem.raw;
                    return `${datasetLabel}: ${value} % (Year: ${tooltipItem.label})`;
                }
            }
        },
        animation: {
            duration: 1000, // Adding smooth animation for transitions
            easing: 'easeOutBounce'
        },
        scales: {
            y: {
                beginAtZero: true
            }
        },
        responsive: true
    }
});

// Pie chart data
const pieData = {
    labels: ['Male', 'Female', 'Non-binary'],
    datasets: [{
        data: [15, 25, 7], // Initial data for pie chart
        backgroundColor: ['rgba(54, 162, 235, 0.5)', 'rgba(255, 99, 132, 0.5)', 'rgba(75, 192, 192, 0.5)'],
        borderColor: ['rgba(54, 162, 235, 1)', 'rgba(255, 99, 132, 1)', 'rgba(75, 192, 192, 1)'],
        borderWidth: 1
    }]
};

const pieChart = new Chart(pieCtx, {
    type: 'pie',
    data: pieData,
    options: {
        responsive: true,
        animation: {
            duration: 1000, // Smooth animation for pie chart
            easing: 'easeOutBounce'
        }
    }
});

// Function to update pie chart based on the selected data
function updatePieChart(category) {
    let categoryData = [0, 0, 0]; // Male, Female, Non-binary counts

    if (category === 'Male') {
        categoryData = [15, 0, 0];
    } else if (category === 'Female') {
        categoryData = [0, 25, 0];
    } else if (category === 'Non-binary') {
        categoryData = [0, 0, 7];
    } else if (category === 'All') {
        categoryData = [15, 25, 7]; // All data
    }

    pieChart.data.datasets[0].data = categoryData;
    pieChart.update();
}

// Toggle Buttons: Show different data on the chart
document.getElementById('maleData').onclick = () => {
    updateChartData('Male');
    updatePieChart('Male');
};
document.getElementById('femaleData').onclick = () => {
    updateChartData('Female');
    updatePieChart('Female');
};
document.getElementById('nonBinaryData').onclick = () => {
    updateChartData('Non-binary');
    updatePieChart('Non-binary');
};
document.getElementById('allData').onclick = () => {
    updateChartData('All');
    updatePieChart('All');
};

// Function to dynamically update bar chart data
function updateChartData(category) {
    if (category === 'All') {
        mentalHealthChart.data.datasets.forEach(dataset => {
            dataset.hidden = false; // Show all datasets
        });
    } else {
        mentalHealthChart.data.datasets.forEach(dataset => {
            dataset.hidden = dataset.label !== category; // Show only selected category
        });
    }
    mentalHealthChart.update(); // Update the bar chart with the new data
}

// Function to show modal with category details
function showModal(category) {
    let details = '';
    if (category === 'Male') {
        details = 'Mental health concerns for males have increased steadily from 1990 to 2025, with significant growth seen in recent years.';
    } else if (category === 'Female') {
        details = 'Females have seen a higher rate of increase in mental health issues, particularly depression and anxiety, over the past three decades.';
    } else if (category === 'Non-binary') {
        details = 'Non-binary individuals have experienced a growing awareness of mental health challenges, especially among younger generations.';
    }

    // Update modal content
    document.getElementById('modalText').textContent = details;
    document.getElementById('modalTitle').textContent = `Details for ${category}`;
    document.getElementById('modal').style.display = 'flex';
}

// Close the modal
document.getElementById('closeModal').onclick = () => {
    document.getElementById('modal').style.display = 'none';
};



