import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { SocialAuthService } from '@abacritt/angularx-social-login';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  constructor(private router: Router,
    private socialAuthService: SocialAuthService) {
}

  loginWithGoogle(): void {
    // this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID)
    //   .then(() => this.router.navigate(['mainpage']));
  }
}
