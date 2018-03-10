import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Product } from './models/product';
import { ShoppingCart } from './models/shopping-cart';

@Injectable()
export class ShoppingCartService {

  constructor(private db: AngularFireDatabase) { }

  // add new cart with datetime in db
  // return promise
  private create() {
    return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime()
    });
  }

  private getItem(cartId: string, productId: string) {
    return this.db.object('/shopping-carts/' + cartId + '/items/' + productId);
  }

  // check if browser's local storage has a cart id
  // if not, create an anon cart instance in db, and store id
  // use async/await to use thenable referance cleanly
  // async returns a promise
  private async getCartId() : Promise<string> {
    let cartId = localStorage.getItem('cartId');
    if (cartId) return cartId;
      
    // await causes promise to resolve before moving on to next lines
    let result = await this.create();
    localStorage.setItem('cartId', result.key);
    return result.key;
  }

  // get promise of observable of cart instance from db
  // use map to make sure the type is of custom ShoppingCart class
  // @return promise of observable of ShoppingCart instance
  async getCart(): Promise<Observable<ShoppingCart>> {
    let cartId = await this.getCartId();
    return this.db.object('/shopping-carts/' + cartId)
      .map(x => new ShoppingCart(x.items));
  }

  async updateCart(product: Product, changeVal: number) {
    let cartId = await this.getCartId();
    let item$ = this.getItem(cartId, product.$key);
    item$.take(1).subscribe(item => {
      if (item.$exists()) item$.update({ quantity: item.quantity + changeVal });
      else item$.set({ product: product, quantity: 1 });
    })
  }

  // fetch cartId from storage or new creation
  // if product in corresponding cart instance in db, increment quantity
  // else create product and set quantity
  // keep entire product object in cart for use in cart page
  async addToCart(product: Product) {
    this.updateCart(product, 1);
  }

  async removeFromCart(product: Product) {
    this.updateCart(product, -1);
  }

}
