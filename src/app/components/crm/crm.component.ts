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
  constructor(private crmService: CrmService) {
  }

  ngOnInit() {
    this.crmService.getLeadsList().subscribe(data => {
    });
  }

  toggleMenubar(data: boolean) {
    this.menuCollapsed  = data;
  }

}
