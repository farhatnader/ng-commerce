import { Product } from './product';

export class ShoppingCartItem {
    // receive product obj and quantity from shopping cart class
    constructor(public product: Product, public quantity: number) { }

    get totalPrice() {
        return this.product.price * this.quantity;
    }
}