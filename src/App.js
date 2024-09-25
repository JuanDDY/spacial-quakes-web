import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

import GlobeComponent from './components/GlobeComponent'; 
import NavBar from './components/NavBar'; 
import Home from './components/Home'; 

function App() {
  return (
    <div className="App">
      <NavBar></NavBar>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/simulate" element={<GlobeComponent />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

