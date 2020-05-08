import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfigService } from './../../../services/config.services';
import { HttpService } from './../../../services/http.service';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/internal/operators/map';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css'],
})
export class InvoiceComponent implements OnInit {
  invoiceAdding: boolean = false;
  title: string = 'Create Invoice';
  isFormId: number;
  invoiceForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private httpService: HttpService,
    private configService: ConfigService,
    private _snackBar: MatSnackBar,
    private route: ActivatedRoute
  ) {
    this.invoiceForm = this.fb.group({
      item: ['', Validators.required],
      quantity: ['', Validators.required],
      date: ['', Validators.required],
      due: ['', Validators.required],
      rate: ['', Validators.required],
      tax: ['', Validators.required],
    });
  }
  ngOnInit(): void {
    this.setInvoiceForm();
  }

  update() {
    this.invoiceAdding = true;
    this.configService.toggleLoading(true);
    console.log(this.invoiceForm);
    if (this.isFormId) {
      let postParams = this.invoiceForm.value;
      this.httpService
        .putRequest('invoices/' + this.isFormId + '', {}, postParams)
        .subscribe(
          (invoice) => {
            this.invoiceAdding = false;
            this.configService.openSnackBar({
              data: {
                message: `Invoice ${invoice.data.item} Updated`,
                err: false,
                actionBtn: 'Done',
              },
            });
            this.configService.toggleLoading(false);
            this.invoiceForm.reset();
            this.configService.redirect('dashboard/invoices');
          },
          (err) => {
            this.handerError(err);
            console.log(err);
          }
        );
    } else {
      let postParams = this.invoiceForm.value;
      this.httpService.postRequest('invoices', {}, postParams).subscribe(
        (invoice) => {
          this.invoiceAdding = false;
          this.configService.openSnackBar({
            data: {
              message: `Invoice ${invoice.data.item} Created`,
              err: false,
              actionBtn: 'Done',
            },
          });
          this.configService.toggleLoading(false);
          this.invoiceForm.reset();
          this.configService.redirect('dashboard/invoices');
        },
        (err) => {
          this.handerError(err);
          console.log(err);
        }
      );
    }
  }

  reset() {
    return this.invoiceForm.reset();
  }

  setInvoiceForm() {
    this.title = 'Edit Invoice';
    this.route.params.pipe(map((data) => data.id)).subscribe((id) => {
      if (!id) {
        return;
      }
      this.configService.toggleLoading(true);
      this.isFormId = id;
      this.httpService
        .getRequest('invoices/' + id + '', {})
        .pipe(
          map((res) => {
            return {
              item: res.body.data.item,
              quantity: res.body.data.quantity,
              date: res.body.data.date,
              due: res.body.data.due,
              rate: res.body.data.rate,
              tax: res.body.data.tax,
            };
          })
        )
        .subscribe(
          (invoice) => {
            console.log(invoice);
            this.configService.toggleLoading(false);
            this.invoiceForm.patchValue(invoice);
          },
          (err) => {
            this.handerError(err);
            console.error(err);
          }
        );
    });
  }

  handerError(err: string): void {
    this.configService.openSnackBar({
      data: { message: err, err: true, actionBtn: 'OOps!' },
    });
    this.invoiceAdding = false;
    this.configService.toggleLoading(false);
  }
}
