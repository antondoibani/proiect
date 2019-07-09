import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from '../shopping-cart.service';
import { ShoppingCart } from '../models/shopping-cart';
import { Product } from '../models/product';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  shoppingCartItemCount=0;
  shoppingCartTotalQuantity;
  cartItems;


  constructor(private shoppingCartService: ShoppingCartService, private cartService: ShoppingCartService) { }

    //Logic to add to card throw shopping-cart.service
    addToCart(product: Product) {
      this.cartService.addToCart(product);
    }
  
    removeFromCart(product: Product){
      this.cartService.removeFromCart(product);
    }

    clearCart(){
      this.shoppingCartService.clearCart();
      location.reload();
    }

  async ngOnInit() {
    let cart$ = await this.shoppingCartService.getCart();
    console.log(cart$);
    cart$.valueChanges().subscribe(cart => {
      //below line was written in order to show all products/quantity from the shopping cart
      if (cart)
        this.cartItems = Object.keys(cart.items).map(itemKey => cart.items[itemKey]);
        if (this.cartItems){
          console.log(cart);
        this.shoppingCartItemCount = 0;
        this.shoppingCartTotalQuantity = 0;
        for (let productId in cart.items) {
          this.shoppingCartItemCount += cart.items[productId].quantity;
          this.shoppingCartTotalQuantity += cart.items[productId].product.price * cart.items[productId].quantity;
      }
      }
    });
  }


}
