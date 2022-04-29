//Packages: express, body-parser, ...
const parse = require("./utility/parseCSV");
const search = require("./utility/search");
const deleteEntry = require("./utility/deleteEntry");
const create = require("./utility/create")
const update = require("./utility/update")
const backup = require("./utility/backup")
const graphParsing = require("./utility/graphParse")


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
    var deleteStatus;
    deleteStatus = deleteEntry.deleteEntry(searchStatus, userHasSearched, rows);
    userHasSearched = false;
    if (deleteStatus) {
        res.send({ "status" : "success" });
    } else {
        res.send({ "status" : "failed" })
    }
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
        res.send({ "status" : "failed" })
    }

});

app.post('/api/create', (req, res) => {
    var tempEntry = create.createEntry(req);
    console.log("Create Result: " + tempEntry)
    if (tempEntry.length == 0) {
        res.send({ status: "failed" })
    } else {
        rows.push(tempEntry);
        res.send({ status: "success" })
    }
    //console.log("Array size: " + rows.length)
});

app.post('/api/update', (req, res) => {
    console.log("Updating: " + req.body.type);
    var updateStatus = false;
    updateStatus = update.updateCity(req, rows, searchStatus, userHasSearched);

    if (updateStatus == true) {
        userHasSearched = false;
        console.log("Update successful!");
        res.send({ "status" : "success" });
    } else {
        console.log("Update Failed");
        res.send({ "status" : "failed" });
    }
})

app.get('/api/backup', (req, res) => {
    backup.createBackup('backupCSV.csv', rows);
    res.send({ "status" : "success" });
});

//import
app.post("/api/import/csv", async (req, res) => {
    console.log("filename: " + req.body.filename)
    rows = parse.readCSVFile(req.body.filename);
    if (rows.length != 0) {
        res.send({ "status" : "success" });
    } else {
        res.send({ "status" : "failed" });
    }
});

//for graphs limiting the data to 20 
app.post("/api/graph/data", async (req, res) => {
    //For graph api
    let graphData = [];
    graphData = graphParsing.graphReadCSV("final_data.csv", 20);
    res.send({ graphData });
});


app.listen(port, () => console.log(`Listening on port ${port}`));