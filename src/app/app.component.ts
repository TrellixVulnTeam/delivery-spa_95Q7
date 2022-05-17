import { Component, OnInit, Output } from '@angular/core';
import { Client } from './core/models/client.model';
import { CurrentUser } from './core/models/currentUser';
import { ClientService } from './core/services/client.service';
import { StorageService } from './core/services/storage.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent implements OnInit{
  title = 'delivery-spa';

  currentUser: CurrentUser;
  @Output() client: Client;
  @Output() isLogged_in: boolean;

  constructor(
    public storageService: StorageService,
    public clientService: ClientService,
  ) {}
  
  ngOnInit(): void {
    this.currentUser = this.storageService.getCurrentUser();
    this.clientService.findByEmail(this.currentUser.email).subscribe(client => {
      this.client = client;
      this.isLogged_in = true;
    });

   
  }
}

