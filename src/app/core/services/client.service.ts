import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Client } from "../models/client.model";
import { StorageService } from "./storage.service";

@Injectable({
    providedIn: 'root'
  })
export class ClientService {

    private baseUrl: string;

    constructor(
        public http: HttpClient, 
        public storageService: StorageService
    ) {
        this.baseUrl = environment.apiBaseURL.concat('clients')
    }


    findByEmail(email: string) : Observable<Client> {

        let token = this.storageService.getCurrentUser().token;
        let authHeader = new HttpHeaders({'Authorization': 'Bearer ' + token});

        return this.http.get<Client>(
            `${this.baseUrl}/email?value=${email}`,
            {
                'headers': authHeader
            });
    }

    getImageFromBucket(id : string) : Observable<any> {
        let url = `${environment.bucketBaseURL}/users/cp${id}.png`
        return this.http.get(url, {responseType : 'blob'});
    }
}