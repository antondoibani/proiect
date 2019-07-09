import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/category.service';
import { ProductService } from 'src/app/product.service';
import { Router, ActivatedRoute } from '@angular/router';
//with this take operator we can take only 1  item (value) from the observable and after that observable will be complete (thus, we do not have to unsubscribe)
import { take } from 'rxjs/operators'



@Component({
  selector: 'app-product-formular',
  templateUrl: './product-formular.component.html',
  styleUrls: ['./product-formular.component.css']
})
export class ProductFormularComponent implements OnInit {
  categories$;
  //set the product to an empty object, in order not to get NPE while not having anything for the preview card
  product = {};
  id;

  constructor(categoryService: CategoryService, 
    private productService: ProductService, 
    private router: Router,
    // we need to inject the activatedRoite so we can read route parameters
    private route: ActivatedRoute    ) {
    this.categories$=categoryService.getCategories(), {
      //logyc to order by child 'name'  -  this can be found in the firebase database
      query: {
        orderByChild: 'name'
      }
    };
//logyc to get the id of the pushed productId when clicking on Edit on the product screen
    this.id=this.route.snapshot.paramMap.get('id');
    if (this.id) this.productService.getOneProduct(this.id).valueChanges().pipe(take(1)).subscribe(p => this.product = p);

   }
 
   //Save method - to push data to the firebase database (create() defined in product.service) and also an if for the update part (if id is not null)
   save(product){
     //if this.id is not null update, if this.id is null create
    if(this.id) this.productService.update(this.id, product);
    else this.productService.create(product);
  //redirect the user to the list of products
     this.router.navigate(['admin/products']);
   }

   //Method to delete - if not confirm return else delete
    delete(){
     if (!confirm('Are you sure you want to delete this product?'))  return;
      this.productService.delete(this.id);
      this.router.navigate(['admin/products']);
  
  }

  ngOnInit() {
  }

}
