import express from 'express';
import path from 'path';
import { engine } from 'express-handlebars';
import mongoose from 'mongoose';
import passport from 'passport';
import cookieParser from 'cookie-parser';
import { Server } from 'socket.io';
import dotenv from 'dotenv';

import __dirname from './utils.js';

import ViewsRouter from './src/routes/ViewsRouter.js';
import SessionsRouter from './src/routes/SessionsRouter.js';
import productsRouter from './src/routes/ProductRouter.js';
import UsersRouter from './src/routes/UsersRouter.js';
import cartsRouter from './src/routes/CartRouter.js';

import initializePassportConfig from './src/config/passport.config.js';

// Cargar variables de entorno desde .env
dotenv.config();

const app = express();

// Configurar el puerto y URL de MongoDB
const PORT = process.env.PORT || 8080;
const MONGO_URL = process.env.MONGO_URL;

// Verificar la carga de variables de entorno
console.log('PORT:', PORT);
console.log('MONGO_URL:', MONGO_URL);
console.log('JWT_SECRET:', process.env.JWT_SECRET);

// Conectar a MongoDB
mongoose.connect(MONGO_URL)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB:', err));

// Configurar el servidor HTTP
const server = app.listen(PORT, () => console.log(`Listening on ${PORT}`));

// Configurar Socket.IO
const io = new Server(server);

// Configurar el motor de plantillas
app.engine('handlebars', engine({ extname: '.handlebars' }));
app.set('views', path.join(__dirname, '/src/views'));
app.set('view engine', 'handlebars');

// Configurar middleware
app.use(express.static(path.join(__dirname, '/src/public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use((req, res, next) => {
    req.io = io;
    next();
});

// Inicializar configuración de Passport
initializePassportConfig();
app.use(passport.initialize());

// Configurar rutas
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);
app.use('/api/sessions', SessionsRouter);
app.use('/api/users', UsersRouter);
app.use('/', ViewsRouter);

// Manejar rutas no encontradas
app.use('*', (req, res) => {
    res.status(404).render('404');
});

// Manejar errores generales
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).render('404', { message: 'Internal Server Error' });
});

// Manejar conexiones de Socket.IO
io.on('connection', (socket) => {
    console.log('Socket connected');
});
