import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const SismoChart = ({ data }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    // Establecer las dimensiones y márgenes del gráfico
    const margin = { top: 20, right: 30, bottom: 40, left: 40 };
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
      .domain(d3.extent(data, d => new Date(d.time)))  // Ajustar los tiempos
      .range([0, width]);

    const y = d3.scaleLinear()
      .domain([d3.min(data, d => d.amplitude), d3.max(data, d => d.amplitude)])  // Amplitud
      .range([height, 0]);

    // Ejes
    svg.append('g')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(x));

    svg.append('g')
      .call(d3.axisLeft(y));

    // Línea del gráfico
    const line = d3.line()
      .x(d => x(new Date(d.time)))
      .y(d => y(d.amplitude));

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
