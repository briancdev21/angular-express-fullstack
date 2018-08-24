import { Component, HostListener, Input, OnInit } from '@angular/core';
import { EstimatesService } from '../../../../../services/estimates.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FilterService } from '../../filter.service';

@Component({
  selector: 'app-estimateprofileheader',
  templateUrl: './estimateprofileheader.component.html',
  styleUrls: ['./estimateprofileheader.component.css']
})
export class EstimateProfileHeaderComponent implements OnInit {

  status = '';
  invoiceId: string;
  constructor(private estimatesService: EstimatesService, private route: ActivatedRoute, private filterService: FilterService ) {

  }
  ngOnInit() {
    // this.status = this.route.snapshot.paramMap.get('title');
    this.invoiceId = this.route.snapshot.paramMap.get('id');
    this.estimatesService.getIndividualEstimate(this.invoiceId).subscribe(res => {
      this.status = res.data.status;
    });
  }

  clickConvertButton() {
    console.log('convert started:');
    this.estimatesService.convertEstimateToInvoice(this.invoiceId).subscribe(res => {
      console.log('converted:');
    });
  }
}
