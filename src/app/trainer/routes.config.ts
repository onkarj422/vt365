import { Routes } from '@angular/router';
import { TrainerComponent } from './trainer/trainer.component';
import { WorkoutsComponent } from './workouts/workouts.component';
import { PaymentsComponent } from './payments/payments.component';
import { MealsComponent } from './meals/meals.component';
import { ClientsComponent } from './clients/clients.component';
import { MessagesComponent } from './messages/messages.component';
import { MediaComponent } from './media/media.component';

export const routes: Routes = [
    { path: '', component: TrainerComponent, 
    	children: [
    		{ path: '', component: ClientsComponent },
    		{ path: 'workouts', component: WorkoutsComponent },
    		{ path: 'meals', component: MealsComponent },
    		{ path: 'media', component: MediaComponent },
    		{ path: 'messages', component: MessagesComponent },
    		{ path: 'payments', component: PaymentsComponent }
    	]
	}
];