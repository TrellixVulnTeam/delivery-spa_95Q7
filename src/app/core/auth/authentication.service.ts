import { HttpClient, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Login } from "../models/login.model";

@Injectable({
    providedIn: 'root'
  })
export class AuthenticationService {

    private baseUrl: string;

    constructor(private http: HttpClient) {
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
}