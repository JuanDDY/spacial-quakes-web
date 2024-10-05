import React, {useEffect, useState} from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

import GlobeComponent from './components/GlobeComponent'; 
import NavBar from './components/NavBar'; 
import Home from './components/Home'; 

import SismoChart from './components/SismoChart'; 
import Graffic2 from './components/Graffic2'; 

import * as d3 from 'd3';


/*
async function loadCSV(url) {
  const response = await fetch(url); 
  const text = await response.text(); 
  const rows = text.split('\n');
  const data = rows.map(row => row.split(','));
  //console.log(data); 
  const data2 = data.slice(1).map(d => ({
    date: new Date(d[0]), // Convertir la fecha a un objeto Date
    close: +d[1]          // Convertir el valor de cierre a número
  }));
  //console.log(data2);
  return data2;
}
const datitos = await loadCSV('/dataProvisional/pruebas.csv');
console.log(datitos);
*/ 



function App() {
  
  const [data, setData] = useState([]);

  useEffect(() => {
    // D3 puede manejar el formato ISO 8601 directamente
    d3.csv("/dataProvisional/pruebas1000.csv").then(data => {
      const parsedData = data.map(d => ({
        time: new Date(+d.time * 1000),  // Convertir el tiempo Unix a milisegundos
        amplitude: +d.amplitude  // Asegurarse de que la amplitud sea un número
      }));
      console.log(parsedData)
      setData(parsedData);
    });
  }, []);
  

  return (
    <div className="App">
      <NavBar></NavBar>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/simulate" element={<GlobeComponent />} />
          <Route path="/grafica" element={<SismoChart data={data} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

