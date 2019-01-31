export default class Event {
    private _userEmail: string; 
    private _type: string;
    private _created: Date;


    get userEmail(): string {
        return this._userEmail;
    }

    get type(): string {
        return this._type;
    }

    get created(): Date {
        return this._created;
    }

    constructor(userEmail: string, type: string) {
        if (userEmail.length === 0) {
            throw new Error('Argument userEmail requires a non empty string value!');
        }
        if (type.length === 0) {
            throw new Error('Length of type must be greater than zero!');
        }

        this._type = type;
        this._userEmail = userEmail;
        this._created = new Date();
    }

}