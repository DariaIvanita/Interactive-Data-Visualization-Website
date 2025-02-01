<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mental Health Statistics</title>
    <script src="https://d3js.org/d3.v7.min.js"></script>
    <style>
        .bar {
            fill: steelblue;
            transition: fill 0.3s;
            cursor: pointer;
        }

        .bar:hover {
            fill: orange;
        }

        .tooltip {
            position: absolute;
            background: lightyellow;
            border: 1px solid #ccc;
            padding: 5px;
            font-size: 12px;
            display: none;
            pointer-events: none;
        }

        .chart-container {
            text-align: center;
            margin: 20px;
        }
    </style>
</head>

<body>
    <h1 style="text-align: center;">Mental Health Statistics (1990-2024)</h1>

    <div class="chart-container">
        <svg id="chart" width="600" height="400"></svg>
        <svg id="pieChart" width="400" height="400"></svg>
    </div>

    <div id="tooltip" class="tooltip"></div>

    <script>
        document.addEventListener("DOMContentLoaded", function () {
            // Data for mental health statistics by year
            const data = [
                { year: 1990, individuals: 350000000 },
                { year: 2001, individuals: 450000000 },
                { year: 2010, individuals: 450000000 },
                { year: 2020, individuals: 1000000000 },
                { year: 2025, individuals: 1000000000 }
            ];

            // Bar Chart Setup
            const chartWidth = 600, chartHeight = 400;
            const barWidth = chartWidth / data.length - 20;
            const maxValue = d3.max(data, d => d.individuals);

            const svg = d3.select("#chart")
                .attr("width", chartWidth)
                .attr("height", chartHeight);

            const tooltip = d3.select("#tooltip");

            // Create Bars
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
                        .html(`<strong>Year:</strong> ${d.year}<br><strong>Individuals:</strong> ${d.individuals.toLocaleString()}`)
                        .style("left", `${event.pageX + 10}px`)
                        .style("top", `${event.pageY - 20}px`);
                })
                .on("mouseout", () => {
                    tooltip.style("display", "none");
                })
                .on("click", (event, d) => {
                    // Redirect to a details page
                    window.location.href = `details.html?year=${d.year}&individuals=${d.individuals}`;
                });

            // Pie Chart Setup
            const pieWidth = 400, pieHeight = 400, pieRadius = Math.min(pieWidth, pieHeight) / 2;

            const pieSvg = d3.select("#pieChart")
                .append("g")
                .attr("transform", `translate(${pieWidth / 2}, ${pieHeight / 2})`);

            const pie = d3.pie().value(d => d.individuals);
            const arc = d3.arc().innerRadius(0).outerRadius(pieRadius);
            const color = d3.scaleOrdinal(d3.schemeCategory10);

            const pieData = pie(data);

            pieSvg.selectAll("path")
                .data(pieData)
                .enter()
                .append("path")
                .attr("class", "arc")
                .attr("d", arc)
                .attr("fill", (d, i) => color(i))
                .on("mouseover", (event, d) => {
                    tooltip.style("display", "block")
                        .html(`<strong>Year:</strong> ${d.data.year}<br><strong>Individuals:</strong> ${d.data.individuals.toLocaleString()}`)
                        .style("left", `${event.pageX + 10}px`)
                        .style("top", `${event.pageY - 20}px`);
                })
                .on("mouseout", () => {
                    tooltip.style("display", "none");
                })
                .on("click", (event, d) => {
                    window.location.href = `details.html?year=${d.data.year}&individuals=${d.data.individuals}`;
                });
        });
    </script>
</body>

</html>

