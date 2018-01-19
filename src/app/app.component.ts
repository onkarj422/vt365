import { Component } from '@angular/core';
import { Router, Event, NavigationEnd } from '@angular/router';
import { TabsRouting } from './routing-tabs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  mainTitle = "MAIN TITLE";
  subTitle = "THIS IS A SUBTITLE";
}
