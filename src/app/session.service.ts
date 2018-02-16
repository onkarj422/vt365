import { Injectable } from '@angular/core';
import { LocalStorageService, SessionStorageService } from 'ngx-webstorage';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import * as $ from 'jquery';
import { HttpApiService } from './http-service.service';

declare var require: any;

@Injectable()
export class SessionService {

  constructor(private localStore: LocalStorageService, private sessionStore: SessionStorageService, private apiService: HttpApiService) { }

  sessionKey: string = "currentUserSession";
  dateFormat = require('dateformat');
  logStatus;

  public isActive() {
  	return (!this.sessionStore.retrieve(this.sessionKey)) ? false : true;
  }

  public start(whoIsIt) {
    let data = this.localStore.retrieve('currentUserData');
    console.log(data);
    let sessionData = JSON.stringify({
      "userIs": whoIsIt,
      "email": data.email, 
      timestamp: this.dateFormat(new Date(), "dddd, mmmm dS, yyyy, h:MM TT")
    });
  	if (!this.isActive()) {
  		this.sessionStore.store(this.sessionKey, sessionData);
      let storeData = this.sessionStore.retrieve(this.sessionKey);
  		console.log("I am session store, I got: "+storeData);
      this.apiService.logEntry(sessionData).subscribe(
        data => {
          console.log(data);
          this.logStatus = data;
        },
        error => console.log("Error: "+error),
        () => {
          if (this.logStatus == "logged") {
            console.log("Logged new entry!");
          } else if (this.logStatus == "updated") {
            console.log("Updated timestamp!");
          }
        }
      );
  	}
  }

  public destroy() {
  	this.sessionStore.clear();
    this.localStore.clear('currentUserData');
  	console.log("cleared");
  }

}
