import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../services/config.services';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-snackbar',
  template: ``,
  styles: [],
})
export class SnackbarComponent implements OnInit {
  constructor(
    private configService: ConfigService,
    private _snackBar: MatSnackBar
  ) {
    this.configService.sanckBarsubject.subscribe((res) => {
      this._snackBar.open(res.data.message, res.data.actionBtn || 'Done', {
        duration: 4000,
        panelClass: res.data.err ? 'snackbar-err' : 'snackbar',
      });
    });
  }

  ngOnInit(): void {}
}
