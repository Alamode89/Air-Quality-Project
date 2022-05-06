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

    //------------------------Status----------------------------------
    const [statusVal, setStatusVal] = useState("n/a");

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
        setStatusVal("Searching...")
        // read ALL the data when searching for a single element
        e.preventDefault()
        //setResValue("")
        let incoming = { city: inputVal }
        console.log("Our input: " + incoming.city)
        axios.post('/api/search', incoming)
            .then(resAxios => {
                if(resAxios.data.status == "failed") {
                    setStatusVal("Search Failed")
                }
                else {
                    setStatusVal("Search Success")
                }
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
        setStatusVal("Deleting...")
        // read all the data when searching for single element
        e.preventDefault()
        //setResValue("")
        axios.get('/api/delete')
            .then(resAxios => {
                console.log("Status: " + JSON.stringify(resAxios.data.status))
                if(resAxios.data.status === "success") {
                    setStatusVal("Deletion Success")
                }
                else if(resAxios.data.status === "failed") {
                    setStatusVal("Deletion Failed")
                }
                else {
                    setStatusVal("Unknown Deletion Error")
                }
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
        setStatusVal("Creating...")
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
                if(resAxios.data.status === "success") {
                    setStatusVal("Creation Successful")
                }
                else if(resAxios.data.status === "failed") {
                    setStatusVal("Creation Failed")
                }
                else {
                    setStatusVal("Unknown Creation Error")
                }
            })
            .catch(err => {
                alert("ERROR:" + err)
            })

    }

           //------------------------Update----------------------------------
   const [updateInput, setUpdateInput] = useState({
    updateType: 'city_name',
    updateCity: '',
    updatePollutant: '',
    updateMetric: '',
    updateObsCount: '',
    updateArithMean: '',
    updateArithSTDev: '',
    updateYear: '',
    updateCounty: '',
    updateState: '',
    updateLatitude: '',
    updateLongitude: ''

    });

    const [updateUser, setUpdateUser] = useState({
        userInput: ''
    })

    const handleUpdateUser = (e) => {
        e.preventDefault()
        console.log("INPUT: " + e.target.value)
        setUpdateUser({ ...updateUser, userInput: e.target.value})
    }

    const handleType = (e) => {
        e.preventDefault()
        console.log("INPUT: " + e.target.value)
        setUpdateInput({ ...updateInput, updateType: [e.target.value]})
    }

    const updateSubmit = async (e) => {
        setStatusVal("Updating...")
        e.preventDefault()
        let updatePayload = { 
            type: updateInput.updateType,
            latitude: updateInput.updateLatitude, 
            longitude: updateInput.updateLongitude, 
            parameter_name: updateInput.updatePollutant, 
            metric_used: updateInput.updateMetric,
            year: updateInput.updateYear,
            observation_count: updateInput.updateObsCount,
            arithmetic_mean: updateInput.updateArithMean,
            arithmetic_standard_dev: updateInput.updateArithSTDev,
            state_name: updateInput.updateState,
            county_name: updateInput.updateCounty,
            city_name: updateInput.updateCity
        }
        console.log("Before || " + updatePayload.type + ": " + updatePayload[updatePayload.type])
        updatePayload[updatePayload.type] = updateUser.userInput
        console.log("After || " + updatePayload.type + ": " + updatePayload[updatePayload.type])
        
        axios.post('/api/update', updatePayload)
            .then(resAxios => {
                console.log("Status: " + JSON.stringify(resAxios.data))
                if(resAxios.data.status === "success") {
                    setStatusVal("Update Successful")
                }
                else if(resAxios.data.status === "failed") {
                    setStatusVal("Update Failed")
                }
                else {
                    setStatusVal("Unknown Update Error")
                }
            })
            .catch(err => {
                alert("ERROR:" + err)
            })
            

    }

    //-----------------------Backup---------------------------------
	const backup = async (e) => {
        setStatusVal("Backing up...")
		e.preventDefault()
		axios.get('/api/backup')
        setStatusVal("Backup Success")
	}
    //-----------------------Import---------------------------------
    const [handleInput, setHandleInput] = useState({
        fileName:''
    });

    const handleImport = (e) => {
        console.log("INPUT: " + e.target.value)
        e.preventDefault();
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
        setHandleInput({ ...handleInput, "fileName": e.target.value})
    }

    const importSubmit = async (e) => {
        setStatusVal("Importing...")
        // read ALL the data when searching for a single element
        e.preventDefault()
        console.log("fileName" + handleInput.fileName)
        //setResValue("")
        var obj  = {
            "filename": handleInput.fileName
        } 
        axios.post('/api/import/csv', obj)
            .then(resAxios => {
                console.log("Status: " + JSON.stringify(resAxios.data))
                if(resAxios.data.status === "success") {
                    setStatusVal("Import Successful")
                }
                else if(resAxios.data.status === "failed") {
                    setStatusVal("Import Failed")
                }
                else {
                    setStatusVal("Unknown Import Error")
                }
            })
            .catch(err => {
                alert("ERROR:" + err)
            })

    }
    //------------------------HTML----------------------------------
    return (
        <div className="AirQuality">
            <header className="aq_header">
                <h2>
                    Air Quality Interactive
                </h2>
                <p>Status: {statusVal}</p>
            </header>

            <div className="aq_box">
                <form onSubmit={searchSubmit}>
                    <h1>Search</h1>
                    <p>(e.g. Riverside, Santa Fe, Seattle, ...)</p>
                    <input type="text" value={inputVal} onChange={handleTyping} />
                    <button className='aq_btn' type="submit">Search</button>
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
            </div>
            <div className="aq_box">
                <h1>
                    File Operations
                </h1>
                <form onSubmit={deleteSubmit}>
                        <button className='aq_btn' type="submit">Delete Entry.</button>
                    </form>
                <form onSubmit={backup}>
                    <button className='aq_btn' type="submit">Backup</button>
                </form>
            </div>
            <div className="aq_box">
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
                    <button className='aq_btn' type="submit">Submit</button>
                </form>
            </div>

            <div className="aq_box">
                <form onSubmit={updateSubmit}>
                    <h1>Update</h1>
                        <p>1. Please select a field to update:</p>
                        <select onChange={handleType}>
                            <option value="city_name">City</option>
                            <option value="parameter_name">Pollutant</option>
                            <option value="metric_used">Metric</option>
                            <option value="observation_count">Observation Count</option>
                            <option value="arithmetic_mean">Arithmetic Mean</option>
                            <option value="arithmetic_standard_dev">Arithmetic Standard Deviation</option>
                            <option value="year">Year</option>
                            <option value="county_name">County</option>
                            <option value="state_name">State</option>
                            <option value="latitude">Latitude</option>
                            <option value="longitude">Longitude</option>
                        </select>
                        <p>2. Please enter new data for the field:</p>
                        <input type="text" value={updateUser.userInput} onChange={handleUpdateUser}></input>
                        <button className='aq_btn' type="submit">Update</button>                  
                </form>
            </div>
            <div className="aq_box">
                <form onSubmit={importSubmit}>
                    <h1>Import</h1>
                    <p>(Must fill all values.)</p>
                    <h3>fileName: <input type="text" value={handleInput.fileName} onChange={handleImport} /></h3>
                    <button className='aq_btn' type="submit">Submit</button>
                </form>
            </div>
            <div className='aq_blank'></div>
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
