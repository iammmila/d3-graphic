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

    // Define the color scale
    const colorScale = d3.scaleOrdinal(d3.schemeCategory10);
    // Extract the unique country names
    const countries = [...new Set(data.map((d) => d.Country))];
    // Iterate over each country
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

    countries.forEach(function (country, i) {
      // Filter the data for the current country
      const filteredData = data.filter(function (d) {
        return d.Country === country;
      });

      // Create the line generator for the current country
      const line = d3
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
        .datum(filteredData)
        .attr("fill", "none")
        .attr("stroke", colorScale(i)) // Assign a unique color based on the index
        .attr("stroke-width", 3)
        .attr("d", line);
    });
    // const Afghanistan = data.filter(function (d) {
    //   return d.Country === "Afghanistan";
    // });

    // const Albania = data.filter(function (db) {
    //   return db.Country === "Albania";
    // });

    // const Haiti = data.filter(function (d) {
    //   return d.Country === "Haiti";
    // });

    // const Russia = data.filter((d) => d.Country === "Russia");
    // const Rwanda = data.filter((d) => d.Country === "Rwanda");
    // const Uruguay = data.filter((d) => d.Country === "Uruguay");
    // Set the domain of the x and y scales
    // x.domain(
    //   d3.extent(data, function (d) {
    //     return new Date(d.Year);
    //   })
    // );
    // y.domain([
    //   0,
    //   d3.max(data, function (d) {
    //     return d.Rank;
    //   }),
    // ]);

    // Add the x-axis
    svg
      .append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(d3.axisBottom(x));

    // Add the y-axis
    svg.append("g").call(d3.axisLeft(y));
    })
  .catch(function (error) {
    console.log(error);
  });
//??????????????????????????????????????????????????????????

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
