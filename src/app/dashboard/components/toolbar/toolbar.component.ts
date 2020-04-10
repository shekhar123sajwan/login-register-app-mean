import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {
  
  @Output() toggleSideNav:EventEmitter<void> = new EventEmitter<void>();
  @Input() public isSmallScreen:boolean;
  constructor() { }

  ngOnInit(): void {
  }

}
