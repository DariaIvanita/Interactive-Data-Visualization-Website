const data = [
    { year: 1990, individuals: 350000000, info: "In 1990, approximately 350 million people worldwide were estimated to be affected by mental health disorders, including depression, anxiety, schizophrenia, and other mental health disorders." },
    { year: 2001, individuals: 450000000, info: "By 2001, the number had risen to 450 million, reflecting increasing awareness, but also the growing challenges of diagnosing and treating mental health conditions." },
    { year: 2010, individuals: 450000000, info: "In 2010, around 450 million people globally were still affected by mental health issues. The digital age started to offer new mental health tools, but stigma and lack of care options persisted." },
    { year: 2020, individuals: 100000000, info: "In 2020, due to the COVID-19 pandemic, approximately 100 million people worldwide were affected by mental health disorders, including rising rates of depression and anxiety." },
    { year: 2025, individuals: 100000000, info: "As of 2025, mental health issues continue to affect millions globally. Efforts to address these issues are underway, including awareness campaigns, workplace mental health programs, and community support events." }
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
