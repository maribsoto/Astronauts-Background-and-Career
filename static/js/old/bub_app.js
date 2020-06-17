var space_flight_data = "api/v1.0/bubble";

d3.json(space_flight_data).then(function(data) {

  console.log(data);

  var group_number = data.map((group) => group.Group_number);

  var space_flight_hr = data.map((hour) => hour.Space_Flight_hr);

  var astronaut_names = data.map((name) => name.Name);

  var data = [{
    x: space_flight_hr,
    y: group_number,
    text: astronaut_names,
    mode: "markers",
    marker: {
      size: group_number,
      color: group_number
    }
  }];

  var layout = {
    title: "Astronaut Group Number vs Space Flight Hour",
    hovermode: "closest",
    height: 800,
    width: 1500,
    xaxis: { title: "Space Flight Hours (hr)"},
    yaxis: { title: "Group Number"}
  };

  Plotly.newPlot("bubble", data, layout);

});



