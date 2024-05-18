import express from 'express';
import { engine } from 'express-handlebars'; 
import path from 'path';
import productRouter from './src/routes/productRouter.js';
import cartRouter from './src/routes/cartRouter.js';
import viewsRouter from './src/routes/viewsRouter.js';
import __dirname from './src/utils/constantsUtil.js';

const app = express();

// Configuración de Handlebars
app.engine('handlebars', engine()); // Asegúrate de usar 'engine' de 'express-handlebars'
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, '../views')); // Usar path.join para construir la ruta

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public'))); // Usar path.join para construir la ruta

// Routers
app.use('/products', viewsRouter);
app.use('/api/carts', cartRouter);
app.use('/api/products', productRouter);

// Middleware para manejar errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server started on PORT ${PORT}`);
});
