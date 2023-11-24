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
  attractions: Attraction[] = [];

  constructor(private route: ActivatedRoute, 
              private attractionService: AttractionService) {}

  ngOnInit() {
    // load attractions from attractions service
    this.attractionService.getAttraction(this.route.snapshot.params['id']).subscribe(res => {
      this.attractions = res.attractions
      console.log(this.attractions)
    })
  }
}
