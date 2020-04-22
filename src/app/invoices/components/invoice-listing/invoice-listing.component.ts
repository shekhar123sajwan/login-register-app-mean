import { ConfigService } from './../../../services/config.services';
import { Invoice } from './../../../models/invoice';
import { HttpService } from './../../../services/http.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-invoice-listing',
  templateUrl: './invoice-listing.component.html',
  styleUrls: ['./invoice-listing.component.css'],
})
export class InvoiceListingComponent implements OnInit {
  constructor(
    private httpService: HttpService,
    private configService: ConfigService
  ) {}
  displayedColumns: string[] = [
    'item',
    'quantity',
    'date',
    'due',
    'rate',
    'tax',
  ];
  dataSource: any = [];
  err: string = '';
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  ngOnInit(): void {
    this.getInvoices();
    // this.addInvoices();
    // this.deleteInvoices();
    // this.updateInvoices();
  }

  getInvoices() {
    // return new Promise((resolv))
    let params = {
      id: 1,
      name: 'Invoid',
    };

    this.configService.toggleLoading(true);
    try {
      this.httpService.getRequest('invoices', params).subscribe(
        (response) => {
          this.configService.toggleLoading(false);
          this.dataSource = new MatTableDataSource<Invoice[]>(
            response.body.data
          );
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;

          if (this.dataSource.data.length <= 0) {
            this.err = 'No found any record';
          }
        },
        (err) => {
          this.err = err;
          this.configService.toggleLoading(false);
        }
      );
    } catch (err) {
      console.log('ss' + err);
    }
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

  updateInvoices(): Promise<any> {
    return new Promise((resolve, reject) => {
      const getParams = {};
      const postParams = { item: 'Invoice updated15 by browser', rate: 3 };
      this.httpService
        .putRequest('invoices/5e9d527acafe001ea0ed5ead', getParams, postParams)
        .subscribe((response) => {
          console.log(response);
        });
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
