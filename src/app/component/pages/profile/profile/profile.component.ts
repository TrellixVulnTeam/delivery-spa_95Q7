import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { BaseComponent } from 'src/app/component/base.component';
import { Client } from 'src/app/core/models/client.model';
import { ClientService } from 'src/app/core/services/client.service';
import { StorageService } from 'src/app/core/services/storage.service';
import { RotasApp } from 'src/app/shared/enum/rotas-app';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent extends BaseComponent implements OnInit {

  email: string;
  client: Client;
  constructor(
    private storageService: StorageService,
    public clientService: ClientService,
    private router: Router,
    public override snackBar: MatSnackBar
  ) { 
    super();
  }

  override ngOnInit(): void {
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
          switch (error.status) {
            case 403:
              this.openSnackBar("Acesso não autorizado.", "Fechar", 5, 'center', 'top');
              this.storageService.setCurrentUser(null);
              this.router.navigate([RotasApp.HOME]);
              break;

              default:
                this.openSnackBar("Erro: " + error.status, "Fechar", 5, 'center', 'top');
          }
        }
      })
    } else {
      this.router.navigate([RotasApp.HOME]);
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
