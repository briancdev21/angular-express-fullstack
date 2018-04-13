import { Component, OnInit } from '@angular/core';
import { CommonComponent } from '../common/common.component';
import { ReportsService } from './reports.service';
import * as moment from 'moment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: [
    './reports.component.css'
  ],
  entryComponents: [
    CommonComponent
  ],
  providers: [ReportsService]
})
export class ReportsComponent implements OnInit {
  menuCollapsed = true;
  constructor(private router: Router) {
  }

  ngOnInit() {
  }

  toggleMenubar(data: boolean) {
    this.menuCollapsed  = data;
  }

}
