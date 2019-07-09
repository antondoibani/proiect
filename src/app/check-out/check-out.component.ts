import { Component, OnInit, OnDestroy } from '@angular/core';
import { ShoppingCartService } from '../shopping-cart.service';
import { ShoppingCart } from '../models/shopping-cart';
import { Subscription } from 'rxjs';
import { Product } from '../models/product';
import { OrderService } from '../order.service';
import { map } from 'rxjs/operators';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { routerNgProbeToken } from '@angular/router/src/router_module';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit {
  shipping = {};
  cart: ShoppingCart;
  cartsubscription: Subscription;
  userSubscription: Subscription;
  cartItems;
  cartItemsSummary;
  userId: string;

  constructor(
    private shoppingCartService: ShoppingCartService,
    private orderService: OrderService,
    private authService: AuthService,
    private router: Router) { }


  async placeOrder() {
    this.cartItems = Object.keys(this.cart.items).map(itemKey => this.cart.items[itemKey]);
     let order = {
      userId: this.userId,
      datePlaced: new Date().getTime(),
      shipping: this.shipping,
      //get the shopping cart items and map them to an new array
      items: this.cartItems.map(i => {
        return {
          product: {
            title: i.product.title,
            imageUrl: i.product.imageUrl,
            price: i.product.price,
          },
          quantity: i.quantity,
          totalPrice: i.quantity * i.product.price,
        }
      })
    };
    //await, since we want this to be finished and only after the router.navigate
    let orderResult = await this.orderService.putOrder(order);
        //in order to redirect the user to the Order-success page...  new generated key in thid key parameter
    await this.router.navigate(['/order-success', orderResult.key]);
    location.reload();
  }


  async ngOnInit() {
    let cart$ = await this.shoppingCartService.getCart();
    this.cartsubscription = cart$.valueChanges().subscribe(cart1 => {this.cart = cart1;})
    //get the userId in order to show which user palced the order   (uid - is the unique identifier which Firebase gives)
    this.userSubscription = this.authService.user$.subscribe(user => this.userId=user.uid);  
  }


  ngOnDestroy() {
    this.cartsubscription.unsubscribe();
    this.userSubscription.unsubscribe();
  }

}
