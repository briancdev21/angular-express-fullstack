import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PmService } from '../../pm.service';

@Component({
  selector: 'app-pmboardtopinfo',
  templateUrl: './pmboardtopinfo.component.html',
  styleUrls: [
    './pmboardtopinfo.component.css',
  ]
})

export class PmBoardTopInfoComponent implements OnInit {

  @Input() projectInfo;
  tDate: '';
  targetDate = '';
  nDate: '';
  nextPaymentDate = '';
  options = { year: 'numeric', month: 'short', day: 'numeric' };

  constructor( private pmService: PmService ) {
  }

  ngOnInit() {
    const startDate = new Date(this.projectInfo.startDate);
    this.projectInfo.startDate = new Intl.DateTimeFormat('en-US', this.options).format(startDate);
  }

  getPerformanceColor(value) {
    if (value < 60) {
      return 'red';
    } else if (value < 80) {
      return 'orange';
    } else {
      return 'green';
    }
  }

  selectTargetDate(date) {
    const targetDate = new Date(date.value);
    this.projectInfo.targetDate = new Intl.DateTimeFormat('en-US', this.options).format(targetDate);
  }

  selectNextPaymentDate(date) {
    const nextPaymentDate = new Date(date.value);
    this.projectInfo.nextPaymentDate = new Intl.DateTimeFormat('en-US', this.options).format(nextPaymentDate);
  }

}
