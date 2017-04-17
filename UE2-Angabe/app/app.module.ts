
// An Angular module class describes how the application parts fit together. 
// Every application has at least one Angular module, the root module that you bootstrap to launch the application. 
// You can call it anything you want. The conventional name is AppModule.
// https://angular.io/docs/ts/latest/guide/appmodule.html

// import {class1, class2 } from 'file' - maybe its a node or require js feature?

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { RouterModule, Routes, Router } from '@angular/router';

import { AppComponent } from './components/app.component';
import { AppHeader } from "./components/app.header";
import { AppFooter } from "./components/app.footer";
// define with ngmodule a module
@NgModule({
  // required NgModules by this module
  imports: [
    BrowserModule,
    FormsModule,
    ChartsModule,
  ],
  // Declare every component in an NgModule class. 
  declarations: [
    AppComponent,
    AppHeader,
    AppFooter
  ],
  providers: [
  ],
  // the root component that Angular creates and inserts into the index.html host web page
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
    // router.events.subscribe((asfd)=> {});
    // console.log('Routes: ', JSON.stringify(router.config, undefined, 2)); 
  }
  protected OnRouteChanged(value:any) :void
  {
    console.log(value); 
  }
}
