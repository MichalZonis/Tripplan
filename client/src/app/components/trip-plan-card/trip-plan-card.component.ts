import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import TripPlan from "../../models/TripPlan";
import { TripPlanService } from '../../services/trip-plan.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-trip-plan-card',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './trip-plan-card.component.html',
  styleUrl: './trip-plan-card.component.scss'
})
export class TripPlanCardComponent {

  @Input({ required: true }) tripPlan!: TripPlan
  isEditMode: boolean = false;
  editForm!: FormGroup

  constructor(public s_tripPlan: TripPlanService) { }

  ngOnInit() {
    this.editForm = new FormGroup({
      titleCtrl: new FormControl(this.tripPlan.title),
      startDateCtrl: new FormControl(this.tripPlan.dates.startDate),
      endDateCtrl: new FormControl(this.tripPlan.dates.endDate)
    })
  }

  delete() {
    this.s_tripPlan.deleteTrip(this.tripPlan);
  }

  editTrip() {
    this.isEditMode = true;

    this.editForm.controls["titleCtrl"].setValue(this.tripPlan.title)
    this.editForm.controls["startDateCtrl"].setValue(this.tripPlan.dates.startDate)
    this.editForm.controls["endDateCtrl"].setValue(this.tripPlan.dates.endDate)
  }

  saveTrip() {
    this.isEditMode = false;
    let tripToSave: TripPlan = {
      dates: {
        endDate: this.editForm.controls["endDateCtrl"].value,
        startDate: this.editForm.controls["startDateCtrl"].value
      },
      title: this.editForm.controls["titleCtrl"].value,
      planners: ["Michal"],
      _id: this.tripPlan._id
    };

    this.s_tripPlan.editTrip(tripToSave)
  }
}
