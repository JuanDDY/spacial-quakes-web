import React, { useEffect, useRef, useState, useCallback } from 'react';
import Globe from 'globe.gl';
import { Button, Row, Col, Modal, Dropdown } from 'react-bootstrap';

import './vistaMision2.css';

import SismoChart from './SismoChart.js';

function VistaMision2() {

  const globeEl = useRef();
  const containerRef = useRef();

  const [score, setScore] = useState(10);
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0); // Contador de respuestas correctas
  const totalQuestions = 10;
  const [showModal, setShowModal] = useState(false);
  
  const [csvFileSucio, setCsvFileSucio] = useState('');
  const [currentSignalType, setCurrentSignalType] = useState('sismo'); // Tipo de señal actual (por ahora solo sismo)

  const [formData, ] = useState({
    calidad: 'A' // Valor por defecto para la calidad
  });

  const [qualities, ] = useState(['A', 'B', 'C'])

  const [infoRender, setInfoRender] = useState({
    planetAddress : '/images/lunar_surface.jpg',
    colorOndas : (t => `rgba(255,0,0,1)`)
  })




  const getTipeByIndex = useCallback((index) => {
    if(index === 0){
      return 'sismo';
    } else {
      return 'ruido';
    }
  }, []);


  // Seleccionar un archivo CSV aleatorio
  const selectRandomFile = useCallback(() => {

    var indexType = 0;
    var numFile = 0;
    var pathFile = '';
    var qualitySeismic = 0;

    if(infoRender.carpeta === "lunar"){

      indexType = Math.floor(Math.random() * 2);
      setCurrentSignalType(getTipeByIndex(indexType))
      //console.log("Tipo de señal: " + indexType)
      //console.log("Tipo de señal: " + getTipeByIndex(indexType))
      if(indexType === 0){
        qualitySeismic = Math.floor(Math.random() * 3)
        numFile = Math.floor(Math.random() * 10)
        pathFile = `/data/lunar/${qualities[qualitySeismic]}/Moon-APOLLO_${qualities[qualitySeismic]}_${numFile}.csv`
        setCsvFileSucio(pathFile);
      } else {
        numFile = Math.floor(Math.random() * 10)
        pathFile = `/data/lunar/no_seismic/Moon-APOLLO_noseismic_${numFile}.csv`
        setCsvFileSucio(pathFile);
      }
    
    } else {
      
      indexType = Math.floor(Math.random() * 2);
      setCurrentSignalType(getTipeByIndex(indexType))
      //console.log("Tipo de señal: " + indexType)
      //console.log("Tipo de señal: " + getTipeByIndex(indexType))
      if(indexType === 0){
        qualitySeismic = Math.floor(Math.random() * 3)
        if(qualitySeismic === 0){
          numFile = Math.floor(Math.random() * 5)
        } else {
          numFile = Math.floor(Math.random() * 10)
        }
        pathFile = `/data/mars/${qualities[qualitySeismic]}/Mars-InSight_${qualities[qualitySeismic]}_${numFile}.csv`
        setCsvFileSucio(pathFile);
      } else {
        numFile = Math.floor(Math.random() * 10)
        pathFile = `/data/mars/no_seismic/Mars-InSight_noseismic_${numFile}.csv`
        setCsvFileSucio(pathFile);
      }
    }
    //console.log("Path del archivo: " + pathFile)
  }, [infoRender.carpeta, qualities, getTipeByIndex]);


  useEffect(() => {

    const N = 10;
    const gData = [...Array(N).keys()].map(() => ({
      lat: (Math.random() - 0.5) * 180,
      lng: (Math.random() - 0.5) * 360,
      maxR: Math.random() * 18 + 5,
      propagationSpeed: Math.random() * 10 + 1,
      repeatPeriod: Math.random() * 2000 + 200
    }));

    const planet = Globe()
      .globeImageUrl(infoRender.planetAddress)
      //.bumpImageUrl('/images/lunar_bumpmap.jpg')
      .showGraticules(false)
      .showAtmosphere(false)
      .backgroundColor('#000000')
      
      .ringsData(gData)
      .ringColor(() => infoRender.colorOndas)
      .ringMaxRadius('maxR')
      .ringPropagationSpeed('propagationSpeed')
      .ringRepeatPeriod('repeatPeriod')

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
  }, [infoRender]);

  

  // Inicializar el juego con un archivo aleatorio al cargar el componente
  useEffect(() => {
    if (infoRender.carpeta) {
      selectRandomFile();
    }
  }, [infoRender.carpeta, formData.calidad, selectRandomFile]);


  useEffect(() => {    
      selectRandomFile();
  }, [selectRandomFile]);

  const handleAnswer = (isSismo) => {
    // Determinar si la respuesta es correcta basándose en el tipo de señal actual
    const correctAnswer = currentSignalType === 'sismo'; // true si es sismo, false si es ruido
    const isCorrect = isSismo === correctAnswer;
    
    // Si la respuesta es correcta, incrementar el contador
    if (isCorrect) {
      setCorrectAnswersCount(correctAnswersCount + 1);
    } else {
      // Si es incorrecta, reducir el score
      setScore(score - 1);
    }
    
    // Avanzar a la siguiente pregunta
    if (currentQuestion < totalQuestions) {
      setCurrentQuestion(currentQuestion + 1);
      
      // Seleccionar un nuevo archivo aleatorio para la siguiente pregunta
      selectRandomFile();
    } else {
      // Si es la última pregunta, mostrar el modal de resultados
      setShowModal(true);
    }
  };

  const resetGame = () => {
    setScore(10);
    setCurrentQuestion(1);
    setCorrectAnswersCount(0); // Reiniciar el contador de respuestas correctas
    setShowModal(false);
    // Seleccionar un nuevo archivo para empezar
    selectRandomFile();
  };

  return (
    <div className="vista-mision-container" style={{ background: "black" }}>

      <div
        className="menu-desplegable-planeta"
        style={{
          position: 'fixed',
          top: '70px',           // padding pequeño desde el borde superior
          left: '10px',          // padding pequeño desde el borde izquierdo
          zIndex: 2100           // por encima del globo y del contenido
        }}
      >
        <Dropdown drop="end">
          <Dropdown.Toggle variant="secondary" id="dropdown-basic">
            Opciones de Misión
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item
              onClick={() =>
                setInfoRender({
                  planetAddress: '/images/lunar_surface.jpg',
                  colorOndas: (t) => `rgba(255,100,50,1)`,
                  carpeta: 'lunar'
                })
              }
              className="custom-dropdown-item-luna"
            >
              Ver Misión Luna
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() =>
                setInfoRender({
                  planetAddress: '/images/2k_mars.jpg',
                  colorOndas: (t) => `rgba(50, 150, 255, 1)`,
                  carpeta: 'mars'
                })
              }
              className="custom-dropdown-item-marte"
            >
              Ver Misión Marte
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>

      <div className="titulo-container" length={1}>
        <h1>Identifica qué es ruido y qué es sismo</h1>
      </div>


      <Row className="content">
        <Col xs={12} md={6} lg={6} xl={6} className="globo-mision1" ref={containerRef}>
          <div ref={globeEl} className="globo-container"></div>
        </Col>

        <Col xs={12} md={6} lg={6} xl={6} className="grafica-mision1">
          
          {/* Contenedor de la gráfica con altura fija */}
          <div className="grafica-container">
            <SismoChart key={csvFileSucio} dataAddress={csvFileSucio} />  
          </div>
          
          {/* Contenedor de botones mejorado */}
          <div className="buttons-container">
            <h1>⚡ Energía Restante: {score} Jules</h1>
            <h2> Pregunta {currentQuestion} de {totalQuestions}</h2>
            <h3>✅ Respuestas Correctas: {correctAnswersCount}</h3>
            
            <div className="game-buttons">
              <Button 
                onClick={() => handleAnswer(true)} 
                className="game-button sismo-button"
              >
                🌍 Sismo
              </Button>
              
              <Button 
                onClick={() => handleAnswer(false)} 
                className="game-button ruido-button"
              >
                📡 Ruido
              </Button>
            </div>
          </div>
          
        </Col>
      </Row>

      <Modal show={showModal} onHide={resetGame} style={{ zIndex: 10000 }}>
        <Modal.Header closeButton>
          <Modal.Title>Puntaje Final</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>¡Juego terminado!</p>
          <p><strong>Energía restante:</strong> {score} Jules</p>
          <p><strong>Respuestas correctas:</strong> {correctAnswersCount} de {totalQuestions}</p>
          <p><strong>Precisión:</strong> {((correctAnswersCount / totalQuestions) * 100).toFixed(1)}%</p>
          {score === 0 ? (
            <p style={{color: 'red'}}>¡Te quedaste sin energía! Deberías practicar más.</p>
          ) : correctAnswersCount >= 8 ? (
            <p style={{color: 'green'}}>¡Excelente trabajo! Tienes muy buen ojo para detectar sismos.</p>
          ) : correctAnswersCount >= 6 ? (
            <p style={{color: 'orange'}}>¡Buen trabajo! Con un poco más de práctica serás un experto.</p>
          ) : (
            <p style={{color: 'red'}}>Necesitas más práctica para mejorar tu detección de sismos.</p>
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