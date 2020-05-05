import { ConfigService } from './../services/config.services';
import { HttpService } from './../services/http.service';
import { Component, OnInit, Inject } from '@angular/core';
import { pipe, Observable } from 'rxjs';

import {
  MatDialogRef,
  DialogRole,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { DialogData } from '../models/dialog-data';
import { first } from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css'],
})
export class DialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private httpService: HttpService,
    private configService: ConfigService
  ) {}

  ngOnInit(): void {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  onDeleteInvoice(): void {
    console.log(this.data.dialogData);
    this.configService.toggleLoading(true);
    this.httpService
      .deleteRequest('invoices/' + this.data.dialogData.invoiceId + '', {})
      .subscribe(
        (response) => {
          this.dialogRef.close();
          this.configService.openSnackBar({
            data: { message: 'Invoice Deleted.', err: false },
          });
          this.configService.toggleLoading(false);
          this.configService.redirectTo('dashboard/invoices');
        },
        (err) => {
          this.configService.toggleLoading(false);
          this.handerError(err);
        }
      );
  }

  handerError(err: string): void {
    this.configService.openSnackBar({
      data: { message: err, err: true, actionBtn: 'OOps!' },
    });
    this.configService.toggleLoading(false);
  }
}
