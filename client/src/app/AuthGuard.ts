import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { AuthenticationService } from "./authentication.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {
  authStatus: boolean = false;

  constructor(private authService: AuthenticationService, private router: Router) {
    authService.isAuthenticated.subscribe(status => {
      this.authStatus = status
    })
    
    // check if nessecery
    this.authStatus = this.authService.getIsAuthenticated();
  }

  canActivate() {
    if (!this.authStatus) {
      this.router.navigate(['/login'])
    }
    return this.authStatus;
  }
}
