
// The code for the Horizontal Bar Chart  is wrapped inside a function

// Store width and height parameters and store margins 

var margin = { top: 80, right: 30, bottom: 40, left: 400 },
    width = 1600 - margin.left - margin.right,
    height = 6600 - margin.top - margin.bottom;

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

// Initial Params
var chosenXAxis = "flight_hr";

// function used for updating x-scale var upon click on axis label
function xScale(Bardata, chosenXAxis) {
    // create scales
    var xLinearScale = d3.scaleLinear()
        .domain([d3.min(Bardata, d => d[chosenXAxis]) * 0.8,
        d3.max(Bardata, d => d[chosenXAxis]) * 1.2
        ])
        .range([0, width]);

    return xLinearScale;

}

//function used for updating xAxis var upon click on axis label
function renderAxesX(newXScale, xAxis) {
    var bottomAxis = d3.axisBottom(newXScale);

    xAxis.transition()
        .duration(1000)
        .call(bottomAxis);

    return xAxis;
}

// function used for updating rectangles group with a transition to
// new rectangles
function renderRect(svg, newXScale, chosenXAxis) {

    svg.transition()
        .duration(1000)
        .attr("cx", d => newXScale(d[chosenXAxis]));

    return svg;
}

// Retrieve data from the SQLite Database and execute everything below

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
        .offset([30, -20])
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
        .attr("transform", "translate(0,-30)")
        .call(d3.axisBottom(x))
        .selectAll("text")
            .attr("font-size", "16px")
            .attr("fill", "white")
            //.attr("transform", "translate(30,-10)")
            .style("text-anchor", "end")
            .style("stroke", "white")
            .attr("class", "axisText")
            
    
    // now add titles to the axes
    svg.append("text")
        .attr("text-anchor", "middle")  // this makes it easy to centre the text as the transform is applied to the anchor
        .attr("transform", "translate(-500, -300)rotate(-90)") // text is drawn off the screen top left, move down and out and rotate
        .attr("x", 0 - (height / 2))
        .attr("class", "axisText")
        .text("Space Flight Hours (hr)");

    // Y axis
    var y = d3.scaleBand()
        .range([0, height])
        .domain(Bardata.map(function (d) { return d.Name; }))
        .padding(.2);


    svg.append("g")
        .call(d3.axisLeft(y))
        .selectAll("text")
        .attr("font-size", "15px")
        .attr("fill", "white");
    
    // Create axes labels
        //svg.append("text")
        // .attr("transform", "rotate(-90)")
        // .attr("y", 0 - margin.left + 40)
        // .attr("x", 0 - (height / 2))
        // .attr("class", "axisText")
        // .text("Space Flight Hours (hr)");

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
        .on("mouseenter", toolTip.show)
        .on("mouseover", mouseover)
        .on("mouseleave", toolTip.hide)
        .on("mouseout", mouseout);

    d3.transition(svg).select(".y.axis")
        .transition()
        .duration(1000)
        .delay(750)
        .call(y);

    function mouseover() {
        d3.select(this).attr("opacity", .5);

    }

    function mouseout() {
        d3.select(this).attr("opacity", 1);
    }
})

// This function is called by the buttons on top of the plot
function changeColor(color) {
    d3.selectAll("rect")
        .transition()
        .duration(2000)
        .style("fill", color)
}