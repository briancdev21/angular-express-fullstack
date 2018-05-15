import { Component, HostListener, Input, OnInit } from '@angular/core';
import { InvoicesService } from '../../../../../services/invoices.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-estimateprofileheader',
  templateUrl: './estimateprofileheader.component.html',
  styleUrls: ['./estimateprofileheader.component.css']
})
export default class EstimateProfileHeaderComponent implements OnInit {

  status = '';
  invoiceId: Number;
  constructor(private invoiceService: InvoicesService, private route: ActivatedRoute ) {

  }
  ngOnInit() {
    // this.status = this.route.snapshot.paramMap.get('title');
    this.invoiceId = parseInt(this.route.snapshot.paramMap.get('id'), 10);
    this.invoiceService.getIndividualInvoice(this.invoiceId).subscribe(res => {
      this.status = res.data.status;
    });
  }
}
