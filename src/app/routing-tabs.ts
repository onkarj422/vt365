import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';

@Component({
  selector: 'my-tabs',
  template: `
  <nav mat-tab-nav-bar>
  <a mat-tab-link
  *ngFor="let tabLink of tabLinks; let i = index"
      [routerLink] = "tabLink.link"
  [active] = "activeLinkIndex === i"
    (click) = "activeLinkIndex = i" >
  {{tabLink.label}}
  </a>
  </nav>
  `,
  styleUrls: ['./tabs.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class TabsRouting {
  activeLinkIndex = 0;
  tabLinks: any[] = [
    { label: "Home", link: "/home" },
    { label: "About", link: "/about" },
    { label: "Contact", link: "/contact" }
  ];
}

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent, pathMatch: 'full' },
  { path: 'about', component: AboutComponent, pathMatch: 'full' },
  { path: 'contact', component: ContactComponent, pathMatch: 'full' }
];
