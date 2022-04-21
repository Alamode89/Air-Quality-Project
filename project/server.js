//Packages: express, body-parser, ...
const parse = require("./utility/parseCSV");
const search = require("./utility/search");

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 1337;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// CSV Parse
console.time("CSVParseTime");
let rows = [];
rows = parse.readCSVFile("final_data.csv");
console.log("Parsed " + rows.length + " rows.");
console.timeEnd("CSVParseTime");

// API Endpoints
app.get('/test/get', (req, res) => {
    res.send({ express: 'YAHALLO! From Express Server' });
});

app.post('/test/post', (req, res) => {
    console.log(req.body);
    res.send(
        `GOT UR MESSAGE!! This is what you said to me: ${req.body.post}`,
    );
});


app.post('/api/search', (req, res) => {
  console.log(req.body.city);
  var searchStatus = {};
  searchStatus = search.searchCity(req.body.city, rows);
  if (Object.keys(searchStatus).length != 0) {
    console.log("Search Success" + searchStatus);
    res.send (
      searchStatus
    )
  }
  else {
    console.log("Search: Failed");
  }

});




app.listen(port, () => console.log(`Listening on port ${port}`));
