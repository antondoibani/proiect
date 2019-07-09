import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { OrderService } from '../order.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import {OrderDetailsComponent} from '../order-details/order-details.component';



@Component({
  selector: 'my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {
  orders$;
  modalRef: BsModalRef;
  try: string;

  constructor(private authService: AuthService, private orderService: OrderService, private modalService: BsModalService) {
    this.orders$ = authService.user$.switchMap(u => orderService.getOrderByUserId(u.uid));
  }

  openOrderDetailsModal(order){
    this.modalService['data'] = order;
    this.modalRef = this.modalService.show(OrderDetailsComponent);
  } 




  ngOnInit() {
  }
}
