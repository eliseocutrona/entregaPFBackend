import { fileURLToPath } from 'url'; // Importa la función fileURLToPath de la biblioteca url
import { dirname } from 'path'; // Importa la función dirname de la biblioteca path

// Convierte la URL del módulo en una ruta de archivo y asigna a __filename
const __filename = fileURLToPath(import.meta.url);
// Obtiene el nombre del directorio del archivo y asigna a __dirname
const __dirname = dirname(__filename);

// Exporta la variable __dirname, que contiene la ruta del directorio actual del archivo
export default __dirname;
