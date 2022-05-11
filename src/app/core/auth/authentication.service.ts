import { HttpClient, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { CurrentUser } from "../models/currentUser";
import { Login } from "../models/login.model";
import { StorageService } from "../services/storage.service";

@Injectable({
    providedIn: 'root'
  })
export class AuthenticationService {

    private baseUrl: string;

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

    successfulLogin(authorizationValue : string) {
        let tok = authorizationValue.substring(7);
        let user : CurrentUser = {
            token: tok
        };
        this.storage.setCurrentUser(user);
    }

    logout() {
        this.storage.setCurrentUser(null);
    }
}