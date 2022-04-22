//ES7+ React/Redux ... Search "React" in VSCode Extensions -> Type rafce in blank js file
import axios from 'axios';
import React, { useState, useEffect, Component } from 'react';
import './AirQuality.css'

const AirQuality = () => {
        const [data, setData] = useState({
            response: "",
            post: "",
            responseToPost: "",
        });
        //------------------------import----------------------------------//
        const [filename, setfileaname] = useState("");
        const [error, setError] = useState("");
        const [rows, setRows] = useState([]);
        const [columns, setColumns] = useState([]);
        const [isLoading, setLoading] = useState(false);
        const [filenames, setfilenames] = useState(["final_data"]);

        //this function is to send filename to server and fetch the data of that file
        //after fetching we are showing that data in the form of table
        const importData = () => {
            //called an API with filename in body
            if (!filename) {
                // if we donot have a file name we are setting error here
                setError("Please Enter filename");
            } else {
                //   in start we have made loading true
                setLoading(true);
                //   calling an API with file name
                axios.post("/api/import/csv", { filename }).then((resAxios) => {
                    let obj = resAxios.data.result[0];
                    // to get column names
                    const keys = Object.keys(obj);
                    setColumns(obj);
                    // to remove column name form table data
                    resAxios.data.result.shift();
                    // saving data in state
                    setRows(resAxios.data.result);
                    // making loading false
                    setLoading(false);
                });
            }
        };
        //------------------------Testing----------------------------------

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

        const searchSubmit = async(e) => {
            // read ALL the data when searching for a single element
            e.preventDefault()
                //setResValue("")
            let incoming = { city: inputVal }
            console.log("Our input: " + incoming.city)
            axios.post('/api/search', incoming)
                .then(resAxios => {
                    console.log("Incoming Data: " + JSON.stringify(resAxios.data))
                    setSearch({...search,
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

        const deleteSubmit = async(e) => {
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

        //------------------------HTML----------------------------------
         return (
        <>
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
        </div>
         {/* //from here import will start  */}
      <div className="Initialtest">
        <h1>Import</h1>
        <div className="import-div">
          <input
            type="text"
            value={filename}
            onChange={(e) => {
              setError("");
              setfileaname(e.target.value);
            }}
          />
          <button onClick={() => importData()}>Search</button>
        </div>
        {/* to show error if we note enter filename */}
        <p style={{ textALign: "center", color: "red" }}>{error}</p>
        {/* this is to show available filenames  */}
        <div className="import-div">
          <p style={{ textALign: "left" }}>
            Enter filename from these available files:{" "}
            {filenames.map((fm) => (
              <li>{fm + " "}</li>
            ))}
          </p>
        </div>

        {/* when we call API it will take time so we are shoiwng loading here  */}

        <div style={{ marginTop: "30px" }}>
          {rows.length ? (
            //   this is table to show data

            <table>
              <tr>
                {columns.map((col) => (col ? <th>{col}</th> : <th>id</th>))}
              </tr>
              {rows.map((row) => (
                <tr key={row.name}>
                  {row.map((col) => (col ? <td>{col}</td> : null))}
                </tr>
              ))}
            </table>
          ) : (
            //   if do not have any data we will show this message instead of empty table
            <h4>Please enter filename to import that file...</h4>
          )}
        </div>
      </div>
    </>
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