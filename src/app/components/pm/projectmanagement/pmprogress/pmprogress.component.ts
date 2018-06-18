import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PmService } from '../pm.service';

@Component({
  selector: 'app-pmprogress',
  templateUrl: './pmprogress.component.html',
  styleUrls: [
    './pmprogress.component.css',
  ]
})

export class PmProgressComponent implements OnInit {

  tabActiveFirst = true;
  tabActiveSecond = false;
  tabActiveThird = false;

  constructor( private pmService: PmService, private router: Router ) {
  }

  ngOnInit() {

  }

  tabChange(event) {
    if (event.tabTitle === 'Change Log') {
      this.router.navigate(['./pm/pm-details/pm-progress/pm-logs-table/']);
    }
  }

}
