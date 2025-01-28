// Include D3.js library (ensure this is included in your HTML file before this script)
<script src="https://d3js.org/d3.v7.min.js"></script>

<script>
  // Data for mental health statistics by year
  const data = [
    { year: 1990, individuals: 350000000 },
    { year: 2001, individuals: 450000000 },
    { year: 2010, individuals: 450000000 },
    { year: 2020, individuals: 1000000000 },
    { year: 2024, individuals: 1000000000 }
  ];

  // Setup for the chart dimensions
  const chartWidth = 600;
  const chartHeight = 400;
  const barWidth = chartWidth / data.length - 20;
  const maxValue = d3.max(data, d => d.individuals);

  // Create SVG element for the bar chart
  const svg = d3.select("#chart")
    .attr("width", chartWidth)
    .attr("height", chartHeight);

  // Create a tooltip
  const tooltip = d3.select("#tooltip");

  // Create bars for the bar chart
  svg.selectAll("rect")
    .data(data)
    .enter()
    .append("rect")
    .attr("x", (d, i) => i * (barWidth + 20) + 20)
    .attr("y", d => chartHeight - (d.individuals / maxValue) * (chartHeight - 50) - 20)
    .attr("width", barWidth)
    .attr("height", d => (d.individuals / maxValue) * (chartHeight - 50))
    .attr("class", "bar")
    .attr("data-year", d => d.year)
    .attr("data-individuals", d => d.individuals)
    .on("mouseover", (event, d) => {
      tooltip.style("display", "block")
        .html(`Year: ${d.year}<br>Individuals: ${d.individuals.toLocaleString()}`)
        .style("left", `${event.pageX + 10}px`)
        .style("top", `${event.pageY + 10}px`);
    })
    .on("mouseout", () => {
      tooltip.style("display", "none");
    })
    .on("click", (event, d) => {
      // Redirect to a details page with the year and number of individuals
      window.location.href = `details.html?year=${d.year}&individuals=${d.individuals}`;
    });

  // Pie Chart Setup
  const pieWidth = 400;
  const pieHeight = 400;
  const pieRadius = Math.min(pieWidth, pieHeight) / 2;

  const pieSvg = d3.select("#pieChart")
    .attr("width", pieWidth)
    .attr("height", pieHeight)
    .append("g")
    .attr("transform", `translate(${pieWidth / 2}, ${pieHeight / 2})`);

  // Create pie chart data
  const pie = d3.pie()
    .value(d => d.individuals)
    .sort(null);

  const arc = d3.arc()
    .innerRadius(0)
    .outerRadius(pieRadius);

  const color = d3.scaleOrdinal(d3.schemeCategory10);

  const pieData = pie(data);

  // Draw pie chart arcs
  pieSvg.selectAll("path")
    .data(pieData)
    .enter()
    .append("path")
    .attr("class", "arc")
    .attr("d", arc)
    .attr("fill", (d, i) => color(i))
    .on("mouseover", (event, d) => {
      tooltip.style("display", "block")
        .html(`Year: ${d.data.year}<br>Individuals: ${d.data.individuals.toLocaleString()}`)
        .style("left", `${event.pageX + 10}px`)
        .style("top", `${event.pageY + 10}px`);
    })
    .on("mouseout", () => {
      tooltip.style("display", "none");
    })
    .on("click", (event, d) => {
      // Redirect to a details page with the year and number of individuals
      window.location.href = `details.html?year=${d.data.year}&individuals=${d.data.individuals}`;
    });
</script>
