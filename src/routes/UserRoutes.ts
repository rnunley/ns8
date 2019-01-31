import * as express from 'express';
import MockDatabase from '../MockDatabase';
import User from '../models/User';

export default class UserRoutes {
    private _db: MockDatabase;

    constructor(express: express.Express, db: MockDatabase) {
        this._db = db;
        
        express.post('/user', this.createUser);
    }

    private createUser(req: express.Request, res: express.Response) {
        const { email, password, phone } = req.body;

        if (!email ||
            typeof email !== 'string' ||
            !password ||
            typeof password !== 'string') {
            res.status(500);
            res.send('Fields email and password are required and should be valid string values!');
        } else {
            if (phone && typeof phone !== 'string') {
                res.status(500);
                res.send('Field phone is optional but required to be a valid string value!');
            } else {
                // Valid input. 
                this._db.insertUser(new User(email, password, phone));
                res.sendStatus(200);
            }
        }
    }
}