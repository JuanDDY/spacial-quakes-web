import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import "./SismoChart.css";

const SismoChart = (props) => {
  const chartRef = useRef(null);
  const [data, setData] = useState([]);
  const [displayData, setDisplayData] = useState([]);

  useEffect(() => {
    // Cargar los datos de CSV
    d3.csv(props.dataAddress).then(data => {
      const parsedData = data.map(d => ({
        time: new Date(+d.time *1000000),  // Convertir el tiempo Unix a milisegundos
        amplitude: +d.amplitude  // Asegurarse de que la amplitud sea un número
      }));
      setData(parsedData);
    });
  }, [props.dataAddress]);

  

  useEffect(() => {
    // Actualizar los datos que se muestran según el timeOffset
    const offsetData = data.slice(props.timeOffset, props.timeOffset + 300); 
    
    setDisplayData(offsetData);
  }, [data, props.timeOffset]);

  useEffect(() => {
    // Establecer las dimensiones y márgenes del gráfico
    const margin = { top: 20, right: 30, bottom: 50, left: 100 };
    const width = 800 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    // Seleccionar el contenedor y limpiar gráficos previos
    const svg = d3.select(chartRef.current)
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Escaladores
    const x = d3.scaleTime()
      .domain(d3.extent(displayData, d => new Date(d.time)))  // Ajustar los tiempos
      .range([0, width]);

    const y = d3.scaleLinear()
      .domain([d3.min(displayData, d => d.amplitude), d3.max(displayData, d => d.amplitude)])  // Amplitud
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
      .x(d => x(new Date(d.time)))
      .y(d => y(d.amplitude));

    svg.append('path')
      .datum(displayData)
      .attr('fill', 'none')
      .attr('stroke', 'steelblue')
      .attr('stroke-width', 1.5)
      .attr('d', line);

    // Limpiar el SVG antes de volver a dibujar
    return () => {
      svg.selectAll('*').remove(); // Limpiar el SVG para evitar la superposición
    };
  }, [displayData]); // Renderizar nuevamente cuando cambien los datos que se muestran

  return (
    <svg ref={chartRef}></svg>
  );
};

export default SismoChart;
