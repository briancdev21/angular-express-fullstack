import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FilterService } from '../filter.service';
import * as moment from 'moment';
import { EstimatesService } from '../../../../services/estimates.service';
import { EstimateModel } from '../../../../models/estimate.model';

@Component({
  selector: 'app-addestimate',
  templateUrl: './addestimate.component.html',
  styleUrls: [
    './addestimate.component.css',
  ]
})

export class AddEstimateComponent implements OnInit {

  menuCollapsed = true;
  status = '';
  newEstimate = {};
  today = moment().format('YYYY-MM-DD');
  public createdEstimate;

  constructor( private estimatesService: EstimatesService, private route: ActivatedRoute ) {
    // if (!this.route.snapshot.paramMap.get('id')) {
    //   this.estimatesService.createEstimate(this.newEstimate).subscribe (res => {
    //     this.createdEstimate = res.data;
    //   });
    // }
  }

  ngOnInit() {

  }

  toggleMenubar(data: boolean) {
    this.menuCollapsed  = data;
  }


}
