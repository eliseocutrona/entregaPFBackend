// Importamos el modelo de producto
import productModel from "./models/productModel.js";

// Definimos la clase `productDBManager` para gestionar las operaciones relacionadas con los productos
class productDBManager {

    // Método para obtener todos los productos con paginación y ordenamiento
    async getAllProducts(params) {
        // Definimos los parámetros de paginación: página y límite
        const paginate = {
            page: params.page ? parseInt(params.page) : 1,
            limit: params.limit ? parseInt(params.limit) : 10,
        }

        // Si se especifica un orden, lo añadimos a los parámetros de paginación
        if (params.sort && (params.sort === 'asc' || params.sort === 'desc')) {
            paginate.sort = { price: params.sort }
        }

        // Obtenemos los productos utilizando el modelo con paginación
        const products = await productModel.paginate({}, paginate);

        // Añadimos los enlaces a la página previa y siguiente si existen
        products.prevLink = products.hasPrevPage ? `http://localhost:8080/products?page=${products.prevPage}` : null;
        products.nextLink = products.hasNextPage ? `http://localhost:8080/products?page=${products.nextPage}` : null;

        // Añadimos el límite a los enlaces si es diferente de 10 (valor por defecto)
        if (products.prevLink && paginate.limit !== 10) products.prevLink += `&limit=${paginate.limit}`;
        if (products.nextLink && paginate.limit !== 10) products.nextLink += `&limit=${paginate.limit}`;

        // Añadimos el orden a los enlaces si está especificado
        if (products.prevLink && paginate.sort) products.prevLink += `&sort=${params.sort}`;
        if (products.nextLink && paginate.sort) products.nextLink += `&sort=${params.sort}`;

        // Devolvemos los productos con la paginación y los enlaces
        return products;
    }

    // Método para obtener un producto por su ID
    async getProductByID(pid) {
        const product = await productModel.findOne({ _id: pid });

        if (!product) throw new Error(`El producto ${pid} no existe!`);

        return product;
    }

    // Método para crear un nuevo producto
    async createProduct(product) {
        // Desestructuramos los campos del producto
        const { title, description, code, price, stock, category, thumbnails } = product;

        // Validamos que los campos obligatorios estén presentes
        if (!title || !description || !code || !price || !stock || !category) {
            throw new Error('Error al crear el producto');
        }

        // Creamos el producto utilizando el modelo
        return await productModel.create({ title, description, code, price, stock, category, thumbnails });
    }

    // Método para actualizar un producto por su ID
    async updateProduct(pid, productUpdate) {
        return await productModel.updateOne({ _id: pid }, productUpdate);
    }

    // Método para eliminar un producto por su ID
    async deleteProduct(pid) {
        const result = await productModel.deleteOne({ _id: pid });

        if (result.deletedCount === 0) throw new Error(`El producto ${pid} no existe!`);

        return result;
    }
}

// Exportamos la clase `productDBManager`
export default productDBManager;
