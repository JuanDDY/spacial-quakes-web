import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import "./SismoChart.css"

const SismoChart = ( props ) => {
  const chartRef = useRef(null);

  const [data, setData] = useState([]);

  useEffect(() => {
    
    d3.csv(props.dataAddress).then(data => {
      var i = 1;
      const parsedData = data.map(d => {
        const time = +d.time;  // Convertir el tiempo a número
        const dataValue = +d.data;  // Convertir la amplitud a número
        if(i === 1) { console.log(d.time); i++; }
        
        // Validar que ambos sean números y no NaN
        if (isNaN(time) || isNaN(dataValue)) {
          console.error(`Dato inválido encontrado en el archivo CSV: time = ${d.time}, data = ${d.data}`);
          return null;  // Ignorar datos inválidos
        }

        return { time, data: dataValue };
      }).filter(d => d !== null);  // Filtrar los valores inválidos

      setData(parsedData);
    });
  }, [props]);

  useEffect(() => {
    if (data.length === 0) return; // Esperar hasta que haya datos

    // Establecer las dimensiones y márgenes del gráfico
    const margin = { top: 20, right: 30, bottom: 50, left: 100 }; // Aumentar el margen izquierdo
    const width = 800 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    // Seleccionar el contenedor y limpiar gráficos previos
    const svg = d3.select(chartRef.current)
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Escaladores
    const x = d3.scaleLinear()  // Cambiar a escala lineal porque el tiempo es numérico
      .domain(d3.extent(data, d => d.time))  // Ajustar los tiempos numéricos
      .range([0, width]);

    const y = d3.scaleLinear()
      .domain([d3.min(data, d => d.data), d3.max(data, d => d.data)])  // Amplitud
      .range([height, 0]);

    // Ejes
    svg.append('g')
      .attr('transform', `translate(0,${height})`)  // Mover el eje X al fondo
      .call(d3.axisBottom(x))
      .selectAll('text')  // Cambiar el color de los textos del eje X a blanco
      .style('fill', 'white');

    svg.append('g')
      .attr('transform', `translate(0,0)`) 
      .call(d3.axisLeft(y))
      .selectAll('text')  // Cambiar el color de los textos del eje Y a blanco
      .style('fill', 'white');

    // Etiquetas de los ejes
    svg.append('text')  // Etiqueta del eje X
      .attr('transform', `translate(${width / 2}, ${height + margin.bottom - 10})`)
      .style('text-anchor', 'middle')
      .attr('fill', 'white')
      .text('Tiempo (segundos)');

    svg.append('text')  // Etiqueta del eje Y
      .attr('transform', 'rotate(-90)')
      .attr('y', 0 - margin.left + 40)  // Mover el label del eje Y más a la izquierda
      .attr('x', 0 - (height / 2))
      .style('text-anchor', 'middle')
      .attr('fill', 'white')
      .text('Velocidad (m/s)');

    // Línea del gráfico
    const line = d3.line()
      .x(d => x(d.time))  // Usar el tiempo como un valor numérico
      .y(d => y(d.data));

    svg.append('path')
      .datum(data)
      .attr('fill', 'none')
      .attr('stroke', 'steelblue')
      .attr('stroke-width', 1.5)
      .attr('d', line);

  }, [data]);

  return (
    <svg ref={chartRef}></svg>
  );
};

export default SismoChart;
