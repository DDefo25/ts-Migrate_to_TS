import mongoose from 'mongoose';

export type DBClient = mongoose.Mongoose;

export async function getDBClient(url: string, port: string, login: string, password: string) {
    return new Promise<DBClient>((resolve, reject) => {
        const dbUrl = `mongodb://${login}:${password}@${url}:${port}/`
        
        mongoose.connect(dbUrl).catch(err => {
            console.log('Ошибка при инициализации ' + err)
            reject(err);
        });
        
        const db = mongoose.connection;
        
        db.on("error", (err: Error) => {
            console.error("Db conenction error:", err);
            reject(err);
        });
        db.once("open", () => {
            console.log("Db conenction success:", dbUrl);
            resolve(mongoose);
        });
    });
}
