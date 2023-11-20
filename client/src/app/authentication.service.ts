import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { User } from "./user.model";
import { SocialAuthService, GoogleLoginProvider } from "@abacritt/angularx-social-login";

@Injectable({
    providedIn: "root"
})

export class AuthenticationService {
    loginUrl = "http://localhost:8000/auth/login";
    assertionUrl = "http://localhost:8000/auth/assert"
    loggedUser?: User;

    constructor(private http: HttpClient,
                private socialAuthService: SocialAuthService) {
        this.tryAssertion()
    }

    login(username: string, password: string) {
        this.http.post<{token: string, role: string, username: string, id: string}>
        (this.loginUrl, {username: username, password: password})
        .subscribe((res) => {
            localStorage.setItem("accessToken", res.token);
            this.loggedUser = new User(res.username, res.role, res.id);
        })
    }

    loginWithGoogle() {
        this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID)
        console.log(this.socialAuthService.authState)
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

    tryAssertion() {
        const accessToken = localStorage.getItem("accessToken")
        console.log(accessToken)
        if(accessToken) {
            console.log("found access token")
            this.http.post
            <{username: string, role: string, id: string}>
            (this.assertionUrl, {accessToken: accessToken}).subscribe(res => {
                this.loggedUser = new User(res.username, res.role, res.id)
            })
        }
    }
}