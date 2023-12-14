import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { MapComponent } from './map/map.component';
import { AuthGuard } from './AuthGuard';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './views/home/home.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'map', component: MapComponent, canActivate: [AuthGuard] },
    { path: '**', component: LoginComponent }
];