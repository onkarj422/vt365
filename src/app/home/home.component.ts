import { Component, OnInit, AfterViewInit, ViewEncapsulation, Input, HostBinding } from '@angular/core';
import * as $ from 'jquery';
import { Router, Event, NavigationEnd } from '@angular/router';
import { SessionService } from '../session.service';
import { LocalStorageService, SessionStorageService } from 'ngx-webstorage';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit, AfterViewInit {

  mainTitle = "VT365";
  subTitle = "Your virtual personal trainer!";

  constructor(private session: SessionService, private sessionStore: SessionStorageService, private router: Router) {
    $(".router-outlet").removeClass("router-toolbar-margin");
    if (this.session.isActive()) {
      let data = this.sessionStore.retrieve('currentUserSession');
      $(".get-started-button").hide();
      $(".cta-button-container").hide();
    }
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

  ngOnInit() {

    $(window).on("scroll", function() {
      if($(window).scrollTop() > 50) {
        $("#toolbar-tabs-id").addClass("active");
      } else {
        $("#toolbar-tabs-id").removeClass("active");
      }
    });

    $(".volt-container-client").hover(function() {
      $(".volt-img-client").addClass("volt-img-hover");
      $(".volt-toolbar-client").addClass("volt-toolbar-hover");
    },
    function() {
      $(".volt-img-client").removeClass("volt-img-hover");
      $(".volt-toolbar-client").removeClass("volt-toolbar-hover");
    });

    $(".volt-container-trainer").hover(function() {
      $(".volt-img-trainer").addClass("volt-img-hover");
      $(".volt-toolbar-trainer").addClass("volt-toolbar-hover");
    },
    function() {
      $(".volt-img-trainer").removeClass("volt-img-hover");
      $(".volt-toolbar-trainer").removeClass("volt-toolbar-hover");
    });
  }

  ngAfterViewInit() {
  
  }
}
