import React, { useState } from 'react';
import './Home.css';
import { Link } from "react-router-dom";

function Home() {
  const [isMarteModalOpen, setIsMarteModalOpen] = useState(false);
  const [isLunaModalOpen, setIsLunaModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [showOverlay, setShowOverlay] = useState(false); 

  const handleNextTab = () => {
    setActiveTab((prevTab) => (prevTab + 1) % 2);
  };

  const closeModal = () => {
    setIsMarteModalOpen(false);
    setIsLunaModalOpen(false);
    setActiveTab(0);
  };

  const handleOverlayClick = (e) => {
    if (e.target.classList.contains('overlay-container')) {
      setShowOverlay(false); // Cerrar el overlay si se hace clic fuera de los botones
    }
  };

  return (
    <div className="home-container">
      {/* GIF de fondo */}
      <div className="background-gif"></div>

      {/* Título principal */}
      <div className="titulo-container">
        <h1>Explora y detecta sismos en otros mundos</h1>
      </div>

      {/* Imágenes centrales */}
      <div className="centro-imagen">
        <img
          src="imagesHome/marte_home2.png"
          alt="Marte"
          className="marte-img"
          onClick={() => setIsMarteModalOpen(true)}
        />
        <img
          src="imagesHome/luna_home2.png"
          alt="Luna"
          className="luna-img"
          onClick={() => setIsLunaModalOpen(true)}
        />
        <img src="imagesHome/astronauta4.png" alt="Astronauta" className="astronauta-img" />
      </div>

      {/* Botón para empezar misión */}
      <div className="boton-container">
        <button className="boton-mision" onClick={() => setShowOverlay(true)}>Empezar misión</button>
      </div>

      <div className="seisminds-text">
        <Link to="/descripcion/">
          SEISMinds
        </Link>
      </div>

      {/* Modal de Marte */}
      {isMarteModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Explora Marte</h2>
            {activeTab === 0 && (
              <div>
                <p>Datos Curiosos:</p>
                <ul>
                  <li>Un día en Marte dura 24.6 horas.</li>
                  <li>Marte tiene las montañas más altas del sistema solar.</li>
                </ul>
              </div>
            )}
            {activeTab === 1 && (
              <div>
                <p>¿Sabías que?</p>
                <ul>
                  <li>Los sismos en Marte son conocidos como "martemotos".</li>
                  <li>La atmósfera de Marte es 100 veces más delgada que la de la Tierra.</li>
                </ul>
              </div>
            )}
            <button onClick={handleNextTab} className="arrow-button">→</button>
            <button onClick={closeModal} className="close-button">Cerrar</button>
          </div>
        </div>
      )}

      {/* Modal de la Luna */}
      {isLunaModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Explora la Luna</h2>
            {activeTab === 0 && (
              <div>
                <p>Datos Curiosos:</p>
                <ul>
                  <li>La Luna siempre muestra la misma cara a la Tierra.</li>
                  <li>Un día lunar dura aproximadamente 29 días terrestres.</li>
                </ul>
              </div>
            )}
            {activeTab === 1 && (
              <div>
                <p>¿Sabías que?</p>
                <ul>
                  <li>Los sismos lunares son mucho más débiles que los de la Tierra.</li>
                  <li>La Luna no tiene atmósfera, por lo que no hay clima.</li>
                </ul>
              </div>
            )}
            <button onClick={handleNextTab} className="arrow-button">→</button>
            <button onClick={closeModal} className="close-button">Cerrar</button>
          </div>
        </div>
      )}

      {/* Overlay que aparece al hacer clic en "Empezar misión" */}
      {showOverlay && (
        <div className={`overlay-container ${showOverlay ? 'show' : ''}`} onClick={handleOverlayClick}>
          <div className="misiones-container">
            <h2>Bienvenido a la detección de sismos</h2>
            <p>Aquí encontrarás los elementos necesarios para saber todo sobre los sismos en Marte y la Luna.</p>
            <div className="botones-mision">
              <div className="boton-wrapper">
                <Link to="/mision1/">
                  <button 
                    className="boton-mision1"
                    href="/mision1"
                  >
                    Misión 1
                  </button>
                </Link>
                
                <div className="mission-info">
                  <p>Señales con ruido y ondas filtradas para los sismos</p>
                </div>
              </div>

              <div className="boton-wrapper">
                <Link to="/mision2/">
                  <button 
                    className="boton-mision2"
                    href="/mision2"
                  >
                    Misión 2
                  </button>
                </Link>
                
                <div className="mission-info">
                  <p>Ondas aleatorias para que el usario intente detectar si es un sismo</p>
                </div>
              </div>

              <div className="boton-wrapper">
                <Link to="/modelo/">
                  <button 
                    className="boton-modelo"
                    href="/modelo"
                  >
                    Modelo
                  </button>
                </Link>
                

                <div className="mission-info">
                  <p>Explora el modelo de detección.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
