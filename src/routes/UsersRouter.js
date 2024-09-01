import * as usersController from '../controllers/user.controller.js'; // Debe ser esta ruta si 'users.controller.js' está en 'controllers'
import BaseRouter from './BaseRouter.js';
import { authRoles } from '../middlewares/authRoles.js';
import UserDTOSession from '../dto/user/UserDTOSession.js';

class UsersRouter extends BaseRouter {
    init() {
        this.get('/users', ['ADMIN'], usersController.getUsers);
        this.get('/users/:id', ['ADMIN'], usersController.getUserById);
        this.post('/users', ['ADMIN'], usersController.createUser);
        this.put('/users/:id', ['ADMIN'], usersController.updateUser);
        this.delete('/users/:id', ['ADMIN'], usersController.deleteUser);
        this.get('/current', ['AUTHORIZED'], authRoles, (req, res) => {
            const userDTO = new UserDTOSession(req.user);
            res.json(userDTO);
        });
    }
}

const usersRouter = new UsersRouter();
export default usersRouter.getRouter();