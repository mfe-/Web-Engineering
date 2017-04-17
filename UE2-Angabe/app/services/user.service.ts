import { Injectable } from "@angular/core";
import { IUserService } from "../contracts/IUserService";

@Injectable()
export class UserService implements IUserService {
    protected _IsAuthenticated: boolean = false;
    public constructor() {
        this._IsAuthenticated=false;
    }
    public Login(username: String, password: String): boolean {
        this._IsAuthenticated = true;
        return true;
    }
    public IsAuthenticated(): boolean {
        return this._IsAuthenticated;
    }
}