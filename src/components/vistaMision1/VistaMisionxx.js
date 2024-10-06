import React, { useEffect, useRef, useState} from 'react';
import Globe from 'globe.gl';
import * as d3 from 'd3-scale';
import { Modal, Dropdown, Card, Collapse, Button, Row, Col, Form } from 'react-bootstrap';

import SismoChart from './SismoChart.js';
import './vistaMision2.css'; // Archivo CSS para estilos adicionales.



function VistaMisionxx(props) {

  const globeEl = useRef();
  const containerRef = useRef(); // Referencia al contenedor de la columna

  const [infoRender, setInfoRender] = useState({
    planetAddress : '/images/lunar_surface.jpg',
    colorOndas : (t => `rgba(255,0,0,1)`)
  })
  const [coordenadas, setCoordenadas] = useState({lat : 0, long: 0, disponibles: false});
  const [openSelectParamters, setOpenSelectParamters] = useState(false);
  const [showModal, setShowModal] = useState(true);
  const [formData, setFormData] = useState({
    calidad: 'A' // Valor por defecto para la calidad
  });
  const [parametersConfirmed, setParametersConfirmed] = useState(false);
  const [dataEnMano, setDataEnMano] = useState(false);
  

  const handleCloseModal = () => setShowModal(false);
  
  const handleFormSubmit = (e) => {
    e.preventDefault();
    const newSismo = {
      lat: coordenadas.lat,
      lng: coordenadas.long,
      maxR: formData.magnitude ? Number(formData.magnitude) : 20,
      propagationSpeed: formData.propagationSpeed ? Number(formData.propagationSpeed) : 5,
      repeatPeriod: 600
    };
    setDataEnMano(true);
    // Agregar nuevo sismo
    setSismos([...sismos, newSismo]);
    setParametersConfirmed(true); // Confirmar parámetros
    setOpenSelectParamters(false); // Cerrar el collapse de los parámetros
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const [sismos, setSismos] = useState([]);
  

  useEffect(() => {

    const planet = Globe()
      .globeImageUrl(infoRender.planetAddress)
      //.bumpImageUrl('/images/lunar_bumpmap.jpg')
      .backgroundImageUrl('//unpkg.com/three-globe/example/img/night-sky.png')
      .showGraticules(false)
      .showAtmosphere(false)
      
      //Captura de coordenadas con click
      .onGlobeClick(({ lat, lng }) => {
        // Al hacer clic en el globo, capturar las coordenadas
        setCoordenadas({ lat: lat, long: lng, disponibles: true });
        setOpenSelectParamters(true); // Abre el formulario para ingresar los parámetros
        setParametersConfirmed(false); // Deshabilitar visualización de sismos hasta que se confirmen los parámetros
      });
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
  }, [infoRender]);



  useEffect(() => {
    if (!parametersConfirmed || !coordenadas.disponibles) return; // No hacer nada si los parámetros no están confirmados

    const gData = [{
      lat: coordenadas.lat,
      lng: coordenadas.long,
      maxR: 20,
      propagationSpeed: 5,
      repeatPeriod: 600
    }];

    // Agregar las ondas sísmicas al globo una vez confirmados los parámetros
    const planet = Globe()
      .globeImageUrl(infoRender.planetAddress)
      .backgroundImageUrl('//unpkg.com/three-globe/example/img/night-sky.png')
      .ringsData(gData)
      .ringColor(() => infoRender.colorOndas)
      .ringMaxRadius('maxR')
      .ringPropagationSpeed('propagationSpeed')
      .ringRepeatPeriod('repeatPeriod')
      
      .onGlobeClick(({ lat, lng }) => {
        // Al hacer clic en el globo, capturar las coordenadas
        setCoordenadas({ lat: lat, long: lng, disponibles: true });
        setOpenSelectParamters(true); // Abre el formulario para ingresar los parámetros
        setParametersConfirmed(false); // Deshabilitar visualización de sismos hasta que se confirmen los parámetros
      });
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
  }, [parametersConfirmed, coordenadas, infoRender, formData]);


  return (
    <div className="vista-mision-container" style={{background: "black"}}>
      
      {/* Menú desplegable encima del planeta */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Instrucciones</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>En esta misión se podra visualizar un sismo en la luna o en marte, con la señal en bruto y la señal despues de pasar por nuestro modelo.</p>
          <p>Antes de empezar usted puede elegir entre ver la mision de la luna o de marte, con el desplegable "Opciones de Misión".</p>
          <p>Seleccione el punto en donde quiere recrear el sismo y luego ajuste los parámetros para el sismo.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleCloseModal}>
            Entendido
          </Button>
        </Modal.Footer>
      </Modal>

      <div className="menu-desplegable">
            <Dropdown drop={"end"}>
                <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                Opciones de Misión
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item 
                     onClick={() => setInfoRender({ planetAddress: '/images/lunar_surface.jpg', 
                                                    colorOndas : (t => `rgba(255,100,50,1)`)
                                                  })} 
                    className="custom-dropdown-item-luna">
                      Ver Misión Luna
                  </Dropdown.Item>
                  <Dropdown.Item 
                    onClick={() => setInfoRender({ planetAddress: '/images/2k_mars.jpg', 
                                                  colorOndas : (t => `rgba(50, 150, 255, 1)`)
                                                })} 
                    className="custom-dropdown-item-marte">
                      Ver Misión Marte
                  </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
            <br></br>

            {/* Formulario dinámico para ajustar parámetros del sismo */}
            <Collapse in={openSelectParamters}>
              <div id="example-collapse-text">
                <Card body style={{ width: '400px' }}>
                  <Form onSubmit={handleFormSubmit}>
                    <Form.Group controlId="formCalidad">
                      <Form.Label>Calidad del Sismo</Form.Label>
                      <Form.Control
                        as="select"
                        name="calidad"
                        value={formData.calidad}
                        onChange={handleInputChange}
                        required
                      >
                        <option value="A">A</option>
                        <option value="B">B</option>
                        <option value="C">C</option>
                      </Form.Control>
                    </Form.Group>

                    <Button variant="primary" type="submit">
                      Confirmar Parámetros
                    </Button>
                  </Form>
                </Card>
              </div>
            </Collapse>
        </div>
  

      {/* Contenedor del planeta y la gráfica */}
      <Row className="content">
        <Col xs={12} md={7} lg={7} xl={7} className="globo-mision1" ref={containerRef}>
          <div ref={globeEl} className="globo-container"></div>
        </Col>
        
        {dataEnMano &&
        <Col xs={12} md={5} lg={5} xl={5} className="grafica-mision1">
            <Row>
                <Col xs={12} md={12} lg={12} xl={12}>
                    <h2>Pruebas</h2>
                    <SismoChart {...props} />
                </Col>
                <Col xs={12} md={12} lg={12} xl={12}>
                    <h2>Señal limpia</h2>
                    <SismoChart {...props} />
                </Col>
            </Row>
        </Col>
        }
      </Row>
    </div>
  );
}

export default VistaMisionxx;
