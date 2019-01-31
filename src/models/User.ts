export default class User {
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
        
        if (typeof phoneNumber === 'undefined') {
            this._phoneNumber = '';
        } else {
            this._phoneNumber = phoneNumber;
        }
    }
}