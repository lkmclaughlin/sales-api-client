import { Component } from '@angular/core';
import { Order } from '../order.class';
import { OrderService } from '../order.service';
import { Customer } from 'src/app/customer/customer-class';
import { CustomerService } from 'src/app/customer/customer.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-create',
  templateUrl: './order-create.component.html',
  styleUrls: ['./order-create.component.css']
})

export class OrderCreateComponent {

  order: Order= new Order();
  customers!: Customer[];
  pageTitle= "Create Order"

  constructor(
    private ordSvc: OrderService,
    private custSvc: CustomerService,
    private router: Router
  ) {}

  save(): void {
    this.ordSvc.create(this.order).subscribe({
      next: (res)=> {
        console.debug("Order added!");
        this.router.navigateByUrl("/order/list");
      },
      error: (err)=> {
        console.error(err);
      }
    })
  }

  ngOnInit(): void {
    this.custSvc.list().subscribe({
      next: (res) => {
        console.debug("Customers:", res);
        this.customers = res;
      },
      error: (err) => {
        console.error(err);
      }
    });
  }
}
