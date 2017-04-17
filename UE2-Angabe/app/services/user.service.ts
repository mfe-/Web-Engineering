import { Injectable } from "@angular/core";
import { IUserService } from "../contracts/IUserService";
import { Router, NavigationStart, NavigationEnd } from "@angular/router";
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';

@Injectable()
export class UserService implements IUserService {

    protected _IsAuthenticated: boolean = false;
    protected _Location: Location;
    protected _Router: Router;

    public constructor(location: Location, router: Router) {
        this._IsAuthenticated = false;
        this._Location = location;
        this._Router = router;

        this._Router.events.subscribe(this.Navigation.bind(this));
    }
    protected Navigation(param: NavigationStart | NavigationEnd) {
        if (param.constructor.name != "NavigationStart") {
            if (param.url.toLocaleLowerCase().indexOf("login") !== 1) {
                if (this.IsAuthenticated() == false) {
                    this._Router.navigate(["/Login"], {});
                    //this._Location.go("/Login");
                }
            }
        }
    }
    public Login(username: String, password: String): boolean {
        this._IsAuthenticated = true;
        return true;
    }
    public IsAuthenticated(): boolean {
        return this._IsAuthenticated;
    }
    public get IsLoggedIn(): boolean {
        return this.IsAuthenticated();
    }
    public Logout(): void {
        this._IsAuthenticated = false;
        this._Router.navigate(["/Login"], {});
    }
}