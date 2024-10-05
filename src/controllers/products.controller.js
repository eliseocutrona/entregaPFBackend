import mongoose from 'mongoose';
import ProductDAO from '../dao/mongo/ProductDAO.js';

// Controlador para obtener una lista de productos con paginación, filtrado y ordenamiento
const getProducts = async (req, res) => {
    try {
        // Desestructuración de parámetros de consulta con valores por defecto
        const { limit = 10, page = 1, query = '', sort = '' } = req.query;

        // Creación del objeto de consulta para filtrar productos por título
        const queryObject = {};
        if (query) {
            queryObject.title = { $regex: query, $options: 'i' }; // Filtrado insensible a mayúsculas/minúsculas
        }

        // Creación del objeto de ordenamiento basado en el parámetro `sort`
        const sortObject = {};
        if (sort) {
            const [field, order] = sort.split(':');
            sortObject[field] = order === 'desc' ? -1 : 1; // Ordenamiento descendente o ascendente
        }

        // Configuración de opciones para paginación y ordenamiento
        const options = {
            limit: Number(limit),
            skip: (Number(page) - 1) * Number(limit),
            sort: sortObject,
        };

        // Obtención de productos y el total de productos que coinciden con la consulta
        const products = await ProductDAO.paginate(queryObject, options);
        const totalProducts = await ProductDAO.count(queryObject);

        // Generación de enlaces para la paginación (anterior y siguiente)
        const prevLink = products.hasPrevPage
            ? `http://localhost:8080/api/products?page=${products.prevPage}&limit=${limit}`
            : null;
        const nextLink = products.hasNextPage
            ? `http://localhost:8080/api/products?page=${products.nextPage}&limit=${limit}`
            : null;

        // Respuesta con la información de los productos y la paginación
        res.json({
            products: products.docs,
            totalPages: products.totalPages,
            page: products.page,
            hasPrevPage: products.hasPrevPage,
            hasNextPage: products.hasNextPage,
            prevPage: products.prevPage,
            nextPage: products.nextPage,
            prevLink,
            nextLink,
        });
    } catch (error) {
        // Manejo de errores en caso de excepción
        res.status(500).json({ error: error.message });
    }
};

// Controlador para obtener un producto específico por ID
const getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        // Validación del ID del producto
        if (!mongoose.Types.ObjectId.isValid(id))
            throw new Error('Invalid product ID');

        // Búsqueda del producto por ID
        const product = await ProductDAO.findById(id);
        if (!product) throw new Error('Product not found');

        // Respuesta con el producto encontrado
        res.json(product);
    } catch (error) {
        // Manejo de errores, en caso de producto no encontrado o ID inválido
        res.status(404).json({ error: error.message });
    }
};

// Controlador para crear un nuevo producto o actualizar el stock si el producto ya existe
const createProduct = async (req, res) => {
    try {
        const { code, stock } = req.body;
        // Verificación de si el producto ya existe basado en el código
        const exists = await ProductDAO.findProductByCode(code);
        if (exists) {
            // Actualización del stock del producto existente
            const updatedProduct = await ProductDAO.updateStockByCode(code, stock);
            if (!updatedProduct) throw new Error('Error updating product stock');
            res.json(updatedProduct);
        } else {
            // Creación de un nuevo producto si no existe
            const product = await ProductDAO.create(req.body);
            res.status(201).json(product);
        }
    } catch (error) {
        // Manejo de errores durante la creación o actualización del producto
        res.status(500).json({ error: error.message });
    }
};

// Controlador para actualizar un producto existente por ID
const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        // Validación del ID del producto
        if (!mongoose.Types.ObjectId.isValid(id))
            throw new Error('Invalid product ID');

        // Actualización del producto
        const product = await ProductDAO.update(id, req.body);
        if (!product) throw new Error('Product not found');

        // Respuesta con el producto actualizado
        res.json(product);
    } catch (error) {
        // Manejo de errores, en caso de producto no encontrado o ID inválido
        res.status(404).json({ error: error.message });
    }
};

// Controlador para eliminar un producto por ID
const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        // Validación del ID del producto
        if (!mongoose.Types.ObjectId.isValid(id))
            throw new Error('Invalid product ID');

        // Eliminación del producto
        const product = await ProductDAO.delete(id);
        if (!product) throw new Error('Product not found');

        // Respuesta con el producto eliminado
        res.json(product);
    } catch (error) {
        // Manejo de errores, en caso de producto no encontrado o ID inválido
        res.status(404).json({ error: error.message });
    }
};

export default {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
};
