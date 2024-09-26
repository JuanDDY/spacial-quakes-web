import React, { useState } from 'react';
import './Home.css'; 

function Home() {
  const [isMarteModalOpen, setIsMarteModalOpen] = useState(false);
  const [isLunaModalOpen, setIsLunaModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(0); 

  const handleNextTab = () => {
    setActiveTab((prevTab) => (prevTab + 1) % 2); 
  };

  const closeModal = () => {
    setIsMarteModalOpen(false);
    setIsLunaModalOpen(false);
    setActiveTab(0);
  };

  return (
    <div className="home-container">
      {/* GIF de fondo */}
      <div className="background-gif"></div>

      <div className="titulo-container">
        <h1>Explora y detecta sismos en otros mundos</h1>
      </div>

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

      <div className="boton-container">
        <button className="boton-mision">Empezar misión</button>
      </div>

      <div className="seisminds-text">
        SEISMinds
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
                  <li>La atmósfera de Marte es un 100 veces más delgada que la de la Tierra.</li>
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
    </div>
  );
}

export default Home;
