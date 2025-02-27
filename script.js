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
                showMentalHealthDetails(year); // Show details based on the clicked year
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

// Function to show mental health details based on year clicked
function showMentalHealthDetails(year) {
    let maleData = 0;
    let femaleData = 0;
    let nonBinaryData = 0;
    let yearInfo = "";

    // Assign data based on the selected year
    switch (year) {
        case '1990':
            maleData = 15;
            femaleData = 20;
            nonBinaryData = 5;
            yearInfo = 'In 1990, mental health concerns for males, females, and non-binary individuals were at their early stages of significant recognition.';
            break;
        case '2001':
            maleData = 18;
            femaleData = 25;
            nonBinaryData = 7;
            yearInfo = 'By 2001, awareness of mental health issues had begun to rise, with males and females experiencing noticeable increases.';
            break;
        case '2010':
            maleData = 22;
            femaleData = 30;
            nonBinaryData = 8;
            yearInfo = 'In 2010, mental health was more widely discussed, and both male and female populations saw notable increases in reported cases.';
            break;
        case '2020':
            maleData = 25;
            femaleData = 35;
            nonBinaryData = 12;
            yearInfo = 'By 2020, mental health issues were recognized as critical across all demographics, with females experiencing the highest rates of anxiety and depression.';
            break;
        case '2025':
            maleData = 30;
            femaleData = 40;
            nonBinaryData = 15;
            yearInfo = 'In 2025, ongoing efforts to address mental health issues saw significant data showing increased attention towards the non-binary community.';
            break;
        default:
            yearInfo = 'No data available for this year.';
            break;
    }

    // Display modal with year-specific details
    document.getElementById('modalYear').textContent = `Mental Health Trends in ${year}`;
    document.getElementById('modalText').textContent = `
        Year: ${year}
        Male: ${maleData}%
        Female: ${femaleData}%
        Non-binary: ${nonBinaryData}%
        \n\n${yearInfo}
    `;
    document.getElementById('modal').style.display = 'flex';
}

// Close the modal when the close button is clicked
document.getElementById('closeModal').onclick = () => {
    document.getElementById('modal').style.display = 'none';
};



