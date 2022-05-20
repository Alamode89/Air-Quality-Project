//Packages: express, body-parser, ...
const parseHeatMap = require("./utility/parseHeatMapCSV");
const parseHeatMap2 = require("./utility/parseHeatMapCSV2");
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
var graphData = []
// true indicates that the user has modified rows
// as a result we must update the top 10 cities, pollutants, means, and heatmap again
var cacheNotUpdated = [true, true, true, true, true]

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
let staticHeatMap = {};
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
    var start = performance.now();
    var deleteStatus;
    deleteStatus = deleteEntry.deleteEntry(searchStatus, userHasSearched, rows);
    userHasSearched = false;
    var end = performance.now();
    var total = (end-start).toString().slice(0,6);
    total += " ms"
    if (deleteStatus) {
        for (let i = 0; i < cacheNotUpdated.length; i++) {
            cacheNotUpdated[i] = true;
        }
        res.send(["success", total] );
    } else {
        res.send(["failed", total] );
    }
})

app.post('/api/search', (req, res) => {
    var start = performance.now();
    console.log(req.body.city);
    searchStatus = search.searchCity(req.body.city, rows);
    var end = performance.now();
    var total = (end-start).toString().slice(0,6);
    //var total = Number((end-start).toString().slice(0,6));
    /*
    const a = 1517778188788;
    const str_a = a.toString();
    const result = Number(str_a.slice(0, 6));
    */
    total += " ms"
    if (Object.keys(searchStatus).length != 0) {
        graphCity = req.body.city;
        console.log("Search Success" + searchStatus);
        // user has now used search, may enter the update and delete functions
        userHasSearched = true;
        res.send(
            [searchStatus, total]
        );
    } else {
        res.send(["failed", total] );
    }
});

app.post('/api/create', (req, res) => {
    var start = performance.now();
    var tempEntry = create.createEntry(req);
    console.log("Create Result: " + tempEntry);
    var end = performance.now();
    var total = (end-start).toString().slice(0,6);
    total += " ms"
    if (tempEntry.length == 0) {
        res.send(["failed", total] );
    } else {
        for (let i = 0; i < cacheNotUpdated.length; i++) {
            cacheNotUpdated[i] = true;
        }
        rows.push(tempEntry);
        res.send(["success", total] );
    }
    //console.log("Array size: " + rows.length)
});

app.post('/api/update', (req, res) => {
    var start = performance.now();
    console.log("Updating: " + req.body.type);
    var updateStatus = false;
    updateStatus = update.updateCity(req, rows, searchStatus, userHasSearched);
    var end = performance.now();
    var total = (end-start).toString().slice(0,6);
    total += " ms"
    if (updateStatus == true) {
        userHasSearched = false;
        for (let i = 0; i < cacheNotUpdated.length; i++) {
            cacheNotUpdated[i] = true;
        }
        console.log("Update successful!");
        res.send(["success", total] );
    } else {
        console.log("Update Failed");
        res.send(["failed", total] );
    }
})

app.get('/api/backup', (req, res) => {
    var start = performance.now();
    backup.createBackup('backupCSV.csv', rows);
    var end = performance.now();
    var total = (end-start).toString().slice(0,6);
    total += " ms"
    res.send(["success", total] );
});

