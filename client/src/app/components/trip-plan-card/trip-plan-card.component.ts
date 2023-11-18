import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import TripPlan from "../../models/TripPlan";


@Component({
  selector: 'app-trip-plan-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './trip-plan-card.component.html',
  styleUrl: './trip-plan-card.component.scss'
})
export class TripPlanCardComponent {

  @Input() tripPlan!: TripPlan 
    
}
