import { User } from "../model/user";
import { Observable } from "rxjs/Observable";

export interface IUserService {
    _ErrorOnLogin: boolean;
    Login(username: String, password: String): boolean;
    UpdatePassword(oldpassword: string, newpassword: string): Observable<any>;
    IsAuthenticated(): boolean;
    Logout(): void;
    GetUser(): User;
}