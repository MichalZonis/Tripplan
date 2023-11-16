import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MainPageComponent } from './main-page/main-page.component';
import { MapComponent } from './map/map.component';

export const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'home',
        component: MainPageComponent,
    },
    {
        path: 'map',
        component: MapComponent
    },
    {
        path: '**',
        component: LoginComponent
    }
];
