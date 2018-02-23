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
  sessionData = {};
  logStatus;

  public isActive() {
    let sessionData = this.sessionStore.retrieve(this.sessionKey);
  	return (sessionData) ? true : false;
  }

  public start(whoIsIt) {
    let userData = this.sessionStore.retrieve('currentUserData');
    this.sessionData['userIs'] = whoIsIt;
    this.sessionData['email'] = userData.email;
    this.sessionData['timestamp'] = this.dateFormat(new Date(), "mmm dd, yyyy HH:MM");
  	if (!this.isActive()) {
  		this.sessionStore.store(this.sessionKey, this.sessionData);
      this.apiService.logEntry(this.sessionData).subscribe(
        data => {
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
  	console.log("cleared");
  }

}
