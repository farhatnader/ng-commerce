import { ShoppingCartItem } from './shopping-cart-item';

// class instead of interface so that it can include logic
export class ShoppingCart {
    // have both an items object and items array
    items: ShoppingCartItem[] = [];

    // class is initiated with and items object with key: product Id, val: cart Item
    // push product objects into items array
    constructor(public itemsMap: { [productId: string]: ShoppingCartItem }) {
        for (let productId in itemsMap) {
            this.items.push(itemsMap[productId]);
        }
    }

    get totalItemsCount() {
        let count = 0;
        for (let productId in this.itemsMap) {
            count += this.itemsMap[productId].quantity;
        }
        return count;
    }
}