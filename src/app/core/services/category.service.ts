import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Category } from "../models/category.model";


@Injectable({
    providedIn: 'root'
  })

export class CategoryService {

    private baseUrl: string;

    constructor(public http: HttpClient) {
        this.baseUrl = environment.apiUrl.concat('categories')
    }

    findAll(): Observable<Category> {
        return this.http.get<Category>(this.baseUrl);
    }

}