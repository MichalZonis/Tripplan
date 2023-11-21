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
  email: string = '';
  password: string = '';

  logout(): void {
    this.authService.logout();
  }

  login(): void {
    this.authService.login(this.email, this.password);
    this.email = '';
    this.password = '';
  }


  ngOnInit() {
    // @ts-ignore
    google.accounts.id.initialize({
      client_id: "431094013601-u10s6e3ltgrfe7st720uv19tjh10s354.apps.googleusercontent.com",
      callback: this.authService.loginWithGoogle,
      
    });
    // @ts-ignore
    google.accounts.id.renderButton(
      document.getElementById("googleSignInButton"),
      { theme: "outline", size: "large" }  // customization attributes
    );
  }
}
