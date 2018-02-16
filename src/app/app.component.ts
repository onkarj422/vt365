import { Component, OnInit, Inject } from '@angular/core';
import { Router, Event, NavigationEnd, RouterOutlet } from '@angular/router';
import { TabsRouting } from './routing-tabs';
import * as $ from 'jquery';
import { fadeAnimation } from './fade.animation';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [fadeAnimation]
})
export class AppComponent implements OnInit {

  public getRouterOutletState(outlet) {
    return outlet.isActivated ? outlet.activatedRoute : '';
  }

  constructor(private router: Router) {
    
  }

  ngOnInit() {
    this.router.events.subscribe((event: Event) => {
      if(event instanceof NavigationEnd) {
        if (event.url == "" || event.url == "/" || event.url == "/home") {
          $("#toolbar-tabs-id").removeClass("active toolbar-tabs-dark");
        } else {
          $("#toolbar-tabs-id").addClass("toolbar-tabs-dark");
        }
      }
    });
  }
}


