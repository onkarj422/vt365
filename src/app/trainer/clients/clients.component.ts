import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormGroup, FormControl, Validators, RadioControlValueAccessor } from '@angular/forms';
import { NgIf } from '@angular/common';
import { SessionStorageService } from 'ngx-webstorage';
import { HttpApiService } from '../../http-service.service';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ClientsComponent implements OnInit {

  allClients;
  isTrainingPlan: boolean = false;
  isMealPlan: boolean = false;
  trainingForm: FormGroup;
  mealForm: FormGroup;
  trainingFormValid: boolean;
  mealFormValid: boolean;
  workoutsArray = [
    {value: 'workout1', viewValue: 'Workout 1'},
    {value: 'workout2', viewValue: 'Workout 2'},
    {value: 'workout3', viewValue: 'Workout 3'}
  ];

  mealsArray = [
    {value: 'meal1', viewValue: 'Meal 1'},
    {value: 'meal2', viewValue: 'Meal 2'},
    {value: 'meal3', viewValue: 'Meal 3'}
  ];

  constructor(private apiService: HttpApiService, private sessionStore: SessionStorageService) {
  	this.generateClientsList();
  } 

  generateClientsList() {
  	let sendData = {};
  	sendData['trainerid'] = this.sessionStore.retrieve('currentUserData').trainerid;
  	this.apiService.getTrainersClients(sendData).subscribe(data => {
      console.log(data);
      this.allClients = data;
    });
  }

  createTrainingPlan() {
    if (this.trainingForm.valid) {
      console.log(this.trainingForm.value);
    } else {
      this.trainingFormValid = false;
    }
  }

  createMealPlan() {
    if (this.mealForm.valid) {
      console.log(this.mealForm.value);
    } else {
      this.mealFormValid = false;
    }
  }

  ngOnInit() {
    this.trainingForm = new FormGroup({
      weeks: new FormControl('', Validators.required),
      workouts: new FormControl('', Validators.required)
    });

    this.mealForm = new FormGroup({
      meals: new FormControl('', Validators.required)
    });
  }

}
