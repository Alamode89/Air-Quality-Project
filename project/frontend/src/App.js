import './App.css';
import AirQuality from './Components/AirQuality/AirQuality';
import Graph from './Components/Graph/Graph';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from './Components/Layer/Header';
import Footer from "./Components/Layer/Footer"

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Footer />

        <Routes>
          <Route exact path='/' element={<AirQuality />} />
          <Route exact path='/graph' element={<Graph />} />
        </Routes>
      
      </Router>
    </div>
  );
}

export default App;
