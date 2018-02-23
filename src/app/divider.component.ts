import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'my-divider',
  template: `
  	<div class="divider-container">
		<div class="divider"></div>
		<div class="divider-shadow"></div>
	</div>
  `,
  styles: [`
  	.divider-container {
		margin: 12px 0;
		width: 100%;
	}

	.divider {
		background-color: black;
		opacity: 0.3;
		height: 1.2px;
	}

	.divider-shadow {
		background-color: white;
		opacity: 1;
		height: 1.2px;
	}`
   ],
  encapsulation: ViewEncapsulation.None
})
export class DividerComponent implements OnInit {

  constructor() {
  	
  }

  ngOnInit() {
  }

}