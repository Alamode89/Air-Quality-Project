//Packages: express, body-parser, ...
const parse = require("./utility/parseCSV");
const search = require("./utility/search");
const deleteEntry = require("./utility/deleteEntry");
const create = require("./utility/create")
const update = require("./utility/update")

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 1337;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// if user has not searched yet, this value will be passed into
// delete function and update function
var userHasSearched = false;
var searchStatus = {};


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


// CSV Parse
console.time("CSVParseTime");
let rows = [];
rows = parse.readCSVFile("final_data.csv");
console.log("Parsed " + rows.length + " rows.");
console.timeEnd("CSVParseTime");

// parser bug: last row is always blank, needs actual fix
rows.splice(rows.length-1, 1);
/*
console.log(rows[rows.length - 5])
console.log(rows[rows.length - 4])
console.log(rows[rows.length - 3])
console.log(rows[rows.length - 2])
console.log(rows[rows.length - 1])
*/


// delete a dataset entry
app.get('/api/delete', (req, res) => {
  // userHasSearched will be set to false again once entry has been deleted
  // requires user to search again in order to either delete or update entries
  userHasSearched = deleteEntry.deleteEntry(searchStatus, userHasSearched, rows);
  res.send({"status": "successfully deleted"});
})

app.post('/api/search', (req, res) => {
  console.log(req.body.city);
  searchStatus = search.searchCity(req.body.city, rows);
  if (Object.keys(searchStatus).length != 0) {
    console.log("Search Success" + searchStatus);
    // user has now used search, may enter the update and delete functions
    userHasSearched = true;
    res.send (
      searchStatus
    )
  }
  else {
    console.log("Search: Failed");
  }

});

app.post('/api/create', (req, res) => {
  var tempEntry = create.createEntry(req);
  console.log("Create Result: " + tempEntry)
  if (tempEntry.length == 0) {
    res.send({status: "failed"})
  }
  else {
    rows.push(tempEntry);
    res.send({status: "success"})
  }
  //console.log("Array size: " + rows.length)
});

app.post('/api/update', (req, res) => {
  console.log("updating: " + req.body.type);
  var serStatus = false;
  serStatus = update.updateCity(req, rows, searchStatus)
  
  if(serStatus == true) {
    console.log("Update successful!");
    res.send (
      "Success"
    )
  }
  else {
    console.log("Update Failed");
    res.send (
      "Failed"
    )
  }

})

app.listen(port, () => console.log(`Listening on port ${port}`));
