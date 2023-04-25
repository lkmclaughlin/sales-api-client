import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from './customer-class';

@Injectable({
  providedIn: 'root'
})

export class CustomerService {

    baseurl: string="http://localhost:4242/api/customers";

    constructor(
        private http: HttpClient
    ) { }
    
    get(id: number): Observable<Customer> {
        return this.http.get(`${this.baseurl}/${id}`) as Observable<Customer>;
    }
    
    list(): Observable<Customer[]> {
        return this.http.get(`${this.baseurl}`) as Observable<Customer[]>;
    }   
}