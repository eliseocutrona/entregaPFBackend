import UserDTOSession from '../dto/user/UserDTOSession.js';
import usersDAO from '../dao/mongo/UsersDAO.js';

// Controlador para obtener todos los usuarios
const getUsers = async (req, res) => {
    try {
        // Obtención de todos los usuarios desde el DAO
        const users = await usersDAO.getAll();
        // Respuesta exitosa con la lista de usuarios
        res.send({ status: 'success', payload: users });
    } catch (error) {
        // Manejo de errores en caso de excepción
        res.status(500).send({ status: 'error', error: error.message });
    }
};

// Controlador para obtener un usuario específico por ID
const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        // Búsqueda del usuario por ID desde el DAO
        const user = await usersDAO.getById(id);
        if (!user) {
            // Respuesta de error si el usuario no se encuentra
            return res.status(404).send({ status: 'error', error: 'User not found' });
        }
        // Respuesta exitosa con el usuario encontrado
        res.send({ status: 'success', payload: user });
    } catch (error) {
        // Manejo de errores en caso de excepción
        res.status(500).send({ status: 'error', error: error.message });
    }
};

// Controlador para crear un nuevo usuario
const createUser = async (req, res) => {
    try {
        const { firstName, lastName, email } = req.body;
        // Validación de datos incompletos en la solicitud
        if (!firstName || !lastName || !email) {
            return res.status(400).send({ status: 'error', error: 'Incomplete values' });
        }
        // Creación del nuevo usuario
        const newUser = { firstName, lastName, email };
        const result = await usersDAO.create(newUser);
        // Respuesta exitosa con el ID del nuevo usuario creado
        res.status(201).send({ status: 'success', payload: result._id });
    } catch (error) {
        // Manejo de errores en caso de excepción
        res.status(500).send({ status: 'error', error: error.message });
    }
};

// Controlador para actualizar un usuario existente por ID
const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        // Actualización del usuario basado en el ID
        const user = await usersDAO.update(id, req.body);
        if (!user) {
            // Respuesta de error si el usuario no se encuentra
            return res.status(404).send({ status: 'error', error: 'User not found' });
        }
        // Respuesta exitosa con el usuario actualizado
        res.send({ status: 'success', payload: user });
    } catch (error) {
        // Manejo de errores en caso de excepción
        res.status(500).send({ status: 'error', error: error.message });
    }
};

// Controlador para eliminar un usuario por ID
const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        // Eliminación del usuario basado en el ID
        const user = await usersDAO.delete(id);
        if (!user) {
            // Respuesta de error si el usuario no se encuentra
            return res.status(404).send({ status: 'error', error: 'User not found' });
        }
        // Respuesta exitosa con el usuario eliminado
        res.send({ status: 'success', payload: user });
    } catch (error) {
        // Manejo de errores en caso de excepción
        res.status(500).send({ status: 'error', error: error.message });
    }
};

// Controlador para obtener el usuario actual (asumido que está autenticado)
const getCurrentUser = async (req, res) => {
    try {
        // Obtención del ID del usuario desde la sesión
        const userId = req.user._id;
        // Búsqueda del usuario por ID desde el DAO
        const user = await usersDAO.getById(userId);

        if (!user) {
            // Respuesta de error si el usuario no se encuentra
            return res.status(404).send({ status: 'error', error: 'User not found' });
        }

        // Transformación del usuario en un DTO para la sesión
        const userDTO = new UserDTOSession(user);
        // Respuesta exitosa con el DTO del usuario actual
        res.send({ status: 'success', payload: userDTO });
    } catch (error) {
        // Manejo de errores en caso de excepción
        res.status(500).send({ status: 'error', error: error.message });
    }
};

// Exportación de todos los controladores
export default {
    createUser,
    deleteUser,
    getUserById,
    getUsers,
    updateUser,
    getCurrentUser,
};
