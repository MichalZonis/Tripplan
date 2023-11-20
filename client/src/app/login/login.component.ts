import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthenticationService } from '../authentication.service';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  
})

export class LoginComponent {
  constructor(private authService: AuthenticationService) {}
  username: string = '';
  password: string = '';

  loginWithGoogle(): void {
    this.authService.loginWithGoogle();
  }

  logout(): void {
    this.authService.logout();
  }

  login() {
    this.authService.login(this.username, this.password);
    this.username = '';
    this.password = '';
  }
}
