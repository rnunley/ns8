import User from './models/User';
import Event from './models/Event';

export default class MockDatabase {
    private _users: Array<User>;
    private _events: Array<Event>;

    constructor() {
        this._users = [];
        this._events = [];
    }

    public insertUser(user: User) {
        this._users.push(user);
    }

    public insertEvent(event: Event) {
        this._events.push(event);
    }

    public getAllEvents() {
        return this._events;
    }

    public getEventsForUser(userEmail: string) {
        this._events.filter((value) => value.userEmail === userEmail);
    }

    public getEventsForToday() {
        return this._events.filter((value) => value.created.getDate() === new Date().getDate());
    }
}