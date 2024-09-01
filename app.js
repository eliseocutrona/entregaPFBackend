import express from 'express';
import handlebars from 'express-handlebars';
import mongoose from 'mongoose';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { Server } from 'socket.io';

import UsersRouter from './src/routes/UsersRouter.js'; 
import productRouter from './src/routes/productRouter.js';
import cartRouter from './src/routes/cartRouter.js';
import websocket from './src/websocket.js';

import config from './src/config/config.js'; 
import passport from 'passport';
import cookieParser from 'cookie-parser';

import SessionsRouter from './src/routes/SessionsRouter.js';
import initializePassportConfig from './src/config/passport.config.js';

import viewsRouter from './src/routes/viewsRouter.js';
import dotenv from 'dotenv';

dotenv.config(); // Cargar las variables de entorno

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

const PORT = process.env.PORT || 8080;
const server = app.listen(PORT, () => console.log(`Listening on ${PORT}`));

console.log('MongoDB URL:', process.env.MONGO_URL);


const connection = mongoose.connect(process.env.MONGO_URL);

// Handlebars Config
app.engine('handlebars', handlebars.engine());
app.set('views', join(__dirname, 'src', 'views'));
app.set('view engine', 'handlebars');

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(join(__dirname, 'public')));
app.use(cookieParser());
initializePassportConfig();
app.use(passport.initialize());

// Routers
app.use('/api/products', productRouter);
app.use('/api/carts', cartRouter);
app.use('/api/sessions', SessionsRouter);
app.use('/', viewsRouter);
app.use('/api/users', UsersRouter);

// Socket.IO
const io = new Server(server);
websocket(io);

// Error Handling Middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});
