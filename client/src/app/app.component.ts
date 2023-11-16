import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { GoogleMapsModule } from '@angular/google-maps';
import { HomeComponent } from './views/home/home.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, GoogleMapsModule, HomeComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'tripplan';
  // zoom = 3; // Initial zoom level for the map

  constructor() {}

  ngOnInit(): void {}

  // display: any; // Property to store latitude and longitude data from the map
  // center: google.maps.LatLngLiteral = {
  //   // Initial center coordinates for the map
  //   lat: 35.51679331043587,
  //   lng: 139.35149289364826 
  // };


  // move(event: google.maps.MapMouseEvent) {
  //   // Method to handle map click event and update the display property
  //   if (event.latLng != null) {
  //     this.display = event.latLng.toJSON();
  //   }
  // }
}
