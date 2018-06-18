import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { InvoicesService } from '../../../../services/invoices.service';
import { FilterService } from '../filter.service';
import * as moment from 'moment';
import { EstimatesService } from '../../../../services/estimates.service';
import { EstimateModel } from '../../../../models/estimate.model';

@Component({
  selector: 'app-estimateprofile',
  templateUrl: './estimateprofile.component.html',
  styleUrls: [
    './estimateprofile.component.css',
  ]
})

export class EstimateProfileComponent implements OnInit {

  menuCollapsed = true;
  status = '';
  newEstimate = {};
  today = moment().format('YYYY-MM-DD');
  public createdEstimate;

  constructor( private estimatesService: EstimatesService, private router: Router, private route: ActivatedRoute ) {
  }

  ngOnInit() {

  }

  toggleMenubar(data: boolean) {
    this.menuCollapsed  = data;
  }

}
