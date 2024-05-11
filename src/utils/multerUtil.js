import multer from 'multer'; // Importa la biblioteca multer para manejar la carga de archivos

// Configura el almacenamiento de archivos en disco utilizando multer.diskStorage
const storage = multer.diskStorage({
    // Establece el directorio de destino donde se guardarán los archivos
    destination: function (req, file, cb) {
        cb(null, 'public/img');
    },
    // Establece el nombre del archivo como su nombre original
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

// Exporta el middleware de Multer configurado con el almacenamiento definido anteriormente
export const uploader = multer({ storage });
