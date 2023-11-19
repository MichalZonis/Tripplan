import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthenticationService } from '../authentication.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  
})

export class LoginComponent {
  constructor(private authService: AuthenticationService) {}

  loginWithGoogle(): void {
    this.authService.loginWithGoogle();
  }

  logOut(): void {
    this.authService.logout();
  }

  login() {
    this.authService.login('sas', 'sap');
  }
}
