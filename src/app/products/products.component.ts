import { Component, OnInit, Input, OnDestroy, OnChanges } from '@angular/core';
import { ProductService } from '../product.service';
import { CategoryService } from '../category.service';
import { Observable, Subscription, Subject, BehaviorSubject } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../models/product';
import { ShoppingCartService } from '../shopping-cart.service';
import { isNgTemplate } from '@angular/compiler';
import { ShoppingCartComponent } from '../shopping-cart/shopping-cart.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {
  //we will add the needed input property in order to calculate the shopping cart items quantity
  @Input('product') product: Product;
  @Input('shopping-cart') shoppingCart;
  //to eitehr display or not the prodcut footer
  @Input('show-actions') showActions = true;

  //we need a product observable
  products: Product[] = [];
  filteredProducts: Product[] = [];
  categories$;
  category: string;
  cart: any;
  subscription: Subscription;
  searchedProducts;


  //ActivatedRoute service is used to read route parameters (query string params)
  constructor(private productService: ProductService, categoryService: CategoryService,
    router: ActivatedRoute, private cartService: ShoppingCartService) {
    //for randoring products, since we want also to filter these (products based on categ) we cannot use observable ut we need to use an array
    productService.getAll().subscribe(products => {
      this.products = products;

      //for randoring categories
      router.queryParamMap.subscribe(params => {
        this.category = params.get('category');
        //removes the whitespace (need to compare the name of category from category with its code from product)
        this.filteredProducts = (this.category) ?
          this.products.filter(p => p.category.toLowerCase() === this.category.replace(/ /g, "").toLowerCase()) :
          this.products;


        //console.log(this.filteredProducts);

      });
    });

    this.categories$ = categoryService.getCategories();
  }



  //Logic to add to card throw shopping-cart.service
  addToCart(product: Product) {
    this.cartService.addToCart(product);
  }

  removeFromCart(product: Product) {
    this.cartService.removeFromCart(product);
  }

  //Get the quantity of a corespondg product id from the shopping cart
  getQuantity(product: Product) {
    if ((!this.cart) || (!this.cart.items)) return 0;
    let item = this.cart.items[product.id];
    return item ? item.quantity : 0;
  }


  ///Used to return the searched product
  /*needed parameters:
  *1st (lastKeypress) - we would like to need to wait some time till returning of a result (miliseconds)
  *
  *
  */
  lastKeypress: number = 0
  filteredProduct: Product;
  startAt: string="s";
  endAt: string="s";


  search($event) {
    if ($event.timeStamp - this.lastKeypress > 2000) {
      let q = $event.target.value;
      console.log(q);
      this.startAt=(q);
      this.endAt=(q + "\uf8ff");
      console.log(this.startAt, this.endAt);
    }
    this.lastKeypress = $event.timeStamp;
    console.log(this.searchedProducts);
  }


  //we need to initialize the cart (we needed to do it in the constructor, but it is a promise and we cannot make the 
  // construcotr async, thus, we can use the ngOnInit
  async ngOnInit() {
    this.subscription = (await this.cartService.getCart()).valueChanges().subscribe(cart => this.cart = cart);


    //needed to return the filtered products
    this.productService.getSearchedProduct(this.startAt, this.endAt)
      .valueChanges().subscribe(products1 => {
        this.searchedProducts = products1;
      });  
  }

  //since we need to unsubscribe from the above we implement OnDestroy interface (here we need also the type subscription; Subscription)
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
