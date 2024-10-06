import React, {useEffect, useState} from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

import GlobeComponent from './components/GlobeComponent'; 
import NavBar from './components/NavBar'; 
import Home from './components/Home'; 

import Modelo from './components/modelo/modelo'; 

import SismoChart from './components/graficas/SismoChart'; 
import Graffic2 from './components/graficas/Graffic2'; 

import Grupo_descripcion from './components/Grupo_descripcion';

import VistaMision1 from './components/vistaMision1/VistaMision1'; 
import VistaMision2 from './components/vistaMision2/VistaMision2'; 


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
  
  const [dataAddress, setDataAddres] = useState("/dataProvisional/pruebas.csv");

   

  return (
    <div className="App">
      <NavBar></NavBar>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/simulate" element={<GlobeComponent />} />
          <Route path="/modelo" element={<Modelo dataAddress={dataAddress} />} /> 
          <Route path="/grafica" element={<SismoChart dataAddress={dataAddress} />} />
          <Route path="/mision1" element={<VistaMision1 dataAddress={dataAddress}/>} />
          <Route path="/mision2" element={<VistaMision2 dataAddress={dataAddress} />} />
          <Route path="/descripcion" element={<Grupo_descripcion/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

