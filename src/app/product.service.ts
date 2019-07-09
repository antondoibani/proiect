import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from './models/product';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private db: AngularFireDatabase) { }

  //Create method used to push data to the databse (see admin/product-formular the save method), it also returns the same if needed to use it
 create(product){
   return this.db.list('/products').push(product);
 }


/*
 getAll(): Observable<Product[]> {
   return this.db.list('/products').snapshotChanges();
 }
*/
 getAll(): Observable<Product[]> {
  return this.db.list<Product>('/products')
      .snapshotChanges()
      .pipe(
          map(changes =>
              changes.map(c => {
                  const data = c.payload.val() as Product;
                  const id = c.payload.key;
                  return { id, ...data };
              })
          )
      );
}

 getOneProduct(productId){
   return this.db.object('/products/'+productId);
 }



 
 //Get the searched product within the main screen (Search)
 getSearchedProduct(start, end): AngularFireList<any>{
    return this.db.list('/products', ref =>
        ref.orderByChild('title').limitToFirst(10).startAt(start).endAt(end));
 }    


 
 
 //Method to uodate a product (return in case in which we sould need this object to do smth further)
 update(productId, product){
   return this.db.object('/products/'+ productId).update(product);
 }

 //use to remove a product having an id
 delete(productId){
   return this.db.object('/products/'+ productId).remove();
 }

}
