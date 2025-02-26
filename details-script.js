document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const year = urlParams.get("year");

    const mentalHealthData = {
        "1990": "In 1990, approximately 350 million people worldwide were affected by mental health disorders, including depression, anxiety, and schizophrenia. Mental health was highly stigmatized, and access to care was extremely limited.",
        "2001": "By 2001, the number of affected individuals had risen to 450 million. Advances in psychiatry and public awareness improved diagnosis, but stigma and financial constraints remained barriers to treatment.",
        "2010": "In 2010, mental health remained a global challenge, with 450 million people affected. Digital mental health tools emerged, offering new ways for individuals to access care.",
        "2020": "By 2020, over 1 billion people were affected, largely due to the COVID-19 pandemic. Anxiety, depression, and stress disorders increased significantly, prompting governments to expand online therapy and crisis helplines.",
        "2025": "In 2025, an estimated 1.2 billion people suffer from mental health disorders. AI and VR have revolutionized therapy, making treatment more accessible. Governments have also improved funding for psychiatric care."
    };

    if (year && mentalHealthData[year]) {
        document.getElementById("year").textContent = `Year: ${year}`;
        document.getElementById("info").textContent = mentalHealthData[year];
    } else {
        document.getElementById("year").textContent = "Year: Not Found";
        document.getElementById("info").textContent = "No additional information available.";
    }
});
