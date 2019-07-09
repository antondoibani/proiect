import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from 'src/app/product.service';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/models/product';
//import { DataTableResource } from '../../vendor/angular-4-data-table/src';
import { DataTableResource } from 'angular7-data-table';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {
  products: Product[];
  subscription: Subscription;
  tableResource: DataTableResource<Product>;
  items: Product[] = [];
  itemCount: number;
  limits=[5,10,15,20,25];

  //getAll used to randor throw all product (productService),   product , subscribe to it, and further implement Destroy for this
  //1st we put all the elements in the filteredProducts array and afterwards we reset this array by the filter method
  constructor(private productService: ProductService) {
    this.subscription = this.productService.getAll().subscribe(products => {
      this.products = products;
      //initialize the resourse table in the construcor
      this.initializeTable(products);
    });
  }

  //initialize our table resource, all lines below
  private initializeTable(products: Product[]) {
    console.log(products);
    this.tableResource = new DataTableResource(products);
    //query method to get all the records from the current page based on the query parameteres, offset: 0 means display everything in page 1
  this.tableResource.query({ offset: 0 })
      .then(items => this.items = items);  
    //count() method return the total number of items (product)
    this.tableResource.count()
      //itemCount is the refference from the template [itemCount]="itemCount"
      .then(count => this.itemCount = count);
  }

 
  //implement reloadItems method from template
  reloadItems(params) {
    //if the table was not yet initialized then return
    if (!this.tableResource) return;
    this.tableResource.query(params)
      .then(items => this.items = items);
  }

 
  //implementing the filtering, we will do the filter on the client
  //Thus, filterProducts is equal with and if you have a query then we will iterate throw the array where the title = query and if query is empty (no search) we 
  // reset the filteredProdcut to this.products (all)
  filter(query: string) {
    let filteredProducts = (query) ?
      this.products.filter(p => p.title.toLowerCase().includes(query.toLowerCase())) :
      this.products;
      this.initializeTable(filteredProducts);

  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  ngOnInit() {
  }

}
