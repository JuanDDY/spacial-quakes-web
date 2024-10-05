import { useEffect, useRef } from 'react';
import Globe from 'globe.gl';
import * as d3 from 'd3-scale';

function GlobeComponent() {
  
  const globeEl = useRef();

  
  useEffect(() => {
    
    const colorScale = d3.scaleOrdinal(['orangered', 'mediumblue', 'darkgreen', 'yellow']);

    const labelsTopOrientation = new Set([
      'Apollo 12', 'Luna 2', 'Luna 20', 'Luna 21', 'Luna 24', 'LCROSS Probe'
    ]); // Avoid label collisions

        
    const planet = Globe()
      .globeImageUrl('/images/2k_mars.jpg')  // Para IKER: Cambiar aca la imagen de lo que se quiera grafica
      .bumpImageUrl('/images/lunar_bumpmap.jpg')
      .backgroundImageUrl('//unpkg.com/three-globe/example/img/night-sky.png')
      .showGraticules(true)
      .showAtmosphere(false) 
      .labelText('label')
      .labelSize(1.7)
      .labelDotRadius(0.4)
      .labelDotOrientation(d => labelsTopOrientation.has(d.label) ? 'top' : 'bottom')
      .labelColor(d => colorScale(d.agency))
      .labelLabel(d => `
        <div><b>${d.label}</b></div>
        <div>${d.agency} - ${d.program} Program</div>
        <div>Landing on <i>${new Date(d.date).toLocaleDateString()}</i></div>
      `)
      .onLabelClick(d => window.open(d.url, '_blank'));

    // Render the globe in the element referenced by globeEl
    planet(globeEl.current);

    // Fetch and update the landing sites data
    fetch('/path-to/moon_landings.json')
      .then(r => r.json())
      .then(landingSites => {
        planet.labelsData(landingSites);
      });
  }, []);

  /** 
  useEffect(() => {
    const myGlobe = Globe();
    myGlobe(globeEl.current)
      .globeImageUrl('//unpkg.com/three-globe/example/img/earth-dark.jpg')
      .bumpImageUrl('//unpkg.com/three-globe/example/img/earth-topology.png');
  }, []);
  */

  return (
    <div ref={globeEl} style={{ width: '100%', height: '500px' }}></div>
  );

}

export default GlobeComponent;