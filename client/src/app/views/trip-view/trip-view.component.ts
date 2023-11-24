import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { TripPlan } from '../../models/TripPlan';
import Attraction from '../../models/attraction.model';
import { AttractionComponent } from '../../components/attraction/attraction.component';
import { AttractionService } from '../../services/attraction.service';

@Component({
  selector: 'app-trip-view',
  standalone: true,
  imports: [CommonModule, AttractionComponent],
  templateUrl: './trip-view.component.html',
  styleUrl: './trip-view.component.scss',
  providers: [AttractionService]
})

export class TripViewComponent {
  tripTitle: string = '';
  tripPlan: TripPlan = new TripPlan(
    '1',
    'The big trip1',
    [ ],
    ['Michal', 'Noa'],
    {startDate: new Date(), endDate: new Date()},
    ""
  );

  constructor(private route: ActivatedRoute, 
              private attractionService: AttractionService) {}

  ngOnInit() {
    // load trip from trip services
    this.attractionService.getAttraction(this.route.snapshot.params['id']).subscribe(attarctions => {
      this.tripPlan.attractions = attarctions
    })
  }
}
