//Packages: express, body-parser
const express = require('express');
const bodyParser = require('body-parser');
const cors = require("cors"); //setting up cors config
const app = express();

//For using cors
var corsOptions = {
    origin: "http://localhost:3000",
};
app.use(cors(corsOptions));
app.use(express.json());

//server using 1337 port
const port = process.env.PORT || 1337;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//This is all done for cors
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === "OPTIONS") {
        res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
        return res.status(200).json({});
    }
    next();
});


app.get('/test/get', (req, res) => {
    res.send({ express: 'YAHALLO! From Express Server' });
});

app.post('/test/post', (req, res) => {
    console.log(req.body);
    res.send(
        `GOT UR MESSAGE!! This is what you said to me: ${req.body.post}`,
    );
});

/**
 * This post method will search the observation_percent and year
 * Request contains choice which is 0,1,2 based on selection
 * state_name = 0
 * city_name = 1
 * country = 2
 * And based on above selection the req also has name which could be name of city or state or country
 */
app.post("/api/airQu/search/", (req, res) => {
    var name = req.body.name;
    var choice = req.body.choice;
    //Create a new child process to run python script
    var spawn = require("child_process").spawn;
    //Connect to python script and pass parameters
    var process = spawn("python", ["./read.py", choice, name]);
    //Get the required output from the script
    process.stdout.on("data", function(data) {
        res.send(data.toString());
    });
});

app.listen(port, () => console.log(`Listening on port ${port}`));