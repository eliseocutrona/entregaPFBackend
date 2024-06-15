import express from 'express';

import handlebars from 'express-handlebars';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { Server } from 'socket.io';
import mongoose from 'mongoose';

import productRouter from './src/routes/productRouter.js';
import cartRouter from './src/routes/cartRouter.js';
import viewsRouter from './src/routes/viewsRouter.js';
import websocket from './src/websocket.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

// MongoDB connection

const uri = "mongodb+srv://eliseocutrona:123@clustercito.zmhrugo.mongodb.net/college?retryWrites=true&w=majority&appName=Clustercito";

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected successfully'))
    .catch(err => console.log('MongoDB connection error:', err));

// Handlebars Config
app.engine('handlebars', handlebars.engine());
app.set('views', join(__dirname, 'src', 'views'));
app.set('view engine', 'handlebars');

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(join(__dirname, 'public')));

// Routers
app.use('/api/products', productRouter);
app.use('/api/carts', cartRouter);
app.use('/', viewsRouter);

const PORT = 8080;
const httpServer = app.listen(PORT, () => {
    console.log(`Server started on PORT ${PORT}`);
});

const io = new Server(httpServer);

websocket(io);
