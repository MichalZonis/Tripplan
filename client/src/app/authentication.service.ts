import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { User } from "./user.model";

@Injectable({
    providedIn: "root"
})

export class AuthenticationService {
    loginUrl = "http://localhost:8000/auth/login";
    assertionUrl = "http://localhost:8000/auth/assert";
    googleAssertionUrl = "http://localhost:8000/auth/assert/google";
    loggedUser?: User;

    constructor(private http: HttpClient) {
        this.tryAssertion()
    }

    login(username: string, password: string) {
        this.http.post
        <{token: string, role: string, email: string, id: string, firstName: string, lastName: string}>
        (this.loginUrl, {username: username, password: password})
        .subscribe((res) => {
            localStorage.setItem("accessToken", res.token);
            this.loggedUser = new User(
                res.email, res.role, res.id, res.firstName, res.lastName
            )
        })
    }

    isAuthenticated() {
        this.tryAssertion()
        if(this.loggedUser) {
            return true
        }
        return false;
    }

    logout() {
        localStorage.removeItem("accessToken");
        this.loggedUser = undefined;
    }

    // this function is written with native JS because the context of this function
    // is outside of angular (used as callback for google login module)
    // see usage at login.component.ts, at ngOnInit()
    loginWithGoogle(token: {credential: string}) {
        console.log(token.credential);
        (async () => {
            const rawResponse = await fetch('http://localhost:8000/auth/assert/google', {
                method: 'POST',
                headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
                },
                body: JSON.stringify({token: token.credential})
            });
            const content = await rawResponse.json();
            localStorage.setItem("accessToken", content.accessToken)
        })();
    }

    tryAssertion() {
        const accessToken = localStorage.getItem("accessToken")
        if(accessToken) {
            this.http.post
            <{email: string, role: string, id: string, firstName: string, lastName: string}>
            (this.assertionUrl, {accessToken: accessToken}).subscribe(res => {
                this.loggedUser = new User(
                    res.email, res.role, res.id, res.firstName, res.lastName
                )
            })
        }
    }
}