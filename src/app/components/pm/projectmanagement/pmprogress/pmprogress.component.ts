import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProjectManagementService } from '../projectmanagement.service';

@Component({
  selector: 'app-pmprogress',
  templateUrl: './pmprogress.component.html',
  styleUrls: [
    './pmprogress.component.css',
  ]
})

export class PmProgressComponent implements OnInit {
  tabActiveFirst: boolean;
  tabActiveSecond: boolean;
  tabActiveThird: boolean;
  tabActiveFourth: boolean;

  constructor( private pmService: ProjectManagementService, private router: Router ) {
  }

  ngOnInit() {

  }

  tabChange(event) {
    if (event.tabTitle === 'Change Log') {
      this.router.navigate(['./pm/pm-details/pm-progress/pm-logs-table/']);
    }
  }

}
