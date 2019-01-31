import * as express from 'express';
import MockDatabase from '../MockDatabase';
import Event from '../models/Event';

export default class EventRoutes {
    private _db: MockDatabase;

    constructor(express: express.Express, db: MockDatabase) {
        this._db = db;

        express.post('/event', this.createEvent);
        express.get('/event', this.getAllEvents);
        express.get('/event/user/:userEmail', this.getEventsForUser);
        express.get('/event/today');
    }

    private createEvent(req: express.Request, res: express.Response) {
        const { userEmail, type } = req.body;

        if (!userEmail ||
            typeof userEmail !== 'string' ||
            !type ||
            typeof type !== 'string') {
            res.status(500);
            res.send('Fields userEmail and type are required and should be valid string values!');
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
        res.send(this._db.getAllEvents());
    }

    private getEventsForToay(req: express.Request, res: express.Response) {
        res.send(this._db.getEventsForToday());
    }

    private getEventsForUser(req: express.Request, res: express.Response) {
        res.send(this._db.getEventsForUser(req.params.userEmail));
    }
}