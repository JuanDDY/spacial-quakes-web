import * as d3 from 'd3';
import { useRef, useEffect } from 'react';

export default function SeismicGraph({
  data, // data should be an array of values representing seismic signal
  width = 1100,
  height = 400,
  marginTop = 20,
  marginRight = 20,
  marginBottom = 30,
  marginLeft = 40
}) {
  
  const ref = useRef();


  useEffect(() => {
    const margin = { top: 20, right: 30, bottom: 30, left: 40 };
    const width = 1100 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    const svg = d3.select(ref.current)
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Escala X (para la fecha)
    const x = d3.scaleTime()
      .domain(d3.extent(data, d => d.date)) // Rango de fechas
      .range([0, width]);

    // Escala Y (para los valores de cierre)
    const y = d3.scaleLinear()
      .domain([d3.min(data, d => d.close) - 10, d3.max(data, d => d.close)]) // Rango de precios
      .range([height, 0]);

    // Definir la línea
    const line = d3.line()
      .x(d => x(d.date))
      .y(d => y(d.close));

    // Eje X
    svg.append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x));

    // Eje Y
    svg.append("g")
      .call(d3.axisLeft(y));

    // Dibujar la línea
    svg.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 1.5)
      .attr("d", line);

    // Opcional: Añadir círculos en cada punto
    /*
    svg.selectAll("dot")
      .data(data)
      .enter().append("circle")
      .attr("cx", d => x(d.date))
      .attr("cy", d => y(d.close))
      .attr("r", 3)
      .attr("fill", "red");
    */
  }, [data, width, height, marginTop , marginRight, marginBottom, marginLeft]);

  return (
    <svg ref={ref}></svg>
  );
}
