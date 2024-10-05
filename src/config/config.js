import { config } from 'dotenv';
import { Command } from 'commander';

const program = new Command();

program.requiredOption('-m, --mode <mode>', 'Server mode', 'prod');

program.parse();

const options = program.opts();

config({
    path:
        options.mode == 'dev'
            ? './.env.dev'
            : options.mode === 'stg'
            ? './.env.stg'
            : './.env.prod',
});

console.log('Loaded environment variables:', {
    PORT: process.env.PORT,
    ADMIN_PASSWORD: process.env.ADMIN_PASSWORD,
    MONGO_URL: process.env.MONGO_URL,
    JWT_COOKIE: process.env.JWT_COOKIE,
    JWT_SECRET: process.env.JWT_SECRET,
});

export default {
    app: {
        PORT: process.env.PORT || 8080,
        ADMIN_PWD: process.env.ADMIN_PASSWORD,
    },
    mongo: {
        URL: process.env.MONGO_URL,
    },
    auth: {
        jwt: {
            COOKIE: process.env.JWT_COOKIE,
            SECRET: process.env.JWT_SECRET,
        },
    },
};
