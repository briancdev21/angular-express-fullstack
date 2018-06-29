import { Component, OnInit } from '@angular/core';
import { CommonComponent } from '../common/common.component';
import { CrmService } from '../../services/crm.service';
import { Router, ActivatedRoute, NavigationStart, RoutesRecognized, NavigationEnd } from '@angular/router';
import 'rxjs/add/operator/pairwise';
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
  mRotateMenu = true;
  constructor(private crmService: CrmService, private router: Router) {

    const m = localStorage.getItem('menu_collapsed');
    if (m === 'true') {
      this.menuCollapsed = true;
    } else if (m === 'false') {
      this.menuCollapsed = false;
    } else {
      this.menuCollapsed = true;
    }

    router.events.pairwise().subscribe((event) => {
    });
  }

  ngOnInit() {
    this.crmService.getLeadsList().subscribe(data => {
      console.log('leads list: ', data);
    });
  }

  toggleMenubar(data: boolean) {
    this.menuCollapsed  = data;
  }
  Submit_Inventory_Data(event) {
  }
}
