```
# API de Productos y Carritos

Este proyecto implementa un servidor utilizando Node.js y Express para gestionar productos y carritos de compra mediante una API.

## Estructura de Endpoints

### Productos

- **GET `/api/products/`**: Devuelve todos los productos disponibles.
- **GET `/api/products/:pid`**: Devuelve los detalles de un producto específico.
- **POST `/api/products/`**: Crea un nuevo producto.
- **PUT `/api/products/:pid`**: Actualiza un producto existente.
- **DELETE `/api/products/:pid`**: Elimina un producto.

### Carritos

- **POST `/api/carts/`**: Crea un nuevo carrito.
- **GET `/api/carts/:cid`**: Lista los productos en un carrito.
- **POST `/api/carts/:cid/product/:pid`**: Agrega un producto al carrito.

## Persistencia de Datos

La persistencia de los datos se realiza utilizando archivos JSON (`products.json` y `carts.json`). Se utiliza `productManager` y `cartManager` para gestionar la persistencia.

## Uso Local

### Pasos

1. Clonar el repositorio:

   ```bash
   git clone [URL_DEL_REPOSITORIO]
   ```

2. Instalar dependencias:

   ```bash
   cd [NOMBRE_DEL_DIRECTORIO]
   npm install
   ```

3. Iniciar el servidor:

   ```bash
   npm start
   ```

## Pruebas con Postman

1. Importar la colección de Postman proporcionada.
2. Configurar el entorno en Postman con la variable de URL del servidor local (por defecto: `http://localhost:8080`).
3. Ejecutar las solicitudes deseadas desde Postman.
```
