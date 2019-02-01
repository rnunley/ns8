import IModel from "./IModel";
import * as validator from 'validator';

export default class Event implements IModel {
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
        if (!validator.isEmail(userEmail)) {
            throw new Error('Invalid email address for userEmail!');
        }

        this._type = type;
        this._userEmail = userEmail;
        this._created = new Date();
    }

    public toJson() {
        return {
            userEmail: this._userEmail,
            type: this._type,
            created: this.created
        }
    }

}