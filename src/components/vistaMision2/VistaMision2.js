import React, { useEffect, useRef, useState } from 'react';
import Globe from 'globe.gl';
import * as d3 from 'd3-scale';
import { Card, Collapse, Button, Row, Col, Modal } from 'react-bootstrap';
import SismoChart from '../../components/graficas/SismoChart.js';
import './vistaMision2.css';

function VistaMision2(props) {
  const globeEl = useRef();
  const containerRef = useRef();

  const [open, setOpen] = useState(false);
  const [score, setScore] = useState(10);
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const totalQuestions = 10;
  const [showModal, setShowModal] = useState(false);

  const [timeOffset, setTimeOffset] = useState(0); // Offset de tiempo para el movimiento de la gráfica

  useEffect(() => {
    const colorScale = d3.scaleOrdinal(['orangered', 'mediumblue', 'darkgreen', 'yellow']);

    const labelsTopOrientation = new Set([
      'Apollo 12', 'Luna 2', 'Luna 20', 'Luna 21', 'Luna 24', 'LCROSS Probe'
    ]);

    const planet = Globe()
      .globeImageUrl('/images/2k_mars.jpg')
      .bumpImageUrl('/images/lunar_bumpmap.jpg')
      .showGraticules(true)
      .showAtmosphere(false)
      .backgroundColor('#000000')
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

    planet(globeEl.current);

    const resizeGlobe = () => {
      if (containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect();
        planet.width(width).height(height);
      }
    };

    resizeGlobe();
    window.addEventListener('resize', resizeGlobe);

    return () => {
      window.removeEventListener('resize', resizeGlobe);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeOffset(prevOffset => (prevOffset + 1) % totalQuestions); // Actualizar el desplazamiento
    }, 1000); // Cambiar cada segundo

    return () => clearInterval(interval);
  }, [totalQuestions]);

  const handleAnswer = (isSismo) => {
    const correctAnswer = true; // Suponiendo que la respuesta correcta es que es un sismo
    if (isSismo !== correctAnswer) {
      setScore(score - 1);
    }
    if (currentQuestion < totalQuestions) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowModal(true);
    }
  };

  const resetGame = () => {
    setScore(10);
    setCurrentQuestion(1);
    setShowModal(false);
    setTimeOffset(0); // Reiniciar el desplazamiento
  };

  return (
    <div className="vista-mision-container" style={{ background: "black" }}>
      <h1 style={{ color: 'white', textAlign: 'center', marginTop: '20px' }}>Identifica qué es ruido y qué es sismo</h1>

      <div className="menu-desplegable" style={{ position: 'relative' }}>
        <Button 
          onClick={() => setOpen(!open)} 
          aria-controls="example-collapse-text" 
          aria-expanded={open}
          style={{
            marginLeft: '0px',
            width: '50px',
            height: '50px',
            borderRadius: '50%',
            backgroundColor: 'red',
            border: 'none',
            color: 'white',
            fontSize: '24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer'
          }}
        >
          !
        </Button>
        <div style={{ position: 'absolute', left: '-420px', minHeight: '150px' }}>
          <Collapse in={open} dimension="width">
            <div id="example-collapse-text">
              <Card body style={{ width: '400px' }}>
                En esta misión la idea es a través de lo aprendido lograr identificar de forma visual lo que podría ser un sismo o simplemente ruido.
              </Card>
            </div>
          </Collapse>
        </div>
      </div>

      <Row className="content">
        <Col xs={12} md={7} lg={7} xl={7} className="globo-mision1" ref={containerRef}>
          <div ref={globeEl} className="globo-container"></div>
        </Col>

        <Col xs={12} md={5} lg={5} xl={5} className="grafica-mision1">
          <Row>
            <Col xs={12} md={12} lg={12} xl={12}>
              <div className="grafica-container">
                <SismoChart {...props} timeOffset={timeOffset} /> {/* Pasar el offset de tiempo */}
              </div>
            </Col>
            <Col xs={12} md={12} lg={12} xl={12} style={{ 
              background: 'linear-gradient(100deg, #17294d, #2858b8)',
              borderRadius : '40px',
              marginLeft : '20px',
              padding : '10px', 
              width : '90%', 
              color: 'white', 
              textAlign: 'center',
              minHeight: '300px'
            }}>
              <h1>Energia Restante: {score} Jules</h1>
              <h2>Pregunta {currentQuestion} de {totalQuestions}</h2>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '20px' }}>
                <Button 
                  onClick={() => handleAnswer(true)} 
                  style={{ 
                    width: '200px', 
                    height: '190px', 
                    borderRadius: '50%', 
                    fontSize: '20px', 
                    backgroundColor: '#00bfa5', 
                    border: 'none', 
                    color: 'white', 
                    display: 'inline-block',
                    margin: '10px' 
                  }}>
                  Sismo
                </Button>
                
                <Button 
                  onClick={() => handleAnswer(false)} 
                  style={{ 
                    width: '200px', 
                    height: '190px', 
                    borderRadius: '50%', 
                    fontSize: '20px', 
                    backgroundColor: '#7178df', 
                    border: 'none', 
                    color: 'white', 
                    display: 'inline-block',
                    margin: '10px' 
                  }}>
                  Ruido
                </Button>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>

      <Modal show={showModal} onHide={resetGame}>
        <Modal.Header closeButton>
          <Modal.Title>Puntaje Final</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {score === 0 ? (
            <p>Deberías practicar más</p>
          ) : (
            <p>¡Tu puntaje final es: {score}!</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={resetGame}>
            Jugar de nuevo
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default VistaMision2;
