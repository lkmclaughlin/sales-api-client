import { Component } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { Router } from '@angular/router';
import { SystemService } from 'src/app/system/system.service';

@Component({
  selector: 'app-employee-login',
  templateUrl: './employee-login.component.html',
  styleUrls: ['./employee-login.component.css']
})
export class EmployeeLoginComponent {

  pageTitle= "Employee Login";
  email: string= "";
  password: string= "";
  message: string= "";

  constructor(
    private sys: SystemService,
    private emplSvc: EmployeeService,
    private router: Router
  ) {}

  login(): void {
    this.emplSvc.login(this.email, this.password).subscribe({
      next: (res)=> {
        console.debug("Welcome Employee");
        this.sys.loggedInEmployee= res;
        this.router.navigateByUrl("/employee/list");
      },
      error: (err)=> {
        console.error(err);
      }
    })
  }

  ngOnInit(): void {
    this.sys.loggedInEmployee= null;
  }
}
