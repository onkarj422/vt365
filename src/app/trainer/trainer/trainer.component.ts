import { Component, OnInit, OnDestroy, ViewChild, ElementRef, Input } from '@angular/core';
import { SessionService } from '../../session.service';
import { Router } from '@angular/router';
import { IfMediaService } from 'ng2-if-media';

@Component({
  selector: 'app-trainer',
  templateUrl: './trainer.component.html',
  styleUrls: ['./trainer.component.css']
})
export class TrainerComponent implements OnInit, OnDestroy {

  @ViewChild('sidenav') sidenav;

  smallScreen: boolean;
  mediaContainer;

  constructor(private session: SessionService, private router: Router, private mediaService: IfMediaService) {
    this.mediaContainer = this.mediaService.register(this); 
  	if (!this.session.isActive()) {
  		window.location.replace('/register#trainer');
  	}
  }

  listClick() {
    if (this.smallScreen) {
      this.sidenav.close();
    } else {
      return;
    }
  }

  ngOnInit() {
    this.mediaContainer.onChange('<phone', (match) => { 
      this.smallScreen = match ? true : false; 
      match ? this.sidenav.close() : this.sidenav.open();
    });
  }

  ngOnDestroy() {
    this.mediaContainer.deregister();
  }

}
