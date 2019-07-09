import { Injectable } from '@angular/core';
import { AngularFireDatabase, snapshotChanges, AngularFireObject } from 'angularfire2/database';
import { Product } from './models/product';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import 'rxjs/add/operator/map';
import { ShoppingCart } from './models/shopping-cart';



@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  data;


  constructor(private db: AngularFireDatabase) { }

  //create the cart CartId method
  private create() {
    return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime()
    });
  }


  //get the card from the database
  async getCart(): Promise<AngularFireObject<ShoppingCart>> {
    let cartId = await this.getOrCreateCartId();
    return this.db.object('/shopping-carts/' + cartId);
  }


  //calculate the firebase path to get the item ( used in Add to Cart method)
  private getItem(cartId: string, productId: string) {
    return this.db.object('/shopping-carts/' + cartId + '/items/' + productId);

  }



  private getOrCreateCartId() {
    //1st we need to take the card Id from the browser local storage, if no than
    //create it and after store the key in the localStorage, finally return it
    let cartId = localStorage.getItem('cartId');
    if (!cartId) {
      //we use then since we need to wait for create()
      this.create().then(result => {
        localStorage.setItem('cartId', result.key);
        return result.key;
      });
    }
    //if it exist then just take it from the firebase having the id from the local storage
    else {
      return cartId;
    }
  }

  //add to shopping-cart service
  //Note: async/await implements the same as "then"  -  wait until cartId is got and after do the others
  //so, if card was already created check if a product id was added - if yes then increase the qty if not set it with quantity=1,  thus always quantity or 0 (+1)...
  async addToCart(product) {
    this.updateItemCartQuantity(product, 1);
    console.log('adding of the ' + product.id + 'to the cart');
  }

  async removeFromCart(product) {
    this.updateItemCartQuantity(product, -1);
    console.log('removing of the ' + product.id + ' to the cart');
  }

  async clearCart(){
  let cartId = await this.getOrCreateCartId();
  this.db.object('/shopping-carts/' + cartId + '/items').remove();
  }


  //remove from the cart (see above - these are very simillar)
  private async updateItemCartQuantity(product: Product, variation: number) {
    console.log(product.id);
    let cartId = await this.getOrCreateCartId();
    let item$: Observable<any> = this.getItem(cartId, product.id).valueChanges();
    let item$$ = this.getItem(cartId, product.id);
    item$.pipe(take(1)).subscribe(item => {
      if (item === null) item$$.set({ product: product, quantity: 1 });
      else
        item$$.update({ product: product, quantity: (item.quantity || 0) + variation });
      console.log('updating existing product ');
    });

  }

}



