import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { ExtractJwt, Strategy as JWTStrategy } from "passport-jwt";

import { usersService } from "../dao/index.js";
import AuthService from "../services/AuthService.js";

const initializePassportConfig = () => {
    passport.use('register', new LocalStrategy({
        usernameField: 'email',
        passReqToCallback: true
    }, async (req, email, password, done) => {
        try {
            const { first_name, last_name, birthDate } = req.body;
            if (!first_name || !last_name) {
                return done(null, false, { message: 'Incomplete values' });
            }

            const user = await usersService.getUserByEmail(email);
            if (user) {
                return done(null, false, { message: "User already exists" });
            }

            let parsedDate;
            if (birthDate) {
                parsedDate = new Date(birthDate).toISOString();
            }

            const authService = new AuthService();
            const hashedPassword = await authService.hashPassword(password);

            const newUser = {
                first_name,
                last_name,
                email,
                birthDate: parsedDate,
                password: hashedPassword,
                role: 'user' // default role
            };

            const result = await usersService.createUser(newUser);
            return done(null, result);
        } catch (err) {
            return done(err);
        }
    }));

    passport.use('login', new LocalStrategy({
        usernameField: 'email'
    }, async (email, password, done) => {
        try {
            const user = await usersService.getUserByEmail(email);
            if (!user) {
                return done(null, false, { message: "Incorrect credentials" });
            }

            const authService = new AuthService();
            const isValidPassword = await authService.validatePassword(password, user.password);
            if (!isValidPassword) {
                return done(null, false, { message: "Incorrect credentials" });
            }

            return done(null, user);
        } catch (err) {
            return done(err);
        }
    }));

    passport.use('current', new JWTStrategy({
        secretOrKey: 'secretitoshhhhh',
        jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor])
    }, async (payload, done) => {
        try {
            const user = await usersService.getUserById(payload.id);
            if (!user) {
                return done(null, false, { message: "User not found" });
            }
            return done(null, user);
        } catch (err) {
            return done(err);
        }
    }));
};

function cookieExtractor(req) {
    return req?.cookies?.['tokencito'];
}

export default initializePassportConfig;
