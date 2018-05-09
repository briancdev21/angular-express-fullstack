import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PmService } from '../../pm.service';

@Component({
  selector: 'app-projectfinance',
  templateUrl: './projectfinance.component.html',
  styleUrls: [
    './projectfinance.component.css',
  ]
})

export class ProjectFinanceComponent implements OnInit {
  @Input() projectInfo;
  @Input() financialTableData;

  ngOnInit() {
  }

  getTotalColor(value) {
    if (value === 'Paid') {
      return 'green';
    } else {
      return 'red';
    }
  }

  getStatusColor(value) {
    if (value === 'Paid') {
      return 'green';
    }
  }
}
