const { builtinModules } = require("module");
  
function createTop10Means(rows) {
    var tempArr = [];
    var obj = {};
    obj['pollutant'] = rows[0][2];
    //var stringtoInt = parseFloat(rows[0][6]);
    obj['arithmetic_mean'] = null;
    tempArr.push(obj);
    for ( let i = 1; i < rows.length; i++ ) {
        var indexFound = tempArr.findIndex((obj) => obj.pollutant === rows[i][2]);
        if (indexFound != -1){
            stringtoInt = parseFloat(rows[i][6]);
            tempArr[indexFound].arithmetic_mean = tempArr[indexFound].arithmetic_mean + stringtoInt;
        }
        else {
            if (rows[i][10] != "")
            {
                var obj = {};
                obj['pollutant'] = rows[i][2];
                stringtoInt = parseFloat(rows[i][6]);
                obj['arithmetic_mean'] = stringtoInt;
                tempArr.push(obj);
            }
        }
    }

    var obj = {};
    obj['pollutant'] = "filler";
    obj['arithmetic_mean'] = 6000000;
    tempArr.push(obj);
    tempArr.sort((a,b) => (a.arithmetic_mean < b.arithmetic_mean) ? 1 : ((b.arithmetic_mean < a.arithmetic_mean) ? -1 : 0))
    // for (let i = 0; i < tempArr.length; i++) {
    //     console.log(tempArr[i]);
    //     //console.log(tempArr[i]);
    // }
    
    return tempArr
}

module.exports = {
    createTop10Means
}