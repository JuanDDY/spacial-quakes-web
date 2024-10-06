import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import "./SismoChart.css";

const SismoChart = ({ dataAddress, timeOffset }) => {
  const chartRef = useRef(null);
  const [data, setData] = useState([]);
  const [displayData, setDisplayData] = useState([]);

  useEffect(() => {
    // Cargar los datos de CSV
    if (dataAddress) {
      d3.csv(dataAddress).then(data => {
        const parsedData = data.map(d => ({
          time: new Date(+d.time * 1000),  // Convertir el tiempo Unix a milisegundos
          amplitude: +d.amplitude,  // Asegurarse de que la amplitud sea un número
        }));
        setData(parsedData);
      });
    }
  }, [dataAddress]);

  useEffect(() => {
    if (data.length > 0) {
      // Actualizar los datos que se muestran según el timeOffset
      const offsetData = data.slice(timeOffset, timeOffset + 300); 
      setDisplayData(offsetData);
    }
  }, [data, timeOffset]);

  useEffect(() => {
    if (displayData.length > 0) {
      // Establecer las dimensiones y márgenes del gráfico
      const margin = { top: 20, right: 30, bottom: 50, left: 100 };
      const width = 800 - margin.left - margin.right;
      const height = 400 - margin.top - margin.bottom;

      // Limpiar gráficos previos
      d3.select(chartRef.current).selectAll("*").remove();

      // Crear el contenedor SVG
      const svg = d3.select(chartRef.current)
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);

      // Escaladores
      const x = d3.scaleTime()
        .domain(d3.extent(displayData, d => new Date(d.time)))
        .range([0, width]);

      const y = d3.scaleLinear()
        .domain([d3.min(displayData, d => d.amplitude), d3.max(displayData, d => d.amplitude)])
        .range([height, 0]);

      // Ejes
      svg.append('g')
        .attr('transform', `translate(0,${height})`)
        .call(d3.axisBottom(x).tickFormat(d3.timeFormat("%H:%M:%S")))
        .selectAll('text')
        .style('fill', 'white');

      svg.append('g')
        .call(d3.axisLeft(y))
        .selectAll('text')
        .style('fill', 'white');

      // Etiquetas de los ejes
      svg.append('text')
        .attr('transform', `translate(${width / 2}, ${height + margin.bottom - 10})`)
        .style('text-anchor', 'middle')
        .attr('fill', 'white')
        .text('Tiempo (segundos)');

      svg.append('text')
        .attr('transform', 'rotate(-90)')
        .attr('y', 0 - margin.left + 40)
        .attr('x', 0 - (height / 2))
        .style('text-anchor', 'middle')
        .attr('fill', 'white')
        .text('Amplitud');

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
    }
  }, [displayData]);

  return (
    <svg ref={chartRef}></svg>
  );
};

export default SismoChart;
