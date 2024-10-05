import BaseRouter from './BaseRouter.js';
import { passportCall } from '../middlewares/passportCall.js';
import { executePolicies } from '../middlewares/policies.js';
import sessionsController from '../controllers/sessions.controller.js';

class SessionsRouter extends BaseRouter {
    init() {
        // Ruta de registro (Pública, sin autenticación requerida)
        this.post(
            '/register',
            ['PUBLIC'],
            sessionsController.register // Callback para manejar el registro
        );

        // Ruta de inicio de sesión (Pública, sin autenticación requerida)
        this.post(
            '/login',
            ['PUBLIC'],
            sessionsController.login // Callback para manejar el inicio de sesión
        );

        // Ruta para obtener datos del usuario actual (Requiere autenticación de usuario)
        this.get(
            '/current',
            ['USER'],
            passportCall('current'), // Middleware para autenticación
            executePolicies(['USER']), // Middleware para políticas
            sessionsController.current // Callback para manejar la solicitud
        );

        // Ruta para cerrar sesión (Requiere autenticación de usuario)
        this.get(
            '/logout',
            ['USER'],
            passportCall('current'), // Middleware para autenticación
            executePolicies(['USER']), // Middleware para políticas
            sessionsController.logout // Callback para manejar la solicitud
        );
    }
}

const sessionsRouter = new SessionsRouter();
export default sessionsRouter.getRouter();
