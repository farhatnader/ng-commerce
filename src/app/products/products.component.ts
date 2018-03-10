import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from '../product.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../models/product';
import 'rxjs/add/operator/switchMap';
import { ShoppingCartService } from '../shopping-cart.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  products: Product[] = [];
  filteredProducts: Product[] = [];
  category: string;
  cart: any;

  constructor(
      private cartService: ShoppingCartService,
      private route: ActivatedRoute,
      private productService: ProductService) {

    // switchMap in order to allow sequential subscription
    // subscribe to getAll(), then subscribe to returned observable
    productService.getAll()
      .switchMap(products => {
        console.log(products);
        this.products = products;

        // using queryParamMap observable instead of snapshot
        // because component will not reinitialize by switching category
        return route.queryParamMap;
      })
      .subscribe(params => {
        this.category = params.get('category');
        this.filteredProducts = (this.category) ?
          this.products.filter(p => p.category === this.category) :
          this.products;
      });
  }

  // doing this in onInit instead of constructor to be able to use async/await
  async ngOnInit() {
    let cart$ = await this.cartService.getCart();
    this.subscription = cart$.subscribe(cart => this.cart = cart);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
