import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { TripPlan } from '../../models/TripPlan';
import Attraction from '../../models/attraction.model';
import { AttractionComponent } from '../../components/attraction/attraction.component';

@Component({
  selector: 'app-trip-view',
  standalone: true,
  imports: [CommonModule, AttractionComponent],
  templateUrl: './trip-view.component.html',
  styleUrl: './trip-view.component.scss'
})

export class TripViewComponent {
  tripTitle: string = '';
  tripPlan: TripPlan = new TripPlan(
    '1',
    'The big trip1',
    [ new Attraction(
      '1', "attraction 1",
      {lat: 1, lng: 2}, false,
      {startTime: "11:00", endTime: "12:00"},
      {startDate: new Date(), endDate: new Date()},
      "this is an attraction",
      900)],
    ['Michal', 'Noa'],
    {startDate: new Date(), endDate: new Date()},
    ""
  );

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.tripTitle = this.route.snapshot.params['title'];
    // load trip from trip services
  }
}
