import * as express from 'express';
import * as validator from 'validator';
import MockDatabase from '../MockDatabase';
import Event from '../models/Event';
import ModelUtil from '../models/ModelUtil';

export default class EventRoutes {
    private _db: MockDatabase;

    constructor(express: express.Express, db: MockDatabase) {
        this._db = db;

        express.post('/event', this.createEvent.bind(this));
        express.get('/event', this.getAllEvents.bind(this));
        express.get('/event/user/:userEmail', this.getEventsForUser.bind(this));
        express.get('/event/today', this.getEventsForToday.bind(this));
    }

    private createEvent(req: express.Request, res: express.Response) {
        const { userEmail, type } = req.body;

        if (!userEmail ||
            typeof userEmail !== 'string' ||
            !type ||
            typeof type !== 'string' || 
            !validator.isEmail(userEmail)) {
            res.status(500);
            res.send('Fields userEmail and type are required and should be valid!');
        } else {
            if (!this._db.getUser(userEmail)) {
                res.status(500);
                res.send('User does not exist!');
            } else {
                // Valid input
                this._db.insertEvent(new Event(userEmail, type));
                res.sendStatus(200);
            }
        }
    }

    private getAllEvents(req: express.Request, res: express.Response) {
        const results = ModelUtil.arrayToJson(this._db.getAllEvents());

        res.send(results);
    }

    private getEventsForToday(req: express.Request, res: express.Response) {
        const results = ModelUtil.arrayToJson(this._db.getEventsForToday());

        res.send(results);
    }

    private getEventsForUser(req: express.Request, res: express.Response) {
        if (!req.params.userEmail || !validator.isEmail(req.params.userEmail)) {
            res.status(500);
            res.send('URL paramater userEmail is required and must be valid!');
        }
        
        const results = ModelUtil.arrayToJson(this._db.getEventsForUser(req.params.userEmail));

        res.send(results);
    }
}