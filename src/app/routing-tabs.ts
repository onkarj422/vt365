import { Component, ViewEncapsulation, Input, Inject, OnInit } from '@angular/core';
import { NgIf } from '@angular/common';
import { Routes, RouterModule, Router } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { LoginComponent } from './login/login.component';
import { AppComponent } from './app.component';
import { SessionService } from './session.service';
import { LocalStorageService, SessionStorageService } from 'ngx-webstorage';
import * as $ from 'jquery';
import { RegisterclientComponent } from './registerclient/registerclient.component';
import { RegistertrainerComponent } from './registertrainer/registertrainer.component';

@Component({
  selector: 'my-tabs',
  template: `
  <nav id="tab_nav">
    <a class="home" routerLink="" routerLink="/home" routerLinkActive="active" mat-button>Home</a>
    <a routerLink="/client" routerLinkActive="active" mat-button>For Clients</a>
    <a routerLink="/registertrainer" routerLinkActive="active" mat-button>Trainers</a>
    <a routerLink="/about" routerLinkActive="active" mat-button>About</a>
    <a *ngIf="!this.session.isActive()" routerLink="/login" class="login-button" mat-button>Sign In</a>
    <a *ngIf="this.session.isActive()" (click)="this.session.destroy()" href="/home" class="login-button mat-elevation-z4" mat-button>Sign Out</a>
  </nav>
  `,
  styleUrls: ['./tabs.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class TabsRouting {

  constructor(private session: SessionService, private sessionStore: SessionStorageService, private router: Router) {
  
  }

  toClient() {
    if (this.session.isActive()) {
      let data = this.sessionStore.retrieve('currentUserSession');
      if (JSON.parse(data).userIs == "client") {
        this.router.navigateByUrl('/client');
      } else if (JSON.parse(data).userIs == "trainer") {
        return;
      }
    } else {
      this.router.navigateByUrl('/login');
    }
  }

  toTrainer() {
    if (this.session.isActive()) {
      let data = this.sessionStore.retrieve('currentUserSession');
      if (JSON.parse(data).userIs == "trainer") {
        this.router.navigateByUrl('/trainer');
      } else if (JSON.parse(data).userIs == "client") {
        return;
      }
    } else {
      this.router.navigateByUrl('/login');
    }
  }

}

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent, pathMatch: 'full' },
  { path: 'client', loadChildren: './client/client.module#ClientModule' },
  { path: 'trainer', loadChildren: './trainer/trainer.module#TrainerModule' },
  { path: 'about', component: AboutComponent, pathMatch: 'full' },
  { path: 'login', component: LoginComponent, pathMatch: 'full' },
  { path: 'admin', loadChildren: './admin/admin.module#AdminModule' },
  { path: 'registerclient', component: RegisterclientComponent, pathMatch: 'full' },
  { path: 'registertrainer', component: RegistertrainerComponent, pathMatch: 'full' }
];
