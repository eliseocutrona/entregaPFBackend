import productsController from '../controllers/products.controller.js'; // Importa el controlador para manejar operaciones de productos
import BaseRouter from './BaseRouter.js'; // Importa la clase BaseRouter para extenderla
import { authRoles } from '../middlewares/authroles.js'; // Importa el middleware para la autorización de roles

// Define la clase ProductRouter que extiende de BaseRouter
class ProductRouter extends BaseRouter {
    // Método para inicializar las rutas específicas de productos
    init() {
        // Ruta GET para obtener todos los productos
        this.get('/', ['PUBLIC'], productsController.getProducts);

        // Ruta GET para obtener un producto por ID
        this.get('/:id', ['PUBLIC'], productsController.getProductById);

        // Ruta POST para crear un nuevo producto, accesible solo para administradores
        this.post('/', ['ADMIN'], authRoles(['ADMIN']), productsController.createProduct);

        // Ruta PUT para actualizar un producto por ID, accesible solo para administradores
        this.put('/:id', ['ADMIN'], authRoles(['ADMIN']), productsController.updateProduct);

        // Ruta DELETE para eliminar un producto por ID, accesible solo para administradores
        this.delete('/:id', ['ADMIN'], authRoles(['ADMIN']), productsController.deleteProduct);

        // Rutas adicionales para el prefijo /api/products (duplicadas)
        this.get('/api/products', ['PUBLIC'], productsController.getProducts);

        // Ruta GET para obtener un producto por ID con el prefijo /api
        this.get('/api/products/:id', ['PUBLIC'], productsController.getProductById);

        // Ruta POST para crear un nuevo producto con el prefijo /api, accesible solo para administradores
        this.post('/api/products', ['ADMIN'], authRoles(['ADMIN']), productsController.createProduct);

        // Ruta PUT para actualizar un producto por ID con el prefijo /api, accesible solo para administradores
        this.put('/api/products/:id', ['ADMIN'], authRoles(['ADMIN']), productsController.updateProduct);

        // Ruta DELETE para eliminar un producto por ID con el prefijo /api, accesible solo para administradores
        this.delete('/api/products/:id', ['ADMIN'], authRoles(['ADMIN']), productsController.deleteProduct);
    }
}

// Crea una instancia de ProductRouter y exporta el router configurado
const productsRouter = new ProductRouter();
export default productsRouter.getRouter();
