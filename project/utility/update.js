const { builtinModules } = require("module");

function updateCity(req, rows, searchStatus, userHasSearched) {
    var lastIndex = searchStatus.index;
    var tempIndex = -1;
    var tempStr = "";
    var status = false;

    if (userHasSearched) {
        if(req.body.type == "latitude" && req.body.latitude != '') {
            tempIndex = 0;
            tempStr = req.body.latitude;
        }
        else if(req.body.type == "longitude" && req.body.longitude != '') {
            tempIndex = 1;
            tempStr = req.body.longitude;
        }
        else if(req.body.type == "parameter_name" && req.body.parameter_name != '') {
            tempIndex = 2;
            tempStr = req.body.parameter_name;
        }
        else if(req.body.type == "metric_used" && req.body.metric_used != '') {
            tempIndex = 3;
            tempStr = req.body.metric_used;
        }
        else if(req.body.type == "year" && req.body.year != '') {
            tempIndex = 4;
            tempStr = req.body.year
        }
        else if(req.body.type == "observation_count" && req.body.observation_count != '') {
            tempIndex = 5;
            tempStr = req.body.observation_count;
        }
        else if(req.body.type == "arithmetic_mean" && req.body.arithmetic_mean != '') {
            tempIndex = 6;
            tempStr = req.body.arithmetic_mean;
        }
        else if(req.body.type == "arithmetic_standard_dev" && req.body.arithmetic_standard_dev != '') {
            tempIndex = 7;
            tempStr = req.body.arithmetic_standard_dev;
        }
        else if(req.body.type == "state_name" && req.body.state_name != '') {
            tempIndex = 8;
            tempStr = req.body.state_name;
        }
        else if(req.body.type == "county_name" && req.body.county_name != '') {
            tempIndex = 9;
            tempStr = req.body.county_name;
        }
        else if(req.body.type == "city_name" && req.body.city_name != '') {
            tempIndex = 10;
            tempStr = req.body.city_name;
        }
    }
    
    if(tempIndex != -1) {
        rows[lastIndex][tempIndex] = tempStr;
        status = true;
    }

    return status;
}

module.exports = {
    updateCity
}