import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import config from '../config/config.js';
import User from '../dao/models/user.model.js';

const handleError = (res, error, statusCode = 500, message = 'Something went wrong') => {
    console.error(error); // Log the error for debugging
    res.status(statusCode).send({ message, error: error.message });
};

const register = async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;

        if (!firstName || !lastName || !email || !password) {
            return res.status(400).send({ message: 'Missing required fields' });
        }

        // Verifica si el correo electrónico ya está en uso
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).send({ message: 'Email already in use' });
        }

        // Cifra la contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            firstName,
            lastName,
            email,
            password: hashedPassword,
        });

        // Crear JWT
        const sessionUser = {
            name: `${newUser.firstName} ${newUser.lastName}`,
            role: newUser.role,
            id: newUser._id,
        };

        const token = jwt.sign(sessionUser, config.auth.jwt.SECRET, { expiresIn: '1d' });

        res.cookie(config.auth.jwt.COOKIE, token).status(201).send({ message: 'Registered successfully' });
    } catch (error) {
        handleError(res, error, 500, 'Registration failed');
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).send({ message: 'Missing email or password' });
        }

        // Busca el usuario por correo electrónico
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).send({ message: 'Invalid email or password' });
        }

        // Compara la contraseña ingresada con la almacenada en la base de datos
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).send({ message: 'Invalid email or password' });
        }

        // Crear JWT
        const sessionUser = {
            name: `${user.firstName} ${user.lastName}`,
            role: user.role,
            id: user._id,
        };

        const token = jwt.sign(sessionUser, config.auth.jwt.SECRET, { expiresIn: '1d' });

        res.cookie(config.auth.jwt.COOKIE, token).status(200).send({ message: 'Login successful' });
    } catch (error) {
        handleError(res, error, 500, 'Login failed');
    }
};

const current = async (req, res) => {
    try {
        // `req.user` debería estar disponible después de la autenticación
        const user = req.user;
        if (!user) {
            return res.status(401).send({ message: 'User not authenticated' });
        }

        // Devuelve los datos del usuario autenticado
        res.status(200).send({
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
        });
    } catch (error) {
        handleError(res, error, 500, 'Failed to get current user');
    }
};


const logout = (req, res) => {
    try {
        // Borra el cookie del token JWT
        res.clearCookie(config.auth.jwt.COOKIE);
        res.status(200).send({ message: 'Logged out successfully' });
    } catch (error) {
        handleError(res, error, 500, 'Logout failed');
    }
};

export default { register, login, current, logout };
