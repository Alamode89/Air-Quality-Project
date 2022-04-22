import './App.css';
// import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import AirQuality from './Components/AirQuality';
import Import from "./Components/import";


// import Tabs from './Components/Tabs';
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function App() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Box sx={{ width: "100%" }}>
      {/* moved header here so in will be same on both tabs */}
      <header className="header">
        <p>CS180 Air Quality Data - Yahallo</p>
      </header>
      <Box
        sx={{
          borderBottom: 1,
          borderColor: "divider",
          display: "flex",
          justifyContent: "center",
        }}
      >
        {/* this is used for tabs, on clicking on differnt tabs component will change */}
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="AirQuality" {...a11yProps(0)} />
          <Tab label="Import" {...a11yProps(1)} />
        </Tabs>
      </Box>
      {/* this one for initial tab for search */}
      <TabPanel value={value} index={0}>
        <AirQuality />
      </TabPanel>
      {/* this one for 2nd tab for import */}
      <TabPanel value={value} index={1}>
        <Import />
      </TabPanel>
    </Box>
  );
}

export default App;