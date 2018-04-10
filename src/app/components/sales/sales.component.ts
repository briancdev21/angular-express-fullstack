import { Component, OnInit } from '@angular/core';
import { CommonComponent } from '../common/common.component';
import { SalesService } from './sales.service';
@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: [
    './sales.component.css'
  ],
  entryComponents: [
    CommonComponent
  ],
  providers: [SalesService]
})
export class SalesComponent implements OnInit {
  menuCollapsed = true;
  constructor() {
  }

  ngOnInit() {
  }

  toggleMenubar(data: boolean) {
    this.menuCollapsed  = data;
  }

}
