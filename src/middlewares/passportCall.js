import passport from 'passport';

/**
 * Middleware para manejar la autenticación con Passport.
 * @param {string} strategy - Nombre de la estrategia de Passport a usar (por ejemplo, 'jwt').
 * @returns {Function} Middleware para autenticar al usuario.
 */
export const passportCall = (strategy) => {
    return async (req, res, next) => {
        passport.authenticate(strategy, { session: false }, function (error, user, info) {
            if (error) {
                return next(error);
            }
            req.user = user || null; // Asigna null si el usuario no está autenticado
            next();
        })(req, res, next);
    };
};
