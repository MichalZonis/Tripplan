import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MainPageComponent } from './main-page/main-page.component';
import { MapComponent } from './map/map.component';
import { AuthGuard } from './AuthGuard';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './views/home/home.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'home', component: MainPageComponent, canActivate: [AuthGuard] },
    { path: 'map', component: MapComponent, canActivate: [AuthGuard] },
    { path: '**', component: LoginComponent }
];
export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'home', component: HomeComponent }
];
