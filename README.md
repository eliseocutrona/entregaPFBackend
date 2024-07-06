# Proyecto de Entrega Final

Este proyecto implementa un servidor utilizando Node.js, Express y MongoDB para gestionar productos y carritos de compra mediante una API. Además, se han mejorado los endpoints para soportar filtros, paginación, ordenamiento y se han agregado nuevas funcionalidades para la gestión de carritos.

## Configuración

1. **Clonar el repositorio desde GitHub:**

   ```bash
   git clone [URL_DEL_REPOSITORIO]


2. **Instalar las dependencias necesarias:**

   ```bash
   cd [NOMBRE_DEL_DIRECTORIO]
   npm install
   ```

## Configurar las variables de entorno:

Crea un archivo .env en la raíz del proyecto y configura las variables de entorno necesarias, como la URL de conexión a MongoDB.

MONGODB_URI=mongodb://localhost:27017/mi_base_de_datos
PORT=8080

## Ejecución del Servidor

Para iniciar el servidor y probar el funcionamiento, sigue estos pasos:

- Ejecutar el servidor en el puerto predeterminado (8080):

  ```bash
  npm start
  ```

- Abre tu navegador web y accede a la siguiente URL para visualizar la lista de productos:

  ```
  http://localhost:8080/products
  ```

- A continuación, puedes acceder a la ruta para visualizar la lista de productos en tiempo real mediante websockets:

  ```
  http://localhost:8080/realtimeproducts
  ```



# Endpoints de la API
#  Productos
GET /api/products

Parámetros opcionales:

limit: Número de elementos a devolver (por defecto 10).
page: Página a buscar (por defecto 1).
sort: Ordenar por precio ascendente (asc) o descendente (desc).
query: Filtro para buscar por categoría o disponibilidad.

Respuesta:

  ```bash

{
    "status": "success",
    "payload": [...],
    "totalPages": ...,
    "prevPage": ...,
    "nextPage": ...,
    "page": ...,
    "hasPrevPage": ...,
    "hasNextPage": ...,
    "prevLink": "...",
    "nextLink": "..."
}
  ```

# Carritos
DELETE `/api/carts/:id_productos/`

Elimina el producto seleccionado del carrito.

PUT `/api/carts/`

Actualiza todos los productos del carrito con un arreglo de productos.

PUT `/api/carts/:id_products/`

Actualiza la cantidad de ejemplares del producto en el carrito.

DELETE `/api/carts/`

Elimina todos los productos del carrito.

GET `/api/carts/`

Obtiene todos los productos del carrito con sus detalles completos mediante populate.

# Vistas
# Productos
GET /products

Visualiza todos los productos con su respectiva paginación. Cada producto tiene un botón para agregar al carrito.

GET `/products/`

Visualiza los detalles completos del producto seleccionado, incluyendo un botón para agregar al carrito.

# Carritos

GET `/carts/:id_productos/`

Visualiza los productos pertenecientes a un carrito específico.

# Proceso de Testing
Para verificar que el servidor y las funcionalidades nuevas funcionan correctamente, sigue estos pasos:

Verifica que el servidor se inicie correctamente y sin errores.
Accede a la ruta /products para asegurar que se visualice correctamente la lista de productos con paginación.
Utiliza las rutas de la API para probar las nuevas funcionalidades de gestión de carritos y productos.
Accede a la ruta `/carts/:cid` para comprobar que los productos se muestran correctamente mediante populate.

