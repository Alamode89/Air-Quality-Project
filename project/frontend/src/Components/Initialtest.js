//ES7+ React/Redux ... Search "React" in VSCode Extensions -> Type rafce in blank js file
import axios from 'axios';
import React, { useState, useEffect, Component } from 'react';
import './Initialtest.css'

const Initialtest = () => {
    /*
        export default class Search extends Component {
            constructor() {
                super()
                this.state = {
                    query: '',
                    result: [],
                    filteredResult: []
                };
            }
        } */
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

    const [inputVal, setInputVal] = useState("");
    const [info, setInfo] = useState({});
    const [resValue, setResValue] = useState("");

    const handleTyping = (e) => {
        setInputVal(e.target.value)
        console.log(inputVal)
    }

    const [output, setOutput] = useState({
        latitude: '',
        longitude: '',
        parameter: '',
        year: ''
    });

    const searchSubmit = async (e) => {
        // read ALL the data when searching for a single element
        e.preventDefault()
        setResValue("")
        /*
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
            })*/
        let incoming = { city: inputVal }
        console.log("Our input: " + incoming)
        axios.post('/test/iloveithere', incoming)
            .then(resAxios => {
                /*
                {
                    "latitude": 1231
                    ...
                    "year": 1929
                }
                */
                console.log("Incoming Data: " + JSON.stringify(resAxios.data))
                /*var whatWeGot = ""
                whatWeGot += "Latitude: " + JSON.stringify(resAxios.data.latitude)
                whatWeGot += "\nLongitude: " + JSON.stringify(resAxios.data.longitude)
                whatWeGot += "\nParameter: " + JSON.stringify(resAxios.data.parameter_name)
                whatWeGot += "\nyear: " + JSON.stringify(resAxios.data.year)

                setResValue(whatWeGot)
                */
                setOutput({ ...output, "latitude": resAxios.data.latitude, "longitude": resAxios.data.longitude, "parameter": resAxios.data.parameter_name, "year": resAxios.data.year })
                //console.log("Response: " + whatWeGot)
            })

    }

    return (
        <div className="Initialtest">
            <header className="header">
                <p>
                    CS180 Lab Connection Test
                </p>
            </header>
            {/* <div className="test">
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
        </div> */}
            <div className="search">
                <form onSubmit={searchSubmit}>
                    <p>Search</p>
                    <input type="text" value={inputVal} onChange={handleTyping} />
                    <button type="submit">Search</button>
                    {/*<p>{resValue}</p>*/}
                    <p>Latitude: {output.latitude}</p>
                    <p>Longitude: {output.longitude}</p>
                    <p>Pollutant: {output.parameter}</p>
                    <p>Year: {output.year}</p>
                </form>
            </div>
        </div>
    );
}

export default Initialtest
