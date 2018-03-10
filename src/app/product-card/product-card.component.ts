import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../models/product';
import { ShoppingCartService } from '../shopping-cart.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {
  @Input('product') product: Product;
  @Input('show-actions') showActions: boolean = true;
  @Input('shopping-cart') shoppingCart;

  constructor(private cartService: ShoppingCartService) { }

  // add item to cart without needing auth
  // by utilizing browser's local storage + db
  addToCart(product: Product) {
    this.cartService.addToCart(product);
  }

  getQuantity() {
    if (!this.shoppingCart) return 0;

    let item = this.shoppingCart.items[this.product.$key];
    return item ? item.quantity : 0;
  }

}
