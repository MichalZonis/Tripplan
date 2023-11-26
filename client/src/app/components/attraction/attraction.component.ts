import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import Attraction from '../../models/attraction.model';
import { FormsModule } from '@angular/forms';
import { DateValueAccessorModule } from 'angular-date-value-accessor';
import { AttractionService } from '../../services/attraction.service';

@Component({
  selector: 'app-attraction',
  standalone: true,
  imports: [CommonModule, FormsModule, DateValueAccessorModule],
  templateUrl: './attraction.component.html',
  styleUrl: './attraction.component.scss'
})

export class AttractionComponent {
  @Input("attraction") attraction?: Attraction;
  editMode: boolean = false;

  newName: string = '';
  newDescription: string = '';
  newStartTime: string = '';
  newEndTime: string = '';
  newStartDate: Date = new Date();
  newEndDate: Date = new Date();
  newAttractionPrice: number = 0;

  constructor(private attractionService: AttractionService) {}

  ngOnInit() {
    this.resetFormData()
  }

  resetFormData() {
    this.newDescription = this.attraction?.description || ''
    this.newName = this.attraction?.name || '';
    this.newStartTime = this.attraction?.visitHours.startTime || '';
    this.newEndTime = this.attraction?.visitHours.endTime || '';
    this.newStartDate = this.attraction?.visitDates.startDate || new Date();
    this.newEndDate = this.attraction?.visitDates.endDate || new Date();
    this.newAttractionPrice = this.attraction?.attractionPrice || 0;
  }

  onToggleEdit() {
    this.editMode = true;
  }

  onCancel() {
    this.editMode = false;
    // discard changes
    this.resetFormData();
  }

  onSave() {
    this.editMode = false;
    // save changes
    if (this.attraction) {
      this.attraction.name = this.newName
      this.attraction.description = this.newDescription;
      this.attraction.visitHours.startTime = this.newStartTime;
      this.attraction.visitHours.endTime = this.newEndTime;
      this.attraction.visitDates.startDate = this.newStartDate;
      this.attraction.visitDates.endDate = this.newEndDate;
      this.attractionService.updateAttraction(this.attraction);
    }
  }
}
