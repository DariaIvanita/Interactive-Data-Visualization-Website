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

const mentalHealthChart = new Chart(ctx, {
    type: 'bar',
    data: data,
    options: {
        onClick: (event, elements) => {
            if (elements.length > 0) {
                const chartElement = elements[0];
                const year = mentalHealthChart.data.labels[chartElement.index];
                showMentalHealthInfo(year);  // Call function to show info based on the year clicked
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

// Function to show modal with mental health details based on the year clicked
function showMentalHealthInfo(year) {
    let details = '';
    switch (year) {
        case '1990':
            details = 'In 1990, mental health concerns were less recognized, with limited data on the long-term impact on different demographics.';
            break;
        case '2001':
            details = 'By 2001, mental health awareness began increasing, but resources were still lacking in many areas.';
            break;
        case '2010':
            details = 'In 2010, the conversation around mental health became more mainstream, particularly focusing on youth and young adults.';
            break;
        case '2020':
            details = 'By 2020, mental health issues such as anxiety and depression had become prominent, with a global increase in mental health conditions.';
            break;
        case '2025':
            details = 'In 2025, mental health support is more widespread, with a focus on accessibility and support for underserved communities.';
            break;
        default:
            details = 'No data available for this year.';
    }

    // Display details for the clicked year
    const modalText = document.getElementById('modalText');
    modalText.textContent = details;
    document.getElementById('modal').style.display = 'flex';
}

// Close the modal
document.getElementById('closeModal').onclick = () => {
    document.getElementById('modal').style.display = 'none';
};




