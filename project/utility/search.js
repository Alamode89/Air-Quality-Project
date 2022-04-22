const { builtinModules } = require("module");

function searchCity(cityName, rows) {
    var obj = {};
    console.log("Searching: " + cityName.toLowerCase());

    // look for user query city name in the rows 2d array
    var indexFound = rows.findIndex((element) => element[10].toLowerCase() === cityName.toLowerCase());

    if (indexFound != -1) {
        obj = {
                latitude: rows[indexFound][0], 
                longitude: rows[indexFound][1], 
                parameter_name: rows[indexFound][2], 
                metric_used: rows[indexFound][3],
                year: rows[indexFound][4],
                observation_count: rows[indexFound][5],
                arithmetic_mean: rows[indexFound][6],
                arithmetic_standard_dev: rows[indexFound][7],
                state_name: rows[indexFound][8],
                county_name: rows[indexFound][9],
                city_name: rows[indexFound][10],
                index: indexFound
          }
    }
    return obj;
}

module.exports = {
    searchCity
}