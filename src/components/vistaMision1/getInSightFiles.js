// Función para generar los nombres de archivos de la forma "Moon-APOLLO_X_i", donde X es un parámetro y i va de 0 a 7
const getInSightFiles = (letter) => {
    const files = [];
  
    // Validar que la letra sea A, B o C
    if (!['A', 'B', 'C'].includes(letter)) {
      throw new Error("La letra debe ser 'A', 'B' o 'C'");
    }
   
    // Generar la lista de nombres
    for (let i = 0; i <= 4; i++) {
      files.push(`Mars-InSight_${letter}_${i}`);
    }
  
    return files;
  };
  
  // Exportar la función
  export default getInSightFiles;
  