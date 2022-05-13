import axios from 'axios';
import React, { useState, useEffect, Component } from 'react';
import ReactApexChart from "react-apexcharts"; // for graph
import './Graph.css';


const Graph = () => {
    /*
    const [csvData, setCsvData] = useState([]);
    const [csvDates, setCsvDates] = useState([]);
    const [isData, setIsData] = useState(false);
    */
    const [isData, setIsData] = useState(true);

    const [pollution, setPollution] = useState([]);
    const [ariMean, setAriMean] = useState([]);

    //Adding graph
    const graphSubmit = async (e) => {
        // read ALL the data when searching for a single element
        e.preventDefault();

        axios
            .post("/api/graph/data")
            .then((resAxios) => {
                console.log("original: " + resAxios.data.graphData)

/*

                //console.log({ data: resAxios.data });
                //console.log(resAxios.data)
                const temp = [];
                const dates = [];
                const cities = [];
                resAxios.data.graphData.map((val, ind) => {
                    if (ind) {
                        temp.push(val[5]);
                        dates.push(val[4]);
                        cities.push(val[8]);
                        console.log("temp: " + val[5])
                        console.log("dates: " + val[4])
                        console.log("cities: " + val[8])
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

                */
                const incPollution = [];
                const arithMean = [];
                resAxios.data.graphData.map((val, ind) => {
                    if (ind) {
                        incPollution.push(val.pollutant);
                        arithMean.push(val.arithmetic_mean);
                    }
                });
                setPollution(incPollution);
                setAriMean(arithMean);

                console.log(incPollution)
                console.log(arithMean)

            }
            
            
            )
            .catch((err) => {
                alert("ERROR:" + err);
            });
    };

    //console.log({ csvDates, csvData });
    const lineData = {
        series: [
            {
                name: "Arithmetic Mean",
                data: ariMean,
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
                text: "City Pollution's Data",
                align: "left",
            },
            xaxis: {
                categories: pollution,
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
                console.log("top10: " + resAxios.data.graphData2)
                resAxios.data.pollutantsCache.map((val, ind) => {
                    if (ind) {
                        pollutant.push(val.parameter_name);
                        numP.push(val.num);
                    }
                });
                setPollutantName(pollutant);
                setnumofPollutant(numP);

                console.log(pollutant)
                console.log(numP)
            });
    };

    const addtoTop10Pollutant = async (e) => {
        e.preventDefault()
        let incoming = { pollutantName: inputVal }
        axios
            .post('/api/graph/addPollutant', incoming)
            .then((resAxios) => {
                const pollutant2 = [];
                const numP2 = [];
                resAxios.data.addPollutantCache.map((val, ind) => {
                    if (ind) {
                        pollutant2.push(val.parameter_name);
                        numP2.push(val.num);
                    }
                });
                setPollutantName(pollutant2);
                setnumofPollutant(numP2);

                console.log(pollutantName)
                console.log(numofPollutant)
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
                resAxios.data.citiesCache.map((val, ind) => {
                    if (ind) {
                        city.push(val.city_name);
                        aMean.push(val.arithmetic_mean);
                    }
                });
                setCityName(city);
                setarithmeticMean(aMean);
            });
    };

    const addtoTop10Cities = async (e) => {
        e.preventDefault()
        let incoming = { cityName: inputVal2 }
        axios
            .post('/api/graph/addTopCities', incoming)
            .then((resAxios) => {
                const city2 = [];
                const aMean2 = [];
                resAxios.data.addCityCache.map((val, ind) => {
                    if (ind) {
                        city2.push(val.city_name);
                        aMean2.push(val.arithmetic_mean);
                    }
                });
                setCityName(city2);
                setarithmeticMean(aMean2);
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
                resAxios.data.meansCache.map((val, ind) => {
                    if (ind) {
                        pollut.push(val.pollutant);
                        arithmeticMean.push(val.arithmetic_mean);
                    }
                });
                setpolluName(pollut);
                setarithMean(arithmeticMean);
            });
    };

    const addtoTop10PolluMean = async (e) => {
        e.preventDefault()
        let incoming = { polluName: inputVal3 }
        axios
            .post('/api/graph/addTopPolluMean', incoming)
            .then((resAxios) => {
                const p = [];
                const m = [];
                resAxios.data.addPolluMeanCache.map((val, ind) => {
                    if (ind) {
                        p.push(val.pollutant);
                        m.push(val.arithmetic_mean);
                    }
                });
                setpolluName(p);
                setarithMean(m);
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

    //-----------------------Helper---------------------------------

    const [inputVal, setInputVal] = useState("");
    const [inputVal2, setInputVal2] = useState("");
    const [inputVal3, setInputVal3] = useState("");

    const handleTyping = (e) => {
        setInputVal(e.target.value)
        console.log(inputVal)
    }

    const handleTyping2 = (e) => {
        setInputVal2(e.target.value)
        console.log(inputVal2)
    }

    const handleTyping3 = (e) => {
        setInputVal3(e.target.value)
        console.log(inputVal3)
    }

    const emptyGraph1 = async (e) => {
        e.preventDefault()
        pollutantName.length = 0;
        numofPollutant.length = 0;
        console.log(pollutantName);
        console.log(numofPollutant);
        axios.get('/api/graph/empty');
    };

    const emptyGraph2 = async (e) => {
        e.preventDefault()
        cityName.length = 0;
        arithmeticMean.length = 0;
        console.log(cityName);
        console.log(arithmeticMean);
        axios.get('/api/graph/empty2');
    };

    const emptyGraph3 = async (e) => {
        e.preventDefault()
        pollu.length = 0;
        arithMean.length = 0;
        console.log(pollu);
        console.log(arithMean);
        axios.get('/api/graph/empty3');
    };

    //------------------------HTML----------------------------------
    return (
        <div className="Graph" >
            <header className="header">
                <h2>
                    Graph
                </h2>
            </header>
            <div className="graph_box">
                <form onSubmit={graphSubmit}>
                    <h1>observation count with states</h1>

                    <button className="graph_btn" type="submit">
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
            
            <div className="graph_box">
                <form onSubmit={graphtop10}>
                    <h1>Top 10 Pollutants</h1>

                    <button className="graph_btn" type="submit">
                        Render Static Graph
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
                <form onSubmit={addtoTop10Pollutant}>
                    <input type="text" value={inputVal} onChange={handleTyping} />
                    <button className='graph_btn' type="submit">Add</button>
                </form>
                <form onSubmit={emptyGraph1}>
                    <button className="graph_btn" type="submit"> Reset </button>
                </form>
                <p><small><i>(Enter a pollutant)</i></small></p>
            </div>
            
            <div className="graph_box">
                <form onSubmit={graphtop10cities}>
                    <h1>Top 10 Cities</h1>

                    <button className="graph_btn" type="submit">
                        Render Static Graph
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
                <form onSubmit={addtoTop10Cities}>
                    <input type="text" value={inputVal2} onChange={handleTyping2} />
                    <button className='graph_btn' type="submit">Add</button>
                </form>
                <form onSubmit={emptyGraph2}>
                    <button className="graph_btn" type="submit">
                        Reset
                    </button>
                </form>
                <p><small><i>(Enter a city)</i></small></p>
            </div>

            <div className="graph_box">
                <form onSubmit={graphtop10mean}>
                    <h1>Top 10 Pollutant Mean</h1>

                    <button className="graph_btn" type="submit">
                        Render Static Graph
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
                <form onSubmit={addtoTop10PolluMean}>
                    <input type="text" value={inputVal3} onChange={handleTyping3} />
                    <button className='graph_btn' type="submit">Add</button>
                </form>
                <form onSubmit={emptyGraph3}>
                    <button className="graph_btn" type="submit">
                        Reset
                    </button>
                    <p><small><i>(Enter a pollutant)</i></small></p>
                </form>
            </div>

            <div className='graph_blank'></div>

        </div>


    );
}

export default Graph
