import { Router } from 'express';
import productDBManager from '../dao/productDBManager.js';
import { cartDBManager } from '../dao/cartDBManager.js';

const router = Router();
const ProductService = new productDBManager();
const CartService = new cartDBManager(ProductService);

router.get('/', (req, res) => {
    res.render('index'); // Renderiza la vista "index.handlebars"
});

router.get('/products', async (req, res) => {
    try {
        const products = await ProductService.getAllProducts(req.query);

        res.render('index', {
            title: 'Productos',
            style: 'index.css',
            products: JSON.parse(JSON.stringify(products.docs)),
            prevLink: {
                exist: !!products.prevLink,
                link: products.prevLink
            },
            nextLink: {
                exist: !!products.nextLink,
                link: products.nextLink
            }
        });
    } catch (error) {
        console.error('Error al obtener productos:', error);
        res.render('error', { message: 'Error al cargar los productos' });
    }
});

router.get('/realtimeproducts', async (req, res) => {
    try {
        const products = await ProductService.getAllProducts(req.query);

        res.render('realTimeProducts', {
            title: 'Productos en Tiempo Real',
            style: 'index.css',
            products: JSON.parse(JSON.stringify(products.docs))
        });
    } catch (error) {
        console.error('Error al obtener productos en tiempo real:', error);
        res.render('error', { message: 'Error al cargar los productos en tiempo real' });
    }
});

router.get('/cart/:cid', async (req, res) => {
    try {
        const response = await CartService.getProductsFromCartByID(req.params.cid);

        if (response.status === 'error') {
            return res.render('notFound', {
                title: 'No Encontrado',
                style: 'index.css'
            });
        }

        res.render('cart', {
            title: 'Carrito',
            style: 'index.css',
            products: JSON.parse(JSON.stringify(response.products))
        });
    } catch (error) {
        console.error('Error al obtener el carrito:', error);
        res.render('error', { message: 'Error al cargar el carrito' });
    }
});

export default router;
