import passport from "passport";

export const passportCall = (strategy) => {
    return (req, res, next) => {
        passport.authenticate(strategy, (error, user, info) => {
            if (error) {
                return res.status(500).json({ message: "Internal Server Error", error });
            }

            if (!user) {
                return res.status(401).json({ message: "Unauthorized", info });
            }

            req.user = user;
            next();
        })(req, res, next);
    };
};
