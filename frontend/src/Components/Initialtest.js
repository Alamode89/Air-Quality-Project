//ES7+ React/Redux ... Search "React" in VSCode Extensions -> Type rafce in blank js file
import axios from 'axios';
import React, { useState, useEffect, Component } from 'react';
import './Initialtest.css'

const Initialtest = () => {

    const [data, setData] = useState ({
        response: '',
        post: '',
        responseToPost: ''
    });

    useEffect( () => {
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
        const response = await fetch('/test/post', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({ post: data.post }),
        });
        const body = await response.text();
    
        setData({ ...data, "responseToPost": body });
    };

    return (
        <div className="Initialtest">
        <header className="header">
            <p>
            CS180 Lab Connection Test
            </p>
        </header>
        <p>Server POST Message: {data.response}</p>
        <form onSubmit={handleSubmit}>
            <p>
                <strong>Post to Server:</strong>
            </p>
            <input
                type="text"
                value={data.post}
                onChange={e => setData({ ...data, "post": e.target.value })}
            />
            <button type="submit">Submit</button>
        </form>
        <p>{data.responseToPost}</p>
        </div>
    );
}

export default Initialtest
