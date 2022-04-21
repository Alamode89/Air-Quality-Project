const { builtinModules } = require("module");

function searchCity(cityName, rows) {
    var obj = {};
    console.log("Searching: " + cityName.toLowerCase())
    for (var i = 0; i < (rows.length - 1); ++i) {
        //console.log("City: " + rows[i][10])
        if (cityName.toLowerCase() == rows[i][10].toLowerCase()) {
            obj = {
                    latitude: rows[i][0], 
                    longitude: rows[i][1], 
                    parameter_name: rows[i][2], 
                    metric_used: rows[i][3],
                    year: rows[i][4],
                    observation_count: rows[i][5],
                    arithmetic_mean: rows[i][6],
                    arithmetic_standard_dev: rows[i][7],
                    state_name: rows[i][8],
                    county_name: rows[i][9],
                    city_name: rows[i][10]
                  }
            break;
        }
    }
    return obj;
}

module.exports = {
    searchCity
}