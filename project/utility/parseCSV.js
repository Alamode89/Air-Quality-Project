const { builtinModules } = require("module");

function readCSVFile(fileName, lines) {
  var fs = require("fs");
  var textByLine = fs.readFileSync(fileName).toString().split("\n");
  //console.log(textByLine);
  //res returns array
  const res = textByLine.slice(0, lines).map((line) => line.split(","));
  //rows = res
  console.log(res)
  return res;
}

module.exports = {
  readCSVFile
}