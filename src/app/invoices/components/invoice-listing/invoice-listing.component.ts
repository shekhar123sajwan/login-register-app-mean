import { ConfigService } from './../../../services/config.services';
import { Invoice } from './../../../models/invoice';
import { HttpService } from './../../../services/http.service';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { merge, Observable, of as observableOf, Subject } from 'rxjs';
import { debounce } from 'lodash';

import {
  catchError,
  map,
  startWith,
  switchMap,
  debounceTime,
  first,
} from 'rxjs/operators';

@Component({
  selector: 'app-invoice-listing',
  templateUrl: './invoice-listing.component.html',
  styleUrls: ['./invoice-listing.component.css'],
})
export class InvoiceListingComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = [
    'item',
    'quantity',
    'date',
    'due',
    'rate',
    'tax',
  ];
  resultsLength: number;
  itemPerPage: Number = 5;
  dataSource: any = [];
  err: string = '';
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  searchText: string = '';
  tableData: Observable<Invoice[]>;

  constructor(
    private httpService: HttpService,
    private configService: ConfigService
  ) {
    //delay applyFilter method
    this.applyFilter = debounce(this.applyFilter, 500);
  }

  ngOnInit(): void {
    //this.getInvoices();
    // this.addInvoices();
    // this.deleteInvoices();
    // this.updateInvoices();
  }

  ngAfterViewInit(): void {
    this.renderTableData();
    this.tableData.subscribe((invoices) => {
      this.configService.toggleLoading(false);
      this.dataSource = new MatTableDataSource(invoices);
    });
  }

  renderTableData(): void {
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));
    this.tableData = merge(this.sort.sortChange, this.paginator.page).pipe(
      startWith({}),
      switchMap(() => {
        this.configService.toggleLoading(true);
        const params = {
          sort: this.sort.active,
          order: this.sort.direction,
          limit: this.itemPerPage,
          filter: this.searchText,
          pages: this.paginator.pageIndex + 1,
        };
        return this.httpService.getRequest('invoices/search', params);
      }),
      map((response) => {
        this.resultsLength = response.body.data.total;
        return response.body.data.invoices;
      }),
      catchError(() => {
        this.configService.toggleLoading(false);
        return observableOf([]);
      })
    );
  }

  getInvoices() {
    // return new Promise((resolv))
    let params = {
      id: 1,
      name: 'Invoices',
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
    this.searchText = (event.target as HTMLInputElement).value
      .trim()
      .toLowerCase();
    this.tableData.pipe(first()).subscribe((invoices) => {
      this.configService.toggleLoading(false);
      this.dataSource = new MatTableDataSource(invoices);
    });
  }
}
