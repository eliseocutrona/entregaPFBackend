export const authRoles = (allowedRoles) => {
    return (req, res, next) => {
        const userRole = req.user?.role; // Obtiene el rol del usuario desde req.user
        if (!userRole || !allowedRoles.includes(userRole)) {
            return res.status(403).json({ error: 'Access denied' }); // Responde con un error 403 si el rol no está permitido
        }

        next(); // Llama al siguiente middleware o ruta si el rol es permitido
    };
};
