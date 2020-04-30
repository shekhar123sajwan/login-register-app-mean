import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfigService } from './../../../services/config.services';
import { HttpService } from './../../../services/http.service';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css'],
})
export class InvoiceComponent implements OnInit {
  invoiceAdding: boolean = false;
  invoiceForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private httpService: HttpService,
    private configService: ConfigService,
    private _snackBar: MatSnackBar
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
  ngOnInit(): void {}

  update() {
    this.invoiceAdding = true;
    let postParams = this.invoiceForm.value;
    this.configService.toggleLoading(true);
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

  reset() {
    return this.invoiceForm.reset();
  }
  handerError(err: string): void {
    this.configService.openSnackBar({
      data: { message: err, err: true, actionBtn: 'OOps!' },
    });
    this.invoiceAdding = false;
    this.configService.toggleLoading(false);
  }
}
