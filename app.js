import express from 'express';
import handlebars from 'express-handlebars';
import mongoose from 'mongoose';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { Server } from 'socket.io';

import productRouter from './src/routes/productRouter.js';
import cartRouter from './src/routes/cartRouter.js';
import websocket from './src/websocket.js';



import passport from 'passport';
import cookieParser from 'cookie-parser';


// import sessionsRouter from './src/routes/sessions.router.js';

import SessionsRouter from './src/routes/SessionsRouter.js';
import initializePassportConfig from './src/config/passport.config.js';


import views_Router from './src/routes/views_Router.js';


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

// MongoDB connection

const uri = "mongodb+srv://eliseocutrona:123@clustercito.zmhrugo.mongodb.net/college?retryWrites=true&w=majority&appName=Clustercito";


const PORT = 8080;
const httpServer = app.listen(PORT, () => {
    console.log(`Server started on PORT ${PORT}`);
});


mongoose.connect(uri)
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
// app.use('/api/products', productRouter);
// app.use('/api/carts', cartRouter);
// app.use('/', viewsRouter);

// const io = new Server(httpServer);

// websocket(io);

app.use(cookieParser());
initializePassportConfig();
app.use(passport.initialize());


app.use('/',views_Router);
app.use('/api/sessions',SessionsRouter);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});