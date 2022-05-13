//Packages: express, body-parser, ...
const parseHeatMap = require("./utility/parseHeatMapCSV");
const parse = require("./utility/parseCSV");
const search = require("./utility/search");
const deleteEntry = require("./utility/deleteEntry");
const create = require("./utility/create")
const update = require("./utility/update")
const backup = require("./utility/backup")
const graphParsing = require("./utility/graphParse")
const graphTop10Pollutant = require("./utility/top10pollu")
const graphTop10Cities = require("./utility/top10cities")
const graphTop10Mean = require("./utility/top10mean")
const searchforPollutant = require("./utility/searchPollutant")
const searchforCity = require("./utility/searchCity")
const searchforPolluMean = require("./utility/searchPollutantMean")

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
var graphCity = "";
var pollutantsCache = []
var citiesCache = []
var meansCache = []
// true indicates that the user has modified rows
// as a result we must update the top 10 cities, pollutants, means, and heatmap again
var cacheNotUpdated = [true, true, true, true]

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

/*
console.log(rows[rows.length - 5])
console.log(rows[rows.length - 4])
console.log(rows[rows.length - 3])
console.log(rows[rows.length - 2])
console.log(rows[rows.length - 1])
*/

// DEBUG for graph 1
//graphParsing.graphReadCSV(rows, "riverside")


// delete a dataset entry
app.get('/api/delete', (req, res) => {
    // userHasSearched will be set to false again once entry has been deleted
    // requires user to search again in order to either delete or update entries
    time("DeleteTime");
    var deleteStatus;
    deleteStatus = deleteEntry.deleteEntry(searchStatus, userHasSearched, rows);
    userHasSearched = false;
    if (deleteStatus) {
        for (let i = 0; i < cacheNotUpdated.length; i++) {
            cacheNotUpdated[i] = true;
        }
        res.send({ "status" : ["success", timeEnd("DeleteTime")] });
    } else {
        res.send({ "status" : ["failed", timeEnd("DeleteTime")] });
    }
})

app.post('/api/search', (req, res) => {
    time("SearchTime");
    console.log(req.body.city);
    searchStatus = search.searchCity(req.body.city, rows);
    if (Object.keys(searchStatus).length != 0) {
        graphCity = req.body.city;
        console.log("Search Success" + searchStatus);
        // user has now used search, may enter the update and delete functions
        userHasSearched = true;
        res.send(
            [searchStatus, timeEnd("SearchTime")]
        );
    } else {
        res.send({ "status" : ["failed", timeEnd("SearchTime")] });
    }
});

app.post('/api/create', (req, res) => {
    time("CreateTime");
    var tempEntry = create.createEntry(req);
    console.log("Create Result: " + tempEntry);
    if (tempEntry.length == 0) {
        res.send({ status: ["failed", timeEnd("CreateTime")] });
    } else {
        for (let i = 0; i < cacheNotUpdated.length; i++) {
            cacheNotUpdated[i] = true;
        }
        rows.push(tempEntry);
        res.send({ status: ["success", timeEnd("CreateTime")] });
    }
    //console.log("Array size: " + rows.length)
});

app.post('/api/update', (req, res) => {
    time("UpdateTime");
    console.log("Updating: " + req.body.type);
    var updateStatus = false;
    updateStatus = update.updateCity(req, rows, searchStatus, userHasSearched);

    if (updateStatus == true) {
        userHasSearched = false;
        for (let i = 0; i < cacheNotUpdated.length; i++) {
            cacheNotUpdated[i] = true;
        }
        console.log("Update successful!");
        res.send({ "status" : ["success", timeEnd("UpdateTime")] });
    } else {
        console.log("Update Failed");
        res.send({ "status" : ["failed", timeEnd("UpdateTime")] });
    }
})

app.get('/api/backup', (req, res) => {
    time("BackupTime");
    backup.createBackup('backupCSV.csv', rows);
    res.send({ "status" : ["success", timeEnd("BackupTime")] });
});

