import express from 'express';
import { createServer, Server } from 'node:http';

import indexRoute from '../routes/index';
import { DBClient, getDBClient } from './db_connection';
import { TYPES } from '../db/types/types';
import { Container } from 'inversify';
import { errorLoggerMiddleware } from '../middleware/er404';
import { getIOServer } from './IO';
import { Server as ServerIO } from 'socket.io';

export const bootstrap = async (
    container: Container,
    PORT: number,
    dbUrl: string, 
    dbPort: string, 
    dbLogin: string, 
    dbPassword: string
) => {
    if (container.isBound(TYPES.App) === false) {
        const dbClient = await getDBClient( dbUrl, dbPort, dbLogin, dbPassword );
        container.bind<DBClient>(TYPES.DBClient).toConstantValue(dbClient)
        
        const app = express();
        const server = createServer(app);

        const ioServer = getIOServer( server );
        container.bind<ServerIO>(TYPES.IOServer).toConstantValue(ioServer)
    
        app.set('views', 'dist/views');
        app.set('view engine', 'ejs');  
    
        app.use(express.json());
        app.use(indexRoute);
        app.use(errorLoggerMiddleware);
    
        server.listen(PORT);
        console.log('server is listening: ' + PORT);
    
        container.bind<express.Application>(TYPES.App).toConstantValue(app);
        return app
    } else {
        return container.get<express.Application>(TYPES.App)
    }

}