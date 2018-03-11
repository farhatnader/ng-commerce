import { ShoppingCartItem } from './shopping-cart-item';

// class instead of interface so that it can include logic
export class ShoppingCart {
    // have both an items object and items array
    items: ShoppingCartItem[] = [];

    // class is initiated with and items object with key: product Id, val: cart Item
    // push instances of ShoppingCartItem into items array
    constructor(public itemsMap: { [productId: string]: ShoppingCartItem }) {
        for (let productId in itemsMap) {
            let item = itemsMap[productId];
            this.items.push(new ShoppingCartItem(item.product, item.quantity));
        }
    }

    get totalPrice() {
        let sum = 0;
        for (let item of this.items) {
            sum += item.totalPrice;
        }
        return sum;
    }

    get totalItemsCount() {
        let count = 0;
        for (let productId in this.itemsMap) {
            count += this.itemsMap[productId].quantity;
        }
        return count;
    }
}