import { Injectable } from '@angular/core';
import TripPlan from '../models/TripPlan';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class TripPlanService {

  currTripPlan: TripPlan | null = null

  constructor(private http: HttpService) { }

  createTripPlan() {
    const newTrip: TripPlan =
    {
      name: "Rome",
      startDate: new Date(2022, 3, 20),
      endDate: new Date(2022, 4, 10),
      planners: ["Yair", "Michael"]
    }
    
    this.http.post("/tripPlan/create", newTrip);
  }
}
