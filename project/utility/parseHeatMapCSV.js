const { builtinModules } = require("module");

function readCSVFile(fileName, lines) {
    var fs = require("fs");
    var textByLine = fs.readFileSync(fileName).toString().split("\n");
    //console.log(textByLine);
    //res returns array with 1 to 500000, 0 excluded beacause it has column name only
    const res = textByLine.slice(1, lines).map((line) => line.split(","));
    //rows = res
    // console.log(res)
    return res;
}

module.exports = {
    readCSVFile
}
