const { builtinModules } = require("module");

function createEntry(req) {
    let tempArr = [];
    if (req.body.latitude == '' || req.body.longitude == '' || req.body.parameter_name == '' || req.body.metric_used == '' || req.body.year == '' || req.body.observation_count == '' || req.body.arithmetic_mean == '' ||
    req.body.arithmetic_standard_dev == '' || req.body.state_name == '' || req.body.county_name == '' || req.body.city_name == '') {
        return tempArr;
    }
    tempArr.push(req.body.latitude)
    tempArr.push(req.body.longitude)
    tempArr.push(req.body.parameter_name)
    tempArr.push(req.body.metric_used)
    tempArr.push(req.body.year)
    tempArr.push(req.body.observation_count)
    tempArr.push(req.body.arithmetic_mean)
    tempArr.push(req.body.arithmetic_standard_dev)
    tempArr.push(req.body.state_name)
    tempArr.push(req.body.county_name)
    tempArr.push(req.body.city_name)
    /*return [
    '39.758855',
    '-86.115415',
    'trans-13-Dichloropropene',
    'Observed Values',
    '2004',
    '50',
    '0.01',
    '0.036422',
    'Indiana',
    'Marion',
    'Indianapolis (Remainder)'
  ]
  */
    return tempArr
}

module.exports = {
    createEntry
}