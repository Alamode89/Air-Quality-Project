//ES7+ React/Redux ... Search "React" in VSCode Extensions -> Type rafce in blank js file
import axios from 'axios';
import React, { useState, useEffect, Component } from 'react';
import ReactApexChart from "react-apexcharts"; // for graph
import './Graph.css';


const Graph = () => {
    const [csvData, setCsvData] = useState([]);
    const [csvDates, setCsvDates] = useState([]);
    const [isData, setIsData] = useState(false);

    //Adding graph
    const graphSubmit = async (e) => {
        // read ALL the data when searching for a single element
        e.preventDefault();

        axios
            .post("/api/graph/data")
            .then((resAxios) => {
                console.log({ data: resAxios.data });
                const temp = [];
                const dates = [];
                const cities = [];
                resAxios.data.graphData.map((val, ind) => {
                    if (ind) {
                        temp.push(val[5]);
                        dates.push(val[4]);
                        cities.push(val[8]);
                    }
                });

                //1) combine the arrays:
                var list = [];
                for (var j = 0; j < dates.length; j++)
                    list.push({ date: dates[j], data: temp[j], city: cities[j] });

                //2) sort:
                list.sort(function (a, b) {
                    return a.date < b.date ? -1 : a.date == b.date ? 0 : 1;
                    //Sort could be modified to, for example, sort on the age
                    // if the name is the same.
                });

                //3) separate them back out:
                for (var k = 0; k < list.length; k++) {
                    dates[k] = list[k].date;
                    temp[k] = list[k].data;
                    cities[k] = list[k].city;
                }

                setCsvData(temp);
                const dateCities = dates.map((val, ind) => {
                    return val + " (" + cities[ind] + ")";
                });
                setCsvDates(dateCities);
                setIsData(true);
            })
            .catch((err) => {
                alert("ERROR:" + err);
            });
    };

    console.log({ csvDates, csvData });
    const lineData = {
        series: [
            {
                name: "observation count",
                data: csvData,
            },
        ],
        options: {
            chart: {
                height: 350,
                type: "line",
                zoom: {
                    enabled: false,
                },
            },
            dataLabels: {
                enabled: false,
            },
            stroke: {
                curve: "smooth",
            },
            title: {
                text: "City Polution by year",
                align: "left",
            },
            xaxis: {
                categories: csvDates,
            },
        },
    };
    //--------------------Top10Pollutant----------------------------
    const [pollutantName, setPollutantName] = useState([]);
    const [numofPollutant, setnumofPollutant] = useState([]);
    
    
    const graphtop10 = async (e) => {
        e.preventDefault()
        axios
            .post('/api/graph/top10pollutants')
            .then((resAxios) => {
                const pollutant = [];
                const numP = [];
                resAxios.data.graphData2.map((val, ind) => {
                    if (ind) {
                        pollutant.push(val.parameter_name);
                        numP.push(val.num);
                    }
                });
                setPollutantName(pollutant);
                setnumofPollutant(numP);
            });
    };
    const barData = {
        series: [
            {
                name: "Num of Pollutant Observed",
                data: numofPollutant,
            },
        ],
        options: {
            chart: {
                height: 350,
                type: "bar",
            },
            plotOptions: {
                bar: {
                    borderRadius: 4,
                    horizontal: true,
                }
            },
            dataLabels: {
                enabled: false,
            },
            title: {
                text: "Top 10 Pollutants",
                align: "left",
            },
            xaxis: {
                categories: pollutantName,
            },
        },
    };
    //------------------------Top 10 Cities----------------------------------
    const [cityName, setCityName] = useState([]);
    const [arithmeticMean, setarithmeticMean] = useState([]);

    const graphtop10cities = async (e) => {
        e.preventDefault()
        axios
            .post('/api/graph/top10cities')
            .then((resAxios) => {
                const city = [];
                const aMean = [];
                resAxios.data.graphTopCities.map((val, ind) => {
                    if (ind) {
                        city.push(val.city_name);
                        aMean.push(val.arithmetic_mean);
                    }
                });
                setCityName(city);
                setarithmeticMean(aMean);
            });
    };
    const bar2Data = {
        series: [
            {
                name: "Sum of Arithmetic Mean",
                data: arithmeticMean,
            },
        ],
        options: {
            chart: {
                height: 350,
                type: "bar",
            },
            plotOptions: {
                bar: {
                    borderRadius: 4,
                    horizontal: true,
                }
            },
            dataLabels: {
                enabled: false,
            },
            title: {
                text: "Top 10 Cities",
                align: "left",
            },
            xaxis: {
                categories: cityName,
            },
        },
    };
    //--------------------Top 10 Mean-------------------------------
    const [pollu, setpolluName] = useState([]);
    const [arithMean, setarithMean] = useState([]);

    const graphtop10mean = async (e) => {
        e.preventDefault()
        axios
            .post('/api/graph/top10mean')
            .then((resAxios) => {
                const pollut = [];
                const arithmeticMean = [];
                resAxios.data.graphTopMean.map((val, ind) => {
                    if (ind) {
                        pollut.push(val.pollutant);
                        arithmeticMean.push(val.arithmetic_mean);
                    }
                });
                setpolluName(pollut);
                setarithMean(arithmeticMean);
            });
    };

    const bar3Data = {
        series: [
            {
                name: "Concentration of Pollutant",
                data: arithMean,
            },
        ],
        options: {
            chart: {
                height: 350,
                type: "bar",
            },
            plotOptions: {
                bar: {
                    borderRadius: 4,
                    horizontal: true,
                }
            },
            dataLabels: {
                enabled: false,
            },
            title: {
                text: "Top 10 Concentration of Pollutant",
                align: "left",
            },
            xaxis: {
                categories: pollu,
            },
        },
    };


    //------------------------HTML----------------------------------
    return (
        <div className="Graph" >
            <header className="header">
                <h2>
                    Graph
                </h2>
            </header>
            <div className="box">
                <form onSubmit={graphSubmit}>
                    <h1>observation count with states</h1>

                    <button className="btn" type="submit">
                        Render Graph
                    </button>
                </form>
                {/* // to show the graph */}
                {isData ? (
                    <div style={{ marginTop: "30px", width: "100%" }}>
                        <ReactApexChart
                            options={lineData.options}
                            series={lineData.series}
                            type="line"
                            height={350}
                            width={"100%"}
                        />
                    </div>
                ) : null}
            </div>            
            
            <div className="box">
                <form onSubmit={graphtop10}>
                    <h1>Top 10 Pollutants</h1>

                    <button className="button" type="submit">
                        Render Graph
                    </button>
                </form>
                {/* // to show the graph */}
                {isData ? (
                    <div style={{ marginTop: "30px", width: "100%" }}>
                        <ReactApexChart
                            options={barData.options}
                            series={barData.series}
                            type="bar"
                            height={350}
                            width={"100%"}
                        />
                    </div>
                ) : null}
            </div>
            
            <div className="box">
                <form onSubmit={graphtop10cities}>
                    <h1>Top 10 Cities</h1>

                    <button className="button" type="submit">
                        Render Graph
                    </button>
                </form>
                {/* // to show the graph */}
                {isData ? (
                    <div style={{ marginTop: "30px", width: "100%" }}>
                        <ReactApexChart
                            options={bar2Data.options}
                            series={bar2Data.series}
                            type="bar"
                            height={350}
                            width={"100%"}
                        />
                    </div>
                ) : null}
            </div>

            <div className="box">
                <form onSubmit={graphtop10mean}>
                    <h1>Top 10 Pollutant Mean</h1>

                    <button className="button" type="submit">
                        Render Graph
                    </button>
                </form>
                {/* // to show the graph */}
                {isData ? (
                    <div style={{ marginTop: "30px", width: "100%" }}>
                        <ReactApexChart
                            options={bar3Data.options}
                            series={bar3Data.series}
                            type="bar"
                            height={350}
                            width={"100%"}
                        />
                    </div>
                ) : null}
            </div>

            <div className='blank'></div>

        </div>


    );
}

export default Graph