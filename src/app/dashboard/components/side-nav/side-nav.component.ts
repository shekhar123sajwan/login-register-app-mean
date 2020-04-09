import { Component, OnInit } from '@angular/core';
const MAX_WIDTH_BREAKPOINT =  720;
@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit {
  
  private mediaMatcher:MediaQueryList = window.matchMedia(`(max-width : ${MAX_WIDTH_BREAKPOINT}px)`);
  constructor() { }

  ngOnInit(): void {
  }

   isScreenSmall() { 
    return this.mediaMatcher.matches;
  }

}
