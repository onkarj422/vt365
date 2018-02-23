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
  selector: 'app-registertrainer',
  templateUrl: './registertrainer.component.html',
  styleUrls: ['./registertrainer.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class RegistertrainerComponent implements OnInit {
  @ViewChild('avatar') avatar: ElementRef;
  @ViewChild('formImage') formImage: ElementRef;
  @ViewChild('imagecontainer') imagecontainer: ElementRef;

  form: FormGroup;
  isTrainer: string = "trainer";
  uploadUrl: string = "http://localhost:4200/api/uploads/";
  photo: string;
  trainerData;

  constructor(private router: Router, private apiService: HttpApiService, private localStore: LocalStorageService, 
    private session: SessionService, private sessionStore: SessionStorageService) {

    if (this.session.isActive()) {
      let data = this.sessionStore.retrieve('currentUserSession');
      if (data['userIs'] == "trainer") {
        this.router.navigateByUrl('/trainer');
      } else if (data['userIs'] == "client") {
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
      height: new FormControl('', Validators.required),
      age: new FormControl('', Validators.required),
      contact: new FormControl('', Validators.required),
      bio: new FormControl('', Validators.required),
      email: new FormControl('', Validators.compose([Validators.required, CustomValidators.email])),
      password: passwordVal,
      confirmPassword: confirmPassword
    });
  }

  onSubmitImage() {
    const formData = new FormData();
        formData.append('avatar', 
                        this.avatar.nativeElement.files[0], 
                        this.avatar.nativeElement.files[0].name);
    this.apiService.uploadFile(formData).subscribe(data => {
      if (data != "error") {
        this.photo = this.uploadUrl+data;
        this.imagecontainer.nativeElement.innerHTML = `<img src="`+this.photo+`" width="170px" height="170px;">`;
      }
    })
  }

  registerTrainer() {
    if (this.form.valid) {
      this.form.value.imageurl = this.photo;
      console.log(this.form.value);
      this.apiService.register(this.form.value, this.isTrainer)
        .subscribe(
          data => {
            this.trainerData = data;
          },
          error => console.log("Error: " +error),
          () => {
            if (this.trainerData.data == "exists") {
              window.alert("Email address already exists!");
              this.form.reset();
            } else if (!this.trainerData.error) {
                this.sessionStore.store('currentUserData', this.trainerData);
                this.session.start(this.isTrainer);
                window.location.replace('/trainer');
            } else {
                window.alert(this.trainerData.error);
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
