import { User } from "../model/user";

export interface IUserService {
    _ErrorOnLogin: boolean;
    Login(username: String, password: String): boolean;
    IsAuthenticated(): boolean;
    Logout(): void;
    GetUser(): User;
}