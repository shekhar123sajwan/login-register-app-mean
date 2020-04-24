import { ConfigService } from './../../../services/config.services';
import { Invoice } from './../../../models/invoice';
import { HttpService } from './../../../services/http.service';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { merge, Observable, of as observableOf } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-invoice-listing',
  templateUrl: './invoice-listing.component.html',
  styleUrls: ['./invoice-listing.component.css'],
})
export class InvoiceListingComponent implements OnInit, AfterViewInit {
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
  resultsLength: number = 11;
  itemPerPage: number = 2;
  dataSource: any = [];
  err: string = '';
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  ngOnInit(): void {
    //this.getInvoices();
    // this.addInvoices();
    // this.deleteInvoices();
    // this.updateInvoices();
  }

  ngAfterViewInit(): void {
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          const params = {
            sort: this.sort.active,
            order: this.sort.direction,
            limit: this.itemPerPage,
            filter:
              typeof this.dataSource.filter == 'function'
                ? 'undefined'
                : this.dataSource.filter,
            pages: this.paginator.pageIndex,
          };
          console.log(this.dataSource.filter ? 'd' : 's');
          return this.httpService.getRequest('invoices', params);
        }),
        map((response) => {
          return response.body.data;
        }),
        catchError(() => {
          return observableOf([]);
        })
      )
      .subscribe((response) => {
        this.dataSource = new MatTableDataSource(response);
        //console.log(this.dataSource);
        return this.dataSource.data;
      });
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

          console.log(this.dataSource);

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
      console.log('err' + err);
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
