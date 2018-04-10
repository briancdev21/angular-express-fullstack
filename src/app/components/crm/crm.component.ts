import { Component, OnInit } from '@angular/core';
import { CommonComponent } from '../common/common.component';
import { CrmService } from './crm.service';
@Component({
  selector: 'app-crm',
  templateUrl: './crm.component.html',
  styleUrls: [
    './crm.component.css'
  ],
  entryComponents: [
    CommonComponent
  ],
  providers: [CrmService]
})
export class CrmComponent implements OnInit {
  menuCollapsed = true;
  constructor() {
  }

  ngOnInit() {
  }

  toggleMenubar(data: boolean) {
    this.menuCollapsed  = data;
  }

}
