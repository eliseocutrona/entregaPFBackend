export const executePolicies = (policies) => {
    return (req, res, next) => {
        // Permite el acceso si la política incluye 'PUBLIC'
        if (policies.includes('PUBLIC')) return next();
        
        // Permite el acceso si la política incluye 'AUTHORIZED' y el usuario está autenticado
        if (policies.includes('AUTHORIZED') && !req.user) return res.sendUnauthorized();
        
        // Permite el acceso si el rol del usuario coincide con alguna política
        if (policies.includes(req?.user?.role?.toUpperCase())) return next();
        
        // Deniega el acceso si ninguna de las condiciones anteriores se cumple
        return res.sendUnauthorized();
    };
};
