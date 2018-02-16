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
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class RegisterComponent implements OnInit {
  @ViewChild('avatar') avatar: ElementRef;
  @ViewChild('formImage') formImage: ElementRef;
  @ViewChild('imagecontainer') imagecontainer: ElementRef;

  selectedIndex: number;
  form: FormGroup;
  isClient: string = "client";
  isTrainer: string = "trainer";
  uploadUrl: string = "http://localhost:4200/api/uploads/";
  trainer_image: string;
  clientData;
  trainerData;

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

  registerTrainer() {
    if (this.form.valid) {
      console.log(this.form.value);
      this.apiService.register(this.form.value, this.isTrainer)
        .subscribe(
          data => {
            this.trainerData = data;
            console.log(data);
          },
          error => console.log("Error: " +error),
          () => {
            if (this.trainerData.data == "exists") {
              console.log("Email address already exists!");
              document.location.reload(true);
            } else if (!this.trainerData.error) {
                this.localStore.store('currentUserData', this.trainerData);
                console.log(this.localStore.retrieve('currentUserData'));
                this.session.start(this.isTrainer);
                window.location.replace('/trainer');
            } else {
                console.log(this.trainerData.error);
            }
          }
        );
    } else {
      console.log("Form is not valid!");
    }
  }

  constructor(private router: Router, private apiService: HttpApiService, private localStore: LocalStorageService, 
    private session: SessionService) { 
  	$(".router-outlet").addClass("router-toolbar-margin");
  	this.router.events.subscribe((event: Event) => {
      if(event instanceof NavigationEnd) {
        if (event.url == "/register#trainer" ) {
          this.selectedIndex = 1;
        } else {
          this.selectedIndex = 0;
        }
      }
    });

    let passwordVal = new FormControl('', Validators.required);
    let confirmPassword = new FormControl('', CustomValidators.equalTo(passwordVal));
    
    this.form = new FormGroup({
      firstname: new FormControl('', Validators.required),
      lastname: new FormControl('', Validators.required),
      gender: new FormControl('', Validators.required),
      weight: new FormControl('', Validators.required),
      age: new FormControl('', Validators.required),
      contact: new FormControl('', Validators.required),
      bio: new FormControl(''),
      address: new FormControl('', Validators.required),
      email: new FormControl('', Validators.compose([Validators.required, CustomValidators.email])),
      password: passwordVal,
      confirmPassword: confirmPassword
    });
  }

  ngOnInit() {

  }
}
