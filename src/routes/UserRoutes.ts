import * as express from 'express';
import * as validator from 'validator';
import MockDatabase from '../MockDatabase';
import User from '../models/User';

export default class UserRoutes {
    private _db: MockDatabase;

    constructor(express: express.Express, db: MockDatabase) {
        this._db = db;
        
        express.post('/user', this.createUser.bind(this));
    }

    private createUser(req: express.Request, res: express.Response) {
        const { email, password, phone } = req.body;

        const phonePattern =  /[0-9][0-9][0-9]-[0-9][0-9][0-9]-[0-9][0-9][0-9][0-9]/gm;

        if (!email ||
            typeof email !== 'string' ||
            !validator.isEmail(email) ||
            !password ||
            typeof password !== 'string') {
            res.status(500);
            res.send('Fields email and password are required and should be valid string values!');
        } else {
            if (phone && (typeof phone !== 'string' || !phonePattern.test(phone))) {
                res.status(500);
                res.send('Field phone is optional but required to be a valid phone number if present!');
            }
            else if (this._db.getUser(email)) {
                res.status(500);
                res.send('User already exists!');
            }
            else {
                // Valid input. 
                this._db.insertUser(new User(email, password, phone));
                res.sendStatus(200);
            }
        }
    }
}