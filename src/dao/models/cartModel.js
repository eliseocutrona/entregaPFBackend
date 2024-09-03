import mongoose from 'mongoose';

// Define el nombre de la colección en la base de datos
const collection = 'Carts';

// Define el esquema para los carritos
const schema = new mongoose.Schema({
  products: [
    {
      product: {
        type: mongoose.SchemaTypes.ObjectId, // Tipo de dato para el ID del producto
        ref: 'Products', // Referencia al modelo 'Products'
        required: true, // Campo obligatorio
      },
      quantity: {
        type: Number, // Tipo de dato para la cantidad del producto
        required: true, // Campo obligatorio
      },
    },
  ]
}, { timestamps: true }); // Añade campos de timestamps (createdAt y updatedAt)

// Middleware para poblar el campo 'products.product' en las consultas
schema.pre(['find', 'findOne', 'findById'], function () {
  this.populate('products.product');
});

// Crea el modelo de carrito basado en el esquema
const cartModel = mongoose.model(collection, schema);

// Exporta el modelo para usarlo en otras partes de la aplicación
export default cartModel;
