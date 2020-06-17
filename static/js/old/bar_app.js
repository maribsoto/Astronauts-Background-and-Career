
// The code for the Horizontal Bar Chart  is wrapped inside a function

// Store width and height parameters and store margins 

var margin = { top: 20, right: 30, bottom: 40, left: 150 },
  width = 1600 - margin.left - margin.right,
  height = 5000 - margin.top - margin.bottom;

// Create an SVG wrapper, append an SVG group that will hold our chart,
// and shift the latter by left and top margins.

// Append the svg object to the body of the page
var svg = d3.select("#my_dataviz")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform",
    "translate(" + margin.left + "," + margin.top + ")");

// Retrieve data from the CSV file and execute everything below

var url = "/api/v1.0/figures";

d3.json(url).then(function (Bardata) {

  //Parse Data
  // ==============================
  Bardata.forEach(function (data) {
    data.Name = data.Name;
    data.Space_Flight_hr = +data.Space_Flight_hr;
    data.Space_Flights = +data.Space_Flights;
    data.Space_Walks = +data.Space_Walks;
    data.Space_Walks_hr = +data.Space_Walks_hr;

  });

  // Initialize toolTip
  // ==============================
  var toolTip = d3
    .tip()
    .attr("class", "d3-tip")
    .offset([80, -60])
    .html(function (d) {
      return (`${d.Name}<br>Flight Hours: ${d.Space_Flight_hr}hr<br># Space Walks: ${d.Space_Walks}`);
  // return ('Kenn');
  });

  // Create initial axis functions
  // ==============================
  // Add X axis
  var x = d3.scaleLinear()
    .domain([0, 13000])
    .range([0, width]);
  svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x))
    .selectAll("text")
    .attr("font-size", "18px")
    .attr("fill", "white")
    .attr("transform", "translate(-10,0)")
    .style("text-anchor", "end");

  // Y axis
  var y = d3.scaleBand()
    .range([0, height])
    .domain(Bardata.map(function (d) { return d.Name; }))
    .padding(.15);


  svg.append("g")
    .call(d3.axisLeft(y))
    .selectAll("text")
    .attr("font-size", "15px")
    .attr("fill", "white")

  //Bars
  svg.selectAll("myRect")
    .data(Bardata)
    .enter()
    .append("rect")
    .attr("x", x(0))
    .attr("y", function (d) { return y(d.Name); })
    .attr("width", function (d) { return x(d.Space_Flight_hr); })
    .attr("height", y.bandwidth())
    .attr("fill", "#69b3a2")
    .call(toolTip)
    .on("mouseover", toolTip.show)
    .on("mouseout", toolTip.hide)
})



// svgElement
//     .on('mouseenter', function (actual, i) {
//         d3.select(this).attr('opacity', 0.5)
//     })
//     .on('mouseleave', function (actual, i) {
//         d3.select(this).attr('opacity', 1)
//     })


// {
//   switch (order) {
//     case "name-ascending": Bardata.sort((a, b) => a.Name.localeCompare(b.Name)); break;
//     case "Flight_hr-ascending": Bardata.sort((a, b) => a.Space_Flight_hr - b.Space_Flight_hr); break;
//     case "Flight-hr-descending": Bardata.sort((a, b) => b.Space_Flight_hr - a.Space_Flight_hr); break;
//   }
//   x.domain(Bardata.map(d => d.Name));
//   chart.update();
//   return order;
// }

// This function is called by the buttons on top of the plot
function changeColor(color) {
  d3.selectAll("rect")
    .transition()
    .duration(2000)
    .style("fill", color)
}