//import
app.post("/api/import/csv", async (req, res) => {
    var start = performance.now();
    console.log("filename: " + req.body.filename)
    let testArr = parse.readCSVFile(req.body.filename);
    console.log(testArr)
    var end = performance.now();
    var total = (end-start).toString().slice(0,6);
    total += " ms"
    if (testArr.length != 0) {
        rows = testArr;
        res.send(["success", total] );
    } else {
        res.send(["failed", total] );
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
   graphData = graphData.slice(0, 11);
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
var reset1 = [];
app.post("/api/graph/top10pollutants", async (req, res) => {
    if (cacheNotUpdated[0]) {
        cacheNotUpdated[0] = false;
        let graphTopPollutants = [];
        graphTopPollutants = graphTop10Pollutant.createTop10Pollutant(rows);
        saving = graphTopPollutants;
        reset1 = graphTopPollutants.slice(0, 11);
        graphTopPollutants = graphTopPollutants.slice(0, 11);
        pollutantsCache = graphTopPollutants;
    }
    console.log(pollutantsCache);
    res.send({ pollutantsCache });
});

// var addPollutantCache = [];
app.post("/api/graph/addPollutant", async (req, res) => {
    pollutantsCache = searchforPollutant.searchPollutant(req.body.pollutantName, pollutantsCache, saving);
    console.log(pollutantsCache);
    res.send({ pollutantsCache });
});

//top10cities
var saving2 = [];
var reset2 = [];
app.post("/api/graph/top10cities", async (req, res) => {
    if (cacheNotUpdated[1]) {
        cacheNotUpdated[1] = false;
        let graphTopCities = [];
        graphTopCities = graphTop10Cities.createTop10Cities(rows);
        saving2 = graphTopCities;
        reset2 = graphTopCities.slice(0, 11);
        graphTopCities = graphTopCities.slice(0, 11);
        citiesCache = graphTopCities;
    }
    console.log(citiesCache);
    res.send({ citiesCache });
});

// var addCityCache = [];
app.post("/api/graph/addTopCities", async (req, res) => {
    citiesCache = searchforCity.searchCity(req.body.cityName, citiesCache , saving2);
    console.log(citiesCache);
    res.send({ citiesCache });
});


//top10poluMean
var saving3 = [];
var reset3 = [];
app.post("/api/graph/top10mean", async (req, res) => {
    if (cacheNotUpdated[2]) {
        cacheNotUpdated[2] = false;
        let graphTopMean = [];
        graphTopMean = graphTop10Mean.createTop10Means(rows);
        saving3 = graphTopMean;
        reset3 = graphTopMean.slice(0, 11);
        graphTopMean = graphTopMean.slice(0, 11);
        meansCache = graphTopMean;
    }
    console.log(meansCache);
    res.send({ meansCache });
});

// var addPolluMeanCache = [];
app.post("/api/graph/addTopPolluMean", async (req, res) => {
    meansCache = searchforPolluMean.searchPolluMean(req.body.polluName, meansCache , saving3);
    console.log(meansCache);
    res.send({ meansCache });
});


app.post("/api/graph/reset1", async (req, res) => {
    pollutantsCache = reset1;
    res.send({ reset1 })
})

app.post("/api/graph/reset2", async (req, res) => {
    citiesCache = reset2;
    res.send({ reset2 })
})

app.post("/api/graph/reset3", async (req, res) => {
    meansCache = reset3;
    res.send({ reset3 })
})

function godHelpUsAll(heatMap1) {
    //declare array for cities and years
    const years = [];
    const cities = [];
    // loop to get arrays of cities and years
    heatMap1.map((ele) => {
        //condition to get unique year and years array length should be 20
        if (!years.includes(ele[4]) && years.length <= 20) {
            years.push(ele[4]);
        }

        //condition to get unique year and years array length should be 20
        if (!cities.includes(ele[10]) && ele[10] && cities.length <= 10) {
            cities.push(ele[10]);
        }

    });
    //sort array of years
    years.sort((a, b) => a - b);
    console.log({ years, cities });

    //array for cities data with pollutant array
    const citiesData = [];
    // 1st loop for cities
    for (let i = 0; i < cities.length; i++) {
        //object with city name and data is for array of observation count for all years
        const obj = {
            name: cities[i],
            data: []
        }
        //2nd loop for yeas
        for (let j = 0; j < years.length; j++) {
            // initial observation count value is 0
            let val = 0;
            //3rd loop for all data
            heatMap1.map(ele => {
                //condition to check city and year match
                if (ele[10] === cities[i] && ele[4] === years[j]) {
                    //if both matches it will get the observation count and save in val
                    val = ele[5]; //observation count
                    // val = ele[6]; //arithmetic mean
                }
            })
            //update the value of observation count for that city
            obj.data.push(val)
        }
        //update the city data
        citiesData.push(obj);
    }


    const theanswer = {"citiesData": citiesData, "years": years};
    return theanswer;

}

//API end point for heat map
app.post("/api/heatmap/data", async (req, res) => {
    console.log("im in")
    let heatMap1 = []
    if (cacheNotUpdated[3]) {
        cacheNotUpdated[3] = false;
        console.log("IM READING")
        heatMap1 = parseHeatMap.readCSVFile('final_data.csv', 500000);
        staticHeatMap = godHelpUsAll(heatMap1)
        if (heatMap1.length != 0) {
            console.log(staticHeatMap.citiesData)
            res.send({ staticHeatMap, "cache": "reset" });
        } else {
            res.send({ "status": "failed" });
        }
    }
    else {
        //500000 lines data will be returned
        if (staticHeatMap.length != 0) {
            console.log("PLS: " + staticHeatMap.citiesData)
            res.send({ staticHeatMap, "cache": "good"});
        } else {
            res.send({ "status": "failed" });
        }
    }
});
/*
app.post("/api/heatmap/data", async (req, res) => {
    //500000 lines data will be returned
    console.log("im in")
    let testArr = parseHeatMap.readCSVFile('final_data.csv', 500000);
    if (testArr.length != 0) {
        heatMap = testArr;
        res.send({ heatMap });
    } else {
        res.send({ "status": "failed" });
    }
});
*/

app.post("/api/heatmap2/data", async (req, res) => {
    if (cacheNotUpdated[4]) {
        cacheNotUpdated[4] = false;
        graphData = parseHeatMap2.readCSVFile(rows, graphCity);
    }
    if (graphData.length != 0) {
        res.send({ graphData });
    } else {
        res.send({ "status": "failed" });
    }
});

app.listen(port, () => console.log(`Listening on port ${port}`));
