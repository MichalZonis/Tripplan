import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthenticationService } from '../authentication.service';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { jwtDecode } from 'jwt-decode';

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

  logout(): void {
    this.authService.logout();
  }

  login() {
    this.authService.login(this.username, this.password);
    this.username = '';
    this.password = '';
  }

  onGoogleLogin(token: {credential: string}) {
    try {
      const decodedToken = jwtDecode(token.credential);
      console.log(decodedToken);
      // TODO: access backend to receive accessToken & user
    } catch(Error) {
      console.log(Error)
    }
  }

  ngOnInit() {
    // @ts-ignore
    google.accounts.id.initialize({
      client_id: "431094013601-u10s6e3ltgrfe7st720uv19tjh10s354.apps.googleusercontent.com",
      callback: this.onGoogleLogin
    });
    // @ts-ignore
    google.accounts.id.renderButton(
      document.getElementById("googleSignInButton"),
      { theme: "outline", size: "large" }  // customization attributes
    );
  }
}
