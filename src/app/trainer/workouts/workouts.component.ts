import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { NgIf } from '@angular/common';
import { SessionStorageService } from 'ngx-webstorage';
import { HttpApiService } from '../../http-service.service';

@Component({
  selector: 'app-workouts',
  templateUrl: './workouts.component.html',
  styleUrls: ['./workouts.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class WorkoutsComponent implements OnInit {
  
  workoutForm: FormGroup;
  isAddForm: boolean = false;
  mediaVideos;
  mediaImages;
  isClicked = [];
  isClickedI = [];
  allWorkouts;
  noWorkoutImages: boolean = true;
  noWorkoutVideos: boolean = true;
  workoutVideos = {};
  workoutImages = {};
  isWorkouts: boolean = false;
  noVideosChosen: boolean = true;
  noImagesChosen: boolean = true;


  constructor(private sessionStore: SessionStorageService, private apiService: HttpApiService, ) { 
  	this.mediaVideos = this.sessionStore.retrieve('mediaVideos');
    this.mediaImages = this.sessionStore.retrieve('mediaImages');
    this.apiService.getWorkouts().subscribe(data => {
      console.log(data);
      if (data.length == 0) {
        this.isWorkouts = false;
      } else {
        this.allWorkouts = data;
        this.isWorkouts = true;
      }
    });
  }

  showVideoChooser() {
    var modal = document.getElementById('modal-card');
    modal.style.display = "block";
  }

  showImagesChooser() {
    var modal = document.getElementById('modal-images-card');
    modal.style.display = "block";
  }

  selectVideos() {
    if (this.isClicked.length != 0) {
      let videos = {};
      let videonames = {};
      for (var i = 0; i <= this.isClicked.length; i++) {
        if (this.isClicked[i] == true) {
          videos[i] = {'videourl': this.mediaVideos[i].videourl};
          videonames[i] = {'videoname': this.mediaVideos[i].videoname};
        }
      }
      this.workoutForm.value['videos'] = videos;
      this.workoutForm.value['videonames'] = videonames;
      this.noVideosChosen = false;
    } else {
      this.noVideosChosen = true;
    }

    console.log(this.workoutForm.value);
    this.hideChooser();
  }

  selectImages() {
    if (this.isClickedI.length != 0) {
      let images = {};
      for (var i = 0; i <= this.isClickedI.length; i++) {
        if (this.isClickedI[i] == true) {
          images[i] = {'imageurl': this.mediaImages[i].imageurl};
        }
      }
      this.workoutForm.value['images'] = images;
      this.noImagesChosen = false;
    } else {
      this.noImagesChosen = true;
    }
    console.log(this.workoutForm.value);
    this.hideChooserI();
  }

  hideChooser() {
    var modal = document.getElementById('modal-card');
    modal.style.display = "none";
  }

  hideChooserI() {
    var modal = document.getElementById('modal-images-card');
    modal.style.display = "none";
  }

  addWorkout() {
    if (this.workoutForm.valid) {
      this.workoutForm.value['trainerid'] = this.sessionStore.retrieve('currentUserData').trainerid;
      this.apiService.addWorkout(this.workoutForm.value)
        .subscribe(data => {
          if (data == "success") {
            console.log("workout added");
            //window.location.href = window.location.href;
          } else {
            console.log("error adding workout");
          }
      });
    }
  }

  ngOnInit() {
  	this.workoutForm = new FormGroup({
      workout: new FormControl('', Validators.required),
      exercise: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      reps: new FormControl('', Validators.required),
      sets: new FormControl('', Validators.required)
    });

  }

}
