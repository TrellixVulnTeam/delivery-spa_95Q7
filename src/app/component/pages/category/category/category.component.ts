import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/core/services/category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  constructor(
    public categoryService: CategoryService
  ) { }

  ngOnInit(): void {
    this.categoryService.findAll()
    .subscribe({
      next: data => {
        console.log(data)
      },
      error: error => {
        console.log("deu erro", error)
      }
    })
  }
}
