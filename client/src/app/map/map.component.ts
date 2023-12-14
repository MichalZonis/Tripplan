import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoogleMapsModule } from '@angular/google-maps';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [CommonModule, GoogleMapsModule],
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss'
})
export class MapComponent {
  ngOnInit() {}

  constructor() {}

  display: any; // Property to store latitude and longitude data from the map
  center: google.maps.LatLngLiteral = {
    // Initial center coordinates for the map
    lat: 35.51679331043587,
    lng: 139.35149289364826 
  };
  zoom = 3; // Initial zoom level for the map
  move(event: google.maps.MapMouseEvent) {
    // Method to handle map click event and update the display property
    if (event.latLng != null) {
      this.display = event.latLng.toJSON();
    }
  }
}
