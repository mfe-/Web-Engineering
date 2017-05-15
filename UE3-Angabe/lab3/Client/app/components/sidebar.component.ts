import { Component, OnInit } from "@angular/core";
import { Http } from "@angular/http";

@Component({
  moduleId: module.id,
  selector: 'my-sidebar',
  templateUrl: '../views/sidebar.component.html'
})
export class SidebarComponent implements OnInit {

  failed_logins: number = 0;
  server_start: Date = new Date();

  constructor(private httpService: Http) {
  };

  ngOnInit(): void {
    //TODO Lesen Sie über die REST-Schnittstelle den Status des Servers aus und speichern Sie diesen in obigen Variablen
    this.httpService.get('http://localhost:8081/status/').toPromise().then((bla)=> {
      var data = bla.json(); 
      this.failed_logins = data.failedLogins;
      this.server_start = new Date(data.start);
    })
  }

}
