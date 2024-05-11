import fs from 'fs';

class productManager {
    
    constructor(file) {
        this.file = file; // Ruta del archivo donde se guardarán los datos de los productos
    }

    async getAllProducts() {
        try {
            const products = await fs.promises.readFile(this.file, 'utf-8'); // Lee el contenido del archivo de productos
            return JSON.parse(products); // Parsea el contenido del archivo como JSON y lo devuelve
        } catch (error) {
            console.error(error.message); // Si hay un error, imprime el mensaje de error
            return []; // Devuelve un array vacío en caso de error
        }
    }

    async getProductByID(pid) {
        const products = await this.getAllProducts(); // Obtiene todos los productos

        const productFilter = products.filter(product => product.id == pid); // Filtra el producto por ID

        if (productFilter.length > 0) {
            return productFilter[0]; // Devuelve el primer producto que coincida con el ID dado
        }

        throw new Error(`El producto ${pid} no existe!`); // Lanza un error si el producto no se encuentra
    }

    async createProduct(product) {
        const {title, description, code, price, stock, category, thumbnails} = product;

        // Verifica que se proporcionen todos los campos necesarios para crear un producto
        if (!title || !description || !code || !price || !stock || !category) {
            throw new Error('Error al crear el producto');
        }

        const products = await this.getAllProducts(); // Obtiene todos los productos

        const newProduct = {
            id: this.getProductID(products), // Genera un nuevo ID para el producto
            title,
            description,
            code,
            price,
            status: true, // Por defecto, el producto se establece como activo
            stock,
            category,
            thumbnails: thumbnails ?? [] // Asigna una matriz vacía si no se proporcionan miniaturas
        }

        products.push(newProduct); // Agrega el nuevo producto al array de productos

        try {
            await fs.promises.writeFile(this.file, JSON.stringify(products, null, '\t')); // Escribe los productos actualizados en el archivo

            return newProduct; // Devuelve el nuevo producto creado
        } catch (error) {
            throw new Error('Error al crear el producto'); // Lanza un error si hay un problema al escribir en el archivo
        }
    }

    getProductID(products) {
        
        const productsLength = products.length;
        if (productsLength > 0) {
            return parseInt(products[productsLength -1].id) + 1; // Genera un nuevo ID sumando 1 al último ID utilizado
        }

        return 1; // Si no hay productos, devuelve 1 como ID inicial
    }

    async updateProduct(pid, productUpdate) {
        // Actualiza un producto existente según su ID con la información proporcionada
        const {title, description, code, price, status, stock, category, thumbnails} = productUpdate;
        const products = await this.getAllProducts(); // Obtiene todos los productos

        let i = 0;
        const productFilter = products.filter(
            (product, index) => {
                i = index; // Obtiene el índice del producto que coincide con el ID dado
                return product.id == pid
            }
        );

        if (productFilter.length > 0) {

            // Actualiza los campos del producto con los valores proporcionados, si se proporcionan
            products[i].title = title ? title : products[i].title;
            products[i].description = description ? description : products[i].description;
            products[i].code = code ? code : products[i].code;
            products[i].price = price ? price : products[i].price;
            products[i].status = status ? status : products[i].status;
            products[i].stock = stock ? stock : products[i].stock;
            products[i].category = category ? category : products[i].category;
            products[i].thumbnails = thumbnails ? thumbnails : products[i].thumbnails;
        } else {
            throw new Error(`El producto ${pid} no existe!`);
        }

        try {
            await fs.promises.writeFile(this.file, JSON.stringify(products, null, "\t")); // Escribe los productos actualizados en el archivo

            return products[i]; // Devuelve el producto modificado
        } catch(e) {
            throw new Error('Error al actualizar el producto'); // Lanza un error si hay un problema al escribir en el archivo
        }
    }

    async deleteProduct(pid) {
        // Elimina un producto existente según su ID
        const products = await this.getAllProducts(); // Obtiene todos los productos

        const productsFilter = products.filter(product => product.id != pid); // Filtra los productos excluyendo el producto con el ID dado

        if (products.length === productsFilter.length) {
            throw new Error(`El producto ${pid} no existe!`); // Lanza un error si el producto no se encuentra
        }

        try {
            await fs.promises.writeFile(this.file, JSON.stringify(productsFilter, null, "\t")); // Escribe los productos actualizados en el archivo

            return productsFilter; // Devuelve los productos sin el producto eliminado
        } catch(e) {
            throw new Error(`Error al eliminar el producto ${pid}`); // Lanza un error si hay un problema al escribir en el archivo
        }
    }
}

export { productManager }; // Exporta la clase productManager para su uso en otros módulos
