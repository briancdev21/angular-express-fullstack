import { Component, HostListener, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { EstimatesService } from '../../../../../services/estimates.service';

@Component({
  selector: 'app-addestimateheader',
  templateUrl: './addestimateheader.component.html',
  styleUrls: ['./addestimateheader.component.css']
})
export class AddEstimateHeaderComponent implements OnInit {
  @Input() createdDate: string;
  @Input() dueDate: string;
  date_differ: number;

  status = '';
  invoiceId: Number;
  constructor(private estimatesService: EstimatesService, private route: ActivatedRoute ) {

  }
  ngOnInit() {
    // this.status = this.route.snapshot.paramMap.get('title');
    this.invoiceId = parseInt(this.route.snapshot.paramMap.get('id'), 10);
    this.estimatesService.getIndividualEstimate(this.invoiceId).subscribe(res => {
      this.status = res.data.status;
    });
  }
}
