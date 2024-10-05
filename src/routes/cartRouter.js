import BaseRouter from './BaseRouter.js'; // Importa la clase BaseRouter para extenderla
import cartsController from '../controllers/carts.controller.js'; // Importa el controlador para manejar las operaciones de carrito
import { authRoles } from '../middlewares/authroles.js'; // Importa el middleware para la autorización de roles

// Define la clase CartsRouter que extiende de BaseRouter
class CartsRouter extends BaseRouter {
    // Método para inicializar las rutas específicas del carrito
    init() {
        // Ruta GET para obtener todos los carritos
        this.get('/', ['PUBLIC'], cartsController.getAllCarts);

        // Ruta GET para obtener un carrito por ID
        this.get('/:cid', ['PUBLIC'], cartsController.getCartById);

        // Ruta POST para crear un nuevo carrito
        this.post('/', ['PUBLIC'], cartsController.createCart);

        // Ruta POST para agregar un producto a un carrito específico
        this.post(
            '/:cid/products/:pid',
            ['PUBLIC'], // Políticas públicas (sin restricciones)
            authRoles(['USER']), // Asegura que el usuario tenga el rol 'USER'
            cartsController.addProductToCart // Controlador para agregar el producto
        );

        // Ruta PUT para actualizar la cantidad de un producto en un carrito
        this.put(
            '/:cid/products/:pid',
            ['PUBLIC'], // Políticas públicas
            authRoles(['USER']), // Asegura que el usuario tenga el rol 'USER'
            cartsController.updateProductQuantity // Controlador para actualizar la cantidad del producto
        );

        // Ruta PUT para actualizar los productos de un carrito específico
        this.put(
            '/:cid',
            ['PUBLIC'], // Políticas públicas
            authRoles(['USER']), // Asegura que el usuario tenga el rol 'USER'
            cartsController.updateCartProducts // Controlador para actualizar los productos del carrito
        );

        // Ruta DELETE para eliminar un producto de un carrito específico
        this.delete(
            '/:cid/products/:pid',
            ['PUBLIC'], // Políticas públicas
            authRoles(['USER']), // Asegura que el usuario tenga el rol 'USER'
            cartsController.removeProductFromCart // Controlador para eliminar el producto del carrito
        );

        // Ruta DELETE para vaciar un carrito específico
        this.delete(
            '/:cid',
            ['PUBLIC'], // Políticas públicas
            authRoles(['USER']), // Asegura que el usuario tenga el rol 'USER'
            cartsController.clearCart // Controlador para vaciar el carrito
        );

        // Ruta POST para realizar la compra de los productos en un carrito
        this.post(
            '/:cid/purchase',
            ['PUBLIC'], // Políticas públicas
            authRoles(['USER']), // Asegura que el usuario tenga el rol 'USER'
            cartsController.purchaseCart // Controlador para realizar la compra del carrito
        );
    }
}

// Crea una instancia de CartsRouter y exporta el router configurado
const cartsRouter = new CartsRouter();
export default cartsRouter.getRouter();
