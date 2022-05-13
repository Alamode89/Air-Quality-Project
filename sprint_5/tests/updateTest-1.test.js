const update = require('./update');

rows = [ ['18.334399','-64.795972','Magnesium PM2.5 LC','Observed Values','1998','75','0.004226','0.02615','Virgin Islands','St John','San Francisco'], 
         ['24.192042','-32.123142','Chlorine','Observed Values','1998','75','0.004226','0.02615','San Mateo','St John','Not in a city']
       ]

//req1 = { "body": {"city_name": "San Francisco"}};

req1 = { "body": {"type": "city_name", "latitude": "", "longitude": "", "parameter_name" : "", "metric_used": "", "year": "", "observation_count": "", "arithmetic_mean": "", "arithmetic_standard_dev": "", "state_name": "", "city_name": "San Francisco"}};
req2 = { "body": {"type": "parameter_name", "latitude": "", "longitude": "", "parameter_name" : "", "metric_used": "", "year": "", "observation_count": "", "arithmetic_mean": "", "arithmetic_standard_dev": "", "state_name": "", "city_name": ""}};
req3 = { "body": {"type": "state_name", "latitude": "", "longitude": "", "parameter_name" : "", "metric_used": "", "year": "", "observation_count": "", "arithmetic_mean": "", "arithmetic_standard_dev": "", "state_name": "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", "city_name": ""}};
req4 = { "body": {"type": "latitude", "latitude": "a*91`2049.asd/0", "longitude": "", "parameter_name" : "", "metric_used": "", "year": "", "observation_count": "", "arithmetic_mean": "", "arithmetic_standard_dev": "", "state_name": "", "city_name": ""}};
req5 = { "body": {"type": "year", "latitude": "", "longitude": "", "parameter_name" : "", "metric_used": "", "year": "                        ", "observation_count": "", "arithmetic_mean": "", "arithmetic_standard_dev": "", "state_name": "", "city_name": ""}};

test('Update the city name from L.A. to San Francisco.', () => {
    expect(update.updateCity(req1, rows, 0)).toMatch('San Francisco');
});

test('Update parameter_name to an empty string', () => {
    expect(update.updateCity(req2, rows, 0)).toMatch('');
});

test('Check state_name to see if update can handle long strings.', () => {
    expect(update.updateCity(req3, rows, 1)).toMatch('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA');
});

test('Check to see if special characters are used', () => {
    expect(update.updateCity(req4, rows, 0)).toMatch('a*91`2049.asd/0');
}); 

test('Update year but it is a string full of spaces', () => {
    expect(update.updateCity(req5, rows, 0)).toMatch('                        ');
});
