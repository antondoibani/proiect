import { Component, OnInit, Input } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs';

@Component({
  selector: 'order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {
orders;
totalPrices: number;


  constructor(public modalRef: BsModalRef, private modalService: BsModalService) {
    this.orders=modalService['data'];
    console.log(this.orders);
    this.totalPrices=0;
    for (let productId in this.orders.items) {
     this.totalPrices += this.orders.items[productId].totalPrice;
    }
  }
  
  
  ngOnInit() {
  }

}
