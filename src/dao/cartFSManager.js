import { cartModel } from "./models/cartModel.js";

class cartFSManager {
    constructor(productDBManager) {
        this.productDBManager = productDBManager;
    }

    async getAllCarts() {
        return cartModel.find().populate('products.product');
    }

    async getProductsFromCartByID(cid) {
        const cart = await cartModel.findOne({ _id: cid }).populate('products.product');

        if (!cart) throw new Error(`El carrito ${cid} no existe!`);

        return cart;
    }

    async createCart() {
        return await cartModel.create({ products: [] });
    }

    async addProductByID(cid, pid) {
        await this.productDBManager.getProductByID(pid);

        const cart = await cartModel.findOneAndUpdate(
            { _id: cid, 'products.product': { $ne: pid } },
            { $push: { products: { product: pid, quantity: 1 } } },
            { new: true, upsert: true }
        ).populate('products.product');

        if (!cart) throw new Error(`El carrito ${cid} no existe o el producto ${pid} ya está en el carrito!`);

        return cart;
    }

    async deleteProductByID(cid, pid) {
        await this.productDBManager.getProductByID(pid);

        const cart = await cartModel.findOneAndUpdate(
            { _id: cid },
            { $pull: { products: { product: pid } } },
            { new: true }
        ).populate('products.product');

        if (!cart) throw new Error(`El carrito ${cid} no existe!`);

        return cart;
    }

    async updateAllProducts(cid, products) {
        // Validar si los productos existen
        for (let key in products) {
            await this.productDBManager.getProductByID(products[key].product);
        }

        const cart = await cartModel.findOneAndUpdate(
            { _id: cid },
            { $set: { products: products } },
            { new: true }
        ).populate('products.product');

        if (!cart) throw new Error(`El carrito ${cid} no existe!`);

        return cart;
    }

    async updateProductByID(cid, pid, quantity) {
        if (!quantity || isNaN(parseInt(quantity))) {
            throw new Error(`La cantidad ingresada no es válida!`);
        }

        await this.productDBManager.getProductByID(pid);

        const cart = await cartModel.findOneAndUpdate(
            { _id: cid, 'products.product': pid },
            { $set: { 'products.$.quantity': parseInt(quantity) } },
            { new: true }
        ).populate('products.product');

        if (!cart) throw new Error(`El producto ${pid} no existe en el carrito ${cid}!`);

        return cart;
    }

    async deleteAllProducts(cid) {
        const cart = await cartModel.findOneAndUpdate(
            { _id: cid },
            { $set: { products: [] } },
            { new: true }
        ).populate('products.product');

        if (!cart) throw new Error(`El carrito ${cid} no existe!`);

        return cart;
    }
}

export { cartFSManager };
