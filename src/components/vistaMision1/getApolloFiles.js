// Función para generar los nombres de archivos de la forma "Moon-APOLLO_X_i", donde X es un parámetro y i va de 0 a 7
const getApolloFiles = (letter, planeta) => {
    const files = [];
  
    // Validar que la letra sea A, B o C
    if (!['A', 'B', 'C'].includes(letter)) {
      throw new Error("La letra debe ser 'A', 'B' o 'C'");
    }
  
    // Generar la lista de nombres
    for (let i = 0; i <= 9; i++) {
      files.push(`Moon-APOLLO_${letter}_${i}`);
    }
  
    return files;
  };
  
  // Exportar la función
  export default getApolloFiles;
  