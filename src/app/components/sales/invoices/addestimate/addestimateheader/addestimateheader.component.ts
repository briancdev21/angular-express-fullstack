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

  @Input() set createdInvoice(_createdInvoice) {
    this.invoice_mock = _createdInvoice;
    if (_createdInvoice) {
      this.status = this.invoice_mock.status;
    }
  }
  status = '';
  invoiceId: Number;
  invoice_mock: any;
  constructor(private estimatesService: EstimatesService, private route: ActivatedRoute ) {

  }
  ngOnInit() {
  }

  redirectTo() {
  }
}
