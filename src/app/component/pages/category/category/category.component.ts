import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/core/models/category.model';
import { CategoryService } from 'src/app/core/services/category.service';
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

  constructor(
    public categoryService: CategoryService,    
  ) {
    this.appendItems();
  }

  ngOnInit(): void {
    this.findAllCategories();
 
   }

  onScrollDown(ev: any) {
    console.log("scrolled down!!", ev);

    this.sum += 20;
    this.appendItems();
    
    this.direction = "scroll down";
  }

  onScrollUp(ev: any) {
    console.log("scrolled up!", ev);
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
