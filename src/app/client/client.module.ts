import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientAppComponent } from './client-app/client-app.component';
import { RouterModule } from '@angular/router';
import { routes } from './routes.config';
import { MaterialModule } from '../material.module';
import { LandingComponent } from './landing/landing.component';
import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';
import { FlexLayoutModule } from "@angular/flex-layout";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MaterialModule,
    ScrollToModule.forRoot(),
    FlexLayoutModule
  ],
  declarations: [ClientAppComponent, LandingComponent]
})
export class ClientModule { }
