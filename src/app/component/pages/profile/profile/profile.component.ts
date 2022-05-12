import { Component, OnInit } from '@angular/core';
import { Client } from 'src/app/core/models/client.model';
import { ClientService } from 'src/app/core/services/client.service';
import { StorageService } from 'src/app/core/services/storage.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  email: string;
  client: Client;
  constructor(
    private storageService: StorageService,
    public clientService: ClientService
  ) { }

  ngOnInit(): void {
   this.getCurrentUser();
  }

  getCurrentUser() {
    let currentUser = this.storageService.getCurrentUser();
    if (currentUser && currentUser.email) {
      this.clientService.findByEmail(currentUser.email)
      .subscribe({
        next: response => {
            this.client = response;
            this.getImageIfExists();
        },
        error: error => {
        }
      })
    }
  }

  getImageIfExists() {
    this.clientService.getImageFromBucket(this.client.id)
    .subscribe({
      next: response => {
        this.client.imageUrl = `${environment.bucketBaseURL}/users/cp${this.client.id}.png`;
      }, error: error => {

      }
    })
  }
}
