import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { AppUser } from '../models/app-user';
import { ShoppingCartService } from '../shopping-cart.service';


@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit {
  appUser: AppUser;
  shoppingCartItemCount: number;
  showSpinner: boolean=true;

  constructor(private auth: AuthService, private shoppingCartService: ShoppingCartService) {
  }

  logout() {
    this.auth.logout();
  }

  //We put these in onInit since we need these 2 always initialized
  //Why we do not put them in the constructor - since we it has an await...
  //We do need need to desubscribe since it is build only once in DOM
  async ngOnInit() {
    this.auth.appUser$.subscribe(appUser => {this.appUser = appUser; this.showSpinner = false});
    let cart$ = await this.shoppingCartService.getCart();
    cart$.valueChanges().subscribe(cart => {
      if (cart) {
        this.shoppingCartItemCount = 0;
        for (let productId in cart.items)
          this.shoppingCartItemCount += cart.items[productId].quantity;
      }
    });
  }
}
