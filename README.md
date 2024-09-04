# Proyecto Final Backend 2

## Objetivos del Proyecto

1. **Profesionalizar el servidor** desarrollado en la primera preentrega.
2. **Aplicar una arquitectura profesional** al servidor.
3. **Implementar prácticas** como patrones de diseño, middleware de autorización, JWT, y uso de variables de entorno.

## Implementación

### 1. Middleware de Autorización y Estrategia "Current"

- **Sistema de autorización:**  
  Se implementó un middleware que, en conjunto con la estrategia "current", gestiona la autorización de acceso a los endpoints.
  - **Solo el administrador puede crear, actualizar y eliminar productos.**
  - **Solo los usuarios pueden agregar productos a su carrito.**

### 2. Modelo de Ticket y Lógica de Compra

- **Modelo Ticket:**  
  Se creó un modelo `Ticket` que contiene los siguientes campos:
  - `Id`: Autogenerado por MongoDB.
  - `code`: String, generado automáticamente y único.
  - `purchase_datetime`: Fecha y hora exacta en que se formalizó la compra (similar a `created_at`).
  - `amount`: Número, total de la compra.
  - `purchaser`: String, correo del usuario asociado al carrito.

- **Ruta `/purchase` en el Router de `Carts`:**  
  Se implementó la ruta `/api/carts/:cid/purchase` que permite finalizar el proceso de compra. Esta ruta realiza las siguientes acciones:
  - Verifica el stock de los productos al momento de finalizar la compra.
  - Si el producto tiene suficiente stock, se restará la cantidad correspondiente.
  - Si el producto no tiene suficiente stock, no se agregará al proceso de compra y se devolverá un arreglo con los ids de los productos que no pudieron procesarse.
  - Finalmente, se genera un ticket con los datos de la compra usando el servicio de Tickets.
  - El carrito del usuario se actualiza para contener solo los productos que no pudieron comprarse.

### 3. Creación del Modelo `User`

El modelo `User` cuenta con los siguientes campos:

- `first_name`: String
- `last_name`: String
- `email`: String (único)
- `age`: Number
- `password`: String (Hash)
- `cart`: Id con referencia a `Carts`
- `role`: String (default: 'user')

### 4. Sistema de Autenticación

- **Contraseña encriptada:**  
  Las contraseñas de los usuarios se encriptan usando `bcrypt` mediante el método `hashSync`.

- **Estrategias de Passport:**  
  Se desarrollaron estrategias de Passport para trabajar con el modelo de usuarios.

- **Login con JWT:**  
  Implementación de un sistema de login que utiliza JWT para la autenticación.

- **Ruta `/current`:**  
  La ruta `/api/sessions/current` valida al usuario logueado y devuelve sus datos asociados al JWT.

## Configuración del Proyecto

### 1. Clonar el Repositorio

```bash
git clone [URL_DEL_REPOSITORIO]
```


### 2. Instalar Dependencias
```bash
cd [NOMBRE_DEL_DIRECTORIO]
npm install
```


### 3. Configurar Variables de Entorno

### 4. Ejecución del Servidor
Iniciar el Servidor
Para iniciar el servidor en el puerto predeterminado (8080), utiliza el siguiente comando:
```bash
npm start
```
###  Acceder a los Endpoints
Lista de Productos:
```bash
http://localhost:8080/products
```
###  Productos en Tiempo Real:

```bash
http://localhost:8080/realtimeproducts
```
### CRUD de Usuarios y Autenticación
Crear Usuario:
```bash
POST /api/users
```
Login:
```bash

POST /api/sessions/login
```

Verificar Usuario Actual:
```bash

GET /api/sessions/current
```

4. Finalizar Compra
```bash
POST /api/carts/:cid/purchase
```

###  Proceso de Testing
1. Pruebas de CRUD
Crear, leer, actualizar y eliminar usuarios.
2. Pruebas de Autenticación
Registro y login de usuarios.
Verificación del usuario autenticado con JWT.
3. Pruebas de Compra
Finalización de la compra y generación del ticket.
Verificación de stock y actualización del carrito.

