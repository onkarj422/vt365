import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-client-app',
  templateUrl: './client-app.component.html',
  styleUrls: ['./client-app.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ClientAppComponent implements OnInit {

  constructor() { 
  	$(".router-outlet").addClass("router-toolbar-margin");
  }

  ngOnInit() {
  	
  }

}
