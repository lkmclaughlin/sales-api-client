import { Component } from '@angular/core';
import { OrderService } from '../order.service';
import { Order } from '../order.class';
import { isNgContainer } from '@angular/compiler';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent {
  pageTitle = "Order List";
  orders:Order[]=[];

  sortColumn: string= "id";
  sortAsc: any;

  constructor(
    private ordSvc:OrderService
  ) {}

  selectColumn(col: string): void {
    if(col === this.sortColumn) {
      this.sortAsc= !this.sortAsc;
      return;
    }
    this.sortAsc= true;
    this.sortColumn= col;
  }

  review(order: Order): void {
    if(order.total <= 75) {
      order.status= "APPROVED";
    } else {
      order.status= "REVIEW";
    }
    this.ordSvc.change(order).subscribe({
      next: (res)=> {
        console.debug("Order Reviewed");
        this.refresh();
      },
      error: (err)=> {
        console.error(err);
      }
    })
  }

  refresh():void {
    this.ordSvc.list().subscribe({
      next:(res)=> {
        console.debug("Orders:", res);
        this.orders= res;
        for(let o of this.orders) {
          o.customerName= o.customer !== null ? o.customer.name : "No Customer";
        }
      },
      error:(err)=> {
        console.error(err);
      }
    });
  }

  ngOnInit():void {
    this.refresh();
  }
}