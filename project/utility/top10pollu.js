const { builtinModules } = require("module");

function createTop10Polltuant(rows) {
    var tempArr = [];
    let num = 0;
    var obj = {};
    obj['parameter_name'] = rows[0][2];
    obj['num'] = 0;
    tempArr.push(obj);
    for ( let i = 1; i < rows.length; i++ ) {
        var indexFound = tempArr.findIndex((obj) => obj.parameter_name === rows[i][2]);
        if (indexFound != -1){
            tempArr[indexFound].num = tempArr[indexFound].num + 1 || 1;
        }
        else {
            var obj = {};
            obj['parameter_name'] = rows[i][2];
            obj['num'] = 1;
            tempArr.push(obj);
        }
    }
    var obj = {};
    obj['parameter_name'] = "filler";
    obj['num'] = 180000;
    tempArr.push(obj);
    tempArr.sort((a,b) => (a.num < b.num) ? 1 : ((b.num < a.num) ? -1 : 0))
    // for (let i = 0; i < tempArr.length; i++) {
    //     console.log(tempArr[i]);
    //     //console.log(tempArr[i]);
    // }
    
    return tempArr
}

module.exports = {
    createTop10Polltuant
}