import { Component, OnInit } from '@angular/core';
import { CommonComponent } from '../common/common.component';
import { ServicingService } from './servicing.service';
@Component({
  selector: 'app-servicing',
  templateUrl: './servicing.component.html',
  styleUrls: [
    './servicing.component.css'
  ],
  entryComponents: [
    CommonComponent
  ],
  providers: [ServicingService]
})
export class ServicingComponent implements OnInit {
  menuCollapsed = true;
  mRotateMenu = false;

  constructor() {
    const m = localStorage.getItem('menu_collapsed');
    if (m === 'true') {
      this.menuCollapsed = true;
    } else if (m === 'false') {
      this.menuCollapsed = false;
    } else {
      this.menuCollapsed = true;
    }
  }

  ngOnInit() {
  }

  toggleMenubar(data: boolean) {
    this.menuCollapsed  = data;
  }
  Submit_Inventory_Data(event) {
  }
}
