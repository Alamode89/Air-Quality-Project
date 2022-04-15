//ES7+ React/Redux ... Search "React" in VSCode Extensions -> Type rafce in blank js file
import axios from 'axios';
import React, { useState, useEffect, Component } from 'react';
import './Initialtest.css';
import { searchName } from "../Middleware/api";

class Initialtest extends Component {
    state = {
        response: "",
        post: "",
        responseToPost: "",
        filters: ["State", "City", "County"],
        choice: 0,
    };

    /*when component first mounts onto website, run the following*/
    componentDidMount() {
        this.backendCallAPI()
            .then((res) => this.setState({ response: res.express }))
            .catch((err) => console.log(err));
    }

    backendCallAPI = async() => {
        return axios
            .get("/test/get")
            .then((res) => {
                this.res = res.data;
                if (res.status !== 200) throw Error(res.message);
                return res.data;
            })
            .catch((err) => {
                //console.log("HII: " + err)
                alert("ERROR:" + err);
            });
    };

    handleSubmit = async(e) => {
        e.preventDefault();
        const ps = {
            name: this.state.post,
            choice: this.state.choice,
        };
        const response = await searchName(ps);
        console.log(response.data);

        // this.setState({ responseToPost: response.data });
    };

    //const searchSubmit = async (e) => {
    // read ALL the data when searching for a single element
    //  e.preventDefault()
    // setResValue("")
    //axios.get('test/get')
    //  .then(res => {
    //    console.log(res.data)
    //  setInfo(res.data) //makes data accessible outside of scope
    // Object.entries(info).map(([key, value]) => {
    //   if (key.toLowerCase() == inputVal.toLowerCase()) {
    //     setResValue(value)
    //}
    //console.log(value)
    //})
    //})
    // .catch(err => {
    //   alert(err)
    //})

    //}
    render() {
        return ( <
            div className = "Initialtest" >
            <
            header className = "header" >
            <
            p >
            CS180 Lab Connection Test <
            /p> <
            /header> <
            p >
            <
            em > Server POST Message: < /em> {this.state.response} <
            /p> <
            form onSubmit = { this.handleSubmit } >
            <
            p >
            <
            strong > Post to Server: < /strong> <
            /p> <
            input type = "text"
            value = { this.state.post }
            onChange = {
                (e) => this.setState({ post: e.target.value }) }
            /> <
            select value = { this.state.choice }
            onChange = {
                (e) => {
                    this.setState({ choice: e.target.value });
                }
            } >
            <
            option key = { "empty" }
            value = "" >
            Please Select a Filter <
            /option> {
                this.state.filters.map((name, index) => ( <
                    option key = { index }
                    value = { index } > { name } <
                    /option>
                ))
            } <
            /select> <
            button type = "submit" > Submit < /button> <
            /form> <
            p >
            <
            em > Server GET Message: < /em> {this.state.responseToPost} <
            /p> <
            /div>
        );
    }
}

export default Initialtest