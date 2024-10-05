import {Row, Col} from "react-bootstrap";

import GlobeComponent from "../../components/GlobeComponent"

import SismoChart from "../../components/graficas/SismoChart.js"


const VistaMision1 = (props) => {

    console.log(props)
    return (
        <div>
            <Row>
                <Col xs={12} md={2} lg={2} xl={2} className="parametros-mision1" style={{background: "red"}}>
                </Col>

                <Col xs={12} md={5} lg={5} xl={5}  className="globo-mision1">
                    <GlobeComponent />
                </Col>

                <Col xs={12} md={5} lg={5} xl={5}  className="grafica-mision1">
                    <SismoChart dataAddress={props.dataAddres} />
                </Col>
            </Row>

        </div>
    );
}


export default VistaMision1;