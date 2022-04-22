//ES7+ React/Redux ... Search "React" in VSCode Extensions -> Type rafce in blank js file
import axios from 'axios';
import React, { useState, useEffect, Component } from 'react';
import './AirQuality.css'

const AirQuality = () => {
    //------------------------Testing----------------------------------
    const [data, setData] = useState({
        response: '',
        post: '',
        responseToPost: ''
    });

    useEffect(() => {
        callApi()
    }, []);

    const callApi = async () => {
        return axios.get('/test/get')
            .then(resAxios => {
                setData({ ...data, "response": resAxios.data.express })
                console.log("MESSAGE: " + resAxios.data.express)
            })
            .catch(err => {
                alert("ERROR:" + err)
            })
    };

    const handleSubmit = async e => {
        e.preventDefault();
        let res = { post: data.post }
        console.log("Send: " + res)
        axios.post('/test/post', res)
            .then(resAxios => {
                setData({ ...data, "responseToPost": resAxios.data })
                console.log("Response: " + resAxios.data)
            })
    };

    //------------------------Input----------------------------------

    const [inputVal, setInputVal] = useState("");

    const handleTyping = (e) => {
        setInputVal(e.target.value)
        console.log(inputVal)
    }

    //------------------------Search----------------------------------

    const [search, setSearch] = useState({
        latitude: '',
        longitude: '',
        parameter: '',
        metric: '',
        year: '',
        observation_cnt: '',
        arithmetic_mean: '',
        arithmetic_stdDev: '',
        county_name: '',
        state_name: '',
        city_name: ''
    });

    const searchSubmit = async (e) => {
        // read ALL the data when searching for a single element
        e.preventDefault()
        //setResValue("")
        let incoming = { city: inputVal }
        console.log("Our input: " + incoming.city)
        axios.post('/api/search', incoming)
            .then(resAxios => {
                console.log("Incoming Data: " + JSON.stringify(resAxios.data))
                setSearch({ ...search, 
                    "latitude": resAxios.data.latitude,
                    "longitude": resAxios.data.longitude,
                    "parameter": resAxios.data.parameter_name,
                    "metric": resAxios.data.metric_used,
                    "year": resAxios.data.year,
                    "observation_cnt": resAxios.data.observation_count,
                    "arithmetic_mean": resAxios.data.arithmetic_mean,
                    "arithmetic_stdDev": resAxios.data.arithmetic_standard_dev,
                    "county_name": resAxios.data.county_name,
                    "state_name": resAxios.data.state_name,
                    "city_name": resAxios.data.city_name
                })
            })
            .catch(err => {
                alert("ERROR:" + err)
            })

    }


    //------------------------Delete----------------------------------

    const deleteSubmit = async (e) => {
        // read all the data when searching for single element
        e.preventDefault()
        //setResValue("")
        axios.get('/api/delete')
            .then(resAxios => {
                console.log("Status: " + JSON.stringify(resAxios.data.status))
            })
            .catch(err => {
                alert("ERROR:" + err)
            })
    }

    //------------------------Create----------------------------------
    const [createInput, setCreateInput] = useState({
        newCity: '',
        newPollutant: '',
        newMetric: '',
        newObsCount: '',
        newArithMean: '',
        newArithSTDev: '',
        newYear: '',
        newCounty: '',
        newState: '',
        newLatitude: '',
        newLongitude: ''

    });

    const handleCreate = (e) => {
        console.log("INPUT: " + e.target.name)
        /*
        setCreateInput({ ...createInput,
            "newCity": e.target.newCity,
            "newPollutant": e.target.newPollutant,
            "newMetric": e.target.newMetric,
            "newObsCount": e.target.newObsCount,
            "newArithMean": e.target.newArithMean,
            "newArithSTDev": e.target.newArithSTDev,
            "newYear": e.target.newYear,
            "newCounty": e.target.newCounty,
            "newState": e.target.newState,
            "newLatitude": e.target.newLatitude,
            "newLongitude": e.target.newLongitude
        })*/
        //we defined "variable names" in name="" down below, so now just call name when THAT field is touched GENIUS
        setCreateInput({ ...createInput, [e.target.name]: e.target.value})
    }

    const createSubmit = async (e) => {
        // read ALL the data when searching for a single element
        e.preventDefault()
        //setResValue("")
        let createPayload = { 
            latitude: createInput.newLatitude, 
            longitude: createInput.newLongitude, 
            parameter_name: createInput.newPollutant, 
            metric_used: createInput.newMetric,
            year: createInput.newYear,
            observation_count: createInput.newObsCount,
            arithmetic_mean: createInput.newArithMean,
            arithmetic_standard_dev: createInput.newArithSTDev,
            state_name: createInput.newState,
            county_name: createInput.newCounty,
            city_name: createInput.newCity
        }
        console.log("we have" + createInput.newCity)
        console.log("We're sending" + JSON.stringify(createPayload))
        axios.post('/api/create', createPayload)
            .then(resAxios => {
                console.log("Status: " + JSON.stringify(resAxios.data.status))
            })
            .catch(err => {
                alert("ERROR:" + err)
            })

    }

    //------------------------HTML----------------------------------
    return (
        <div className="AirQuality">
            <header className="header">
                <p>
                    CS180 Air Quality Data - Yahallo
                </p>
            </header>
            <div className="search">
                <form onSubmit={searchSubmit}>
                    <h1>Search</h1>
                    <p>(e.g. Riverside, Santa Fe, Seattle, ...)</p>
                    <input type="text" value={inputVal} onChange={handleTyping} />
                    <button type="submit">Search</button>
                    {/*<p>{resValue}</p>*/}
                    <h3>City: {search.city_name}</h3>
                    <h3><u>Air</u></h3>
                    <p><em>Pollutant:</em> {search.parameter}</p>
                    <p><em>Metric:</em> {search.metric}</p>
                    <p><em>Observation Count:</em> {search.observation_cnt}</p>
                    <p><em>Arithmetic Mean:</em> {search.arithmetic_mean}</p>
                    <p><em>Arithmetic Standard Deviation:</em> {search.arithmetic_stdDev}</p>
                    <p><em>Year:</em> {search.year}</p>
                    <h3><u>Location</u></h3>
                    <p><em>County:</em> {search.county_name}</p>
                    <p><em>State:</em> {search.state_name}</p>
                    <p><em>Latitude:</em> {search.latitude}</p>
                    <p><em>Longitude:</em> {search.longitude}</p>
                </form>
                <form onSubmit={deleteSubmit}>
                    <button type="submit">Delete Entry.</button>
                </form>
            </div>

            <div className="create">
                <form onSubmit={createSubmit}>
                    <h1>Create a New Entry/Row</h1>
                    <p>(Must fill all values.)</p>
                    <h3>City: <input type="text" name="newCity" value={createInput.newCity} onChange={handleCreate} /></h3>
                    <h3><u>Air</u></h3>
                    <p><em>Pollutant:</em> <input type="text" name="newPollutant" value={createInput.newPollutant} onChange={handleCreate} /></p>
                    <p><em>Metric:</em> <input type="text" name="newMetric" value={createInput.newMetric} onChange={handleCreate} /></p>
                    <p><em>Observation Count:</em> <input type="text" name="newObsCount" value={createInput.newObsCount} onChange={handleCreate} /></p>
                    <p><em>Arithmetic Mean:</em> <input type="text" name="newArithMean" value={createInput.newArithMean} onChange={handleCreate} /></p>
                    <p><em>Arithmetic Standard Deviation:</em> <input type="text" name="newArithSTDev" value={createInput.newArithSTDev} onChange={handleCreate} /></p>
                    <p><em>Year:</em> <input type="text" name="newYear" value={createInput.newYear} onChange={handleCreate} /></p>
                    <h3><u>Location</u></h3>
                    <p><em>County:</em> <input type="text" name="newCounty" value={createInput.newCounty} onChange={handleCreate} /></p>
                    <p><em>State:</em> <input type="text" name="newState" value={createInput.newState} onChange={handleCreate} /></p>
                    <p><em>Latitude:</em> <input type="text" name="newLatitude" value={createInput.newLatitude} onChange={handleCreate} /></p>
                    <p><em>Longitude:</em> <input type="text" name="newLongitude" value={createInput.newLongitude} onChange={handleCreate} /></p>
                    <button type="submit">Submit</button>
                </form>
            </div>

        </div>
    );
}

