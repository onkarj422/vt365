import { Routes } from '@angular/router';
import { ClientAppComponent } from './client-app/client-app.component';
import { LandingComponent } from './landing/landing.component';

export const routes: Routes = [
	{ path: '', component: LandingComponent },
    { path: '/dashboard', component: ClientAppComponent }
];