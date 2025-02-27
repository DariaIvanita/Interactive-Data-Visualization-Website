const ctx = document.getElementById('mentalHealthChart').getContext('2d');
const pieCtx = document.getElementById('pieChart').getContext('2d');

const data = {
    labels: ['1990', '2001', '2010', '2020', '2025'],
    datasets: [
        {
            label: 'Male',
            data: [15, 18, 22, 25, 30],
            backgroundColor: 'rgba(54, 162, 235, 0.5)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1
        },
        {
            label: 'Female',
            data: [20, 25, 30, 35, 40],
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1
        },
        {
            label: 'Non-binary',
            data: [5, 7, 8, 12, 15],
            backgroundColor: 'rgba(75, 192, 192, 0.5)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
        }
    ]
};

const mentalHealthChart = new Chart(ctx, {
    type: 'bar',
    data: data,
    options: {
        onClick: (event, elements) => {
            if (elements.length > 0) {
                const year = mentalHealthChart.data.labels[elements[0].index];
                showMentalHealthInfo(year);
            }
        },
        scales: { y: { beginAtZero: true } },
        responsive: true
    }
});

const pieData = {
    labels: ['Male', 'Female', 'Non-binary'],
    datasets: [{
        data: [15, 25, 7],
        backgroundColor: ['rgba(54, 162, 235, 0.5)', 'rgba(255, 99, 132, 0.5)', 'rgba(75, 192, 192, 0.5)'],
        borderColor: ['rgba(54, 162, 235, 1)', 'rgba(255, 99, 132, 1)', 'rgba(75, 192, 192, 1)'],
        borderWidth: 1
    }]
};

const pieChart = new Chart(pieCtx, {
    type: 'pie',
    data: pieData,
    options: { responsive: true }
});

function updatePieChart(category) {
    let categoryData = [0, 0, 0];

    if (category === 'Male') categoryData = [15, 0, 0];
    else if (category === 'Female') categoryData = [0, 25, 0];
    else if (category === 'Non-binary') categoryData = [0, 0, 7];
    else if (category === 'All') categoryData = [15, 25, 7];

    pieChart.data.datasets[0].data = categoryData;
    pieChart.update();
}

document.getElementById('maleData').onclick = () => updatePieChart('Male');
document.getElementById('femaleData').onclick = () => updatePieChart('Female');
document.getElementById('nonBinaryData').onclick = () => updatePieChart('Non-binary');
document.getElementById('allData').onclick = () => updatePieChart('All');

function showMentalHealthInfo(year) {
    let details = {
        '1990': "In 1990, approximately 350 million people worldwide were affected by mental health disorders...",
        '2001': "By 2001, the number of people affected by mental health disorders had risen to 450 million...",
        '2010': "In 2010, mental health remained a major global challenge, with around 450 million people affected...",
        '2020': "By 2020, the global number of individuals affected by mental health disorders exceeded 1 billion...",
        '2025': "As of 2025, an estimated 1.2 billion people worldwide are living with mental health disorders..."
    };

    document.getElementById('modalText').textContent = details[year] || "No data available for this year.";
    document.getElementById('modal').style.display = 'flex';
}

document.getElementById('closeModal').onclick = () => {
    document.getElementById('modal').style.display = 'none';
};




