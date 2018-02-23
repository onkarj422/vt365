import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { routes } from './routing-tabs';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { TabsRouting } from './routing-tabs';
import { FlexLayoutModule } from "@angular/flex-layout";
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CustomFormsModule } from 'ng4-validators'
import { HttpModule } from "@angular/http";
import { Ng2Webstorage } from 'ngx-webstorage';
import { SessionService } from './session.service';
import { HttpApiService } from './http-service.service';
import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';
import { RegisterclientComponent } from './registerclient/registerclient.component';
import { RegistertrainerComponent } from './registertrainer/registertrainer.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    TabsRouting,
    LoginComponent,
    RegisterclientComponent,
    RegistertrainerComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    RouterModule.forRoot(routes),
    FlexLayoutModule,
    FormsModule, 
    ReactiveFormsModule,
    CustomFormsModule,
    HttpModule,
    Ng2Webstorage,
    ScrollToModule.forRoot()
  ],
  providers: [HttpApiService, SessionService],
  bootstrap: [AppComponent]
})
export class AppModule { }
