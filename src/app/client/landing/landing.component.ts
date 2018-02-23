import { Component, OnInit, ViewEncapsulation, ElementRef, ViewChild, Renderer2 } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormGroup, FormControl, Validators, RadioControlValueAccessor } from '@angular/forms';
import { CustomValidators } from 'ng4-validators';
import { NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import { SessionService } from '../../session.service';
import { SessionStorageService, LocalStorageService } from 'ngx-webstorage';
import { HttpApiService } from '../../http-service.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LandingComponent implements OnInit {

  innerHeight: any;
  isLinear = true;
  selectedIndex: number = null;
  stepData = {};
  allTrainers;
  paymentDone: boolean = false;
  showRegister: boolean = false;
  showSignIn: boolean = false;

  continueRegistration() {
    this.showRegister = true;
    this.showSignIn = false;
  }

  continueSignIn() {
    this.showRegister = false;
    this.showSignIn = true;
  }

  slides = [
    { title: "Weight Loss", img: '../../../assets/weightloss.jpg', id: 'wtloss' },
    { title: "Transforming", img: '../../../assets/bodytransforming.jpg', id: 'bdytrns' },
    { title: "Power Lifting", img: '../../../assets/powerlifting.jpg', id: 'pwrlft' },
    { title: "Yoga/Pilates", img: '../../../assets/yoga.jpg', id: 'yoga' },
    { title: "Crossfit", img: '../../../assets/crossfit.jpg', id: 'crsft' },
    { title: "Speciality", img: '../../../assets/speciality.jpg', id: 'spe' }
  ];

  constructor(private session: SessionService, private apiService: HttpApiService, 
    private sessionStore: SessionStorageService, private localStore: LocalStorageService, private router: Router) {
    console.log(this.router.config);
    this.apiService.getData("trainer").subscribe(data => {
      console.log(data);
      this.allTrainers = data;
    });
  }

  isClicked = [];

  isSelected(index: number) {
      this.selectedIndex = index;
  }

  selectTraining() {
    let i,j;
    this.stepData['categories'] = '';
    for (i = 0; i <= this.isClicked.length; i++) {
      if (this.isClicked[i] == true) {
        this.stepData['categories'] += this.slides[i].title+",";
      }
    }
    this.stepData['categories'] = this.stepData['categories'].replace(/,\s*$/, "");
    console.log(this.stepData);
  }

  selectTrainer() {
    this.stepData['trainer'] = this.allTrainers[this.selectedIndex].trainerid;
  }

  startWorkout() {
    let sessionData = this.sessionStore.retrieve('currentUserSession');
    this.stepData['email'] = sessionData.email;
    console.log(this.stepData);
    this.sessionStore.store('selections', this.stepData);
    this.apiService.assignToClient(this.stepData).subscribe(data => {
      if (data.success = "success") {
        console.log("Assigned values!");
        this.router.navigateByUrl('/client/dashboard');
      } else {
        console.log(data.error);
      }
    });
  }

  ngOnInit() {
    this.innerHeight = (window.screen.height) + "px";
    $(".banner").css({"height": this.innerHeight});
  }
}

