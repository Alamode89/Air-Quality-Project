  const { builtinModules } = require("module");

  function readCSVFile(fileName) {
    var fs = require("fs");
    var textByLine = fs.readFileSync(fileName).toString().split("\n");
    //console.log(textByLine);
    //res returns array
    const res = textByLine.map((line) => line.split(","));
    //rows = res
    console.log(res)
    return res;
  }

  module.exports = {
      readCSVFile
  }