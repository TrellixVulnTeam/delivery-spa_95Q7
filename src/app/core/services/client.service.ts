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
    client: Client;
    isLogged_in: boolean = false;

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

    getCurrentUser(): Client {
        let currentUser = this.storageService.getCurrentUser();
        if (currentUser && currentUser.email) {
          this.findByEmail(currentUser.email)
          .subscribe({
            next: response => {
                this.client = response;
                this.isLogged_in = true;
                this.getImageIfExists();
            },
            error: error => {
            }
          })
        }
        return this.client; 
      }
    
      getImageIfExists() {
        this.getImageFromBucket(this.client.id)
        .subscribe({
          next: response => {
            this.client.imageUrl = `${environment.bucketBaseURL}/users/cp${this.client.id}.png`;
          }, error: error => {
          }
        })
      }
}