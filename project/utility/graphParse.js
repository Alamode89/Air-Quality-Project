const { builtinModules } = require("module");

/*
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
  return occurances;
}
*/

function graphReadCSV(rows, graphCity) {
    var tempArr = [];
    var obj = {};
    obj['pollutant'] = rows[0][2];
    obj['arithmetic_mean'] = null;
    obj['count'] = 1;
    tempArr.push(obj);
    for ( let i = 1; i < rows.length; i++ ) {
      if (graphCity == rows[i][10]) {
        var indexFound = tempArr.findIndex((obj) => obj.pollutant === rows[i][2]);
        if (indexFound != -1){
            stringtoInt = parseFloat(rows[i][6]);
            tempArr[indexFound].arithmetic_mean = tempArr[indexFound].arithmetic_mean + stringtoInt;
            tempArr[indexFound].count = tempArr[indexFound].count + 1;
        }
        else {
          if (rows[i][10] != "")
          {
              var obj = {};
              obj['pollutant'] = rows[i][2];
              stringtoInt = parseFloat(rows[i][6]);
              obj['arithmetic_mean'] = stringtoInt;
              obj['count'] = 1;
              tempArr.push(obj);
          }
        }
      }
    }

    /*
    var obj = {};
    obj['pollutant'] = "filler";
    obj['arithmetic_mean'] = 6000000;
    obj['count'] = 0;
    tempArr.push(obj);
    */
    //tempArr.sort((a,b) => (a.arithmetic_mean < b.arithmetic_mean) ? 1 : ((b.arithmetic_mean < a.arithmetic_mean) ? -1 : 0))
    
    for (let i = 0; i < tempArr.length; i++) {
        tempArr[i].arithmetic_mean = tempArr[i].arithmetic_mean / tempArr[i].count;
        console.log(tempArr[i].pollutant + ":" + tempArr[i].arithmetic_mean + "," + tempArr[i].count)
    }

    
    tempArr.sort((a,b) => (a.arithmetic_mean < b.arithmetic_mean) ? 1 : ((b.arithmetic_mean < a.arithmetic_mean) ? -1 : 0))
    console.log(tempArr)
    
    return tempArr
}

module.exports = {
  graphReadCSV
}



