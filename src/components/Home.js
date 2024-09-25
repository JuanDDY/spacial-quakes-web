import './Home.css'; 

function Home() {
  return (
    <div className="home-container">
      {/* Contenedor de título centrado */}
      <div className="titulo-container">
        <h1>Explora y detecta sismos en otros mundos</h1>
      </div>

      {/* Contenedor de imágenes centrado */}
      <div className="centro-imagen">
        <img src="imagesHome/marte_home2.png" alt="Marte" className="marte-img" />
        <img src="imagesHome/luna_home2.png" alt="Luna" className="luna-img" />
        <img src="imagesHome/astronauta4.png" alt="Astronauta" className="astronauta-img" />
      </div>

      {/* Botón centrado */}
      <div className="boton-container">
        <button className="boton-mision">Empezar misión</button>
      </div>

      {/* Texto en la parte inferior derecha */}
      <div className="seisminds-text">
        SEISMinds
      </div>
    </div>
  );
}

export default Home;
