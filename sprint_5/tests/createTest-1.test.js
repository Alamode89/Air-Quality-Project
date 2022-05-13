const create = require('./create');
//const addN = require('./helloJest');

req1 = { "body": {"latitude": "203", "longitude": "100", "parameter_name": "apple", "metric_used": "applebes", "year": "2002", "observation_count": "200", "arithmetic_mean": "200.2", "arithmetic_standard_dev": "212", "state_name": "kansas", "county_name": "lol", "city_name": "L.A."} }

req2 = { "body": {"latitude": "203", "longitude": "100", "parameter_name": "", "metric_used": "applebes", "year": "2002", "observation_count": "200", "arithmetic_mean": "200.2", "arithmetic_standard_dev": "212", "state_name": "kansas", "county_name": "lol", "city_name": "L.A."} }

req25 = { "body": {"latitude": "203", "longitude": "100","parameter_name": "", "metric_used": "applebes", "year": "", "observation_count": "200", "arithmetic_mean": "200.2", "arithmetic_standard_dev": "212", "state_name": "", "county_name": "lol", "city_name": "L.A."} }

req35 = { "body": {"latitude": "203", "longitude": "100", "metric_used": "applebes", "observation_count": "200", "arithmetic_mean": "200.2", "arithmetic_standard_dev": "212", "county_name": "lol", "city_name": "L.A."} }

req3 = { "body": {"latitude": "", "longitude": "", "parameter_name": "", "metric_used": "", "year": "", "observation_count": "", "arithmetic_mean": "", "arithmetic_standard_dev": "", "state_name": "", "county_name": "", "city_name": ""} }

test('All parameters filled to create a new row.', () => {
   expect(create.createEntry(req1)).toEqual(["203", "100", "apple", "applebes", "2002", "200", "200.2", "212", "kansas", "lol", "L.A."]);
});

test('Missing one parameter entry(parameter_name)', () => {
    expect(create.createEntry(req2)).toEqual([]);
});

test('Missing multiple parameter entries(parameter_name, year, state_name)', () => {
    expect(create.createEntry(req25)).toEqual([]);
});

test('Missing multiple parameter columns(parameter_name, year, state_name)', () => {
    expect(create.createEntry(req35)).toEqual([]);
});

test('Empty (Req)uest passed in', () => {
expect(create.createEntry(req3)).toEqual([]);
});