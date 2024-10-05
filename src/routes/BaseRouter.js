import { Router } from 'express';
import { passportCall } from '../middlewares/passportCall.js'; // Middleware para la autenticación con Passport
import { executePolicies } from '../middlewares/policies.js'; // Middleware para ejecutar políticas específicas

// Clase BaseRouter que proporciona métodos básicos para manejar rutas
export default class BaseRouter {
    constructor() {
        this.router = Router(); // Crea una nueva instancia de Router de Express
        this.init(); // Llama al método init para inicializar cualquier configuración adicional
    }

    // Método para inicializar configuraciones adicionales (se puede sobrescribir en las clases hijas)
    init() {}

    // Método para obtener el router configurado
    getRouter() {
        return this.router;
    }

    // Método para definir una ruta GET con políticas y callbacks
    get(path, policies, ...callbacks) {
        // Verifica que las políticas sean proporcionadas y sean un arreglo
        if (!policies || !Array.isArray(policies)) throw new Error('Policies required for endpoint ' + path);
        // Configura la ruta GET con el middleware de respuestas personalizadas, políticas y callbacks
        this.router.get(path, this.generateCustomResponses, ...this.applyMiddleware(policies), ...this.applyCallbacks(callbacks));
    }

    // Método para definir una ruta POST con políticas y callbacks
    post(path, policies, ...callbacks) {
        // Verifica que las políticas sean proporcionadas y sean un arreglo
        if (!policies || !Array.isArray(policies)) throw new Error('Policies required for endpoint ' + path);
        // Configura la ruta POST con el middleware de respuestas personalizadas, políticas y callbacks
        this.router.post(path, this.generateCustomResponses, ...this.applyMiddleware(policies), ...this.applyCallbacks(callbacks));
    }

    // Método para definir una ruta PUT con políticas y callbacks
    put(path, policies, ...callbacks) {
        // Verifica que las políticas sean proporcionadas y sean un arreglo
        if (!policies || !Array.isArray(policies)) throw new Error('Policies required for endpoint ' + path);
        // Configura la ruta PUT con el middleware de respuestas personalizadas, políticas y callbacks
        this.router.put(path, this.generateCustomResponses, ...this.applyMiddleware(policies), ...this.applyCallbacks(callbacks));
    }

    // Método para definir una ruta DELETE con políticas y callbacks
    delete(path, policies, ...callbacks) {
        // Verifica que las políticas sean proporcionadas y sean un arreglo
        if (!policies || !Array.isArray(policies)) throw new Error('Policies required for endpoint ' + path);
        // Configura la ruta DELETE con el middleware de respuestas personalizadas, políticas y callbacks
        this.router.delete(path, this.generateCustomResponses, ...this.applyMiddleware(policies), ...this.applyCallbacks(callbacks));
    }

    // Middleware para generar respuestas personalizadas
    generateCustomResponses(req, res, next) {
        // Métodos personalizados para enviar respuestas con diferentes códigos de estado
        res.sendSuccess = (message) => res.status(200).send({ status: "success", message });
        res.sendBadRequest = (reason) => res.status(400).send({ status: "error", error: reason });
        res.sendUnauthorized = (reason) => res.status(401).send({ status: "error", error: reason || "Unauthorized" });
        res.sendNotFound = (reason) => res.status(404).send({ status: "error", error: reason || "Not Found" });
        res.sendForbidden = (reason) => res.status(403).send({ status: "error", error: reason || "Forbidden" });
        res.sendMethodNotAllowed = (reason) => res.status(405).send({ status: "error", error: reason || "Method Not Allowed" });
        res.sendConflict = (reason) => res.status(409).send({ status: "error", error: reason || "Conflict" });
        res.sendServerError = (reason) => res.status(500).send({ status: "error", error: reason || "Internal Server Error" });
        res.sendRedirect = (url) => res.redirect(302, url);
        next(); // Pasa al siguiente middleware o controlador
    }

    // Aplica los middlewares de políticas a la ruta
    applyMiddleware(policies) {
        return [
            passportCall('current'), // Asegura que el usuario esté autenticado
            executePolicies(policies) // Aplica las políticas específicas de la ruta
        ];
    }

    // Aplica los callbacks a la ruta, manejando errores de manera asincrónica
    applyCallbacks(callbacks) {
        return callbacks.map((callback) => {
            if (typeof callback !== 'function') {
                throw new Error('Callback must be a function'); // Verifica que el callback sea una función
            }
            return async (...params) => {
                try {
                    await callback.apply(this, params); // Ejecuta el callback
                } catch (error) {
                    console.error(error); // Registra el error en la consola
                    params[1].status(500).send({ status: "error", error: `${error.name} ${error.message}` }); // Envía una respuesta de error
                }
            };
        });
    }
}
