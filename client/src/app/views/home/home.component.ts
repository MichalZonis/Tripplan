import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TripPlanCardComponent } from '../../components/trip-plan-card/trip-plan-card.component';
import { TripPlan } from '../../models/TripPlan';
 
@Component({
    selector: 'app-home',
    standalone: true,
    imports: [CommonModule, TripPlanCardComponent],
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss'
  })
  export class HomeComponent {
    trips: TripPlan[] = [
      new TripPlan('1', 
      'The big trip1', 
      [], 
      ['Michal', 'Noa'],
      {startDate: new Date(2023, 9, 15), endDate: new Date(2023, 10,15)},
      "https://www.state.gov/wp-content/uploads/2019/04/Japan-2107x1406.jpg")
    ]
  }
