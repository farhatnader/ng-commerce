import { ShoppingCartItem } from './shopping-cart-item';

// class instead of interface so that it can include logic
export class ShoppingCart {
    constructor(public items: ShoppingCartItem) { }

    get totalItemsCount() {
        let count = 0;
        for (let productId in this.items) {
            count += this.items[productId].quantity;
        }
        return count;
    }
}