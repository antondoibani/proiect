import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/order.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import {OrderDetailsComponent} from '../../order-details/order-details.component';

@Component({
  selector: 'admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css']
})
export class AdminOrdersComponent implements OnInit {
  orders$;
  order;
  modalRef: BsModalRef;

  constructor(private orderService: OrderService, private modalService: BsModalService) {
    this.orders$ = orderService.getOrders().valueChanges();
   }

   openOrderDetailsModal(order){
    this.modalService['data'] = order;
    this.modalRef = this.modalService.show(OrderDetailsComponent);
  } 

  ngOnInit() {
  }


  //switchMap - switch to new observable
  //pipe - takes data as input and transforms in desired output 
  //(you can combine multiple functions in a simple function)
  //map - it takes the projection function and applies it to each value that comes from the source observable
  //paramMap - used to activate the route, it will return an observale and give data if subscribed
  //snapShot - used to activate the route, it will return an observale and give data if subscribed
  //onChanges - change detection -> returneaza un observable

}
