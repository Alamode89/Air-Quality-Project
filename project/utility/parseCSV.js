const { builtinModules } = require("module");

function readCSVFile(fileName) {
  var fs = require("fs");
  var res = [];

  // if the file actually exists, then we parse
  if(fs.existsSync(fileName)) {
    console.log("File \"" + fileName + "\" exists. Parsing.");
    var textByLine = fs.readFileSync(fileName).toString().split("\n");
    //console.log(textByLine);
    //res returns array
    res = textByLine.map((line) => line.split(","));
    //rows = res
    // parser bug: last row is always blank, needs actual fix
    res.splice(res.length - 1, 1);
    console.log(res);
  } else {
    console.log("File " + fileName + " does not exist. Returning empty array.");
  }
  return res;
}

module.exports = {
    readCSVFile
}
