import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Attraction from '../models/attraction.model';

@Injectable({
  providedIn: 'root',
})
export class AttractionService {

  private tripsBackendUrl: string = 'http://localhost:8000/trips'
  private attractionsBackendUrl: string = 'http://localhost:8000/attractions'

  constructor(private http: HttpClient) { }

  getAttraction(tripID: string) {
    return this.http.get<{attractions: Attraction[]}>(`${this.tripsBackendUrl}/${tripID}/attractions`)
  }

  updateAttraction(attraction: Attraction) {
    this.http.post(`${this.attractionsBackendUrl}/updateAttraction`, {attraction: attraction})
    .subscribe(response => {
      console.log(response)
    })
  }
}
