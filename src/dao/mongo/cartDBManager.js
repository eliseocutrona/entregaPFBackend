// Importamos el modelo de carrito
import cartModel from "../models/cartModel.js";

// Definimos la clase `cartDBManager` para gestionar las operaciones relacionadas con los carritos
class cartDBManager {
    // Constructor de la clase que recibe un `productDBManager` para poder gestionar productos
    constructor(productDBManager) {
        this.productDBManager = productDBManager;
    }

    // Método para obtener todos los carritos con sus productos poblados
    async getAllCarts() {
        return cartModel.find().populate('products.product');
    }

    // Método para obtener los productos de un carrito específico por su ID
    async getProductsFromCartByID(cid) {
        const cart = await cartModel.findOne({ _id: cid }).populate('products.product');

        if (!cart) throw new Error(`El carrito ${cid} no existe!`);

        return cart;
    }

    // Método para crear un nuevo carrito vacío
    async createCart() {
        return await cartModel.create({ products: [] });
    }

    // Método para añadir un producto a un carrito por el ID del carrito y el ID del producto
    async addProductByID(cid, pid) {
        // Verificamos si el producto existe
        await this.productDBManager.getProductByID(pid);

        // Añadimos el producto al carrito si no está ya en él
        const cart = await cartModel.findOneAndUpdate(
            { _id: cid, 'products.product': { $ne: pid } },
            { $push: { products: { product: pid, quantity: 1 } } },
            { new: true, upsert: true }
        ).populate('products.product');

        if (!cart) throw new Error(`El carrito ${cid} no existe o el producto ${pid} ya está en el carrito!`);

        return cart;
    }

    // Método para eliminar un producto de un carrito por el ID del carrito y el ID del producto
    async deleteProductByID(cid, pid) {
        // Verificamos si el producto existe
        await this.productDBManager.getProductByID(pid);

        // Eliminamos el producto del carrito
        const cart = await cartModel.findOneAndUpdate(
            { _id: cid },
            { $pull: { products: { product: pid } } },
            { new: true }
        ).populate('products.product');

        if (!cart) throw new Error(`El carrito ${cid} no existe!`);

        return cart;
    }

    // Método para actualizar todos los productos de un carrito
    async updateAllProducts(cid, products) {
        // Validamos si los productos existen
        for (let key in products) {
            await this.productDBManager.getProductByID(products[key].product);
        }

        // Actualizamos el carrito con los productos nuevos
        const cart = await cartModel.findOneAndUpdate(
            { _id: cid },
            { $set: { products: products } },
            { new: true }
        ).populate('products.product');

        if (!cart) throw new Error(`El carrito ${cid} no existe!`);

        return cart;
    }

    // Método para actualizar la cantidad de un producto específico en un carrito
    async updateProductByID(cid, pid, quantity) {
        // Validamos si la cantidad es un número válido
        if (!quantity || isNaN(parseInt(quantity))) {
            throw new Error(`La cantidad ingresada no es válida!`);
        }

        // Verificamos si el producto existe
        await this.productDBManager.getProductByID(pid);

        // Actualizamos la cantidad del producto en el carrito
        const cart = await cartModel.findOneAndUpdate(
            { _id: cid, 'products.product': pid },
            { $set: { 'products.$.quantity': parseInt(quantity) } },
            { new: true }
        ).populate('products.product');

        if (!cart) throw new Error(`El producto ${pid} no existe en el carrito ${cid}!`);

        return cart;
    }

    // Método para eliminar todos los productos de un carrito
    async deleteAllProducts(cid) {
        // Eliminamos todos los productos del carrito
        const cart = await cartModel.findOneAndUpdate(
            { _id: cid },
            { $set: { products: [] } },
            { new: true }
        ).populate('products.product');

        if (!cart) throw new Error(`El carrito ${cid} no existe!`);

        return cart;
    }
}

// Exportamos la clase `cartDBManager`
export default cartDBManager;
