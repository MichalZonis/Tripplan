import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import TripPlan from "../../models/TripPlan";
import { TripPlanService } from '../../services/trip-plan.service';


@Component({
  selector: 'app-trip-plan-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './trip-plan-card.component.html',
  styleUrl: './trip-plan-card.component.scss'
})
export class TripPlanCardComponent {

  @Input({ required: true }) tripPlan!: TripPlan

  constructor(public s_tripPlan: TripPlanService) { }

  delete() {
    this.s_tripPlan.deleteTrip(this.tripPlan);
  }
}
