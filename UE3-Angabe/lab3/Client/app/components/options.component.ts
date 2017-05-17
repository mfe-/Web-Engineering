import { Component, OnInit, Inject } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { NgForm } from '@angular/forms';
import { IUserService } from "../contracts/IUserService";


@Component({
    moduleId: module.id,
    selector: 'my-options',
    templateUrl: '../views/options.html'
})
export class OptionsComponent implements OnInit {

    updateError: boolean;

    constructor( @Inject('IUserService') private userservice: IUserService) {
    };

    ngOnInit(): void {
        this.updateError = false;
    }

    public equalsPW(form: NgForm): boolean {
        if (!form || !form.value || !form.value["repeat-password"] || !form.value["new-password"]) {
            return false;
        }
        return form.value["repeat-password"] === form.value["new-password"];
    }


    /**
     * Liest das alte Passwort, das neue Passwort und dessen Wiederholung ein und übertraegt diese an die REST-Schnittstelle
     * @param form
     */
    onSubmit(form: NgForm): void {
        this.WrongPassword = false;
        this.PasswordUpdated = false;
        //TODO Lesen Sie Daten aus der Form aus und übertragen Sie diese an Ihre REST-Schnittstelle
        if (form.valid == true) {
            this.userservice.UpdatePassword(form.value["old-password"], form.value["new-password"]).toPromise().
                then((data) => { this.PasswordUpdated = true; }).
                catch((error) => {
                    if (error.status == 403) {
                        this.WrongPassword = true;
                    }

                });
            //form.resetForm();



            return;
        }
    }
    public WrongPassword: boolean = false;
    public PasswordUpdated: boolean = false;

}
