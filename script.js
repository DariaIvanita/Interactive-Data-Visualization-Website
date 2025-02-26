// Data for the charts
const years = ["1990", "2001", "2010", "2020", "2025"];
const peopleAffected = [350, 450, 450, 1000, 1200]; // In millions
const genderDistribution = [45, 55, 50, 60, 40]; // Percentages of male/female, for pie chart

// Bar chart data
const barChartData = {
    labels: years,
    datasets: [{
        label: 'People Affected by Mental Health (Millions)',
        data: peopleAffected,
        backgroundColor: '#4BC0C0',
        borderColor: '#36A2EB',
        borderWidth: 1
    }]
};

// Pie chart data (Gender distribution)
const pieChartData = {
    labels: ['Male', 'Female', 'Non-binary'],
    datasets: [{
        label: 'Gender Distribution',
        data: genderDistribution,
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
    }]
};

// Bar Chart configuration
const barChartConfig = {
    type: 'bar',
    data: barChartData,
    options: {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            tooltip: {
                callbacks: {
                    label: function(tooltipItem) {
                        return tooltipItem.raw + " million";
                    }
                }
            }
        },
        onClick: function(e, elements) {
            if (elements.length > 0) {
                const index = elements[0].index;
                openModal(index, 'bar');
            }
        }
    }
};

// Pie Chart configuration
const pieChartConfig = {
    type: 'pie',
    data: pieChartData,
    options: {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            tooltip: {
                callbacks: {
                    label: function(tooltipItem) {
                        return tooltipItem.raw + "%";
                    }
                }
            }
        },
        onClick: function(e, elements) {
            if (elements.length > 0) {
                const index = elements[0].index;
                openModal(index, 'pie');
            }
        }
    }
};

// Create the bar chart
const barChart = new Chart(document.getElementById('mentalHealthChart'), barChartConfig);

// Create the pie chart
const pieChart = new Chart(document.getElementById('mentalHealthPieChart'), pieChartConfig);

// Function to open modal with information based on chart
function openModal(index, chartType) {
    const yearDetails = {
        "1990": {
            title: "Year 1990",
            text: "In 1990, approximately 350 million people worldwide were affected by mental health disorders, including depression, anxiety, and schizophrenia. Mental health was highly stigmatized, and access to care was extremely limited, especially in low-income countries. Many nations lacked proper mental health policies, leading to inadequate treatment options. The World Health Organization (WHO) and global researchers began pushing for greater awareness and policy changes to address these issues."
        },
        "2001": {
            title: "Year 2001",
            text: "By 2001, the number of people affected by mental health disorders had risen to 450 million. Advances in psychiatry and increased public awareness led to improved diagnosis rates, though stigma and financial constraints still prevented many from receiving treatment. The World Health Report 2001 emphasized mental health as a global priority, encouraging nations to integrate mental health care into their public health systems."
        },
        "2010": {
            title: "Year 2010",
            text: "In 2010, mental health remained a major global challenge, with around 450 million people affected. The rise of digital mental health tools, such as online therapy platforms and mental wellness apps, provided new ways for people to access support. However, access to mental health care was still unequal, particularly in developing nations where services were scarce."
        },
        "2020": {
            title: "Year 2020",
            text: "By 2020, the global number of individuals affected by mental health disorders exceeded 1 billion, marking a dramatic increase. The COVID-19 pandemic had a profound impact on mental health worldwide, leading to sharp increases in anxiety, depression, and stress-related disorders. Lockdowns, social isolation, and economic uncertainty contributed to deteriorating mental well-being."
        },
        "2025": {
            title: "Year 2025",
            text: "As of 2025, an estimated 1.2 billion people worldwide are living with mental health disorders. The long-term effects of the pandemic, economic stressors, social pressures, and increased awareness have contributed to this figure. Advances in artificial intelligence (AI) and virtual reality (VR) have revolutionized mental health therapy, making treatment more personalized and accessible."
        }
    };

    const genderDetails = {
        "Male": {
            title: "Male",
            text: "This data shows the percentage of mental health disorder prevalence among male individuals."
        },
        "Female": {
            title: "Female",
            text: "This data shows the percentage of mental health disorder prevalence among female individuals."
        },
        "Non-binary": {
            title: "Non-binary",
            text: "This data shows the percentage of mental health disorder prevalence among non-binary individuals."
        }
    };

    const year = years[index];
    const gender = pieChartData.labels[index];

    if (chartType === 'bar') {
        document.getElementById("modalTitle").innerText = yearDetails[year].title;
        document.getElementById("modalText").innerText = yearDetails[year].text;
    } else if (chartType === 'pie') {
        document.getElementById("modalTitle").innerText = genderDetails[gender].title;
        document.getElementById("modalText").innerText = genderDetails[gender].text;
    }

    document.getElementById("modal").style.display = "block";
}

// Close modal when user clicks the "X"
document.getElementById("closeModal").onclick = function() {
    document.getElementById("modal").style.display = "none";
}




