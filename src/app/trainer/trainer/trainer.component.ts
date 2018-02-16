import { Component, OnInit } from '@angular/core';
import { SessionService } from '../../session.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-trainer',
  templateUrl: './trainer.component.html',
  styleUrls: ['./trainer.component.css']
})
export class TrainerComponent implements OnInit {

  constructor(private session: SessionService, private router: Router) { 
  	if (!this.session.isActive()) {
  		window.location.replace('/register#trainer');
  	}
  }

  ngOnInit() {
  }

}
