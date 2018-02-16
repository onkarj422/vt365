import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { SessionStorageService } from 'ngx-webstorage';
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
  selectedId: string;
  stepData = {
    'trainings': []
  };

  slides = [
    { title: "Weight Loss", img: '../../../assets/weightloss.jpg', id: 'wtloss' },
    { title: "Transforming", img: '../../../assets/bodytransforming.jpg', id: 'bdytrns' },
    { title: "Power Lifting", img: '../../../assets/powerlifting.jpg', id: 'pwrlft' },
    { title: "Yoga/Pilates", img: '../../../assets/yoga.jpg', id: 'yoga' },
    { title: "Crossfit", img: '../../../assets/crossfit.jpg', id: 'crsft' },
    { title: "Speciality", img: '../../../assets/speciality.jpg', id: 'spe' }
  ];

  constructor(private sessionStore: SessionStorageService) { 

  }

  isClicked = [];

  selectTraining() {
    let i,j;
    for (i = 0; i <= this.isClicked.length; i++) {
      if (this.isClicked[i] == true) {
        this.stepData.trainings.push(this.slides[i].title);
      }
    }
    console.log(this.stepData);
  }

  ngOnInit() {
  	this.innerHeight = (window.screen.height) + "px";
    $(".banner").css({"height": this.innerHeight});
  }
}
