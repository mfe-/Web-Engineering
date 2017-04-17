import { Component, Inject } from "@angular/core";
import { IUserService } from "../contracts/IUserService";

@Component({ moduleId: module.id, selector: 'Login', templateUrl: 'Login.html' })
export class Login {
    protected _IUserService: IUserService;
    public constructor( @Inject('IUserService') userservice: IUserService) {
        this._IUserService = userservice;
    }

    public get UserService(): IUserService {
        return this._IUserService;
    }

}