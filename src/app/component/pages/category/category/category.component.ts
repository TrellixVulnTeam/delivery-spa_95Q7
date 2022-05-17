import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/core/auth/authentication.service';
import { Category } from 'src/app/core/models/category.model';
import { Client } from 'src/app/core/models/client.model';
import { CategoryService } from 'src/app/core/services/category.service';
import { ClientService } from 'src/app/core/services/client.service';
import { RotasApp } from 'src/app/shared/enum/rotas-app';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  bucketURL = environment.bucketBaseURL;
  categories: Category[] = [];
  listArray : string[] = [];
  sum = 20;
  direction = "";
  client: Client;
  isLogged_in: boolean;

  constructor(
    public categoryService: CategoryService,  
    public clientService: ClientService,
    public authenticationService: AuthenticationService 
  ) {
    this.appendItems();
  }

  ngOnInit(): void {
    this.findAllCategories();

   }

  onScrollDown(ev: any) {
    this.sum += 20;
    this.appendItems();
    this.direction = "scroll down";
  }

  onScrollUp(ev: any) {
    this.sum += 20;
    this.prependItems();

    this.direction = "scroll up";
  }

  appendItems() {
    this.addItems("push");
  }

  prependItems() {
    this.addItems("unshift");
  }

  addItems(_method: string) {
    for (let i = 0; i < this.sum; ++i) {
      if( _method === 'push'){
        this.listArray.push([i].join(""));
      }else if( _method === 'unshift'){
        this.listArray.unshift([i].join(""));
      }
    }
  }

  findAllCategories() {
    this.categoryService.findAll()
    .subscribe({
      next: data => {
        this.categories = data;
      },
      error: error => {
      }
    })
  }
}
