import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { AuthenticationService } from "./authentication.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {
  constructor(private authService: AuthenticationService, private router: Router) {}

  canActivate() {
    const authStatus = this.authService.isAuthenticated()

    if(authStatus) {
      return true
    } else {
      this.router.navigate(["/login"])
      return false;
    }
  }
}
