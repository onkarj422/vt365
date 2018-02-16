import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import * as $ from 'jquery';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import { User } from './apiuserdata.interface';
import {HttpHeaders} from '@angular/common/http';

@Injectable()
export class HttpApiService {

  private url = "http://localhost:4200/api/";

  register(dataSend, whoIsIt): Observable<any> {
    let registerURL = this.url+"register_"+whoIsIt+".php";
  	let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    let options = new RequestOptions({ headers: headers }); 
  	return this.http.post(registerURL, dataSend, options)
        .map((res: Response) => res.json())
        .catch(this.handleError);
  }

  logEntry(data) {
    console.log(data);
    let logUrl = this.url+"log_entry.php";
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    let options = new RequestOptions({ headers: headers }); 
    return this.http.post(logUrl, data, options)
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }

  authorize(data): Observable<any> {
    console.log(data);
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

  private handleError(error: any) {
    let errMsg = (error.message) ? error.message :
    error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg);
  	return Observable.throw(error.statusText);
  }

  constructor(private http: Http) { }

}
