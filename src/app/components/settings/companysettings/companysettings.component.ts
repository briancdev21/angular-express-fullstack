import { Component, ChangeDetectorRef, Input, OnInit, HostListener, EventEmitter, Output, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import * as _ from 'lodash';
import * as moment from 'moment';


@Component({
  selector: 'app-companysettings',
  templateUrl: './companysettings.component.html',
  styleUrls: [
    './companysettings.component.css',
  ],
  providers: []
})


export class CompanySettingsComponent implements OnInit {

  currentDate = '';
  mRotateMenu = false;

  constructor(private router: Router) {
    this.currentDate = moment(new Date()).format('MMMM DD, YYYY');
  }

  ngOnInit() {
  }

  toReports(data) {
    this.router.navigate(['./reports/' + data]);
  }

}
