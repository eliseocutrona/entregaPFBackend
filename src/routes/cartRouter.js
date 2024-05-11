import { Router } from 'express';
import { productManager } from '../managers/productManager.js'; // Importa el gestor de productos
import { cartManager } from '../managers/cartManager.js'; // Importa el gestor de carritos

const router = Router();
const ProductService = new productManager('products.json'); // Instancia el gestor de productos con el archivo 'products.json'
const CartService = new cartManager('carts.json', ProductService); // Instancia el gestor de carritos con el archivo 'carts.json' y el servicio de productos

// Ruta para obtener los productos de un carrito por su ID
router.get('/:cid', async (req, res) => {
    try {
        const result = await CartService.getProductsFromCartByID(req.params.cid); // Obtiene los productos del carrito por su ID
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

// Ruta para crear un nuevo carrito
router.post('/', async (req, res) => {
    try {
        const result = await CartService.createCart(); // Crea un nuevo carrito
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

// Ruta para agregar un producto a un carrito por sus IDs
router.post('/:cid/product/:pid', async (req, res) => {
    try {
        const result = await CartService.addProductByID(req.params.cid, req.params.pid) // Agrega un producto al carrito por sus IDs
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
