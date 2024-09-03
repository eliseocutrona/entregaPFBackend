import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid'; // Importar un generador de UUID para el campo `code`

const collection = 'Ticket';

const schema = new mongoose.Schema(
    {
        code: { 
            type: String, 
            unique: true, 
            default: () => uuidv4(), // Genera un UUID único por defecto
            required: true 
        },
        purchaseDatetime: { 
            type: Date, 
            default: Date.now 
        },
        amount: { 
            type: Number, 
            required: true 
        },
        purchaser: { 
            type: String, 
            required: true 
        },
    },
    {
        timestamps: { createdAt: 'purchaseDatetime' } // Asegura que `purchaseDatetime` se ajuste automáticamente a la fecha de creación
    }
);

const ticketModel = mongoose.model(collection, schema);

export default ticketModel;
