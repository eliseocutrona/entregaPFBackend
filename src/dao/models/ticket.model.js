import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid'; // Importa el generador de UUID

// Define el nombre de la colección en la base de datos
const collection = 'Ticket';

// Define el esquema para los tickets
const schema = new mongoose.Schema(
    {
        code: { 
            type: String, 
            unique: true, 
            default: () => uuidv4(), // Genera un UUID único como valor por defecto
            required: true 
        },
        purchaseDatetime: { 
            type: Date, 
            default: Date.now // Establece la fecha de compra por defecto como la fecha actual
        },
        amount: { 
            type: Number, 
            required: true // Cantidad obligatoria del ticket
        },
        purchaser: { 
            type: String, 
            required: true // Nombre del comprador, obligatorio
        },
    },
    {
        timestamps: { createdAt: 'purchaseDatetime' } // Asegura que `purchaseDatetime` se ajuste automáticamente a la fecha de creación
    }
);

// Crea el modelo de ticket basado en el esquema
const ticketModel = mongoose.model(collection, schema);

// Exporta el modelo para usarlo en otras partes de la aplicación
export default ticketModel;
