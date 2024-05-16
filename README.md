
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



### Paso a Paso con Postman: Primera Pre-Entrega del Proyecto Final


#### 1. Listar todos los productos

- **Método:** GET
- **URL:** `http://localhost:8080/api/products/`

#### 2. Traer un producto específico por su ID

- **Método:** GET
- **URL:** `http://localhost:8080/api/products/:pid`
  - Reemplaza `:pid` con el ID del producto deseado.

#### 3. Agregar un nuevo producto

- **Método:** POST
- **URL:** `http://localhost:8080/api/products/`
- **Cuerpo de la solicitud (JSON):**
  ```json
  {
    "title": "Nombre del producto",
    "description": "Descripción del producto",
    "code": "Código del producto",
    "price": 100,
    "status": true,
    "stock": 50,
    "category": "Categoría del producto",
    "thumbnails": ["ruta1.jpg", "ruta2.jpg"]
  }
  ```

#### 4. Actualizar un producto existente por su ID

- **Método:** PUT
- **URL:** `http://localhost:8080/api/products/:pid`
  - Reemplaza `:pid` con el ID del producto que deseas actualizar.
- **Cuerpo de la solicitud (JSON):**
  ```json
  {
    "title": "Nuevo nombre del producto",
    "description": "Nueva descripción del producto",
    "code": "Nuevo código del producto",
    "price": 150,
    "status": false,
    "stock": 30,
    "category": "Nueva categoría del producto",
    "thumbnails": ["nueva_ruta1.jpg", "nueva_ruta2.jpg"]
  }
  ```

#### 5. Eliminar un producto por su ID

- **Método:** DELETE
- **URL:** `http://localhost:8080/api/products/:pid`
  - Reemplaza `:pid` con el ID del producto que deseas eliminar.

#### 6. Crear un nuevo carrito

- **Método:** POST
- **URL:** `http://localhost:8080/api/carts/`
- - **Cuerpo de la solicitud (JSON):**
  ```json
  {
  "id": "1",
  "products": []
  }
  
  ```

#### 7. Listar los productos en un carrito por su ID

- **Método:** GET
- **URL:** `http://localhost:8080/api/carts/:cid`
  - Reemplaza `:cid` con el ID del carrito deseado.

#### 8. Agregar un producto al carrito

- **Método:** POST
- **URL:** `http://localhost:8080/api/carts/:cid/product/:pid`
  - Reemplaza `:cid` con el ID del carrito.
  - Reemplaza `:pid` con el ID del producto que deseas agregar al carrito.
- **Cuerpo de la solicitud (JSON):**
  ```json
  {
    "quantity": 1
  }
  ```





