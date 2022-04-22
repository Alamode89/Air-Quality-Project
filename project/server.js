//Packages: express, body-parser, ...
const parsecsv = require("./utility/parseCSV");
const search = require("./utility/search");
const deleteEntry = require("./utility/deleteEntry");

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
var fs = require("fs");
const path = require("path");
const port = process.env.PORT || 1337;
const { parse } = require("fast-csv");
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
rows = parsecsv.readCSVFile("final_data.csv");
console.log("Parsed " + rows.length + " rows.");
console.timeEnd("CSVParseTime");

// parser bug: last row is always blank, needs actual fix
rows.splice(rows.length - 1, 1);
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
    res.send({ "status": "successfully deleted" });
})

app.post('/api/search', (req, res) => {
    console.log(req.body.city);
    searchStatus = search.searchCity(req.body.city, rows);
    if (Object.keys(searchStatus).length != 0) {
        console.log("Search Success" + searchStatus);
        // user has now used search, may enter the update and delete functions
        userHasSearched = true;
        res.send(
            searchStatus
        )
    } else {
        console.log("Search: Failed");
    }

});
//API to fetch filename and return file data of that scpecific file
app.post("/api/import/csv", async(req, res) => {
    console.log(req.body);
    const result = [];
    await fs
        .createReadStream(path.resolve(`./${req.body.filename}.csv`))
        .pipe(parse({ maxRows: 50 }))
        .on("error", (error) => console.error({ error }))
        .on("data", (row) => {
            console.log({ row });
            result.push(row);
        })
        .on("end", (rowCount) => {
            console.timeEnd("Timer1");
            res.send({ result });

            console.log(`Parsed ${rowCount} rows`);
        });
});




app.listen(port, () => console.log(`Listening on port ${port}`));