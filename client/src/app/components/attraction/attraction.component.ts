import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import Attraction from '../../models/attraction.model';
@Component({
  selector: 'app-attraction',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './attraction.component.html',
  styleUrl: './attraction.component.scss'
})

export class AttractionComponent {
  @Input("attraction") attraction?: Attraction;
  editMode: boolean = false;

  onToggleEdit() {
    this.editMode = true;
  }

  onCancel() {
    this.editMode = false;
    // discard changes
  }

  onSave() {
    this.editMode = false;
    // save changes
  }
}
