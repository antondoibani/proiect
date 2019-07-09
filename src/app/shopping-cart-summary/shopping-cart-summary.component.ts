import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { ShoppingCart } from '../models/shopping-cart';

@Component({
  selector: 'shopping-cart-summary',
  templateUrl: './shopping-cart-summary.component.html',
  styleUrls: ['./shopping-cart-summary.component.css']
})
export class ShoppingCartSummaryComponent implements OnInit {
  //Input, in order to briong data from the shopping-cart component
 // @Input('cart') cart: ShoppingCart;
  cartItems=[];
  totalPrice: number;
  itemCount: number;
  

  @Input()
  set cart(cart: ShoppingCart){
    if(cart){
    console.log(cart);
    this.cartItems = Object.keys(cart.items).map(itemKey => cart.items[itemKey]);
    this.totalPrice=0;
    this.itemCount=0;
    for (let productId in cart.items) {
      this.totalPrice += cart.items[productId].product.price * cart.items[productId].quantity;
      if(cart.items[productId].quantity>0)
      this.itemCount++;
    }
  }
}


  constructor() { 
  }

  ngOnInit() {
  }

  ngOnChanges() {
  }
}
