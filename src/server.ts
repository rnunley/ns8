import * as express from 'express';
import * as bodyParser from 'body-parser';
import MockDatabase from './MockDatabase';
import EventRoutes from './routes/EventRoutes';
import UserRoutes from './routes/UserRoutes';

export default class Server {
    private _express: express.Express;
    private _db: MockDatabase;
    private _eventRoutes: EventRoutes;
    private _userRoutes: UserRoutes;

    constructor(db: MockDatabase){
        this._express = express();
        this._express.use(bodyParser.json());
        this._db = db;

        this._eventRoutes = new EventRoutes(this._express, this._db);
        this._userRoutes = new UserRoutes(this._express, this._db);
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