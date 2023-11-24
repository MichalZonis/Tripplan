import { Injectable } from '@angular/core';
import TripPlan from '../models/TripPlan';
import { HttpService } from './http.service';
import { BehaviorSubject, firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TripPlanService {

  currTripPlan: TripPlan | null = null

  private _tripPlans = new BehaviorSubject<TripPlan[]>([])
  tripPlans$ = this._tripPlans.asObservable();

  constructor(private http: HttpService) { }

  async createTripPlan() {
    const newTrip: TripPlan =
    {
      title: "tokyo",
      dates: {
        startDate: new Date(2022, 3, 20),
        endDate: new Date(2022, 4, 10)
      },
      planners: ["Yair", "Michal"]
    }
    this.http.post("tripPlan/create", { newTrip }).subscribe((newTrip: any) => {
      this._tripPlans.next([...this._tripPlans.value, newTrip])
    });
  }

  getAllTrips() {
    this.http.get("tripPlan/all").subscribe((trips: any) => {
      this._tripPlans.next([...trips])
    });
  }
}
