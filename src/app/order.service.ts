import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { ShoppingCartService } from './shopping-cart.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(
    private db: AngularFireDatabase,
    private shoppingCartService: ShoppingCartService) { }

  //method to store the order on the database (we also return it back if we want to use it),
  //and also this method will clear the shoppingCart (see await on the store and after the clear...)
  async putOrder(order) {
    let result = await this.db.list('/orders').push(order);
    this.shoppingCartService.clearCart();
    return result;
  }

  getOrders() {
    return this.db.list('/orders');
  }

  getOrderByUserId(userId: string) {
    return this.db.list('/orders', ref => ref.orderByChild('userId').equalTo(userId)).valueChanges();
}
}
