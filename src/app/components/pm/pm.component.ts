import { Component, OnInit } from '@angular/core';
import { CommonComponent } from '../common/common.component';
import { PmService } from './pm.service';
import { Router, NavigationStart, NavigationEnd, ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/filter';

@Component({
  selector: 'app-pm',
  templateUrl: './pm.component.html',
  styleUrls: [
    './pm.component.css'
  ],
  entryComponents: [
    CommonComponent
  ],
  providers: [PmService]
})
export class PmComponent implements OnInit {
  menuCollapsed = true;
  notPmDetails = true;

  constructor( private router: Router, private activatedRoute: ActivatedRoute) {

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
    // activatedRoute.url
      .subscribe(val => {
        if (val['urlAfterRedirects'].includes('/pm/pm-details') || val['urlAfterRedirects'].includes('/pm/pending-project/')) {
          this.notPmDetails = false;
        } else {
          this.notPmDetails = true;
        }
      });
  }

  ngOnInit() {
  }

  toggleMenubar(data: boolean) {
    this.menuCollapsed  = data;
  }

}