@Component({
  selector: 'form-signin',
  template: `
  <div>
    <div *ngIf="loggedIn" fxLayout="column" fxLayoutAlign="center center" style="height: 500px;">
      <button class="big-button" mat-raised-button matStepperNext>Click To Continue</button>
    </div>
    <form *ngIf="!loggedIn" [formGroup]="form">
      <mat-form-field style="width: 100%;">
        <input name="email" matInput placeholder="Email" formControlName="email">
        <mat-error *ngIf="form.controls.email.errors?.email && !form.controls.email.errors?.password">
          Please enter a valid email address
        </mat-error>
        <mat-error *ngIf="form.controls.email.errors?.required">
          Email is <strong>required</strong>
        </mat-error>
      </mat-form-field>
      <mat-form-field style="width: 100%;">
        <input name="password" matInput placeholder="Enter your password" formControlName="password" [type]="hide ? 'password' : 'text'">
        <mat-error *ngIf="form.controls.password.errors?.required">
          Password is <strong>required</strong>
        </mat-error>
        <mat-icon matSuffix (click)="hide = !hide">{{hide ? 'visibility' : 'visibility_off'}}</mat-icon>
      </mat-form-field>
    </form>
    <div style="height: 10px;"></div>
    <button *ngIf="!loggedIn" (click)="login()" class="big-button mat-elevation-z4" mat-raised-button>SignIn And Continue</button>
  </div>  
  `,
  styleUrls: ['./landing.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SignInComponent implements OnInit {
  form: FormGroup;
  loginData;
  loggedIn: boolean = false;

  constructor(private session: SessionService, private apiService: HttpApiService, 
    private sessionStore: SessionStorageService, private localStore: LocalStorageService) {

  }

  ngOnInit() {
    this.form = new FormGroup({
        email: new FormControl('', Validators.compose([Validators.required, CustomValidators.email])),
        password: new FormControl('', Validators.required)
    });
  }

  login() {
    if (this.form.valid) {
      this.apiService.authorize(this.form.value)
        .subscribe(
          data => {
            this.loginData = data;
          },
          error => console.log("Error : "+ error),
          () => {
            if (this.loginData.password == "incorrect") {
              window.alert("Incorrect password or username!");
            } else if (this.loginData.noexists == "noexists") {
              window.alert("User does not exist!");
            } else {
              this.sessionStore.store('currentUserData', this.loginData);
              this.session.start(this.loginData.userIs);
              this.loggedIn = true;
            }
          }
        );
    } else {
      console.log("Please, fill in the form properly!");
    }
  }
}


@Component({
  selector: 'form-register',
  template: `
  <div>
    <div *ngIf="registered" fxLayout="column" fxLayoutAlign="center center" style="height: 500px;">
      <button class="big-button" mat-raised-button matStepperNext>Click To Continue</button>
    </div>
    <form *ngIf="!registered" [formGroup]="form">
          <div #imagecontainer>
              <label>Upload a photo</label><br>
              <div style="height: 20px;"></div>
              <input name="imageurl" class="hide" type="file" id="input-file-id" (change)="onSubmitImage()" accept=".png, .jpg, .jpeg" #avatar>
              <label for="input-file-id" style="background-color: #2fb0ea; color: white;" class="mat-button">Choose Image</label>
          </div>
          <div style="height: 10px;"></div>
          <div fxLayout="row" fxLayoutGap="10px">
            <mat-form-field style="width: 100%;">
              <input matInput type="text" placeholder="First Name" name="firstname" formControlName="firstname">
              <mat-error *ngIf="form.controls.firstname.errors?.required">This field is required!</mat-error>
            </mat-form-field>
            <mat-form-field style="width: 100%;">
              <input matInput type="text" placeholder="Last Name" name="firstname" formControlName="lastname">
              <mat-error *ngIf="form.controls.lastname.errors?.required">This field is required!</mat-error>
            </mat-form-field>
          </div>
          <div fxLayout="row" fxLayoutGap="10px">
            <div style="width: 50%;">
              <p>Gender :</p>
              <mat-radio-group class="radio-buttons" fxLayout="row" fxLayoutGap="20px" name="gender" formControlName="gender">
                  <mat-radio-button name="gender" value="Male">Male</mat-radio-button>
                  <mat-radio-button name="gender" value="Female">Female</mat-radio-button>
                </mat-radio-group>
            </div>
          </div>          
          <br>
          <div fxLayout="row" fxLayoutGap="10px">
            <mat-form-field style="width: 50%;">
              <input matInput type="number" placeholder="Weight" name="weight" formControlName="weight">
              <mat-error *ngIf="form.controls.weight.errors?.required">This field is required!</mat-error>
            </mat-form-field>
            <mat-form-field style="width: 50%;">
              <input matInput type="text" placeholder="Height" name="height" formControlName="height">
              <mat-error *ngIf="form.controls.height.errors?.required">This field is required!</mat-error>
            </mat-form-field>
          </div>
          <div fxLayout="row" fxLayoutGap="10px">
            <mat-form-field style="width: 100%;">
              <input matInput type="number" name="age" placeholder="Age" formControlName="age">
              <mat-error *ngIf="form.controls.age.errors?.required">This field is required!</mat-error>
            </mat-form-field>
            <mat-form-field style="width: 100%;">
              <input matInput type="number" name="contact" placeholder="Conatct Number" formControlName="contact">
              <mat-error *ngIf="form.controls.contact.errors?.required">This field is required!</mat-error>
            </mat-form-field>
          </div>
          <br>
          <mat-form-field style="width: 50%;">
            <input matInput type="email" name="email"  placeholder="Email" formControlName="email">
            <mat-error *ngIf="form.controls.email.errors?.required">This field is required!</mat-error>
            <mat-error *ngIf="form.controls.email.errors?.email">Please, enter a valid email address</mat-error>
          </mat-form-field>
          <br>
          <div fxLayout="row" fxLayoutGap="10px">
            <mat-form-field style="width: 50%;">
              <input matInput type="password" name="password" placeholder="Password" formControlName="password">
              <mat-error *ngIf="form.controls.password.errors?.required">Password is required!</mat-error>
            </mat-form-field>
            <mat-form-field style="width: 50%;">
              <input matInput type="password" name="confirmPassword" placeholder="Confirm Password" formControlName="confirmPassword">
              <mat-error *ngIf="form.controls.confirmPassword.errors?.equalTo">Password doesn't match!</mat-error>
            </mat-form-field>
          </div>      
        </form>
        <div style="height: 10px;"></div>
        <button *ngIf="!registered" (click)="registerClient()" class="big-button mat-elevation-z4" mat-raised-button>Register And Continue</button>          
        <div style="height: 10px;"></div>
  </div>      
  `,
  styleUrls: ['./landing.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class RegisterComponent implements OnInit {
  @ViewChild('avatar') avatar: ElementRef;
  @ViewChild('formImage') formImage: ElementRef;
  @ViewChild('imagecontainer') imagecontainer: ElementRef;
  form: FormGroup;
  isClient: string = "client";
  uploadUrl: string = "http://localhost:4200/api/uploads/";
  photo: string;
  clientData;
  registered: boolean = false;

  constructor(private session: SessionService, private apiService: HttpApiService, 
    private sessionStore: SessionStorageService, private localStore: LocalStorageService) {

  }

  ngOnInit() {
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
        this.imagecontainer.nativeElement.innerHTML = `<img src="`+this.photo+`" width="150px" height="150px">`;
      }
    })
  }

  registerClient() {
    if (this.form.valid) {
      this.form.value.imageurl = this.photo;
      this.apiService.register(this.form.value, this.isClient)
        .subscribe(
          data => {
            this.clientData = data;
          },
          error => window.alert("Error occured while sending register request, please check network connection " +error),
          () => {
            if (this.clientData.data == "exists") {
              window.alert("Email address already exists!");
              this.form.reset();
            } else if (!this.clientData.error) {
                this.sessionStore.store('currentUserData', this.clientData);
                this.session.start(this.isClient);
                this.registered = true;
            } else {
                window.alert("Some error occured: "+this.clientData.error);
            }
          }
        );
    } else {
      console.log("Form is not valid!");
    }
  }
}