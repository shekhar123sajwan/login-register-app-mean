import { ConfigService } from './../services/config.services';
import { HttpService } from './../services/http.service';
import { Component, OnInit, Inject } from '@angular/core';
import {
  MatDialogRef,
  DialogRole,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { DialogData } from '../models/dialog-data';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css'],
})
export class DialogComponent implements OnInit {
  isDeleting: boolean = false;
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
    this.configService.toggleLoading(true);
    this.isDeleting = true;
    this.httpService
      .deleteRequest(
        'admin/invoices/' + this.data.dialogData.invoiceId + '',
        {}
      )
      .subscribe(
        (response) => {
          this.isDeleting = false;
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
