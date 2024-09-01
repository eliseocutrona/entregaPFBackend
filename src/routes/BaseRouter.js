import { Router } from "express";
import { passportCall } from "../middlewares/passportCall.js";
import { executePolicies } from "../middlewares/policies.js";

export default class BaseRouter {
    constructor() {
        this.router = Router();
        this.init();
    }

    // Método para ser sobrescrito por las clases hijas para definir rutas
    init() {}

    // Retorna el enrutador configurado
    getRouter() {
        return this.router;
    }

    // Agrega una ruta GET al enrutador
    get(path, policies, ...callbacks) {
        if (!Array.isArray(policies)) {
            throw new Error(`Policies required for endpoint ${path}`);
        }
        this.router.get(path, this.generateCustomResponses, passportCall('current'), executePolicies(policies), this.applyCallbacks(callbacks));
    }

    // Agrega una ruta POST al enrutador
    post(path, policies, ...callbacks) {
        if (!Array.isArray(policies)) {
            throw new Error(`Policies required for endpoint ${path}`);
        }
        this.router.post(path, this.generateCustomResponses, passportCall('current'), executePolicies(policies), this.applyCallbacks(callbacks));
    }

    // Agrega una ruta PUT al enrutador
    put(path, policies, ...callbacks) {
        if (!Array.isArray(policies)) {
            throw new Error(`Policies required for endpoint ${path}`);
        }
        this.router.put(path, this.generateCustomResponses, passportCall('current'), executePolicies(policies), this.applyCallbacks(callbacks));
    }

    // Agrega una ruta DELETE al enrutador
    delete(path, policies, ...callbacks) {
        if (!Array.isArray(policies)) {
            throw new Error(`Policies required for endpoint ${path}`);
        }
        this.router.delete(path, this.generateCustomResponses, passportCall('current'), executePolicies(policies), this.applyCallbacks(callbacks));
    }

    // Genera respuestas personalizadas para el enrutador
    generateCustomResponses(req, res, next) {
        res.sendSuccess = (message) => res.status(200).send({ status: "success", message });
        res.sendBadRequest = (reason) => res.status(400).send({ status: "error", error: reason });
        res.sendUnauthorized = (reason) => res.status(401).send({ status: "error", error: reason || "Unauthorized" });
        res.sendNotFound = (reason) => res.status(404).send({ status: "error", error: reason || "Not Found" });
        res.sendForbidden = (reason) => res.status(403).send({ status: "error", error: reason || "Forbidden" });
        res.sendMethodNotAllowed = (reason) => res.status(405).send({ status: "error", error: reason || "Method Not Allowed" });
        res.sendConflict = (reason) => res.status(409).send({ status: "error", error: reason || "Conflict" });
        res.sendServerError = (reason) => res.status(500).send({ status: "error", error: reason || "Internal Server Error" });
        res.sendRedirect = (url) => res.redirect(302, url);
        next();
    }

    // Aplica los callbacks a las rutas
    applyCallbacks(callbacks) {
        return callbacks.map((callback) => async (req, res, next) => {
            try {
                await callback(req, res, next);
            } catch (error) {
                console.error(error);
                res.status(500).send({ status: "error", error: `${error.name} ${error.message}` });
            }
        });
    }
}
