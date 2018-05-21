import { Component, OnInit } from '@angular/core';
import { CommonComponent } from '../common/common.component';
import { CrmService } from '../../services/crm.service';
@Component({
  selector: 'app-crm',
  templateUrl: './crm.component.html',
  styleUrls: [
    './crm.component.css'
  ],
  entryComponents: [
    CommonComponent
  ]
})
export class CrmComponent implements OnInit {
  menuCollapsed = true;
  mRotateMenu = false;
  constructor(private crmService: CrmService) {
  }

  ngOnInit() {
    // this.crmService.getLeadsList().subscribe(data => {
    //   console.log('crm service leads list: ', data);
    // });
  }

  toggleMenubar(data: boolean) {
    this.menuCollapsed  = data;
  }
  Submit_Inventory_Data(event) {
  }
}
