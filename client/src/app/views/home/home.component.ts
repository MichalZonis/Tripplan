import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TripPlanCardComponent } from '../../components/trip-plan-card/trip-plan-card.component';
import TripPlan from '../../models/TripPlan';
import { TripPlanService } from '../../services/trip-plan.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CreateTripComponent } from '../../components/create-trip/create-trip.component';
import { NativeDateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, TripPlanCardComponent, MatDialogModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  providers: [NativeDateAdapter]
})
export class HomeComponent {

  constructor(public s_tripPlan: TripPlanService, public dialog: MatDialog) { }
  trips$ = this.s_tripPlan.tripPlans$;

  // trips: TripPlan[] = [{
  //   title: "The big trip1",
  //   dates: {
  //     startDate: new Date(2022, 10, 4),
  //     endDate: new Date(2022, 11, 14)
  //   },
  //   id: "1",
  //   planners: ["Michal", "Noa"],
  //   thumbnail: "https://www.state.gov/wp-content/uploads/2019/04/Japan-2107x1406.jpg",
  //   // startDate: new Date(2023, 9, 15),
  //   // endDate: new Date(2024, 1, 15),
  // }, {
  //   title: "The big trip2",
  //   id: "1",
  //   dates: {
  //     startDate: new Date(2022, 10, 4),
  //     endDate: new Date(2022, 11, 14)
  //   },
  //   planners: ["Michal"],
  //   thumbnail: "https://www.state.gov/wp-content/uploads/2019/04/Japan-2107x1406.jpg",
  //   // startDate: new Date(2023, 9, 15),
  //   // endDate: new Date(2024, 1, 15),
  // }, {
  //   title: "The big trip",
  //   id: "1",
  //   planners: ["Michal"], dates: {
  //     startDate: new Date(2022, 10, 4),
  //     endDate: new Date(2022, 11, 14)
  //   },
  //   thumbnail: "https://www.state.gov/wp-content/uploads/2019/04/Japan-2107x1406.jpg",
  //   // startDate: new Date(2023, 9, 15),
  //   // endDate: new Date(2024, 1, 15),
  // }, {
  //   title: "The big trip",
  //   id: "1", dates: {
  //     startDate: new Date(2022, 10, 4),
  //     endDate: new Date(2022, 11, 14)
  //   },
  //   planners: ["Michal"],
  //   thumbnail: "https://www.state.gov/wp-content/uploads/2019/04/Japan-2107x1406.jpg",
  //   // startDate: new Date(2023, 9, 15),
  //   // endDate: new Date(2024, 1, 15),
  // }, {
  //   title: "The big trip",
  //   _id: "1",
  //   planners: ["Michal"], dates: {
  //     startDate: new Date(2022, 10, 4),
  //     endDate: new Date(2022, 11, 14)
  //   },
  //   thumbnail: "https://www.state.gov/wp-content/uploads/2019/04/Japan-2107x1406.jpg",
  //   // startDate: new Date(2023, 9, 15),
  //   // endDate: new Date(2024, 1, 15),
  // },]

  ngOnInit() {
    this.s_tripPlan.getAllTrips()
  }

  openDialog() {
    this.dialog.open(CreateTripComponent, { width: '80%', height: '75%' });
  }
}