export default AirQuality

/* Notes:
    
export default class Search extends Component {
    constructor() {
        super()
        this.state = {
            query: '',
            result: [],
            filteredResult: []
        };
    }
} 

<div className="test">
    <p>Server POST Message: {data.response}</p>
    <form onSubmit={handleSubmit}>
        <p>
            <strong>Post to Server:</strong>
        </p>
        <input
            type="text"
            value={data.post} //<---? can work wthout || creates value so it can be updated
            //onChange = everytime add/remove a character
            //this.setState = setValue
            onChange={e => setData({ ...data, "post": e.target.value })}
        />
        <button type="submit">Submit</button>
    </form>
    <p>{data.responseToPost}</p>
</div> 

axios.get('test/iloveithere')
    .then(res => {
        console.log(res.data) //our array from backend
        setInfo(res.data) //makes data accessible outside of scope
        Object.entries(info).map(([key, value]) => {
            if (key.toLowerCase() == inputVal.toLowerCase()) {
                setResValue(value)
            }
            console.log(value)
        })
    })
    .catch(err => {
        alert(err)
    })


var whatWeGot = ""
            whatWeGot += "Latitude: " + JSON.stringify(resAxios.data.latitude)
            whatWeGot += "\nLongitude: " + JSON.stringify(resAxios.data.longitude)
            whatWeGot += "\nParameter: " + JSON.stringify(resAxios.data.parameter_name)
            whatWeGot += "\nyear: " + JSON.stringify(resAxios.data.year)

            setResValue(whatWeGot)
*/