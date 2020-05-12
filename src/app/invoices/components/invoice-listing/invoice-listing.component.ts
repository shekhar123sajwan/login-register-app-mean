import { DialogComponent } from './../../../dialog/dialog.component';
import { ConfigService } from './../../../services/config.services';
import { Invoice } from './../../../models/invoice';
import { HttpService } from './../../../services/http.service';
import {
  Component,
  OnInit,
  ViewChild,
  AfterViewInit,
  Inject,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import {
  merge,
  Observable,
  of as observableOf,
  Subject,
  Subscription,
} from 'rxjs';
import { debounce } from 'lodash';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';

import {
  catchError,
  map,
  startWith,
  switchMap,
  first,
  take,
  share,
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
    'action',
  ];
  resultsLength: number;
  itemPerPage: Number = 5;
  dataSource: any = [];
  err: string = '';
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  searchText: string = '';
  tableData: Observable<Invoice[]>;
  data$: Observable<Invoice[]>;

  constructor(
    private httpService: HttpService,
    private configService: ConfigService,
    public dialog: MatDialog
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
    this.data$ = this.renderTableData();
    this.data$.subscribe(
      (invoices) => {
        this.configService.toggleLoading(false);
        this.dataSource = new MatTableDataSource(invoices);
      },
      (err) => this.handerError(err)
    );
  }

  renderTableData(): Observable<Invoice[]> {
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));
    return merge(this.sort.sortChange, this.paginator.page).pipe(
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
        return this.httpService.getRequest('admin/invoices/search', params);
      }),
      map((response) => {
        this.resultsLength = response.body.data.total;
        return response.body.data.invoices;
      }),
      catchError((err) => {
        this.handerError(err);
        return observableOf([]);
      }),
      share()
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
      this.httpService.getRequest('admin/invoices', params).subscribe(
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
      this.httpService
        .postRequest('admin/invoices', getParams, postParams)
        .subscribe(
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
        .deleteRequest('admin/invoices', getParams)
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
    this.paginator.pageIndex = 0;
    this.data$ = this.renderTableData();
    console.log(this.paginator);
    console.log(this.data$);
    this.data$.pipe(first()).subscribe(
      (invoices) => {
        this.configService.toggleLoading(false);
        this.dataSource = new MatTableDataSource(invoices);
      },
      (err) => this.handerError(err)
    );
  }

  addInvoice() {
    return this.configService.redirect('dashboard/invoices/new');
  }

  editHandler(id: string) {
    return this.configService.redirect(`/dashboard/invoices/${id}`);
  }

  deleteHandler(id: string) {
    return new Promise((resolve, reject) => {
      if (!id) {
        this.configService.toggleLoading(false);
        this.handerError('Id not Found.');
        return reject('Id not Found.');
      }

      const dialogRef = this.dialog.open(DialogComponent, {
        width: '250px',
        data: {
          title: 'Delete Invoice',
          message: 'Are you really want to delete Invoice?',
          dialogData: {
            tableData: this.tableData,
            invoiceId: id,
            dataSource: this.dataSource,
          },
        },
      });

      // dialogRef.afterClosed().subscribe((result) => {
      //   console.log('The dialog was closed');
      // });
      // console.log(dialogRef);
    });
  }

  handerError(err: string): void {
    this.configService.openSnackBar({
      data: { message: err, err: true, actionBtn: 'OOps!' },
    });
    this.configService.toggleLoading(false);
    return;
  }
}
