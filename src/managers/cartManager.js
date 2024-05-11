import fs from 'fs';

class cartManager {
    
    constructor(file, productManager) {
        this.file = file; // Ruta del archivo donde se guardarán los datos de los carritos
        this.productManager = productManager; // Instancia del gestor de productos
    }

    async getAllCarts() {
        try {
            const carts = await fs.promises.readFile(this.file, 'utf-8'); // Lee el contenido del archivo de carritos
            return JSON.parse(carts); // Parsea el contenido del archivo como JSON y lo devuelve
        } catch (error) {
            console.error(error.message); // Si hay un error, imprime el mensaje de error
            return []; // Devuelve un array vacío en caso de error
        }
    }

    async getProductsFromCartByID(cid) {
        const carts = await this.getAllCarts(); // Obtiene todos los carritos

        const cartFilter = carts.filter(cart => cart.id == cid); // Filtra el carrito por ID

        if (cartFilter.length > 0) {
            return cartFilter[0].products; // Devuelve los productos del carrito si se encuentra
        }

        throw new Error(`El carrito ${cid} no existe!`); // Lanza un error si el carrito no se encuentra
    }

    async createCart() {
        const carts = await this.getAllCarts(); // Obtiene todos los carritos

        const newCart = {
            id: this.getCartID(carts), // Genera un nuevo ID de carrito
            products: [] // Inicializa el array de productos del nuevo carrito
        }

        carts.push(newCart); // Agrega el nuevo carrito al array de carritos

        try {
            await fs.promises.writeFile(this.file, JSON.stringify(carts, null, '\t')); // Escribe los carritos actualizados en el archivo

            return newCart; // Devuelve el nuevo carrito creado
        } catch (error) {
            throw new Error('Error al crear el carrito'); // Lanza un error si hay un problema al escribir en el archivo
        }
    }

    getCartID(carts) {
        const cartsLength = carts.length;
        if (cartsLength > 0) {
            return parseInt(carts[cartsLength -1].id) + 1; // Genera un nuevo ID sumando 1 al último ID utilizado
        }

        return 1; // Si no hay carritos, devuelve 1 como ID inicial
    }

    async addProductByID(cid, pid) {
        await this.productManager.getProductByID(pid); // Verifica si el producto existe mediante el gestor de productos

        const carts = await this.getAllCarts(); // Obtiene todos los carritos
        let i = 0;
        const cartFilter = carts.filter(
            (cart, index) => {
                if (cart.id == cid) i = index; // Obtiene el índice del carrito que coincide con el ID dado
                return cart.id == cid; // Filtra los carritos por ID
            }
        );
        console.log('index: ', i, 'cid: ', cid);

        if (cartFilter.length > 0) {
            let exist = false;
            for (let key in carts[i].products) {
                if (carts[i].products[key].product == pid) {
                    exist = true;
                    carts[i].products[key].quantity++; // Incrementa la cantidad si el producto ya existe en el carrito
                }
            }

            if (!exist) {
                carts[i].products.push({ // Agrega el producto al carrito si no existe
                    product: pid,
                    quantity: 1
                });
            }
        } else {
            throw new Error(`El carrito ${cid} no existe!`); // Lanza un error si el carrito no se encuentra
        }

        try {
            await fs.promises.writeFile(this.file, JSON.stringify(carts, null, "\t")); // Escribe los carritos actualizados en el archivo

            return carts[i]; // Devuelve el carrito modificado
        } catch(e) {
            throw new Error('Error al actualizar el carrito'); // Lanza un error si hay un problema al escribir en el archivo
        }
    }
}

export { cartManager }; // Exporta la clase cartManager para su uso en otros módulos
