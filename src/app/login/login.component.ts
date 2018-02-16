import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ReactiveFormsModule, FormControl, Validators, FormGroup, FormBuilder, FormsModule } from '@angular/forms';
import { CustomValidators } from 'ng4-validators';
import { Router } from '@angular/router';
import { SessionService } from '../session.service';
import { HttpApiService } from '../http-service.service';
import { LocalStorageService, SessionStorageService } from 'ngx-webstorage';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {

  hide = true;
  form: FormGroup;
  data;

  signInWithFB() {
  	console.log("Facebook");
  }

  signInWithGoogle() {
  	console.log("Google");
  }

  login() {
  	if (this.form.valid) {
      this.apiService.authorize(this.form.value)
        .subscribe(
          data => {
            this.data = data;
          },
          error => console.log("Error : "+ error),
          () => {
            if (this.data.password == "incorrect") {
              console.log("Incorrect password or username!");
            } else if (this.data.noexists == "noexists") {
              console.log("User does not exist.");
            } else {
              this.localStore.store('currentUserData', this.data);
              console.log(this.localStore.retrieve('currentUserData'));
              this.session.start(this.data.userIs);
              let loc = "/"+this.data.userIs;
              window.location.replace(loc);
            }
          }
        );
    } else {
      console.log("Please, fill in the form properly!");
    }
  }

  constructor(private session: SessionService, private apiService: HttpApiService, private localStore: LocalStorageService) {
    this.form = new FormGroup({
      email: new FormControl('', Validators.compose([Validators.required, CustomValidators.email])),
      password: new FormControl('', Validators.required)  
    });
  }

  ngOnInit() { }
}
