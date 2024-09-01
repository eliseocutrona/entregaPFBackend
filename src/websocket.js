import productDBManager from './dao/mongo/productDBManager.js';

const ProductService = new productDBManager();

export default (io) => {
    io.on("connection", (socket) => {
        console.log("Cliente conectado");

        socket.on("createProduct", async (data) => {
            try {
                await ProductService.createProduct(data);
                const products = await ProductService.getAllProducts({});
                socket.emit("publishProducts", products);
            } catch (error) {
                socket.emit("statusError", error.message);
            }
        });

        socket.on("deleteProduct", async (data) => {
            try {
                const result = await ProductService.deleteProduct(data.pid);
                const products = await ProductService.getAllProducts({});
                socket.emit("publishProducts", products);
            } catch (error) {
                socket.emit("statusError", error.message);
            }
        });
    });
};
