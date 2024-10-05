import mongoose from 'mongoose';

// Define el nombre de la colección en la base de datos
const collection = 'Users';

// Define el esquema para los usuarios
const schema = new mongoose.Schema(
    {
        firstName: { 
            type: String, 
            required: true // Nombre de pila del usuario, obligatorio
        },
        lastName: { 
            type: String, 
            required: true // Apellido del usuario, obligatorio
        },
        email: { 
            type: String, 
            unique: true, // Asegura que el email sea único en la colección
            required: true, // Email obligatorio
            index: true // Crea un índice para mejorar la búsqueda por email
        },
        age: { 
            type: Number, 
            required: true // Edad del usuario, obligatoria. Verifica si es necesaria
        },
        password: { 
            type: String, 
            required: true // Contraseña del usuario, obligatoria
        },
        cart: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Cart' // Referencia al modelo 'Cart'. Asegúrate de que el modelo 'Cart' esté definido
        },
        role: { 
            type: String, 
            default: 'user' // Rol del usuario, por defecto es 'user'
        },
    },
    { timestamps: true } // Agrega automáticamente los campos 'createdAt' y 'updatedAt'
);

// Crea el modelo de usuario basado en el esquema
const usersModel = mongoose.model(collection, schema);

// Exporta el modelo para usarlo en otras partes de la aplicación
export default usersModel;
