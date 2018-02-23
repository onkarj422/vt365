import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, Event, NavigationEnd, RouterOutlet } from '@angular/router';
import { ReactiveFormsModule, FormsModule, FormGroup, FormControl, Validators, RadioControlValueAccessor } from '@angular/forms';
import { CustomValidators } from 'ng4-validators';
import { NgIf } from '@angular/common';
import * as $ from 'jquery';
import { HttpApiService } from '../http-service.service';
import { User } from '../apiuserdata.interface';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import { LocalStorageService, SessionStorageService } from 'ngx-webstorage';
import { SessionService } from '../session.service';
import {ElementRef} from '@angular/core';
import {ViewChild} from '@angular/core';

@Component({
  selector: 'app-registerclient',
  templateUrl: './registerclient.component.html',
  styleUrls: ['./registerclient.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class RegisterclientComponent implements OnInit {
  @ViewChild('avatar') avatar: ElementRef;
  @ViewChild('formImage') formImage: ElementRef;
  @ViewChild('imagecontainer') imagecontainer: ElementRef;

  form: FormGroup;
  isClient: string = "client";
  uploadUrl: string = "http://localhost:4200/api/uploads/";
  trainer_image: string;
  clientData;

  constructor(private router: Router, private apiService: HttpApiService, private localStore: LocalStorageService, 
    private session: SessionService, private sessionStore: SessionStorageService) {

    if (this.session.isActive()) {
      let data = this.sessionStore.retrieve('currentUserSession');
      if (JSON.parse(data).userIs == "client") {
        this.router.navigateByUrl('/client');
      } else if (JSON.parse(data).userIs == "trainer") {
        this.router.navigateByUrl('/home');
      }
    }

  	$(".router-outlet").addClass("router-toolbar-margin");

  	let passwordVal = new FormControl('', Validators.required);
    let confirmPassword = new FormControl('', CustomValidators.equalTo(passwordVal));
    
    this.form = new FormGroup({
      firstname: new FormControl('', Validators.required),
      lastname: new FormControl('', Validators.required),
      gender: new FormControl('', Validators.required),
      weight: new FormControl('', Validators.required),
      age: new FormControl('', Validators.required),
      contact: new FormControl('', Validators.required),
      bio: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),
      email: new FormControl('', Validators.compose([Validators.required, CustomValidators.email])),
      password: passwordVal,
      confirmPassword: confirmPassword
    });
  }

  onSubmitImage() {
    console.log(this.avatar.nativeElement.files[0]);
    const formData = new FormData();
        formData.append('avatar', 
                        this.avatar.nativeElement.files[0], 
                        this.avatar.nativeElement.files[0].name);
    this.apiService.uploadFile(formData).subscribe(data => {
      if (data != "error") {
        this.trainer_image = this.uploadUrl+data;
        this.imagecontainer.nativeElement.innerHTML = `<img src="`+this.trainer_image+`" width="200px" height="200px;">`;
      }
    })
  }

  registerClient() {
    if (this.form.valid) {
      this.apiService.register(this.form.value, this.isClient)
        .subscribe(
          data => {
            this.clientData = data;
            console.log(data);
          },
          error => console.log("Error :: " +error),
          () => {
            if (this.clientData.data == "exists") {
              console.log("Email address already exists!");
              document.location.reload(true);
            } else if (!this.clientData.error) {
                this.localStore.store('currentUserData', this.clientData);
                console.log(this.localStore.retrieve('currentUserData'));
                this.session.start(this.isClient);
                window.location.replace('/client');
            } else {
                console.log(this.clientData.error);
            }
          }
        );
    } else {
      console.log("Form is not valid!");
    }
  }

  ngOnInit() {
  }

}
