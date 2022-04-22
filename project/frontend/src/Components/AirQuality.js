//ES7+ React/Redux ... Search "React" in VSCode Extensions -> Type rafce in blank js file
import axios from 'axios';
import React, { useState, useEffect, Component } from 'react';
// material UI is used for some styling
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
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

    const callApi = async() => {
        return axios.get('/test/get')
            .then(resAxios => {
                setData({...data, "response": resAxios.data.express })
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
                setData({...data, "responseToPost": resAxios.data })
                console.log("Response: " + resAxios.data)
            })
    };

    //------------------------Input----------------------------------

    const [inputVal, setInputVal] = useState("");
    const [info, setInfo] = useState({});
    const [resValue, setResValue] = useState("");

    const handleTyping = (e) => {
        setInputVal(e.target.value);
        console.log(inputVal);
    };

    //------------------------Search----------------------------------

    const [output, setOutput] = useState({
        latitude: "",
        longitude: "",
        parameter: "",
        year: "",

        parameter_code: "",
        county_name: "",
        state_name: "",
        date_of_last_change: "",
        arithmetic_mean: "",
    });


    const searchSubmit = async(e) => {
        // read ALL the data when searching for a single element
        e.preventDefault()
            //setResValue("")
        let incoming = { city: inputVal }
        console.log("Our input: " + incoming)
        axios.post('/api/search', incoming).then(resAxios => {
            console.log("Incoming Data: " + JSON.stringify(resAxios.data));
            //changing the setoutput
            setOutput({
                ...output,
                latitude: resAxios.data.latitude,
                longitude: resAxios.data.longitude,
                parameter: resAxios.data.parameter_name,
                year: resAxios.data.year,

                parameter_code: resAxios.data.parameter_code,
                county_name: resAxios.data.county_name,
                state_name: resAxios.data.state_name,
                date_of_last_change: resAxios.data.date_of_last_change,
                arithmetic_mean: resAxios.data.arithmetic_mean,
            });
            //console.log("Response: " + whatWeGot)
        });
    };

    //------------------------HTML----------------------------------
  return (
    <div className="AirQuality">
          <div className="search">
        <form onSubmit={searchSubmit}>
          <h1>Search</h1>
          <p>(e.g. Riverside, Santa Fe, Seattle, ...)</p>
          <div className="import-div">
            <TextField
              id="outlined-basic"
              label="Search"
              variant="outlined"
              onChange={(e) => handleTyping(e)}
            />

            <span style={{ marginLeft: "8px" }}>
              <Button
                variant="contained"
                size="large"
                type="submit"
                style={{ height: "53px" }}
              >
                Search
              </Button>
            </span>
          </div>

          {/* <button type="submit">Search</button> */}

          {/*<p>{resValue}</p>*/}
          <h2>Air</h2>
          <div
            style={{ width: "100%", display: "flex", justifyContent: "center" }}
          >
            <ol>
              <li class="">
                <a>Pollutant: {output.parameter}</a>
              </li>
              <li class="">
                <a>Parameter Code: {output.parameter_code}</a>
              </li>
              <li class="">
                <a>Arithmetic Mean: {output.arithmetic_mean}</a>
              </li>
              <li class="">
                <a>Date of Last Change: {output.date_of_last_change}</a>
              </li>
              <li class="">
                <a>Year: {output.year}</a>
              </li>
            </ol>
          </div>
          {/* <p>Pollutant: {output.parameter}</p>
                    <p>Parameter Code: {output.parameter_code}</p>
                    <p>Arithmetic Mean: {output.arithmetic_mean}</p>
                    <p>Date of Last Change: {output.date_of_last_change}</p>
                    <p>Year: {output.year}</p> */}
          <h2>Location</h2>
          <div
            style={{ width: "100%", display: "flex", justifyContent: "center" }}
          >
            <ol>
              <li class="">
                <a>County: {output.county_name}</a>
              </li>
              <li class="">
                <a>State: {output.state_name}</a>
              </li>
              <li class="">
                <a>Latitude: {output.latitude}</a>
              </li>
              <li class="">
                <a>Longitude: {output.longitude}</a>
              </li>
            </ol>
          </div>
          {/* <p>County: {output.county_name}</p>
                    <p>State: {output.state_name}</p>
                    <p>Latitude: {output.latitude}</p>
                    <p>Longitude: {output.longitude}</p> */}
        </form>
      </div>
    </div>
  );
};

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