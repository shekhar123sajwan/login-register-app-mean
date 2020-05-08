import { Component, OnInit } from '@angular/core';
const MAX_WIDTH_BREAKPOINT = 720;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  private mediaMatcher: MediaQueryList = window.matchMedia(
    `(max-width : ${MAX_WIDTH_BREAKPOINT}px)`
  );
  public isSmallScreen: boolean;

  links: Object = [
    { name: 'Invoice', url: '/dashboard/invoices' },
    { name: 'Client', url: '/dashboard/clients' },
  ];
  constructor() {}

  ngOnInit(): void {}

  isScreenSmall() {
    this.isSmallScreen = this.mediaMatcher.matches;
    return this.mediaMatcher.matches;
  }
}
