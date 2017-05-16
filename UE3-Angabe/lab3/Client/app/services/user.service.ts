import { Injectable, NgZone } from "@angular/core";
import { IUserService } from "../contracts/IUserService";
import { Router, NavigationStart, NavigationEnd } from "@angular/router";
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { User } from "../model/user";
import { Http } from "@angular/http";

@Injectable()
export class UserService implements IUserService {

    protected _IsAuthenticated: boolean = false;
    protected _Location: Location;
    protected _Router: Router;
    protected _httpService: Http;

    public constructor(location: Location, router: Router, httpService: Http) {
        this._IsAuthenticated = false;
        this._Location = location;
        this._Router = router;
        this._httpService = httpService;
        this._Router.events.subscribe(this.Navigation.bind(this));
    }
    protected Navigation(param: NavigationStart | NavigationEnd) {
        //check whether the user is logged in or not
        if (param.constructor.name != "NavigationStart") {
            if (param.url.toLocaleLowerCase().indexOf("login") !== 1) {
                if (this.IsAuthenticated() == false) {
                    this._Router.navigate(["/Login"], {});
                }
            }
        }
    }
    public Login(username: string, password: string): boolean {
        this._User = new User(username, password);

        this._httpService.post("http://localhost:8081/login/", { username: this._User.UserName, password: this._User.Password })
            .toPromise().then(this.setUser.bind(this)).catch(bla => this._User = null);
            
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
    protected _User: User;

    public GetUser(): User {
        return this._User;
    }
    public setUser(response: any) {
        var data = response.json();
        this._User.UserName = data.username;
        this._User.Password = data.password;
        this._User.Token = data.token;

        this._IsAuthenticated = true;
        this._Router.navigate(['/overview']);    
        return true
    }
}