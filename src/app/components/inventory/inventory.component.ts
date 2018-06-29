import { Component, OnInit } from '@angular/core';
import { CommonComponent } from '../common/common.component';
import { InventoryService } from './inventory.service';
@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: [
    './inventory.component.css'
  ],
  entryComponents: [
    CommonComponent
  ],
  providers: [InventoryService]
})
export class InventoryComponent implements OnInit {
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
