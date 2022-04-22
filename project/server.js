//Packages: express, body-parser, ...
const parsecsv = require("./utility/parseCSV");
const search = require("./utility/search");
var fs = require("fs");
var path = require("path");
const { parse } = require("fast-csv");
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 1337;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// CSV Parse
console.time("CSVParseTime");
let rows = [];
rows = parsecsv.readCSVFile("final_data.csv");
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
        .createReadStream(path.resolve(`./public/${req.body.filename}.csv`))
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