//import
app.post("/api/import/csv", async (req, res) => {
    time("ImportTime");
    console.log("filename: " + req.body.filename)
    let testArr = parse.readCSVFile(req.body.filename);
    console.log(testArr)
    if (testArr.length != 0) {
        rows = testArr;
        res.send({ "status" : ["success", timeEnd("BackupTime")] });
    } else {
        res.send({ "status" : ["failed", timeEnd("BackupTime")] });
    }
});

//for graphs limiting the data to 20 
app.post("/api/graph/data", async (req, res) => {
    //For graph api
    /*
    let graphData = [];
    graphData = graphParsing.graphReadCSV("final_data.csv", 20);
    res.send({ graphData });
    */
   let graphData = [];
   // DEBUG for graph 1
   graphData = graphParsing.graphReadCSV(rows, graphCity)
   //splice just cuts
   graphData = graphData.splice(0,11);
   console.log(graphData)
   //graphData = graphParsing.graphReadCSV(rows, graphCity)

   if (graphData.length == 0) {
       res.send( "failed" )
   }
   else {
    res.send({ graphData })
   }
});

//top10pollutant
var saving = [];
app.post("/api/graph/top10pollutants", async (req, res) => {
    if (cacheNotUpdated[0]) {
        cacheNotUpdated[0] = false;
        let graphTopPollutants = [];
        graphTopPollutants = graphTop10Pollutant.createTop10Pollutant(rows);
        saving = graphTopPollutants;
        graphTopPollutants = graphTopPollutants.slice(0, 11);
        pollutantsCache = graphTopPollutants;
    }
    console.log(pollutantsCache);
    res.send({ pollutantsCache });
});

var addPollutantCache = [];
app.post("/api/graph/addPollutant", async (req, res) => {
    addPollutantCache = searchforPollutant.searchPollutant(req.body.pollutantName, addPollutantCache,saving);
    console.log(addPollutantCache);
    res.send({ addPollutantCache });
});

//top10cities
var saving2 = [];
app.post("/api/graph/top10cities", async (req, res) => {
    if (cacheNotUpdated[1]) {
        cacheNotUpdated[1] = false;
        let graphTopCities = [];
        graphTopCities = graphTop10Cities.createTop10Cities(rows);
        saving2 = graphTopCities;
        graphTopCities = graphTopCities.slice(0, 11);
        citiesCache = graphTopCities;
    }
    console.log(citiesCache);
    res.send({ citiesCache });
});

var addCityCache = [];
app.post("/api/graph/addTopCities", async (req, res) => {
    addCityCache = searchforCity.searchCity(req.body.cityName, addCityCache , saving2);
    console.log(addCityCache);
    res.send({ addCityCache });
});


//top10poluMean
var saving3 = [];
app.post("/api/graph/top10mean", async (req, res) => {
    if (cacheNotUpdated[2]) {
        cacheNotUpdated[2] = false;
        let graphTopMean = [];
        graphTopMean = graphTop10Mean.createTop10Means(rows);
        saving3 = graphTopMean;
        graphTopMean = graphTopMean.slice(0, 11);
        meansCache = graphTopMean
    }
    console.log(meansCache);
    res.send({ meansCache });
});

var addPolluMeanCache = [];
app.post("/api/graph/addTopPolluMean", async (req, res) => {
    addPolluMeanCache = searchforPolluMean.searchPolluMean(req.body.polluName, addPolluMeanCache , saving3);
    console.log(addPolluMeanCache);
    res.send({ addPolluMeanCache });
});


app.get("/api/graph/empty", async (req, res) => {
    addPollutantCache.length = 0;
})

app.get("/api/graph/empty2", async (req, res) => {
    addCityCache.length = 0;
})

app.get("/api/graph/empty3", async (req, res) => {
    addPolluMeanCache.length = 0;
})

//API end point for heat map
app.post("/api/heatmap/data", async (req, res) => {
    let testArr = []
    if (cacheNotUpdated[3]) {
        cacheNotUpdated[3] = false;
        testArr = parseHeatMap.readCSVFile('final_data.csv', 500000);
    }
    //500000 lines data will be returned
    if (testArr.length != 0) {
        rows = testArr;
        res.send({ rows });
    } else {
        res.send({ "status": "failed" });
    }
});

app.listen(port, () => console.log(`Listening on port ${port}`));
