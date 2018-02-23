import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrainerComponent } from './trainer/trainer.component';
import { routes } from './routes.config';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material.module';
import { WorkoutsComponent } from './workouts/workouts.component';
import { PaymentsComponent } from './payments/payments.component';
import { MealsComponent } from './meals/meals.component';
import { ClientsComponent } from './clients/clients.component';
import { MessagesComponent } from './messages/messages.component';
import { MediaComponent } from './media/media.component';
import { MyBreakPointsModule } from '../breakpoints.module';
import { HttpApiService } from '../http-service.service';
import { Ng2Webstorage } from 'ngx-webstorage';
import { TimeSinceModule } from '@thisissoon/angular-timesince';
import { DividerComponent } from '../divider.component';
import { IfMediaModule } from 'ng2-if-media';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CustomFormsModule } from 'ng4-validators'
import { HttpModule } from "@angular/http";
import { ProgressHttpModule } from "angular-progress-http";
import {VgCoreModule} from 'videogular2/core';
import {VgControlsModule} from 'videogular2/controls';
import {VgOverlayPlayModule} from 'videogular2/overlay-play';
import {VgBufferingModule} from 'videogular2/buffering';


const mediaConfig = {
  breakpoints: {
    phone: {
      value: '768px',
      param: 'width'
    }
  }
};

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MaterialModule,
    MyBreakPointsModule,
    Ng2Webstorage,
    TimeSinceModule,
    IfMediaModule.withConfig(mediaConfig),
    FormsModule, 
    ReactiveFormsModule,
    CustomFormsModule,
    HttpModule,
    ProgressHttpModule,
    VgCoreModule,
    VgControlsModule,
    VgOverlayPlayModule,
    VgBufferingModule
  ],
  declarations: [
  	TrainerComponent, 
  	WorkoutsComponent, 
  	PaymentsComponent, 
  	MealsComponent, 
  	ClientsComponent, 
  	MessagesComponent, 
  	MediaComponent,
    DividerComponent
  ],
  providers: [HttpApiService]
})
export class TrainerModule { }
