import React, { useEffect, useState } from "react";
import "./Home.css";
import { Link } from "react-router-dom";

function Home() {
  const [isMarteModalOpen, setIsMarteModalOpen] = useState(false);
  const [isLunaModalOpen, setIsLunaModalOpen] = useState(false);
  const [marteTab, setMarteTab] = useState(0);
  const [lunaTab, setLunaTab] = useState(0);
  const [showOverlay, setShowOverlay] = useState(false);

  const handleNextMarteTab = () => setMarteTab((t) => (t + 1) % 2);
  const handleNextLunaTab = () => setLunaTab((t) => (t + 1) % 2);

  const closeModal = () => {
    setIsMarteModalOpen(false);
    setIsLunaModalOpen(false);
    setMarteTab(0);
    setLunaTab(0);
  };

  // Cerrar con tecla Escape
  useEffect(() => {
    const onEsc = (e) => {
      if (e.key === "Escape") {
        setShowOverlay(false);
        closeModal();
      }
    };
    window.addEventListener("keydown", onEsc);
    return () => window.removeEventListener("keydown", onEsc);
  }, []);

  // Bloquear scroll del body cuando haya overlay o modales abiertos
  useEffect(() => {
    const open = isMarteModalOpen || isLunaModalOpen || showOverlay;
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMarteModalOpen, isLunaModalOpen, showOverlay]);

  // Pre-carga de imágenes para evitar parpadeos
  useEffect(() => {
    const sources = [
      "/imagesHome/marte_home2.png",
      "/imagesHome/luna_home2.png",
      "/imagesHome/astronauta4.png",
    ];
    sources.forEach((src) => {
      const img = new Image();
      img.src = process.env.PUBLIC_URL + src;
    });
  }, []);

  return (
    <div className="home-container">
      {/* GIF de fondo */}
      <div className="background-gif"></div>

      {/* Título principal */}
      <div className="titulo-container" length={1}>
        <h1>Explora y detecta sismos en otros mundos</h1>
      </div>

      {/* Imágenes centrales */}
      <div className="centro-imagen">
        <img
          src={process.env.PUBLIC_URL + "/imagesHome/marte_home2.png"}
          alt="Marte"
          className="marte-img"
          role="button"
          tabIndex={0}
          onClick={() => {
            setIsMarteModalOpen(true);
            setMarteTab(0);
            setIsLunaModalOpen(false);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              setIsMarteModalOpen(true);
              setMarteTab(0);
              setIsLunaModalOpen(false);
            }
          }}
        />
        <img
          src={process.env.PUBLIC_URL + "/imagesHome/luna_home2.png"}
          alt="Luna"
          className="luna-img"
          role="button"
          tabIndex={0}
          onClick={() => {
            setIsLunaModalOpen(true);
            setLunaTab(0);
            setIsMarteModalOpen(false);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              setIsLunaModalOpen(true);
              setLunaTab(0);
              setIsMarteModalOpen(false);
            }
          }}
        />
        <div className="astronauta-wrap">
          <img
            src={process.env.PUBLIC_URL + "/imagesHome/astronauta4.png"}
            alt="Astronauta"
            className="astronauta-img"
          />
        </div>

      </div>

      {/* Botón para empezar misión */}
      <div className="boton-container">
        <button
          className="boton-mision"
          onClick={() => setShowOverlay(true)}
          aria-haspopup="dialog"
          aria-expanded={showOverlay}
        >
          Empezar misión
        </button>
      </div>

      <div className="seisminds-text">
        <Link to="/descripcion">SEISMinds</Link>
      </div>

      {/* Modal de Marte */}
      {isMarteModalOpen && (
        <div
          className="modal-overlay"
          role="dialog"
          aria-modal="true"
          aria-labelledby="marte-title"
          onClick={closeModal}
        >
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2 id="marte-title">Explora Marte</h2>
            {marteTab === 0 && (
              <div>
                <p>Datos Curiosos:</p>
                <ul>
                  <li>Un día en Marte dura 24.6 horas.</li>
                  <li>Marte tiene las montañas más altas del sistema solar.</li>
                </ul>
              </div>
            )}
            {marteTab === 1 && (
              <div>
                <p>¿Sabías que?</p>
                <ul>
                  <li>Los sismos en Marte son conocidos como "martemotos".</li>
                  <li>La atmósfera de Marte es 100 veces más delgada que la de la Tierra.</li>
                </ul>
              </div>
            )}
            <button onClick={handleNextMarteTab} className="arrow-button" aria-label="Siguiente">
              →
            </button>
            <button onClick={closeModal} className="close-button" aria-label="Cerrar">
              Cerrar
            </button>
          </div>
        </div>
      )}

      {/* Modal de la Luna */}
      {isLunaModalOpen && (
        <div
          className="modal-overlay"
          role="dialog"
          aria-modal="true"
          aria-labelledby="luna-title"
          onClick={closeModal}
        >
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2 id="luna-title">Explora la Luna</h2>
            {lunaTab === 0 && (
              <div>
                <p>Datos Curiosos:</p>
                <ul>
                  <li>La Luna siempre muestra la misma cara a la Tierra.</li>
                  <li>Un día lunar dura aproximadamente 29 días terrestres.</li>
                </ul>
              </div>
            )}
            {lunaTab === 1 && (
              <div>
                <p>¿Sabías que?</p>
                <ul>
                  <li>Los sismos lunares son mucho más débiles que los de la Tierra.</li>
                  <li>La Luna no tiene atmósfera, por lo que no hay clima.</li>
                </ul>
              </div>
            )}
            <button onClick={handleNextLunaTab} className="arrow-button" aria-label="Siguiente">
              →
            </button>
            <button onClick={closeModal} className="close-button" aria-label="Cerrar">
              Cerrar
            </button>
          </div>
        </div>
      )}

      {/* Overlay que aparece al hacer clic en "Empezar misión" */}
      {showOverlay && (
        <div
          className={`overlay-container show`}
          role="dialog"
          aria-modal="true"
          onClick={(e) => {
            // cerrar solo si se hace click en el fondo (no en el contenido)
            if (e.currentTarget === e.target) setShowOverlay(false);
          }}
        >
          <div className="misiones-container" onClick={(e) => e.stopPropagation()}>
            <h2>Bienvenido a la detección de sismos</h2>
            <p>
              Aquí encontrarás los elementos necesarios para saber todo sobre los sismos en Marte y la Luna.
            </p>
            <div className="botones-mision">
              <div className="boton-wrapper">
                <Link to="/mision1" className="boton-mision1">
                  Misión 1
                </Link>
                <div className="mission-info">
                  <p>Señales con ruido y ondas filtradas para los sismos</p>
                </div>
              </div>

              <div className="boton-wrapper">
                <Link to="/mision2" className="boton-mision2">
                  Misión 2
                </Link>
                <div className="mission-info">
                  <p>Ondas aleatorias para que el usuario intente detectar si es un sismo</p>
                </div>
              </div>

              <div className="boton-wrapper">
                <Link to="/modelo" className="boton-modelo">
                  Modelo
                </Link>
                <div className="mission-info">
                  <p>Explora el modelo de detección.</p>
                </div>
              </div>
            </div>

            <div style={{ marginTop: 24 }}>
              <button className="close-button" onClick={() => setShowOverlay(false)} aria-label="Cerrar">
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
