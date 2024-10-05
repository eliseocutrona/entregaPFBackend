import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { ExtractJwt, Strategy as JWTStrategy } from 'passport-jwt';
import { usersService } from '../services/services.js';
import AuthService from '../services/authService.js';

const initializePassportConfig = () => {
    passport.use(
        'register',
        new LocalStrategy(
            { usernameField: 'email', passReqToCallback: true },
            async (req, email, password, done) => {
                const { firstName, lastName, age } = req.body;
                if (!firstName || !lastName) {
                    return done(null, false, { message: 'Incomplete values' });
                }
                const user = await usersService.getByEmail(email);
                if (user) {
                    return done(null, false, {
                        message: 'User already exists',
                    });
                }
                if (isNaN(age)) {
                    return done(null, false, { message: 'Invalid age value' });
                }
                const authService = new AuthService();
                const hashedPassword = await authService.hashPassword(password);
                const newUser = {
                    firstName,
                    lastName,
                    email,
                    age,
                    password: hashedPassword,
                };
                const result = await usersService.create(newUser); 
                return done(null, result);
            }
        )
    );

    passport.use(
        'login',
        new LocalStrategy(
            { usernameField: 'email' },
            async (email, password, done) => {
                const user = await usersService.getByEmail(email); // Ajustado aquí
                if (!user) {
                    return done(null, false, {
                        message: 'Incorrect credentials',
                    });
                }
                const authService = new AuthService();
                const isValidPassword = await authService.validatePassword(
                    password,
                    user.password
                );
                if (!isValidPassword) {
                    return done(null, false, {
                        message: 'Incorrect credentials',
                    });
                }
                return done(null, user);
            }
        )
    );
    passport.use(
        'current',
        new JWTStrategy(
            {
                secretOrKey: process.env.JWT_SECRET, // Usa una variable de entorno para la clave secreta
                jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
            },
            async (payload, done) => {
                try {
                    const user = await usersService.getById(payload.id); // Busca el usuario por ID si estás almacenando el ID en el JWT
                    if (!user) {
                        return done(null, false, { message: 'User not found' });
                    }
                    return done(null, user);
                } catch (error) {
                    return done(error, false);
                }
            }
        )
    );
    
};

function cookieExtractor(req) {
    return req?.cookies?.["tokencito"];
}

export default initializePassportConfig;
