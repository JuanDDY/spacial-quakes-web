import React, { useEffect, useRef, useState} from 'react';
import Globe from 'globe.gl';
import * as d3 from 'd3-scale';
import { Card, Collapse, Button, Row, Col } from 'react-bootstrap';

import SismoChart from '../../components/graficas/SismoChart.js';
import './vistaMision2.css'; // Archivo CSS para estilos adicionales.

function VistaMision2(props) {

  const globeEl = useRef();
  const containerRef = useRef(); // Referencia al contenedor de la columna

  const [open, setOpen] = useState(false);


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
      return (
    <div className="menu-desplegable">
    
      <Button
        onClick={() => setOpen(!open)}
        aria-controls="example-collapse-text"
        aria-expanded={open}
      >
        click
      </Button>
      <div style={{ minHeight: '150px' }}>
        <Collapse in={open} dimension="width">
          <div id="example-collapse-text">
            <Card body style={{ width: '400px' }}>
              Anim pariatur cliche reprehenderit, enim eiusmod high life
              accusamus terry richardson ad squid. Nihil anim keffiyeh
              helvetica, craft beer labore wes anderson cred nesciunt sapiente
              ea proident.
            </Card>
          </div>
        </Collapse>
      </div>
    </div>
  );

      {/* Contenedor del planeta y la gráfica */}
      <Row className="content">
        <Col xs={12} md={7} lg={7} xl={7} className="globo-mision1" ref={containerRef}>
          <div ref={globeEl} className="globo-container"></div>
        </Col>

        <Col xs={12} md={5} lg={5} xl={5} className="grafica-mision1">
            <Row>
                <Col xs={12} md={12} lg={12} xl={12}>
                    <SismoChart {...props} />
                </Col>
                <Col xs={12} md={12} lg={12} xl={12}>
                    <h1>acaco</h1>
                </Col>
            </Row>
        </Col>
        
      </Row>
    </div>
  );
}

export default VistaMision2;
