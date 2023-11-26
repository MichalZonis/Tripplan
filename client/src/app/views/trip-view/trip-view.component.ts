import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
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
      res.attractions.forEach(attraction => {
        this.attractions.push(
          new Attraction(attraction.id, attraction.name,
                        attraction.GeolocationCoordinates, attraction.isOptional,
                        attraction.visitHours,
                        {startDate: new Date(attraction.visitDates.startDate), endDate: new Date(attraction.visitDates.endDate)},
                        attraction.description, attraction.attractionPrice)
        )
      })
    })
  }
}
