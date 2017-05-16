import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { IUserService } from "../contracts/IUserService";

@Component({
    moduleId: module.id,
    selector: 'my-login',
    templateUrl: '../views/login.html'
})
export class LoginComponent {

    loginError: boolean = false;

    constructor(private router: Router, @Inject('IUserService') private userservice: IUserService) {
    }

    onSubmit(form: NgForm): void {
        if (this.loginError == false) {
            this.userservice.Login(form.controls["username"].value, form.controls["password"].value);
            //TODO Überprüfen Sie die Login-Daten über die REST-Schnittstelle und leiten Sie den Benutzer bei Erfolg auf die Overview-Seite weiter
            //this.router.navigate(['/overview']);
        }

    }
}
