import { Component, Inject } from "@angular/core";
import { IUserService } from "../contracts/IUserService";

@Component({ moduleId: module.id, selector: 'Options', templateUrl: 'Options.html' })
export class Options {

    protected _IUserService: IUserService;
    public constructor( @Inject('IUserService') userservice: IUserService) {
        this._IUserService = userservice;
    }

    public get UserService(): IUserService {
        return this._IUserService;
    }
    public ChangePassword(): void {

    }
    onSubmit(form: any): void {
        console.log('you submitted value:', form);
    }

}