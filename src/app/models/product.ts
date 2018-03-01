// interface for product object returned from firebase
// to be used for typing for an array of products
export interface Product {
    title: string;
    price: number;
    category: string;
    imageUrl: string;
}