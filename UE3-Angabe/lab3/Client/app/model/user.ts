export class User {
    protected username: string;
    protected password: string;
    protected _Date: Date;
    protected token: string;

    constructor(username: string, password: string) {
        this.username = username;
        this.password = password;
        this._Date = new Date();
    }

    public get UserName(): string {
        return this.username;
    }
    public set UserName(value: string) {
        this.username = value;
    }

    public get Password(): string {
        return this.password;
    }
    public set Password(value: string) {
        this.password = value;
    }

    public get Date(): Date {
        return this._Date;
    }
    public get Token(): string {
        return this.token;
    }
    public set Token(value: string) {
        this.token = value;
    }


}