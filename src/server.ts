import * as express from 'express';
import MockDatabase from './MockDatabase';

export default class Server {
    private _express: express.Express;
    private _db: MockDatabase;

    constructor(db: MockDatabase){
        this._express = express();
        this._db = db;
    }

    private setupRoutes() {
        
    }

    public listen(port: number) {
        this._express.listen(port, (err) => {
            if (err) {
              return console.log(err)
            }
          
            return console.log(`server is listening on ${port}`)
          });
    }
}