import { ConfigService } from './../services/config.services';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-loading',
  template: `<div class="app-loading" *ngIf="loading">
    <div
      id="loader"
      style="position: absolute; width: 150px; height: 150px; z-index: 9;left: 50%; margin-left: -75px; top: 50%; margin-top: -75px;"
    >
      <img src="assets/images/loading.gif" style="max-width: 100%;" />
    </div>
  </div>`,
  styleUrls: ['./loading.component.css'],
})
export class AppLoadingComponent implements OnInit {
  loading: boolean = false;
  constructor(private configService: ConfigService) {}

  ngOnInit(): void {
    this.configService.load.subscribe((loading) => (this.loading = loading));
  }
}
