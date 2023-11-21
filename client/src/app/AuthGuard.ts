import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { AuthenticationService } from "./authentication.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {
  constructor(private authService: AuthenticationService, private router: Router) {
    authService.isAuthenticated.subscribe(status => {
      this.authStatus = status
    })
    
    this.authStatus = this.authService.getIsAuthenticated();
  }

  authStatus: boolean = false;
  
  canActivate() {
    return this.authStatus;
  }
}
