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
  }

  ngOnInit() {
  }

  toggleMenubar(data: boolean) {
    this.menuCollapsed  = data;
  }

  Submit_Inventory_Data(event) {
  }

}
