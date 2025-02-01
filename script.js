// Data for the chart
const data = [
    { year: 1990, individuals: 350000000, info: "In 1990, mental health disorders affected an estimated 350 million people worldwide. Stigma was high, and access to treatment was limited." },
    { year: 2001, individuals: 450000000, info: "In 2001, the number of affected individuals rose to 450 million. Increased awareness led to more diagnoses, but resources were still scarce." },
    { year: 2010, individuals: 450000000, info: "By 2010, mental health disorders continued to affect 450 million people. Online resources began to emerge, helping individuals seek support." },
    { year: 2020, individuals: 100000000, info: "In 2020, the pandemic drastically impacted mental health, affecting 100 million people. Anxiety, depression, and stress were widespread during the global crisis." },
    { year: 2025, individuals: 100000000, info: "By 2025, mental health challenges remain widespread, affecting millions globally. Suicide rates are high, but efforts to support mental health are growing." }
];

const svg = d3.select("#barChart");
const pieSvg = d3.select("#pieChart");
const tooltip = d3.select("#tooltip");
const width = +svg.attr("width");
const height = +svg.attr("height");
const radius = Math.min(400, 400) / 2;

// Set up scales for the bar chart
const x = d3.scaleBand()
    .domain(data.map(d => d.year))
    .range([0, width])
    .padding(0.1);

const y = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.individuals)])
    .range([height - 20, 20]);

// Create Bar Chart
svg.selectAll(".bar")
    .data(data)
    .enter().append("rect")
    .attr("class", "bar")
    .attr("x", d => x(d.year))
    .attr("y", d => y(d.individuals))
    .attr("width", x.bandwidth())
    .attr("height", d => height - y(d.individuals) - 20)
    .on("mouseover", (event, d) => {
        tooltip.style("display", "block")
            .html(`Year: ${d.year}<br>Individuals: ${d.individuals / 1000000}M`) 
            .style("left", (event.pageX + 10) + "px")
            .style("top", (event.pageY + 10) + "px");
    })
    .on("mouseout", () => tooltip.style("display", "none"))
    .on("click", (event, d) => {
        window.location.href = `details.html?year=${d.year}`;
    });

// Create Pie Chart
const pie = d3.pie().value(d => d.individuals);
const arc = d3.arc().outerRadius(radius).innerRadius(0);

const pieGroup = pieSvg.append("g")
    .attr("transform", `translate(${400 / 2},${400 / 2})`);

pieGroup.selectAll(".arc")
    .data(pie(data))
    .enter().append("path")
    .attr("class", "arc")
    .attr("d", arc)
    .attr("fill", (d, i) => d3.schemeCategory10[i])
    .on("mouseover", (event, d) => {
        tooltip.style("display", "block")
            .html(`Year: ${d.data.year}<br>Individuals: ${d.data.individuals / 1000000}M`) 
            .style("left", (event.pageX + 10) + "px")
            .style("top", (event.pageY + 10) + "px");
    })
    .on("mouseout", () => tooltip.style("display", "none"))
    .on("click", (event, d) => {
        window.location.href = `details.html?year=${d.data.year}`;
    });
