const { builtinModules } = require("module");

function readCSVFile(rows, graphCity) {
    if (graphCity == "") {
        return []
      }
    
      let occurances = []

      let temp1 = []
      for (var i = 0; i < rows.length; ++i) {
        if (graphCity.toLowerCase() == rows[i][10].toLowerCase()) {
        const obj = {
            name: rows[i][2],
            data: []
        }
          // DEBUG for graph 1
          //console.log("City:" + rows[i][10])
          //occurances.push({"pollutant": rows[i][2], "year": rows[i][4]})
        temp1.push(obj)
        if (temp1.length > 10) {
            break;
        }
        }
      }

      let temp2 = []
      jCount = 0
      
      loop1:
      for (var i = 0; i < temp1.length; ++i) {
          jCount = 0
          loop2:
          for (var j = 0; j < rows.length; ++j) {
              if (rows[j][2] == temp1[i].name) {
                  temp1[i].data.push(rows[j][5])
                  temp2.push(rows[i][4])
                  ++jCount
              }
              if (jCount > 10) {
                  //console.log(jCount)
                   break loop2;
              }
          }
      }
      
      //console.log(temp1)
      //console.log(temp2)
      //splice (start, deleteCount)
      //splicing since Year has "year" in first 21 spots
      temp2.splice(0, 12)
      console.log(temp2)
      occurances.push(temp1)
      occurances.push(temp2)
      //console.log(occurances)

/*
0: {name: "Dodge City", data: Array(21)}
First we can push all city names to name
Then double for loop to find all instances and grab observation count

const obj = {
    name: cities[i],
    data: []
}
obj.data.push(val)
*/

      //for (var i = 0; i < occurances[1].length; ++i) {
      //for (var i = 0; i < 10; ++i) {
        //if (graphCity.toLowerCase() == rows[i][10].toLowerCase()) {
          // DEBUG for graph 1
          //console.log("City:" + rows[i][10])
          //console.log(occurances[1][i].year + "YEE\n")
        //}
      //}
    
      // DEBUG for graph 1
    /*
      for (var i = 0; i < occurances.length; ++i) {
        console.log(occurances[i])
      }*/
      
    
      return occurances;
}

module.exports = {
    readCSVFile
}
