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
      color: group_number,
      line: {color: 'rgb(148,56,56)'}
    }
  }];

  var layout = {
    title: "<b>Astronaut Group Number vs Space Flight Hour<b>",
    hovermode: "closest",
    height: 800,
    width: 1500,
    titlefont:{family: 'Comfortaa',
        size:28},
    font: {family: 'Comfortaa',
        size: 18,
        color: "white"},
    plot_bgcolor:"rgb(16, 9, 48)",
    paper_bgcolor:"rgb(16, 9, 48)",
    xaxis: { title: "Space Flight Hours"},
    yaxis: { title: "Group Number"}
  };

  Plotly.newPlot("bubble", data, layout);

});



