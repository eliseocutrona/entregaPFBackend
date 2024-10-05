import BaseRouter from './BaseRouter.js'; // Importa la clase BaseRouter para extenderla
import productModel from '../dao/models/productModel.js'; // Importa el modelo de productos
import cartModel from '../dao/models/cartModel.js'; // Importa el modelo de carritos

// Define la clase ViewsRouter que extiende de BaseRouter
class ViewsRouter extends BaseRouter {
    // Método para inicializar las rutas específicas de vistas
    init() {
        // Ruta GET para la página principal, accesible públicamente
        this.get('/', ['PUBLIC'], (req, res) => {
            res.render('Home'); // Renderiza la vista 'Home'
        });

        // Ruta GET para la página de registro, accesible públicamente
        this.get('/register', ['PUBLIC'], (req, res) => {
            res.render('Register'); // Renderiza la vista 'Register'
        });

        // Ruta GET para la página de inicio de sesión, accesible públicamente
        this.get('/login', ['PUBLIC'], (req, res) => {
            res.render('Login'); // Renderiza la vista 'Login'
        });

        // Ruta GET para la página de perfil, accesible solo para usuarios autenticados
        this.get('/profile', ['USER'], (req, res) => {
            console.log('User:', req.user); // Imprime el usuario actual en la consola para depuración
            if (!req.user) {
                return res.redirect('/login'); // Redirige al inicio de sesión si no hay usuario
            }
            res.render('Profile', { user: req.user }); // Renderiza la vista 'Profile' con los datos del usuario
        });

        // Ruta GET para obtener los datos del usuario actual, accesible solo para usuarios autenticados
        this.get('/current', ['USER'], (req, res) => {
            if (!req.user) {
                return res.sendUnauthorized(); // Responde con un error si el usuario no está autenticado
            }
            res.sendSuccess('User data retrieved successfully', req.user); // Envía los datos del usuario en formato JSON
        });

        // Ruta GET para cerrar sesión, accesible solo para usuarios autenticados
        this.get('/logout', ['USER'], async (req, res) => {
            res.clearCookie(config.auth.jwt.COOKIE); // Limpia la cookie de autenticación
            res.redirect('/'); // Redirige a la página principal
        });

        // Ruta GET para obtener todos los productos con paginación, accesible públicamente
        this.get('/products', ['PUBLIC'], async (req, res) => {
            try {
                const page = parseInt(req.query.page) || 1; // Obtiene el número de página desde la consulta
                const limit = 10; // Número de productos por página
                const skip = (page - 1) * limit; // Número de productos a omitir para la paginación
        
                const paginationData = await productModel
                    .find()
                    .skip(skip)
                    .limit(limit)
                    .lean(); // Obtiene los productos con la paginación
        
                const products = paginationData;
                const totalCount = await productModel.countDocuments(); // Cuenta el total de productos
                const totalPages = Math.ceil(totalCount / limit); // Calcula el total de páginas
                const hasNextPage = page < totalPages; // Verifica si hay una página siguiente
                const hasPrevPage = page > 1; // Verifica si hay una página anterior
                const nextPage = hasNextPage ? page + 1 : null; // Calcula el número de la siguiente página
                const prevPage = hasPrevPage ? page - 1 : null; // Calcula el número de la página anterior
        
                res.render('Products', {
                    products,
                    currentPage: page,
                    hasNextPage,
                    hasPrevPage,
                    nextPage,
                    prevPage,
                }); // Renderiza la vista 'Products' con los datos de los productos
            } catch (error) {
                console.error('Error fetching products:', error.message); // Imprime el error en la consola
                res.status(500).render('500', { message: 'Error fetching products' }); // Renderiza una vista de error general
            }
        });
        

        // Ruta GET para obtener detalles de un producto por ID, accesible públicamente
        this.get('/products/:pid', ['PUBLIC'], async (req, res) => {
            const { pid } = req.params; // Obtiene el ID del producto de los parámetros de la ruta

            try {
                const product = await productModel.findById(pid).lean(); // Obtiene el producto por ID

                if (!product) {
                    return res.render('404'); // Renderiza una vista de error 404 si el producto no se encuentra
                }

                res.render('ProductDetails', {
                    product,
                    mainImage: product.thumbnails.find(
                        (thumbnail) => thumbnail.main
                    ), // Encuentra la imagen principal del producto
                }); // Renderiza la vista 'ProductDetails' con los detalles del producto
            } catch (error) {
                console.error('Error fetching product details:', error.message); // Imprime el error en la consola
                res.render('404'); // Renderiza una vista de error 404 en caso de fallo
            }
        });

        // Ruta GET para productos en tiempo real, accesible públicamente
        this.get('/realtimeproducts', ['PUBLIC'], async (req, res) => {
            try {
                const products = await productModel.find().lean(); // Obtiene todos los productos
                res.render('RealTimeProducts', {
                    title: 'Productos en Tiempo Real',
                    products,
                }); // Renderiza la vista 'RealTimeProducts' con los productos
            } catch (error) {
                console.error('Error al obtener los productos:', error.message); // Imprime el error en la consola
                res.status(500).send('Error interno del servidor'); // Envía un mensaje de error interno del servidor
            }
        });

        // Ruta GET para obtener detalles de un carrito por ID, accesible solo para usuarios autenticados
        this.get('/carts/:cid', ['USER'], async (req, res) => {
            const { cid } = req.params; // Obtiene el ID del carrito de los parámetros de la ruta

            try {
                const cart = await cartModel
                    .findById(cid)
                    .populate('products.product') // Rellena los detalles del producto en el carrito
                    .lean(); // Convierte el resultado a un objeto JavaScript plano

                if (!cart) {
                    return res.render('404'); // Renderiza una vista de error 404 si el carrito no se encuentra
                }

                res.render('Cart', { cart }); // Renderiza la vista 'Cart' con los detalles del carrito
            } catch (error) {
                console.error('Error fetching cart details:', error.message); // Imprime el error en la consola
                res.render('404'); // Renderiza una vista de error 404 en caso de fallo
            }
        });
    }
}

// Crea una instancia de ViewsRouter y exporta el router configurado
const viewsRouter = new ViewsRouter();
export default viewsRouter.getRouter();
