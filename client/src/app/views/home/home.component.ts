import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TripPlanCardComponent } from '../../components/trip-plan-card/trip-plan-card.component';
import TripPlan from '../../models/TripPlan';
import { trigger, state, style, animate, transition } from '@angular/animations';


export const zoomInAnimation = trigger('zoomIn', [
  state('void', style({ transform: 'scale(0)' })),
  transition(':enter, :leave', [
    animate('0.3s ease-in-out', style({ transform: 'scale(1)' })),
  ]),
]);

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, TripPlanCardComponent],
  templateUrl: './home.component.html',
  animations: [zoomInAnimation],
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  clickedTrip = -1;
  trips: TripPlan[] = [{
    name: "The big trip",
    id: "1",
    planners: ["Michal"],
    //thumbnail: "https://www.state.gov/wp-content/uploads/2019/04/Japan-2107x1406.jpg",
    // startDate: new Date(2023, 9, 15),
    // endDate: new Date(2024, 1, 15),
  }, {
    name: "The big trip",
    id: "1",
    planners: ["Michal"],
    //thumbnail: "https://www.state.gov/wp-content/uploads/2019/04/Japan-2107x1406.jpg",
    // startDate: new Date(2023, 9, 15),
    // endDate: new Date(2024, 1, 15),
  }, {
    name: "The big trip",
    id: "1",
    planners: ["Michal"],
    // thumbnail: "https://www.state.gov/wp-content/uploads/2019/04/Japan-2107x1406.jpg",
    // startDate: new Date(2023, 9, 15),
    // endDate: new Date(2024, 1, 15),
  }, {
    name: "The big trip",
    id: "1",
    planners: ["Michal"],
    thumbnail: "https://www.state.gov/wp-content/uploads/2019/04/Japan-2107x1406.jpg",
    // startDate: new Date(2023, 9, 15),
    // endDate: new Date(2024, 1, 15),
  },]

  clicked(i:number){
    console.log(i)
    this.clickedTrip = i
    console.log(this.clickedTrip)
  }
}
