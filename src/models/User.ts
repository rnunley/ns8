import IModel from "./IModel";
import * as validator from "validator";

export default class User implements IModel {
    private _email: string;
    private _password: string;
    private _phoneNumber: string;

    get email(): string {
        return this._email;
    }

    get password(): string {
        return this._password;
    }

    get phoneNumber(): string {
        return this._phoneNumber;
    }

    constructor(email: string, password: string, phoneNumber: string | undefined){
        this._email = email;
        this._password = password;

        const phonePattern =  /[0-9][0-9][0-9]-[0-9][0-9][0-9]-[0-9][0-9][0-9][0-9]/gm;

        
        if (typeof phoneNumber === 'undefined') {
            this._phoneNumber = '';
        } else if (!phonePattern.test(phoneNumber)) {
            throw new Error('Phone is optional but must be a valid phone number if present.');
        }
        else {
            this._phoneNumber = phoneNumber;
        }
    }

    public toJson(): object {
        return {
            email: this._email,
            phoneNumber: this.phoneNumber
        }
    }
}