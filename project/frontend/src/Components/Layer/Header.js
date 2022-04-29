import axios from 'axios';
import React, { useState, useEffect, Component } from 'react';

import "./Header.css"

const Header = () => {

    const [color, setColor] = useState("red");

    /*
    const beginCallApi = async () => {
        return axios.get('/test/get')
            .then(resAxios => {
                console.log("MESSAGE: " + resAxios.data.express)
                setColor("green");
            })
            .catch(err => {
                alert("Failed to connect: " + err)
                setColor("red");
            })
    };
    */

    const callApi = async () => {
        return axios.get('/test/get')
            .then(resAxios => {
                console.log("MESSAGE: " + resAxios.data.express)
                setColor("green");
            })
            .catch(err => {
                //alert("ERROR: " + err)
                setColor("#fca500");
            })
    };

    function customTimer() {
        // your function code here
        callApi();

        setTimeout(customTimer, 5000);
    }

    useEffect(() => {
        //beginCallApi();
        customTimer();
    }, []);

  return (
    <div className='Header' style={{ backgroundColor: color}}>
        <p>connection</p>
    
    </div>
  )
}

export default Header