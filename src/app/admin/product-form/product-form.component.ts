import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../category.service';
import { ProductService } from '../../product.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  // will represent observable, so will use async pipe in template
  categories$;

  // categoryService is only used in constructor, so no need for private/public
  constructor(categoryService: CategoryService, private productService: ProductService) {
    this.categories$ = categoryService.getCategories();
  }

  save(product) {
    this.productService.create(product);
  }

  ngOnInit() {
  }

}
