var dataTruth;
function metadata() {

  var url = "/api/v1.0/metadata";

  d3.json(url).then(function(data) {
    dataTruth = data
    d3.select("tbody")
      .selectAll("tr")
      .data(data)
      .enter()
      .append("tr")
      .html(function(d) {
        return `<td>${d.Name}</td><td>${d.Status}</td><td>${d.Birth_Date}</td><td>${d.Undergraduate_Major}</td><td>${d.Graduate_Major}</td><td>${d.Military_Rank}</td><td>${d.Mission_One}</td><td>${d.Mission_Two}</td><td>${d.Mission_Three}</td><td>${d.Mission_Four}</td>`
      });
});

}

var filters = {};

// function updateFilters() {

//   var changedElement = d3.selectAll("input");
//   changedElement.each(()=>{

//     var elementValue = this.value;
//     console.log(elementValue)
//     var filterId = d3.select(this).attr('id');
//     console.log(filterId)
//     if (elementValue) {
//       filters[filterId] = elementValue;
//     }
//     else {
//       delete filters[filterId];
//     }
    
//   })
//   // console.log(filters)
//   filterTable();
// }

function filterTable(data) {

  // var url = "/api/v1.0/metadata";

  // d3.json(url).then(function(data) {

    var filteredData = data;
    
    for (let [key,value] of Object.entries(filters)) {
      console.log(key, value)
      filteredData = filteredData.filter(row => row[key] ===value);
    };
    
    console.log(filteredData)

    tbody = d3.select("table tbody")
    tbody.html("")
    tbody
      .selectAll("tr")
      .data(filteredData)
      .enter()
      .append("tr")
      .html(function(d) {
        return `<td>${d.Name}</td><td>${d.Status}</td><td>${d.Birth_Date}</td><td>${d.Undergraduate_Major}</td><td>${d.Graduate_Major}</td><td>${d.Military_Rank}</td><td>${d.Mission_One}</td><td>${d.Mission_Two}</td><td>${d.Mission_Three}</td><td>${d.Mission_Four}</td>`
      });

}

// d3.select("#filter-btn").on("click", updateFilters);

metadata();

d3.selectAll("input").on("change", function(){
  filters[d3.select(this).attr('id')]=this.value;
  filterTable(dataTruth);
  console.log(filters)})



// console.log(this.value), console.log(d3.select(this).attr('id'))



