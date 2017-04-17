import { User } from "../model/user";

export interface IUserService
{
    Login(username: String, password: String): boolean ;
    IsAuthenticated(): boolean;
    Logout():void;
    GetUser():User;
}