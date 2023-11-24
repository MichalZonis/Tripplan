import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-trip-view',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './trip-view.component.html',
  styleUrl: './trip-view.component.scss'
})

export class TripViewComponent {
  tripTitle: string = '';

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.tripTitle = this.route.snapshot.params['title'];
  }
}
