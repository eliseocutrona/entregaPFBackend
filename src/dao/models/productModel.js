import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

// Define el nombre de la colección en la base de datos
const collection = 'Products';

// Define el esquema para las miniaturas de los productos
const thumbnailSchema = new mongoose.Schema({
  mimetype: String, // Tipo MIME de la imagen
  path: String, // Ruta de la imagen
  main: Boolean, // Indica si la miniatura es la principal
});

// Define el esquema principal para los productos
const schema = new mongoose.Schema({
  title: { type: String, required: true }, // Título del producto, obligatorio
  description: { type: String, required: true }, // Descripción del producto, obligatoria
  code: { type: String, required: true, unique: true }, // Código único del producto, obligatorio y único
  price: { type: Number, required: true }, // Precio del producto, obligatorio
  stock: { type: Number, required: true }, // Cantidad en stock, obligatoria
  category: { type: String, required: true }, // Categoría del producto, obligatoria
  thumbnails: [thumbnailSchema], // Array de miniaturas usando el esquema 'thumbnailSchema'
});

// Añade la funcionalidad de paginación al esquema
schema.plugin(mongoosePaginate);

// Crea el modelo de producto basado en el esquema
const productModel = mongoose.model(collection, schema);

// Exporta el modelo para usarlo en otras partes de la aplicación
export default productModel;
