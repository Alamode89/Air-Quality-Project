//ES7+ React/Redux ... Search "React" in VSCode Extensions -> Type rafce in blank js file
import axios from 'axios';
import React, { useState, useEffect, Component } from 'react';
import './Initialtest.css'

class Initialtest extends Component {
    state = {
        response: '',
        post: '',
        responseToPost: '',
    };
    
    /*when component first mounts onto website, run the following*/
    componentDidMount() {
        this.backendCallAPI()
            .then(res => this.setState({ response: res.express }))
            .catch(err => console.log(err));
    }

    backendCallAPI = async () => {
        return axios.get('/test/get')
            .then(res => {
                this.res = res.data
                if (res.status !== 200) throw Error(res.message);
                return res.data
            })
            .catch(err => {
                //console.log("HII: " + err)
                alert("ERROR:" + err)
            })
    };
    
    handleSubmit = async e => {
        e.preventDefault();
        const response = await fetch('/test/post', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({ post: this.state.post }),
        });
        const body = await response.text();
    
        this.setState({ responseToPost: body });
    };

    render() {
        return (
            <div className="Initialtest">
                <header className="header">
                    <p>
                    CS180 Lab Connection Test
                    </p>
                </header>
                <p><em>Server POST Message:</em> {this.state.response}</p>
                <form onSubmit={this.handleSubmit}>
                    <p>
                    <strong>Post to Server:</strong>
                    </p>
                    <input
                    type="text"
                    value={this.state.post}
                    onChange={e => this.setState({ post: e.target.value })}
                    />
                    <button type="submit">Submit</button>
                </form>
                <p><em>Server GET Message:</em> {this.state.responseToPost}</p>
            </div>
        );
    }
}

export default Initialtest