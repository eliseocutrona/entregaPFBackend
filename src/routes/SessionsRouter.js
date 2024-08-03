import jwt from 'jsonwebtoken';
import { passportCall } from "../middlewares/passportCall.js";
import BaseRouter from "./BaseRouter.js";

class SessionsRouter extends BaseRouter {
    init() {
        this.post('/register', ['PUBLIC'], passportCall('register'), (req, res) => {
            res.sendSuccess("Registered");
        });

        this.post('/login', ['PUBLIC'], passportCall('login'), (req, res) => {
            try {
                console.log(req.user);
                const sessionUser = {
                    name: `${req.user.first_name} ${req.user.last_name}`,
                    role: req.user.role,
                    id: req.user._id
                };
                const token = jwt.sign(sessionUser, process.env.JWT_SECRET || 'secretitoshhhhh', { expiresIn: '1d' });
                res.cookie('tokencito', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' })
                   .send({ status: "success", message: "Logged in" });
            } catch (error) {
                console.error('Login error:', error);
                res.status(500).send({ status: "error", error: "Internal Server Error" });
            }
        });

        this.get('/current', ['USER'], passportCall('current'), (req, res) => {
            try {
                if (!req.user) {
                    return res.status(401).send({ status: "error", error: "Not logged in" });
                }
                res.sendSuccess(req.user);
            } catch (error) {
                console.error('Current user error:', error);
                res.status(500).send({ status: "error", error: "Internal Server Error" });
            }
        });

        this.post('/logout', ['USER'], (req, res) => {
            try {
                res.clearCookie('tokencito');
                res.sendSuccess("Logged out");
            } catch (error) {
                console.error('Logout error:', error);
                res.status(500).send({ status: "error", error: "Internal Server Error" });
            }
        });
    }
}

const sessionsRouter = new SessionsRouter();
export default sessionsRouter.getRouter();
