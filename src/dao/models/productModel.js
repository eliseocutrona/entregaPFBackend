// Importamos Mongoose y el plugin de paginación de Mongoose
import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

// Definimos el nombre de la colección de productos en la base de datos
const productCollection = "products";

// Definimos el esquema de productos
const productSchema = mongoose.Schema({
    title: {
        type: String,     // Tipo de dato: cadena de texto
        require: true     // Campo requerido
    },
    description: {
        type: String,     // Tipo de dato: cadena de texto
        require: true     // Campo requerido
    },
    code: {
        type: String,     // Tipo de dato: cadena de texto
        require: true     // Campo requerido
    },
    price: {
        type: Number,     // Tipo de dato: número
        require: true     // Campo requerido
    },
    stock: {
        type: Number,     // Tipo de dato: número
        require: true     // Campo requerido
    },
    category: {
        type: String,     // Tipo de dato: cadena de texto
        require: true     // Campo requerido
    },
    thumbnails: {
        type: Array,      // Tipo de dato: arreglo
        require: false,   // Campo no requerido
        default: []       // Valor por defecto: arreglo vacío
    }
});

// Añadimos el plugin de paginación al esquema de productos
productSchema.plugin(mongoosePaginate);

// Creamos el modelo de productos usando el esquema y la colección definidos
const ProductModel = mongoose.model(productCollection, productSchema);

// Exportamos el modelo de productos para usarlo en otras partes del proyecto
export default ProductModel;
