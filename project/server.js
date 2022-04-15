//Packages: express, body-parser
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 1337;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/test/get', (req, res) => {
    res.send({ express: 'YAHALLO! From Express Server' });
});

app.post('/test/post', (req, res) => {
    console.log(req.body);
    res.send(
        `GOT UR MESSAGE!! This is what you said to me: ${req.body.post}`,
    );
});

app.listen(port, () => console.log(`Listening on port ${port}`));

//------SPRINT 2------
const fs = require('fs');
const path = require('path');
const { parse } = require('fast-csv');
const { text } = require('body-parser');

/*
  latitude
  longitude
  parameter_name
  year
  */

let rows = [];
let columns = [undefined, undefined, undefined, undefined, undefined,
    "latitude", "longitude", undefined, 'parameter_name', undefined,
    undefined, undefined, undefined, "year", undefined,
    undefined, undefined, undefined, undefined, undefined,
    undefined, undefined, undefined, undefined, undefined,
    undefined, undefined, undefined, undefined, undefined,
    undefined, undefined, undefined, undefined, undefined,
    undefined, undefined, undefined, undefined, undefined,
    undefined, undefined, undefined, undefined, undefined,
    undefined, undefined, undefined, undefined, undefined,
    undefined, undefined, 'city_name', undefined, undefined
]

console.time("Timer1");
fs.createReadStream(path.resolve(__dirname, 'longassname.csv'))
    .pipe(parse({ headers: columns, maxRows: 70000 }))
    .on('error', error => console.error(error))
    .on('data', row => {
        console.log(row);
        rows.push(row);
    })
    .on('end', rowCount => {
        console.timeEnd("Timer1");
        console.log(`Parsed ${rowCount} rows`);
    });

/*
app.get('/test/iloveithere', (req, res) => {
  res.send({ "apple": "Wisconsin" });
});
*/

app.post('/test/iloveithere', (req, res) => {
  console.log(req.body.city);
  /*
  if (req.body.cityName == "Riverside") {
    res.send(
      `Correct: ${req.body.cityName}`,
    );
  }
  else {
    res.send(
      `You're dog`,
    );
  }
  */
  //var bruh = false
  for (var i = 0; i < rows.length; ++i) {
    if (req.body.city == rows[i].city_name) {
      //bruh = true
      res.send(
        //`Pollutant: ${rows[i].parameter_name}`
        {latitude: rows[i].latitude, longitude: rows[i].longitude, parameter_name: rows[i].parameter_name, year: rows[i].year}
      )
      break;
    }
  } 

  
});