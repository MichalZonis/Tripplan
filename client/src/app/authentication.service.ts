import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { CookieService } from "ngx-cookie-service";

@Injectable({
    providedIn: "root"
})

export class AuthenticationService {
    private isLoggedIn: boolean = false;
    loginUrl = "http://localhost:8000/auth/login";

    constructor(private http: HttpClient,
                private cookieService: CookieService) {}

    login(username: string, password: string) {
        this.http.post<{token: string}>(this.loginUrl, {username: "admin", password: "Aa123456"}).subscribe((res) => {
            localStorage.setItem("accessToken", res.token);
        })
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