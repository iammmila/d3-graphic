const selectCountry = d3.select("#country");
const selectSector = d3.select("#sector");
const selectSubsector = d3.select("#subsector");
const selectIndicator = d3.select("#indicator");
const selectYear = d3.select("#year");

d3.csv("./data.csv").then(function (data) {
  const Countries = [...new Set(data.map((d) => d.Country))];
  const Sectors = [...new Set(data.map((d) => d.Sector))];
  const Subsector = [...new Set(data.map((d) => d.Subsector))];
  const Indicator = [...new Set(data.map((d) => d.Indicator))];
  const Years = [...new Set(data.map((d) => d.Year))];

  const optionsOfCountries = selectCountry
    .selectAll("option")
    .data(Countries)
    .enter()
    .append("option");

  const optionsOfSectors = selectSector
    .selectAll("option")
    .data(Sectors)
    .enter()
    .append("option");

  const optionsOfSubsectors = selectSubsector
    .selectAll("option")
    .data(Subsector)
    .enter()
    .append("option");

  const optionsOfIndicators = selectIndicator
    .selectAll("option")
    .data(Indicator)
    .enter()
    .append("option");

  const optionsOfYears = selectYear
    .selectAll("option")
    .data(Years)
    .enter()
    .append("option");

  optionsOfCountries.text((d) => d).attr("value", (d) => d);
  optionsOfSectors.text((d) => d).attr("value", (d) => d);
  optionsOfSubsectors.text((d) => d).attr("value", (d) => d);
  optionsOfIndicators.text((d) => d).attr("value", (d) => d);
  optionsOfYears.text((d) => d).attr("value", (d) => d);

});
