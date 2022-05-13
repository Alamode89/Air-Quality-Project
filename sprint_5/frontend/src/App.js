import './App.css';
import AirQuality from './Components/Test/AirQuality/AirQuality';
import Graph from './Components/Test/Graph/Graph';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from './Components/Layer/Header';
import Footer from "./Components/Layer/Footer";
import Navbar from "./Components/Layer/Navbar";
import Home from './Components/Home/Home';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        {/*<Header />*/}
        <Footer />

        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route exact path='/test/' element={<AirQuality />} />
          <Route exact path='/test/graph' element={<Graph />} />
        </Routes>
      
      </Router>
    </div>
  );
}

export default App;
