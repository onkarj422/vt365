import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import * as $ from 'jquery';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import { User } from './apiuserdata.interface';
import {HttpHeaders} from '@angular/common/http';
import { SessionStorageService } from 'ngx-webstorage';

@Injectable()
export class HttpApiService {

  private url = "./api/";

  register(dataSend, whoIsIt): Observable<any> {
    let registerURL = this.url+"register_"+whoIsIt+".php";
  	let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    let options = new RequestOptions({ headers: headers }); 
  	return this.http.post(registerURL, dataSend, options)
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }

  logEntry(data) {
    let logUrl = this.url+"log_entry.php";
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    let options = new RequestOptions({ headers: headers }); 
    return this.http.post(logUrl, data, options)
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }

  authorize(data): Observable<any> {
    let authUrl = this.url+"authorize.php";
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    let options = new RequestOptions({ headers: headers }); 
    return this.http.post(authUrl, data, options)
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }

  uploadFile(formData): Observable<any> {
    let headers: Headers = new Headers();
    let options = new RequestOptions({ headers: headers });
    const endpoint = this.url+"upload.php";
    return this.http
      .post(endpoint, formData, options)
      .map((res: Response) => res.text())
      .catch((e) => this.handleError(e));
  }

  getData(whoIsIt): Observable<any> {
    let getURL = this.url+"get_"+whoIsIt+"s.php";
    return this.http.get(getURL)
      .map((res: Response) => res.json());
  }

  assignToClient(data): Observable<any> {
    let assignURL = this.url+"assign_values.php";
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    let options = new RequestOptions({ headers: headers });
    return this.http
      .post(assignURL, data, options)
      .map((res: Response) => res.json())
      .catch((e) => this.handleError(e));
  }

  getTrainersClients(data) {
    let endpoint = this.url+"get_trainers_clients.php";
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    let options = new RequestOptions({ headers: headers });
    return this.http
      .post(endpoint, data, options)
      .map((res: Response) => res.json())
      .catch((e) => this.handleError(e));
  }

  getLog(data) {
    let endpoint = this.url+"get_log.php";
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    let options = new RequestOptions({ headers: headers });
    return this.http
      .post(endpoint, data, options)
      .map((res: Response) => res.json())
      .catch((e) => this.handleError(e));
  }

  getAllVideos(): Observable<any> {
    let url = "./api/get_all_videos.php";
    const formData = new FormData();
    formData.append('trainerid', this.sessionStore.retrieve('currentUserData').trainerid);
    let headers = new Headers();
    let options = new RequestOptions({ headers: headers });
    return this.http
      .post(url, formData, options)
      .map((response: Response) => response.json())
      .catch((e) => this.handleError(e));
  }

  getAllImages(): Observable<any> {
    let url = "./api/get_all_images.php";
    const formData = new FormData();
    formData.append('trainerid', this.sessionStore.retrieve('currentUserData').trainerid);
    let headers = new Headers();
    let options = new RequestOptions({ headers: headers });
    return this.http
      .post(url, formData, options)
      .map((response: Response) => response.json())
      .catch((e) => this.handleError(e));
  }

  createThumbnail(snapshotURL, formData) {
    let thumbURL = "./api/create_thumbnail.php";
    let headersForThumb = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    let optionsForThumb = new RequestOptions({ headers: headersForThumb });
    snapshotURL['formData'] = formData;
    this.http
      .post(thumbURL, snapshotURL, optionsForThumb)
      .map((res: Response) => res.text())
      .subscribe(data => {
        if(data == "error") {
          console.log("Error");
        }
    });
  }

   createMediaTable() {
    let url = "./api/create_media_table.php";
    const formData = new FormData();
    formData.append('trainerid', this.sessionStore.retrieve('currentUserData').trainerid);
    let headers = new Headers();
    let options = new RequestOptions({ headers: headers });
    this.http
      .post(url, formData, options)
      .map((response: Response) => response.text())
      .subscribe(data => {
        if (data == "noneed") {
          return;
        } else if(data == "error") {
          window.alert("API couldn't recieve data to create media library database.");
        } else {
          console.log("Media table created!");
        }
      });
  }

  addWorkout(data): Observable<any> {
    let url = "./api/add_workout.php";
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    let options = new RequestOptions({ headers: headers });
    return this.http
      .post(url, data, options)
      .map((res: Response) => res.text())
      .catch((e) => this.handleError(e));
  }

  getWorkouts(): Observable<any> {
    let url = "./api/get_workouts.php";
    const formData = new FormData();
    formData.append('trainerid', this.sessionStore.retrieve('currentUserData').trainerid);
    let headers = new Headers();
    let options = new RequestOptions({ headers: headers });
    return this.http
      .post(url, formData, options)
      .map((res: Response) => res.json())
      .catch((e) => this.handleError(e));
  }

  private handleError(error: any) {
    let errMsg = (error.message) ? error.message :
    error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg);
  	return Observable.throw(error.statusText);
  }

  constructor(private http: Http, private sessionStore: SessionStorageService) { }

}
