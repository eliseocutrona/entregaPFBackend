import mongoose from 'mongoose';

// Definición del nombre de la colección en la base de datos
const cartCollection = 'carts';

// Definición del esquema de Mongoose para el modelo Cart
const cartSchema = new mongoose.Schema({
    products: {
        type: [
            {
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "products" // Referencia al modelo 'products'
                },
                quantity: {
                    type: Number,
                    default: 1 // Valor por defecto para la cantidad
                }
            }
        ],
        default: [] // Valor por defecto para el campo 'products'
    }
});

// Creación del modelo Cart utilizando el esquema definido
const cartModel = mongoose.model(cartCollection, cartSchema);

// Exportación del modelo Cart
export default cartModel;
