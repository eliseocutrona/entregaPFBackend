# entregaPFBackend

# Proyecto Final - API de Productos y Carritos

Este proyecto implementa un servidor utilizando Node.js y Express, diseñado para gestionar productos y carritos de compra mediante una API. El servidor se configura para escuchar en el puerto 8080 y provee endpoints específicos para operaciones relacionadas con productos y carritos.

## Estructura de Endpoints

El servidor maneja dos grupos principales de rutas:

### Productos

- **GET `/api/products/`**: Devuelve todos los productos disponibles en la base de datos.
- **GET `/api/products/:pid`**: Devuelve los detalles de un producto específico, utilizando su ID.
- **POST `/api/products/`**: Permite la creación de un nuevo producto. Los campos necesarios son:
  - `title`: String
  - `description`: String
  - `code`: String
  - `price`: Number
  - `status`: Boolean
  - `stock`: Number
  - `category`: String
  - `thumbnails`: Array de Strings (rutas de imágenes)
- **PUT `/api/products/:pid`**: Actualiza un producto existente (excepto su ID) basado en los datos proporcionados en el cuerpo de la solicitud.
- **DELETE `/api/products/:pid`**: Elimina un producto utilizando su ID.

### Carritos

- **POST `/api/carts/`**: Crea un nuevo carrito.
- **GET `/api/carts/:cid`**: Lista los productos dentro de un carrito específico.
- **POST `/api/carts/:cid/product/:pid`**: Agrega un producto al carrito. Si el producto ya existe, incrementa la cantidad.

## Persistencia de Datos

La persistencia de los datos se realiza utilizando archivos JSON (`products.json` y `carts.json`). Se utiliza `productManager` y `cartManager` para gestionar la persistencia.

## Uso Local

Para ejecutar este servidor localmente, siga estos pasos:

1. Clonar el repositorio:
git clone [URL_DEL_REPOSITORIO]

2. Instalar dependencias:
cd [NOMBRE_DEL_DIRECTORIO]
npm install

3. Iniciar el servidor:
npm start


## Pruebas con Postman

Para probar la API, puede utilizar Postman:

1. Importar la colección de Postman proporcionada.
2. Configurar el entorno en Postman con la variable de URL del servidor local (por defecto: `http://localhost:8080`).
3. Ejecutar las solicitudes deseadas desde Postman.

