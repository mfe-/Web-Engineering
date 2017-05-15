export class User {
    protected _UserName: string;
    protected _Password: string;
    protected _Date: Date;

    constructor(username: string, password: string) {
        this._UserName = username;
        this._Password = password;
        this._Date = new Date();
    }

    public get UserName(): string {
        return this._UserName;
    }
    public set UserName(value: string) {
        this._UserName = value;
    }

    public get Password(): string {
        return this._Password;
    }
    public set Password(value: string) {
        this._Password = value;
    }

    public get Date(): Date {
        return this._Date;
    }

}