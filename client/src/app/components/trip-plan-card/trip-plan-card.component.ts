import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import TripPlan from "../../models/TripPlan";
import { TripPlanService } from '../../services/trip-plan.service';
import { FormControl, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-trip-plan-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './trip-plan-card.component.html',
  styleUrl: './trip-plan-card.component.scss'
})
export class TripPlanCardComponent {

  @Input({ required: true }) tripPlan!: TripPlan
  isEditMode: boolean = false;

  editForm!: FormGroup

  constructor(public s_tripPlan: TripPlanService) { }

  ngOnInit() {

  }
  delete() {
    this.s_tripPlan.deleteTrip(this.tripPlan);
  }

  editTrip() {
    this.isEditMode = true;
    this.editForm = new FormGroup({
      titleCtrl: new FormControl(this.tripPlan.title),
      startDateCtrl: new FormControl(this.tripPlan.dates.startDate),
      endDateCtrl: new FormControl(this.tripPlan.dates.endDate)
    })
    console.log(this.editForm.controls["titleCtrl"])
  }
}
