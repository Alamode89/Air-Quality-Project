import React, { useState, useEffect, Component } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";
import "./AirQuality.css";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
        border: 0,
    },
}));

const Import = () => {
    const [filename, setfileaname] = useState("");
    const [error, setError] = useState("");
    const [rows, setRows] = useState([]);
    const [columns, setColumns] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const [filenames, setfilenames] = useState([
        "air_quality",
        "india_air_quality",
        "newyork_airquality",
        "random_data",
        "SampleCSV",
    ]);

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

    return (
    <div className="AirQuality">
      <div className="import-div">
        {/* onchnage we are saving filename in to the state */}
        <TextField
          id="outlined-basic"
          label="Type here"
          variant="outlined"
          onChange={(e) => {
            setError("");
            setfileaname(e.target.value);
          }}
        />
        {/* on button click it will call an API */}
        <span style={{ marginLeft: "8px" }}>
          <Button
            variant="contained"
            size="large"
            style={{ height: "53px" }}
            onClick={() => importData()}
          >
            Import
          </Button>
        </span>
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
      {isLoading ? (
        <CircularProgress />
      ) : (
        <div style={{ marginTop: "30px" }}>
          {rows.length ? (
            //   this is table to show data
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    {columns.map((col) =>
                      col ? (
                        <StyledTableCell>{col}</StyledTableCell>
                      ) : (
                        <StyledTableCell>id</StyledTableCell>
                      )
                    )}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <StyledTableRow key={row.name}>
                      {row.map((col) =>
                        col ? <StyledTableCell>{col}</StyledTableCell> : null
                      )}
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            //   if do not have any data we will show this message instead of empty table
            <h4>Please enter filename to import that file...</h4>
          )}
        </div>
      )}
    </div>
  );
};

export default Import;