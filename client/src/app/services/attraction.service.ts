import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Attraction from '../models/attraction.model';

@Injectable({
  providedIn: 'root',
})
export class AttractionService {

  constructor(private http: HttpClient) { }

  getAttraction(tripID: string) {
    return this.http.get<{attractions: Attraction[]}>(`http://localhost:8000/trips/${tripID}/attractions`)
  }
}
