import { Component, Input, OnInit} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthenticationService } from 'src/app/core/auth/authentication.service';
import { Client } from 'src/app/core/models/client.model';
import { ClientService } from 'src/app/core/services/client.service';
import { StorageService } from 'src/app/core/services/storage.service';
import { environment } from 'src/environments/environment';
import { LoginComponent } from '../../login/login/login.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  email: string;
  @Input() isLogged_in: boolean;
  @Input() client: Client;
  constructor(
    public dialog: MatDialog,
    private storageService: StorageService,
    public clientService: ClientService,
    public authenticationService: AuthenticationService
  ) { 
  }

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

  openLoginDialog() {
    const dialogRef = this.dialog.open(LoginComponent, {
    });
    dialogRef.afterClosed().subscribe(value => {
      this.authenticationService.getLoggedUser().subscribe(logged => {
        this.isLogged_in = logged;
        this.getCurrentUser();
      })
    })
  }
}
