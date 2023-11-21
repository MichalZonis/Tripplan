import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { User } from "./user.model";
import { BehaviorSubject, Observable, Observer } from "rxjs";

@Injectable({
    providedIn: "root"
})

export class AuthenticationService {
    loginUrl = "http://localhost:8000/auth/login";
    assertionUrl = "http://localhost:8000/auth/assert";
    googleAssertionUrl = "http://localhost:8000/auth/assert/google";

    private currentUserSubject = new BehaviorSubject<User | null>(null);
    public currentUser = this.currentUserSubject.asObservable();

    private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
    public isAuthenticated = this.isAuthenticatedSubject.asObservable();

    constructor(private http: HttpClient) {
        this.tryAssertion()
    }

    login(username: string, password: string) {
        this.http.post
        <{token: string, role: string, email: string, id: string, firstName: string, lastName: string}>
        (this.loginUrl, {username: username, password: password})
        .subscribe((res) => {
            localStorage.setItem("accessToken", res.token);
            this.currentUserSubject.next(new User(res.email, res.role, res.id, res.firstName, res.lastName))
            this.isAuthenticatedSubject.next(true); 
        })
    }

    getLoggedUser(): User | null {
        this.tryAssertion()
        return this.currentUserSubject.value
    }

    getIsAuthenticated(): boolean {
        this.tryAssertion()
        return this.isAuthenticatedSubject.value;
    }

    logout() {
        localStorage.removeItem("accessToken");
        this.currentUserSubject.next(null);
        this.isAuthenticatedSubject.next(false);
    }

    // this function is written with native JS because the context of this function
    // is outside of angular (used as callback for google login module)
    // see usage at login.component.ts, at ngOnInit()
    loginWithGoogle(token: {credential: string}) {
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
            <{decodedToken: any}>
            (this.assertionUrl, {accessToken: accessToken}).subscribe(res => {
                const user = new User(res.decodedToken.email, res.decodedToken.role,
                                      res.decodedToken.id, res.decodedToken.firstName, 
                                      res.decodedToken.lastName);   
                this.currentUserSubject.next(user)
                this.isAuthenticatedSubject.next(true);
            })
        }
    }
}