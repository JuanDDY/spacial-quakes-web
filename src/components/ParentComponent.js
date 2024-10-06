import React, { useState, useEffect } from 'react';
import SismoChart from './SismoChart';

const ParentComponent = (props) => {
  const [timeOffset, setTimeOffset] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeOffset(prevOffset => prevOffset + 1000000); // Incremento más rápido
    }, 100000); // Cambia este valor para aumentar o disminuir la velocidad de actualización

    return () => clearInterval(interval); // Limpiar el intervalo al desmontar
  }, []);

  return (
    <div>
      <SismoChart dataAddress={props.dataAddress} timeOffset={timeOffset} />
    </div>
  );
};

export default ParentComponent;
