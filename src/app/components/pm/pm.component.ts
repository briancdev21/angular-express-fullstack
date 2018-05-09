import { Component, OnInit } from '@angular/core';
import { CommonComponent } from '../common/common.component';
import { PmService } from './pm.service';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';
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

  constructor( private router: Router) {
    router.events
      .filter(event => event instanceof NavigationEnd)
      .subscribe((val) => {
        console.log('router: ', val);
        if (val['url'].includes('/pm/pm-details')) {
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
