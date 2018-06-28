import { Component, OnInit } from '@angular/core';
import { CommonComponent } from '../common/common.component';
import { CollaborationService } from './collaboration.service';
@Component({
  selector: 'app-collaboration',
  templateUrl: './collaboration.component.html',
  styleUrls: [
    './collaboration.component.css'
  ],
  entryComponents: [
    CommonComponent
  ],
  providers: [CollaborationService]
})
export class CollaborationComponent implements OnInit {
  menuCollapsed = true;
  mRotateMenu = false;

  constructor() {
    const m = localStorage.getItem('menu_collapsed');
    if (m === 'true') {
      this.menuCollapsed = true;
    } else {
      this.menuCollapsed = false;
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
