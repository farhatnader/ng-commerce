import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../category.service';
import { ProductService } from '../../product.service';
import { ActivatedRoute, Router } from '@angular/router';
import 'rxjs/add/operator/take';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  // will represent observable, so will use async pipe in template
  categories$;
  product = {};
  id;

  // categoryService is only used in constructor, so no need for private/public
  constructor(
      private router: Router,
      private route: ActivatedRoute,
      private categoryService: CategoryService, 
      private productService: ProductService) {

    this.categories$ = categoryService.getAll();

    // paramMap instead of queryParamMap b/c no manual queryParams passed in
    this.id = this.route.snapshot.paramMap.get('id');
    // use rxjs take() to auto unsubscribe after getting specified num of items
    if (this.id) this.productService.get(this.id).take(1).subscribe(p => this.product = p);
  }

  save(product) {
    // if id, then this is edit of existing product
    if (this.id) this.productService.update(this.id, product);
    else this.productService.create(product);

    this.router.navigate(['/admin/products']);
  }

  delete() {
    if (!confirm('Delete this product?')) return;
    
    this.productService.delete(this.id);
    this.router.navigate(['/admin/products']);
  }

  ngOnInit() {
  }

}
