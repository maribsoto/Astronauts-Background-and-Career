var pie_data_gender = "api/v1.0/gender";

var count_male = 0;

var count_female = 0;


d3.json(pie_data_gender).then(function(data) {

  var gender = data.map((gender) => gender.Gender);

  for (var i = 0; i < gender.length; i++) {

    if (gender[i] == "Male") {
      count_male += 1;
    }

    else {
      count_female += 1;
    }
  }

var gender = ["Male", "Female"];

var count_gender = [count_male, count_female];

var data = [{
  values: count_gender,
  labels: gender,
  type: "pie",
}];

var layout = {
  height: 550,
  width: 650,
  font: {size:18}
};

Plotly.newPlot("bar-plot1", data, layout);

});

var military_branch = "api/v1.0/branch";

var count_civilian = 0;

var count_US_Army = 0;

var count_US_AirForce = 0;

var count_US_Marine = 0;

var count_US_Navy = 0;

var count_US_Coast_Guard = 0;

d3.json(military_branch).then(function(data) {

  var military_branch = data.map((branch) => branch.Military_Branch);

  console.log(military_branch);

  for (var i = 0; i < military_branch.length; i++) {

    if (military_branch[i].startsWith("Civilian")) {
      
      count_civilian += 1;
    }

    else if (military_branch[i].startsWith("US Navy")) {

      count_US_Navy += 1;
    }

    else if (military_branch[i].startsWith("US Army")) {

      count_US_Army += 1;
    }

    else if (military_branch[i].startsWith("US Air Force")) {

      count_US_AirForce += 1;
    }

    else if (military_branch[i].startsWith("US Marine")) {

      count_US_Marine += 1;
    }

    else {

      count_US_Coast_Guard += 1;
    }
  }
var branch = ["Civilian", "US Navy", "US Army", "US Air Force", "US Marine", "US Coast Guard"];

var count_branch = [count_civilian, count_US_Navy, count_US_Army, count_US_AirForce, count_US_Marine, count_US_Coast_Guard];

var data2 = [{
  values: count_branch,
  labels: branch,
  type: "pie",
}];

var layout2 = {
  height: 550,
  width: 650,
  font: {size:18}  
};

Plotly.newPlot("bar-plot2", data2, layout2);
});







