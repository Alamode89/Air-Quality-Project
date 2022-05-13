import './App.css';
import AirQuality from './Components/Test/AirQuality/AirQuality';
import AirQualityGraph from './Components/Test/Graph/Graph';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from './Components/Layer/Header';
import Footer from "./Components/Layer/Footer";
import Navbar from "./Components/Layer/Navbar";
import Home from './Components/Home/Home';
import Graph from './Components/Graph/Graph';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        {/*<Header />*/}
        <Footer />

        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route exact path='/graph' element={<Graph />} />
          <Route exact path='/test' element={<AirQuality />} />
          <Route exact path='/test/graph' element={<AirQualityGraph />} />
        </Routes>
      
      </Router>
    </div>
  );
}

export default App;
