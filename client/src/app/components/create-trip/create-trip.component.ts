import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { TripPlanService } from '../../services/trip-plan.service';
import TripPlan from '../../models/TripPlan';

import { NgbDate, NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { DatepickerComponent } from '../datepicker/datepicker.component';

@Component({
  selector: 'app-create-trip',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    NgbDatepickerModule,
    DatepickerComponent
  ],
  templateUrl: './create-trip.component.html',
  styleUrl: './create-trip.component.scss',
})
export class CreateTripComponent {

  title = new FormControl(''); //TODO: add vaalidation

  startDate: Date | null = new Date()
  endDate: Date | null = new Date()

  constructor(
    public dialogRef: MatDialogRef<CreateTripComponent>,
    public s_tripPlan: TripPlanService
  ) { }


  setDate(newDate: [NgbDate | null, "start" | "end"]) {
    if (newDate[0]) {
      const year = newDate[0].year;
      const month = newDate[0].month - 1; // NgbDate month is 1-based, while JavaScript Date month is 0-based
      const day = newDate[0].day;
      if (newDate[1] == "start") {
        this.startDate = new Date(year, month, day);
      } else {
        this.endDate = new Date(year, month, day);
      }
    } else {
      newDate[1] == "start" ? this.startDate = null : this.endDate = null
    }
  }

  createTrip() {
    const tripToCreate: TripPlan = {
      title: this.title.value!,
      dates: {
        startDate: this.startDate!,
        endDate: this.endDate!
      },
      planners: ["Michal"] // TODO: add corrent user when users are integrated

    }
    this.s_tripPlan.createTripPlan(tripToCreate);
    this.dialogRef.close();
  }
}
