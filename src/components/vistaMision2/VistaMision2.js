import React, { useEffect, useRef } from 'react';
import Globe from 'globe.gl';
import * as d3 from 'd3-scale';
import { Dropdown, Row, Col } from 'react-bootstrap';

import SismoChart from '../../components/graficas/SismoChart.js';
import './vistaMision2.css'; // Archivo CSS para estilos adicionales.

function VistaMision2(props) {
  const globeEl = useRef();
  const containerRef = useRef(); // Referencia al contenedor de la columna

  useEffect(() => {
    const colorScale = d3.scaleOrdinal(['orangered', 'mediumblue', 'darkgreen', 'yellow']);

    const labelsTopOrientation = new Set([
      'Apollo 12', 'Luna 2', 'Luna 20', 'Luna 21', 'Luna 24', 'LCROSS Probe'
    ]);

    const planet = Globe()
      .globeImageUrl('/images/2k_mars.jpg')
      .bumpImageUrl('/images/lunar_bumpmap.jpg')
      .backgroundImageUrl('//unpkg.com/three-globe/example/img/night-sky.png')
      .showGraticules(true)
      .showAtmosphere(false)
      .labelText('label')
      .labelSize(1.7)
      .labelDotRadius(0.4)
      .labelDotOrientation(d => labelsTopOrientation.has(d.label) ? 'top' : 'bottom')
      .labelColor(d => colorScale(d.agency))
      .labelLabel(d => `
        <div><b>${d.label}</b></div>
        <div>${d.agency} - ${d.program} Program</div>
        <div>Landing on <i>${new Date(d.date).toLocaleDateString()}</i></div>
      `)
      .onLabelClick(d => window.open(d.url, '_blank'));

    // Render the globe in the element referenced by globeEl
    planet(globeEl.current);

    // Ajustar el tamaño del globo para que se ajuste a la columna contenedora
    const resizeGlobe = () => {
      if (containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect();
        planet.width(width).height(height); // Ajustar el globo al tamaño del contenedor
      }
    };

    // Ajustar el tamaño inicial
    resizeGlobe();

    // Escuchar cambios de tamaño de la ventana
    window.addEventListener('resize', resizeGlobe);

    // Cleanup para evitar fugas de memoria
    return () => {
      window.removeEventListener('resize', resizeGlobe);
    };
  }, []);

  return (
    <div className="vista-mision-container" style={{background: "black"}}>
      {/* Menú desplegable encima del planeta */}
      <Dropdown className="menu-desplegable">
        <Dropdown.Toggle variant="secondary" id="dropdown-basic">
          Opciones de Misión
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item href="#/action-1">Ver Misión Apollo</Dropdown.Item>
          <Dropdown.Item href="#/action-2">Ver Misión Luna</Dropdown.Item>
          <Dropdown.Item href="#/action-3">Ver Misión Marte</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

      {/* Contenedor del planeta y la gráfica */}
      <Row className="content">
        <Col xs={12} md={7} lg={7} xl={7} className="globo-mision1" ref={containerRef}>
          <div ref={globeEl} className="globo-container"></div>
        </Col>

        <Col xs={12} md={5} lg={5} xl={5} className="grafica-mision1">
          <SismoChart {...props} />
        </Col>
      </Row>
    </div>
  );
}

export default VistaMision2;
