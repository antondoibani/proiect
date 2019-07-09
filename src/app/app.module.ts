import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabase, AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
//Import customForms used for custom validations from ng2-validation
import { CustomFormsModule } from 'ng2-validation';
//Import databa table model which gives us pagining, sorting, ...
//import { DataTableModule } from './vendor/angular-4-data-table/src';
import { DataTableModule } from 'angular7-data-table';




import { AppComponent } from './app.component';
import { environment } from 'src/environments/environment';
import { BsNavbarComponent } from './bs-navbar/bs-navbar.component';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { OrderSuccessComponent } from './order-success/order-success.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { LoginComponent } from './login/login.component';
import { AuthService } from './auth.service';
import { AuthGuard as AuthProtector } from './auth-protector.service';
import { UserService } from './user.service';
import { AdminAuthProtectorService as AdminAuthProtector } from './admin-auth-protector.service';
import { ProductFormularComponent } from './admin/product-formular/product-formular.component';
import { CategoryService } from './category.service';
import { ProductService } from './product.service';
import { ShoppingCartService } from './shopping-cart.service';
import { OrderService } from './order.service';
import { ShoppingCartSummaryComponent } from './shopping-cart-summary/shopping-cart-summary.component';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
//OrderDetails component
import { OrderDetailsComponent } from './order-details/order-details.component';
//needed for the ngx-bootstrap modals (show order details)
import { ModalModule,BsModalRef } from 'ngx-bootstrap/modal';
//in order to be able to filter things
import { FilterPipeModule } from 'ngx-filter-pipe';






@NgModule({
  declarations: [
    AppComponent,
    BsNavbarComponent,
    HomeComponent,
    ProductsComponent,
    ShoppingCartComponent,
    CheckOutComponent,
    OrderSuccessComponent,
    MyOrdersComponent,
    AdminProductsComponent,
    AdminOrdersComponent,
    LoginComponent,
    ProductFormularComponent,
    ShoppingCartSummaryComponent,
    LoadingSpinnerComponent,
    OrderDetailsComponent,
  ],
  imports: [
    BrowserModule,
    //needed for pushing data from the form to the database via a json object
    FormsModule,
    //needed for custom validation from ng2-vlidation
    CustomFormsModule,
    DataTableModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    FilterPipeModule,
    NgbModule.forRoot(),
    //needed for the ngx-bootstrap modals
    ModalModule.forRoot(),
    RouterModule.forRoot([
      //routes for anonymous users
      { path: '', component: ProductsComponent },
      { path: 'products', component: ProductsComponent },
      { path: 'shopping-cart', component: ShoppingCartComponent },
      { path: 'login', component: LoginComponent },
      //routes for loged users (protected by service AuthGuard)
      { path: 'check-out', component: CheckOutComponent, canActivate: [AuthProtector] },
      { path: 'order-success/:id', component: OrderSuccessComponent, canActivate: [AuthProtector] },
      { path: 'my-orders', component: MyOrdersComponent, canActivate: [AuthProtector] },
      //routes for admin users (protected by service AuthGuard)
      { path: 'admin/products/new', component: ProductFormularComponent, canActivate: [AuthProtector, AdminAuthProtector] },
      //router for the editing a product
      { path: 'admin/products/:id', component: ProductFormularComponent, canActivate: [AuthProtector, AdminAuthProtector] },
      { path: 'admin/products', component: AdminProductsComponent, canActivate: [AuthProtector, AdminAuthProtector] },
      { path: 'admin/orders', component: AdminOrdersComponent, canActivate: [AuthProtector, AdminAuthProtector] }

    ]),
  ],
  //All registered services
  providers: [
    AuthService,
    AuthProtector,
    UserService,
    AdminAuthProtector,
    CategoryService,
    ProductService,
    ShoppingCartService,
    OrderService,
    OrderDetailsComponent,
    BsModalRef
  ],
  bootstrap: [AppComponent],
  entryComponents : [ OrderDetailsComponent ]
})
export class AppModule { }
