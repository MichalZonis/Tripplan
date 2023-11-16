import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TripPlanCardComponent } from '../../components/trip-plan-card/trip-plan-card.component';
 
@Component({
    selector: 'app-home',
    standalone: true,
    imports: [CommonModule, TripPlanCardComponent],
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss'
  })
  export class HomeComponent {

  }
