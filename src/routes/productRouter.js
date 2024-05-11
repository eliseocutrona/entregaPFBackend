import { Router } from 'express';
import { productManager } from '../managers/productManager.js'; // Importa el gestor de productos
import { uploader } from '../utils/multerUtil.js'; // Importa el middleware de carga de archivos

const router = Router();
const ProductService = new productManager('products.json'); // Instancia el gestor de productos con el archivo 'products.json'

// Ruta para obtener todos los productos
router.get('/', async (req, res) => {
    const result = await ProductService.getAllProducts(); // Obtiene todos los productos
    res.send({
        status: 'success',
        payload: result
    });
});

// Ruta para obtener un producto por su ID
router.get('/:pid', async (req, res) => {
    try {
        const result = await ProductService.getProductByID(req.params.pid); // Obtiene un producto por su ID
        res.send({
            status: 'success',
            payload: result
        });
    } catch (error) {
        res.status(400).send({
            status: 'error',
            message: error.message
        });
    }
});

// Ruta para crear un nuevo producto
router.post('/', uploader.array('thumbnails', 3), async (req, res) => {
    // Middleware de carga de archivos: guarda los nombres de archivo de las miniaturas en req.body.thumbnails
    if (req.files) {
        req.body.thumbnails = [];
        req.files.forEach((file) => {
            req.body.thumbnails.push(file.filename);
        });
    }

    try {
        const result = await ProductService.createProduct(req.body); // Crea un nuevo producto con la información proporcionada
        res.send({
            status: 'success',
            payload: result
        });
    } catch (error) {
        res.status(400).send({
            status: 'error',
            message: error.message
        });
    }
});

// Ruta para actualizar un producto por su ID
router.put('/:pid', uploader.array('thumbnails', 3), async (req, res) => {
    // Middleware de carga de archivos: guarda los nombres de archivo de las miniaturas en req.body.thumbnails
    if (req.files) {
        req.body.thumbnails = [];
        req.files.forEach((file) => {
            req.body.thumbnails.push(file.filename);
        });
    }

    try {
        const result = await ProductService.updateProduct(req.params.pid, req.body); // Actualiza un producto con la información proporcionada
        res.send({
            status: 'success',
            payload: result
        });
    } catch (error) {
        res.status(400).send({
            status: 'error',
            message: error.message
        });
    }
});

// Ruta para eliminar un producto por su ID
router.delete('/:pid', async (req, res) => {
    try {
        const result = await ProductService.deleteProduct(req.params.pid); // Elimina un producto por su ID
        res.send({
            status: 'success',
            payload: result
        });
    } catch (error) {
        res.status(400).send({
            status: 'error',
            message: error.message
        });
    }
});

export default router; // Exporta el enrutador para su uso en la aplicación Express
