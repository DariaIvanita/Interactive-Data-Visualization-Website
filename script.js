const data = [
    { year: 1990, individuals: 350000000, info: "In 1990, mental health disorders were still heavily stigmatized, and many individuals with conditions like depression, anxiety, and schizophrenia faced significant barriers to diagnosis and treatment. Globally, mental health disorders affected an estimated 350 million people. However, awareness of mental health challenges was on the rise, and early interventions were beginning to take shape in developed nations, though access to services was limited, particularly in lower-income countries. The mental health sector was struggling to secure adequate funding and public attention." },
    { year: 2001, individuals: 450000000, info: "By 2001, the number of people affected by mental health disorders had increased to around 450 million. Improved diagnostic methods and greater public awareness helped bring mental health into the spotlight. Despite advancements, access to treatment and resources was still inconsistent. Mental health continued to be overshadowed by other health issues in many regions, though there was a growing recognition of the importance of mental health for overall well-being. Mental health professionals began advocating for more government funding, and public policies started evolving to address these challenges." },
    { year: 2010, individuals: 450000000, info: "In 2010, mental health disorders affected around 450 million people globally, and the world was becoming more aware of the impacts of mental health on public health. The rise of online mental health resources began to take hold, and more individuals turned to the internet for self-diagnosis and support. Mental health professionals began to develop more sophisticated treatments for conditions like depression and PTSD. However, many countries were still struggling with adequate mental health funding, and stigma around mental health persisted, especially in developing countries." },
    { year: 2020, individuals: 100000000, info: "The global mental health crisis intensified in 2020 due to the COVID-19 pandemic. An estimated 100 million people were affected by mental health disorders as the pandemic caused widespread anxiety, depression, and stress. The world faced unprecedented disruptions, including lockdowns, isolation, and economic instability. Frontline workers and caregivers experienced heightened stress, leading to burnout and mental health challenges. This period highlighted the critical need for mental health services and led to a shift in both personal and institutional approaches to mental well-being. The use of telemedicine in mental health services became widespread, and there was a growing call for better global mental health infrastructure." },
    { year: 2025, individuals: 100000000, info: "In 2025, mental health remains a pressing global issue, with millions of people worldwide still struggling with mental health disorders. The U.S. reports that one in five adults experience mental health challenges every year, with suicide rates continuing to rise, reflecting deep societal and emotional strain. Mental health support has been integrated into workplaces, with companies moving away from general wellness programs and offering personalized mental health support. Governments and organizations around the world are starting to prioritize mental health, recognizing it as a crucial aspect of public health. Community-led initiatives and campaigns are amplifying the conversation, though the need for long-term, sustainable mental health solutions is as urgent as ever." }
];

// Bar chart setup
const svg = d3.select("#barChart");
const width = +svg.attr("width");
const height = +svg.attr("height");
const margin = { top: 20, right: 20, bottom: 40, left: 40 };

// Set up scales for the bar chart
const x = d3.scaleBand()
    .domain(data.map(d => d.year))
    .range([margin.left, width - margin.right])
    .padding(0.1);

const y = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.individuals)])
    .nice()
    .range([height - margin.bottom, margin.top]);

// Add bars to the bar chart
svg.selectAll(".bar")
    .data(data)
    .enter().append("rect")
    .attr("class", "bar")
    .attr("x", d => x(d.year))
    .attr("y", d => y(d.individuals))
    .attr("width", x.bandwidth())
    .attr("height", d => y(0) - y(d.individuals))
    .on("mouseover", (event, d) => {
        d3.select("#tooltip")
            .style("display", "block")
            .html(`Year: ${d.year}<br>Individuals: ${d.individuals / 1000000}M`)
            .style("left", (event.pageX + 10) + "px")
            .style("top", (event.pageY + 10) + "px");
    })
    .on("mouseout", () => d3.select("#tooltip").style("display", "none"))
    .on("click", (event, d) => {
        window.location.href = `details.html?year=${d.year}&info=${encodeURIComponent(d.info)}`;
    });

// Add x-axis and y-axis to the bar chart
svg.append("g")
    .selectAll("text")
    .data(data)
    .enter().append("text")
    .attr("x", d => x(d.year) + x.bandwidth() / 2)
    .attr("y", height - margin.bottom + 20)
    .attr("text-anchor", "middle")
    .text(d => d.year);

svg.append("g")
    .selectAll("text")
    .data(data)
    .enter().append("text")
    .attr("x", d => x(d.year) + x.bandwidth() / 2)
    .attr("y", d => y(d.individuals) - 10)
    .attr("text-anchor", "middle")
    .text(d => (d.individuals / 1000000).toFixed(1) + "M");

// Pie chart setup
const pieSvg = d3.select("#pieChart");
const radius = Math.min(400, 400) / 2;

const pie = d3.pie().value(d => d.individuals);
const arc = d3.arc().outerRadius(radius).innerRadius(0);

const pieGroup = pieSvg.append("g")
    .attr("transform", `translate(${400 / 2},${400 / 2})`);

pieGroup.selectAll(".arc")
    .data(pie(data))
    .enter().append("path")
    .attr("class", "arc")
    .attr("d", arc)
    .attr("fill", (d, i) => d3.schemePastel1[i])
    .on("mouseover", (event, d) => {
        d3.select("#tooltip")
            .style("display", "block")
            .html(`Year: ${d.data.year}<br>Individuals: ${d.data.individuals / 1000000}M`)
            .style("left", (event.pageX + 10) + "px")
            .style("top", (event.pageY + 10) + "px");
    })
    .on("mouseout", () => d3.select("#tooltip").style("display", "none"))
    .on("click", (event, d) => {
        window.location.href = `details.html?year=${d.data.year}&info=${encodeURIComponent(d.data.info)}`;
    });

