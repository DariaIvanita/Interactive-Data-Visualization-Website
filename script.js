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
                const datasetLabel = mentalHealthChart.data.datasets[chartElement.datasetIndex].label;
                showModal(datasetLabel, year);
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

// Function to show modal with category details
function showModal(category, year) {
    let details = '';
    if (year === '1990') {
        details = `In 1990, approximately 350 million people worldwide were affected by mental health disorders, including depression, anxiety, and schizophrenia. Mental health was highly stigmatized, and access to care was extremely limited, especially in low-income countries. Many nations lacked proper mental health policies, leading to inadequate treatment options. The World Health Organization (WHO) and global researchers began pushing for greater awareness and policy changes to address these issues.`;
    } else if (year === '2001') {
        details = `By 2001, the number of people affected by mental health disorders had risen to 450 million. Advances in psychiatry and increased public awareness led to improved diagnosis rates, though stigma and financial constraints still prevented many from receiving treatment. The World Health Report 2001 emphasized mental health as a global priority, encouraging nations to integrate mental health care into their public health systems. Despite this, mental health funding remained low, and many communities still lacked adequate mental health services.`;
    } else if (year === '2010') {
        details = `In 2010, mental health remained a major global challenge, with around 450 million people affected. The rise of digital mental health tools, such as online therapy platforms and mental wellness apps, provided new ways for people to access support. However, access to mental health care was still unequal, particularly in developing nations where services were scarce. Suicide prevention campaigns and discussions around work-life balance became more prominent in mental health discourse. Governments and organizations began implementing workplace mental health programs, aiming to address stress and burnout.`;
    } else if (year === '2020') {
        details = `By 2020, the global number of individuals affected by mental health disorders exceeded 1 billion, marking a dramatic increase. The COVID-19 pandemic had a profound impact on mental health worldwide, leading to sharp increases in anxiety, depression, and stress-related disorders. Lockdowns, social isolation, and economic uncertainty contributed to deteriorating mental well-being. Governments and organizations expanded online therapy options, crisis helplines, and mental health hotlines to address the crisis. Many companies adopted remote work policies to help employees manage stress and mental fatigue.`;
    } else if (year === '2025') {
        details = `As of 2025, an estimated 1.2 billion people worldwide are living with mental health disorders. The long-term effects of the pandemic, economic stressors, social pressures, and increased awareness have contributed to this figure. Advances in artificial intelligence (AI) and virtual reality (VR) have revolutionized mental health therapy, making treatment more personalized and accessible. Many countries have also implemented stronger mental health policies, increasing funding for psychiatric care and reducing barriers to treatment. Despite progress, the global mental health crisis remains significant, requiring continued research, policy development, and stigma reduction efforts.`;
    }

    // Update modal content
    document.getElementById('modalText').textContent = details;
    document.getElementById('modalTitle').textContent = `Details for ${category} in ${year}`;
    document.getElementById('modal').style.display = 'flex';
}

// Close the modal
document.getElementById('closeModal').onclick = () => {
    document.getElementById('modal').style.display = 'none';
};




