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
            grid: {
                row: {
                    colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
                    opacity: 0.5,
                },
            },
            xaxis: {
                categories: csvDates,
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
            <div className='blank'></div>

        </div>


    );
}

export default Graph