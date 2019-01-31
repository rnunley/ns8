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
        if (this.getUser(user.email)) {
            throw new Error('User already exists!');
        }
        
        this._users.push(user);
    }

    public getUser(userEmail: string): User {
        return this._users.find((value) => value.email === userEmail);
    }

    public insertEvent(event: Event) {
        this._events.push(event);
    }

    public getAllEvents(): Array<Event> {
        return this._events;
    }

    public getEventsForUser(userEmail: string) : Array<Event> {
        return this._events.filter((value) => value.userEmail === userEmail);
    }

    public getEventsForToday(): Array<Event> {
        return this._events.filter((value) => value.created.getDate() === new Date().getDate());
    }
}