import { Routes } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { TripViewComponent } from './views/trip-view/trip-view.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'home', component: HomeComponent },
    {path: 'trip/:title', component: TripViewComponent}
];
