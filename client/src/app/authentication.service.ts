import { Injectable } from "@angular/core";

@Injectable({
    providedIn: "root"
})

export class AuthenticationService {
    private isLoggedIn: boolean = false;

    login(username: string, password: string) {
        this.isLoggedIn = true;
    }

    loginWithGoogle() {

    }

    isAuthenticated() {
        console.log(this.isLoggedIn)
        return this.isLoggedIn;
    }

    logout() {
        this.isLoggedIn = false;
    }
}