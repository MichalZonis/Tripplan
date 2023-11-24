import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TripPlan } from "../../models/TripPlan";
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-trip-plan-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './trip-plan-card.component.html',
  styleUrl: './trip-plan-card.component.scss'
})
export class TripPlanCardComponent {

  @Input({ required: true }) tripPlan!: TripPlan

}
