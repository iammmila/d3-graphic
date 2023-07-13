const margin = { top: 70, right: 30, bottom: 40, left: 80 };
const width = 1200 - margin.left - margin.right;
const height = 500 - margin.top - margin.bottom;

// Set up the x and y scales
const x = d3.scaleTime().range([0, width]);
const y = d3.scaleLinear().range([height, 0]);

// Create the SVG element and append it to the chart container
const svg = d3
  .select("#chart-container")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", `translate(${margin.left},${margin.top})`);

// Load the dataset from the CSV file
d3.csv("./data.csv")
  .then(function (data) {
    data.forEach(function (d) {
      d.Year = String(d.Year);
      d.Rank = +d.Rank;
    });

    // Set the domain of the x and y scales
    x.domain(
      d3.extent(data, function (d) {
        return new Date(d.Year);
      })
    );
    y.domain([
      0,
      d3.max(data, function (d) {
        return d.Rank;
      }),
    ]);

    // Add the x-axis
    svg
      .append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(d3.axisBottom(x));

    // Add the y-axis
    svg.append("g").call(d3.axisLeft(y));

    // Create the line generator
    const lineAfhganistan = d3
      .line()
      .x(function (d) {
        return x(new Date(d.Year));
      })
      .y(function (d) {
        return y(d.Rank);
      });

    // Add the line path to the SVG element
    svg
      .append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "purple")
      .attr("stroke-width", 3)
      .attr("d", lineAfhganistan);  
  })
  .catch(function (error) {
    console.log(error);
  });

// function getComboA(selectObject) {
//   var value = selectObject.value;
//   console.log(value);
// }
const selectElement = document.querySelector("#sector");
let output = selectElement.value;
// document.querySelector("output").innerHTML = output;
d3.select("output").text(output);
// // Set dimensions and margins for the chart
// const margin = { top: 70, right: 30, bottom: 40, left: 80 };
// const width = 1200 - margin.left - margin.right;
// const height = 500 - margin.top - margin.bottom;

// // Set up the x and y scales
// const x = d3.scaleBand().range([0, width]).padding(0.1);
// const y = d3.scaleLinear().range([height, 0]);

// // Create the SVG element and append it to the chart container
// const svg = d3
//   .select("#chart-container")
//   .append("svg")
//   .attr("width", width + margin.left + margin.right)
//   .attr("height", height + margin.top + margin.bottom)
//   .append("g")
//   .attr("transform", `translate(${margin.left},${margin.top})`);

// // Load the dataset from the CSV file
// d3.csv("./data.csv")
//   .then(function (data) {
//     // Parse the numeric values
//     data.forEach(function (d) {
//       d.Year = +d.Year;
//       d.Amount = +d.Amount;
//     });

//     // Set the domain of the x and y scales
//     x.domain(
//       data.map(function (d) {
//         return d.Year;
//       })
//     );
//     y.domain([
//       0,
//       d3.max(data, function (d) {
//         return d.Amount;
//       }),
//     ]);

//     // Add the x-axis
//     svg
//       .append("g")
//       .attr("transform", `translate(0, ${height})`)
//       .call(d3.axisBottom(x));

//     // Add the y-axis
//     svg.append("g").call(d3.axisLeft(y));

//     // Add the bars
//     svg
//       .selectAll(".bar")
//       .data(data)
//       .enter()
//       .append("rect")
//       .attr("class1", "bar")
//       .attr("x", function (d) {
//         return x(d.Year);
//       })
//       .attr("y", function (d) {
//         return y(d.Amount);
//       })
//       .attr("width", x.bandwidth())
//       .attr("height", function (d) {
//         return height - y(d.Amount);
//       });
//   })
//   .catch(function (error) {
//     // Handle error if the CSV file fails to load
//     console.log(error);
//   });
// Set dimensions and margins for the chart
