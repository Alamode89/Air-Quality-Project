const { builtinModules } = require("module");

function graphReadCSV(rows, graphCity) {
  if (graphCity == "") {
    return []
  }

  let occurances = []
  for (var i = 0; i < rows.length; ++i) {
    if (graphCity.toLowerCase() == rows[i][10].toLowerCase()) {
      // DEBUG for graph 1
      //console.log("City:" + rows[i][10])
      occurances.push({"pollutant": rows[i][2], "arithmetic_mean": rows[i][6]})
    }
  }

  // DEBUG for graph 1
/*
  for (var i = 0; i < occurances.length; ++i) {
    console.log(occurances[i])
  }*/
  

  return occurances;
}

module.exports = {
  graphReadCSV
}