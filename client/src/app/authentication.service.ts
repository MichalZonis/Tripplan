import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { User } from "./user.model";
import { BehaviorSubject, Observable, Observer } from "rxjs";
import { Router } from "@angular/router";

@Injectable({
    providedIn: "root"
})

export class AuthenticationService {
    private backendUrl = "http://localhost:8000/auth"

    private currentUserSubject = new BehaviorSubject<User | null>(null);
    public currentUser = this.currentUserSubject.asObservable();

    private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
    public isAuthenticated = this.isAuthenticatedSubject.asObservable();

    constructor(private http: HttpClient, private router: Router) {
        this.tryAssertion()

        // ensure that the user always gets redirected to the proper page
        this.isAuthenticated.subscribe(newStatus => {
            if(newStatus === true) {
                this.router.navigate(['/home'])
            } else {
                this.router.navigate(['/login'])
            }
        })
    }

    login(email: string, password: string) {
        this.http.post
        <{accessToken: string, role: string, email: string, id: string, firstName: string, lastName: string}>
        (`${this.backendUrl}/login`, {email: email, password: password})
        .subscribe((res) => {
            localStorage.setItem("accessToken", res.accessToken);
            this.currentUserSubject.next(new User(res.email, res.role, res.id, res.firstName, res.lastName))
            this.isAuthenticatedSubject.next(true); 
        })
    }

    getLoggedUser(): User | null {
        return this.currentUserSubject.value
    }

    getIsAuthenticated(): boolean {
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
            location.reload();
        })();
    }

    tryAssertion() {
        const accessToken = localStorage.getItem("accessToken")
        if(accessToken) {
            this.http.post
            <{decodedToken: any}>
            (`${this.backendUrl}/assert`, {accessToken: accessToken}).subscribe(res => {
                const user = new User(res.decodedToken.email, res.decodedToken.role,
                                      res.decodedToken.id, res.decodedToken.firstName, 
                                      res.decodedToken.lastName);   
                this.currentUserSubject.next(user)
                this.isAuthenticatedSubject.next(true);
            })
        }
    }

    register(email: string, password: string, firstName: string, lastName: string) {
        this.http.post
        <{accessToken: string, email: string, role: string, id: string, firstName: string, lastName: string}>
        (`${this.backendUrl}/register`, {email, password, firstName, lastName}).subscribe(res => {
            localStorage.setItem("accessToken", res.accessToken);
            this.currentUserSubject.next(new User(res.email, res.role, res.id, res.firstName, res.lastName))
            this.isAuthenticatedSubject.next(true);
        })
    }
}