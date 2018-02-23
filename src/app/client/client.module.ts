import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientAppComponent } from './client-app/client-app.component';
import { RouterModule } from '@angular/router';
import { routes } from './routes.config';
import { MaterialModule } from '../material.module';
import { LandingComponent } from './landing/landing.component';
import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';
import { FlexLayoutModule } from "@angular/flex-layout";
import { SessionService } from '../session.service';
import { HttpApiService } from '../http-service.service';
import { Ng2Webstorage } from 'ngx-webstorage';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CustomFormsModule } from 'ng4-validators'
import { SignInComponent } from './landing/landing.component';
import { RegisterComponent } from './landing/landing.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MaterialModule,
    ScrollToModule.forRoot(),
    FlexLayoutModule,
    Ng2Webstorage,
    FormsModule, 
    ReactiveFormsModule,
    CustomFormsModule
  ],
  declarations: [ClientAppComponent, LandingComponent, SignInComponent, RegisterComponent],
  providers: [HttpApiService, SessionService]
})
export class ClientModule { }
