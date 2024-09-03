import { authRoles } from '../middlewares/authroles.js'; // Importa el middleware para la autorización de roles
import BaseRouter from './BaseRouter.js'; // Importa la clase BaseRouter para extenderla
import usersController from '../controllers/user.controller.js'; // Importa el controlador para manejar operaciones de usuarios
import UserDTOSession from '../dto/user/UserDTOSession.js'; // Importa el DTO para representar la sesión del usuario

// Define la clase UsersRouter que extiende de BaseRouter
class UsersRouter extends BaseRouter {
    // Método para inicializar las rutas específicas de usuarios
    init() {
        // Ruta GET para obtener todos los usuarios, accesible solo para administradores
        this.get('/users', ['ADMIN'], usersController.getUsers);

        // Ruta GET para obtener un usuario por ID, accesible solo para administradores
        this.get('/users/:id', ['ADMIN'], usersController.getUserById);

        // Ruta POST para crear un nuevo usuario, accesible solo para administradores
        this.post('/users', ['ADMIN'], usersController.createUser);

        // Ruta PUT para actualizar un usuario por ID, accesible solo para administradores
        this.put('/users/:id', ['ADMIN'], usersController.updateUser);

        // Ruta DELETE para eliminar un usuario por ID, accesible solo para administradores
        this.delete('/users/:id', ['ADMIN'], usersController.deleteUser);

        // Ruta GET para obtener información del usuario actual, accesible para usuarios autorizados
        this.get('/current', ['AUTHORIZED'], authRoles, (req, res) => {
            const userDTO = new UserDTOSession(req.user); // Crea un DTO de sesión para el usuario actual
            res.json(userDTO); // Envía la información del usuario en formato JSON
        });
    }
}

// Crea una instancia de UsersRouter y exporta el router configurado
const usersRouter = new UsersRouter();
export default usersRouter.getRouter();
