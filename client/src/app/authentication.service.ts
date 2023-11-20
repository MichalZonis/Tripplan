import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { User } from "./user.model";

@Injectable({
    providedIn: "root"
})

export class AuthenticationService {
    loginUrl = "http://localhost:8000/auth/login";
    loggedUser?: User;

    constructor(private http: HttpClient) {}

    login(username: string, password: string) {
        this.http.post<{token: string, role: string, username: string, id: string}>
        (this.loginUrl, {username: username, password: password})
        .subscribe((res) => {
            localStorage.setItem("accessToken", res.token);
            this.loggedUser = new User(res.username, res.role, res.id);
        })
    }

    loginWithGoogle() {
    }

    isAuthenticated() {
        if(this.loggedUser) {
            return true
        }
        return false;
    }

    logout() {
        localStorage.removeItem("accessToken");
        this.loggedUser = undefined;
    }
}