const deleteEntry = require('../utility/deleteEntry');
const parse = require('../utility/parseCSV');

var rows = parse.readCSVFile("../final_data.csv");
var rowsSize = rows.length;


searchStatus1 = {"latitude": "0", "longitude": "0", "parameter_name": "pollutant", "metric_used": "PPM", "year": "2001", "observation_count": "200", "arithmetic_mean": "200.2", "arithmetic_standard_dev": "212", "state_name": "california", "county_name": "orange", "city_name": "L.A.", "index": "3"}

searchStatus2 = {"latitude": "0", "longitude": "0", "parameter_name": "pollutant", "metric_used": "PPM", "year": "2001", "observation_count": "200", "arithmetic_mean": "200.2", "arithmetic_standard_dev": "212", "state_name": "california", "county_name": "orange", "city_name": "L.A.", "index": "-1"}

searchStatus3 = {"latitude": "0", "longitude": "0", "parameter_name": "pollutant", "metric_used": "PPM", "year": "2001", "observation_count": "200", "arithmetic_mean": "200.2", "arithmetic_standard_dev": "212", "state_name": "california", "county_name": "orange", "city_name": "L.A.", "index": "10000000000"}

searchStatus4 = {"latitude": "0", "longitude": "0", "parameter_name": "pollutant", "metric_used": "PPM", "year": "2001", "observation_count": "200", "arithmetic_mean": "200.2", "arithmetic_standard_dev": "212", "state_name": "california", "county_name": "orange", "city_name": "L.A.", "index": "M"}

searchStatus5 = {"latitude": "0", "longitude": "0", "parameter_name": "pollutant", "metric_used": "PPM", "year": "2001", "observation_count": "200", "arithmetic_mean": "200.2", "arithmetic_standard_dev": "212", "state_name": "california", "county_name": "orange", "city_name": "L.A.", "index": ""}


test('All parameters filled to delete an entry', () => {
    expect(deleteEntry.deleteEntry(searchStatus1, true, rows).length).toEqual(rowsSize-1)
});

test('Repeating test 1, expect a total of two entries to be deleted after running this test', () => {
    expect(deleteEntry.deleteEntry(searchStatus1, true, rows).length).toEqual(rowsSize-2)
});

test('All parameters filled to delete an entry, but user has not searched', () => {
    expect(deleteEntry.deleteEntry(searchStatus1, false, rows).length).toEqual(rowsSize-2)
});

test('Out of bounds index (-1) should not delete anything', () => {
    expect(deleteEntry.deleteEntry(searchStatus2, true, rows).length).toEqual(rowsSize-2)
});

test('Out of bounds index (large value) should not delete anything', () => {
    expect(deleteEntry.deleteEntry(searchStatus3, true, rows).length).toEqual(rowsSize-2)
});

test('Garbage index should not delete anything', () => {
    expect(deleteEntry.deleteEntry(searchStatus4, true, rows).length).toEqual(rowsSize-2)
});

test('Null index value should not delete anything', () => {
    expect(deleteEntry.deleteEntry(searchStatus5, true, rows).length).toEqual(rowsSize-2)
});