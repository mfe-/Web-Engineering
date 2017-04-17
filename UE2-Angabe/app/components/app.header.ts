import { Component, Inject } from "@angular/core";
import { IUserService } from "../contracts/IUserService";

@Component({  moduleId: module.id,  selector: 'my-header',  templateUrl: 'app.header.html'})
export class AppHeader
{
    protected _IUserService:IUserService;
    public constructor(@Inject('IUserService') userservice:IUserService)
    {
        this._IUserService = userservice;
        console.log(userservice);
    }
    public get UserService():IUserService
    {
        return this._IUserService;
    }
}