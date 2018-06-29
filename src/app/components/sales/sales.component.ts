import { Component, OnInit } from '@angular/core';
import { CommonComponent } from '../common/common.component';
import { SalesService } from './sales.service';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';
import 'rxjs/add/operator/filter';

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
  notProposalDetails = true;

  constructor( private router: Router) {

    const m = localStorage.getItem('menu_collapsed');
    if (m === 'true') {
      this.menuCollapsed = true;
    } else if (m === 'false') {
      this.menuCollapsed = false;
    } else {
      this.menuCollapsed = true;
    }

    router.events
      .filter(event => event instanceof NavigationEnd)
      .subscribe((val) => {
        if (val['url'].includes('/sales/proposal-details') ) {
          this.notProposalDetails = false;
        } else {
          this.notProposalDetails = true;
        }
      });
  }

  ngOnInit() {
  }

  toggleMenubar(data: boolean) {
    this.menuCollapsed  = data;
  }

}
