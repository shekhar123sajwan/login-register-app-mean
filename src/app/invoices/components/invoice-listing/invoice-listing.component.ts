import { HttpService } from './../../../services/http.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-invoice-listing',
  templateUrl: './invoice-listing.component.html',
  styleUrls: ['./invoice-listing.component.css'],
})
export class InvoiceListingComponent implements OnInit {
  constructor(private httpService: HttpService) {}

  ngOnInit(): void {
    this.getInvoices();

    this.addInvoices();
    this.deleteInvoices();
  }

  getInvoices() {
    let params = {
      id: 1,
      name: 'Invoid',
    };
    this.httpService.getRequest('invoices', params).subscribe(
      (data) => {
        console.log(data);
      },
      (error) => {
        console.log('Err' + error);
      }
    );
  }

  addInvoices(): Promise<any> {
    return new Promise((resolve, reject) => {
      const getParams = { id: 3 };
      const postParams = {
        item: 'Invoice 15',
        quantity: '1',
        date: '12-07-2321',
        due: '12-07-2321',
        rate: 3,
        tax: 3,
      };
      this.httpService.postRequest('invoices', getParams, postParams).subscribe(
        (response) => {
          console.log(response);
          return response;
        },
        (err) => console.log(err)
      );
      reject('no');
    });
  }

  deleteInvoices(): Promise<any> {
    return new Promise((resolve, reject) => {
      let getParams = {};
      this.httpService
        .deleteRequest('invoices', getParams)
        .subscribe((response) => {
          console.log(response);
        });
    });
  }
}
