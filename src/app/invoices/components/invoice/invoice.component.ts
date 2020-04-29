import { ConfigService } from './../../../services/config.services';
import { HttpService } from './../../../services/http.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css'],
})
export class InvoiceComponent implements OnInit {
  invoiceForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private httpService: HttpService,
    private configService: ConfigService
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
    let postParams = this.invoiceForm.value;
    this.configService.toggleLoading(true);
    this.httpService.postRequest('invoices', {}, postParams).subscribe(
      (data) => {
        this.configService.toggleLoading(false);
        this.invoiceForm.reset();
        this.configService.redirect('dashboard/invoices');
      },
      (err) => console.log(err)
    );
  }

  reset() {
    return this.invoiceForm.reset();
  }
}
