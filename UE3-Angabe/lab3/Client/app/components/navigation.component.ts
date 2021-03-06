import { Component, OnInit, TemplateRef, Inject } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router'
import {OptionsComponent} from "./options.component";
import {LoginComponent} from "./login.component";
import { IUserService } from "../contracts/IUserService";

@Component({
  moduleId: module.id,
  selector: 'my-navigation',
  templateUrl: '../views/navigation.component.html'
})
export class NavigationComponent {


  constructor(private router: Router, private route: ActivatedRoute,  @Inject('IUserService') private userservice:IUserService) {
  };

  isOptionsShown(): boolean {
    return !this.isOptionsite() && !this.isLoginSite();
  }

  isLogoutShown(): boolean {
    return !this.isLoginSite();
  }


  isOptionsite(): boolean {
    return this.route.component === OptionsComponent;
  }


  isLoginSite(): boolean {
    return this.route.component === LoginComponent;
  }

  doLogout(): void {
    this.userservice.Logout();
    //TODO Loggen Sie den Benutzer über die REST-Schnittstelle aus
  }

}
