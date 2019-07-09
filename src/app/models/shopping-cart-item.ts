import { Product } from './product';

export interface ShoppingCartItem{
    product: Product;
    quantity: number;
    //added for the check-out part
    /*$key: string;
    title: string;
    imageUrl: string;
    price: number;
    totalPrice: number;*/
}