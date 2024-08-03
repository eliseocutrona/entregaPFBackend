# Proyecto de Entrega Final - Segunda Pre-entrega (Websockets)

Este proyecto implementa un servidor utilizando Node.js y Express para gestionar productos y carritos de compra mediante una API. Además, integra websockets para la actualización en tiempo real de la lista de productos en la vista "realTimeProducts.handlebars".

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

Para verificar que el servidor y los websockets funcionan correctamente, sigue estos pasos:

- Verifica que el servidor se inicie correctamente y sin errores.
- Accede a la ruta raíz (`http://localhost:8080/products`) y asegúrate de que se visualice correctamente la vista "index.handlebars".
- A continuación, accede a la ruta de productos en tiempo real (`http://localhost:8080/realtimeproducts`) y comprueba que la consola del servidor muestre un mensaje de "cliente conectado".
- Observa que se muestre la lista de productos en la vista "realTimeProducts.handlebars" y verifica que se actualice automáticamente cuando se agreguen o eliminen productos.
