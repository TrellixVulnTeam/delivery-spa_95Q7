import { HttpClient, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { CurrentUser } from "../models/currentUser";
import { Login } from "../models/login.model";
import { StorageService } from "../services/storage.service";
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable({
    providedIn: 'root'
  })
export class AuthenticationService {

    jwtHelper: JwtHelperService = new JwtHelperService();
    private baseUrl: string;
    loggedIn = new BehaviorSubject<boolean>(false);

    constructor(private http: HttpClient, public storage: StorageService) {
        this.baseUrl = environment.apiBaseURL.concat('login')

    }
    
    authenticate(creds: Login): Observable<HttpResponse<Login>> {
        return this.http.post<Login>(
            this.baseUrl, creds,
            {
                observe: 'response',
                responseType: "json"
            });
    }

    refreshToken() {
        return this.http.post(
            `${environment.apiBaseURL}auth/refresh_token`, 
            {},
            {
                observe: 'response',
                responseType: 'text'
            });
    }

    successfulLogin(authorizationValue : string) {
        let tok = authorizationValue.substring(7);
        let user : CurrentUser = {
            token: tok,
            email: this.jwtHelper.decodeToken(tok).sub
        };
        this.storage.setCurrentUser(user);
        this.setLoggedUser(true);
    }

    logout() {
        this.storage.setCurrentUser(null);
        this.setLoggedUser(false);
    }

    setLoggedUser(isLogged: boolean): void {
        this.loggedIn.next(isLogged);
      }
    
      getLoggedUser(): Observable<boolean> {
        return this.loggedIn.asObservable();
      }
}