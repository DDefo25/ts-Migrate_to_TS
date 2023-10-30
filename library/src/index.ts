// import express from 'express';
import { config } from './config';
import { bootstrap } from './infrastructure/app';
import { container } from './infrastructure/container';

const PORT = Number(config.PORT) || 8989;
const MONGO_URL = config.MONGO_URL || "mongo";
const MONGO_PORT = config.MONGO_PORT || "27017";
const MONGO_USER = config.MONGO_USER || "root";
const MONGO_PASSWORD = config.MONGO_PASSWORD || "pass";


async function runApp() {
    const app = await bootstrap(
        container,
        PORT,
        MONGO_URL,
        MONGO_PORT,
        MONGO_USER,
        MONGO_PASSWORD
    );
    return app;
}

(async () => {
    await runApp();
})();

export { runApp };