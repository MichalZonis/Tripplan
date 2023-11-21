import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  email: string = '';
  password: string = '';
  firstName: string = '';
  lastName: string = '';

  constructor(private authService: AuthenticationService) {}

  onRegister() {
    if (this.email && this.password && this.firstName && this.lastName) {
      this.authService.register(this.email, this.password, this.firstName, this.lastName)
    }
  }
}
