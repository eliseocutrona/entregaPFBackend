---

# Pre-entrega de tu Proyecto final Backend 2

## Descripción del Proyecto

Se implementará en el proyecto ecommerce facilitado al inicio del curso un CRUD de usuarios, junto con un sistema de autorización y autenticación.

## Requisitos

### 1. Crear un Modelo User

El modelo `User` contará con los siguientes campos:

- `first_name`: String
- `last_name`: String
- `email`: String (único)
- `age`: Number
- `password`: String (Hash)
- `cart`: Id con referencia a `Carts`
- `role`: String (default: 'user')

### 2. Encriptar la Contraseña

Encriptar la contraseña del usuario mediante el paquete `bcrypt` utilizando el método `hashSync`.

### 3. Estrategias de Passport

Desarrollar las estrategias de Passport para que funcionen con el modelo de usuarios.

### 4. Sistema de Login con JWT

Implementar un sistema de login del usuario que trabaje con JWT.

### 5. Estrategia “Current”

Desarrollar una estrategia “current” para extraer la cookie que contiene el token y con dicho token obtener el usuario asociado. En caso de tener el token, devolver al usuario asociado al token; caso contrario, devolver un error de Passport utilizando un extractor de cookie.

### 6. Ruta /current

Agregar al router `/api/sessions/` la ruta `/current`, la cual validará al usuario logueado y devolverá en una respuesta sus datos (asociados al JWT).

## Formato de Entrega

- Link al repositorio de GitHub con el proyecto completo, sin la carpeta de `node_modules`.

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

## Ejecución del Servidor

Para iniciar el servidor y probar el funcionamiento, sigue estos pasos:

### 1. Ejecutar el Servidor en el Puerto Predeterminado (8080)

```bash
npm start
```

### 2. Acceder a la Lista de Productos

Abre tu navegador web y accede a la siguiente URL:

```
http://localhost:8080/products
```

### 3. Acceder a la Lista de Productos en Tiempo Real

Para visualizar los productos en tiempo real mediante websockets:

```
http://localhost:8080/realtimeproducts
```

## Proceso de Testing

### 1. Configuración Inicial

Para probar las funcionalidades del proyecto, asegúrate de tener las dependencias instaladas y el servidor en ejecución.

### 2. CRUD de Usuarios

- **Crear Usuario**:
  Utiliza la siguiente ruta para crear un nuevo usuario:
  ```
  POST /api/users
  ```
  Ejemplo de cuerpo de solicitud:
  ```json
  {
    "first_name": "John",
    "last_name": "Doe",
    "email": "john.doe@example.com",
    "age": 30,
    "password": "password123",
    "cart": "cartId",
    "role": "user"
  }
  ```

- **Obtener Usuarios**:
  ```
  GET /api/users
  ```

- **Actualizar Usuario**:
  ```
  PUT /api/users/:id
  ```

- **Eliminar Usuario**:
  ```
  DELETE /api/users/:id
  ```

### 3. Autenticación y Autorización

- **Registro**:
  ```
  POST /api/sessions/register
  ```

- **Login**:
  ```
  POST /api/sessions/login
  ```
  Ejemplo de cuerpo de solicitud:
  ```json
  {
    "email": "john.doe@example.com",
    "password": "password123"
  }
  ```

- **Verificación de Usuario Actual**:
  ```
  GET /api/sessions/current
  ```

### 4. Websockets

Para probar las funcionalidades en tiempo real, abre la siguiente URL en tu navegador:

```
http://localhost:8080/realtimeproducts
```

## Enlaces Útiles

- [Documentación de bcrypt](https://www.npmjs.com/package/bcrypt)
- [Documentación de Passport](http://www.passportjs.org/)
- [Documentación de JWT](https://jwt.io/)

## Video Explicativo

Para más detalles, puedes ver el siguiente [video explicativo](URL_DEL_VIDEO).

---

Asegúrate de reemplazar los placeholders `[URL_DEL_REPOSITORIO]`, `[NOMBRE_DEL_DIRECTORIO]`, y `URL_DEL_VIDEO` con la información correspondiente a tu proyecto.
