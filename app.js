import express from 'express';
import handlebars from 'express-handlebars';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { Server } from 'socket.io';
import mongoose from 'mongoose';

import productRouter from './src/routes/productRouter.js';
import cartRouter from './src/routes/cartRouter.js';
import viewsRouter from './src/routes/viewsRouter.js';
import websocket from './websocket.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

const uri = 'mongodb://127.0.0.1:27017/entrega-final';
mongoose.connect(uri);

//Handlebars Config
app.engine('handlebars', handlebars.engine());
app.set('views', `${__dirname}/../views`);
app.set('view engine', 'handlebars');

//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

//Routers
app.use('/api/products', productRouter);
app.use('/api/carts', cartRouter);
app.use('/', viewsRouter);

const PORT = 8080;
const httpServer = app.listen(PORT, () => {
    console.log(`Start server in PORT ${PORT}`);
});

const io = new Server(httpServer);

websocket(io);
